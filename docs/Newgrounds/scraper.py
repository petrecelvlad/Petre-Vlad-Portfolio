"""
Newgrounds portfolio scraper.
Extracts ALL metadata from each game page and writes to:
  src/infrastructure/data/newgrounds_scraped.json

Run from the project root:
  python docs/Newgrounds/scraper.py

Requirements:
  pip install requests beautifulsoup4
"""

import json
import re
import time
import os
import requests
from bs4 import BeautifulSoup
from datetime import datetime

GAMES_LIST = [
    {"name": "Bounzy 2",                  "url": "https://www.newgrounds.com/portal/view/597537"},
    {"name": "Passage of Time",           "url": "https://www.newgrounds.com/portal/view/593343"},
    {"name": "Bounzy",                    "url": "https://www.newgrounds.com/portal/view/587105"},
    {"name": "Space Hornet",              "url": "https://www.newgrounds.com/portal/view/578360"},
    {"name": "BlobWars",                  "url": "https://www.newgrounds.com/portal/view/575965"},
    {"name": "Aztek Blocks",              "url": "https://www.newgrounds.com/portal/view/563397"},
    {"name": "Digital Upgrade",           "url": "https://www.newgrounds.com/portal/view/553276"},
    {"name": "Rapid Rush",                "url": "https://www.newgrounds.com/portal/view/547308"},
    {"name": "Strawberryclock Adventure", "url": "https://www.newgrounds.com/portal/view/545658"},
    {"name": "Bullet Bash",               "url": "https://www.newgrounds.com/portal/view/541282"},
    {"name": "Marble Frenzy",             "url": "https://www.newgrounds.com/portal/view/540922"},
    {"name": "Rising Angel",              "url": "https://www.newgrounds.com/portal/view/511133"},
    {"name": "Einstein's Quiz",           "url": "https://www.newgrounds.com/portal/view/492970"},
    {"name": "1 Day Quest",               "url": "https://www.newgrounds.com/portal/view/486610"},
    {"name": "Awesome Effects Tutorial",  "url": "https://www.newgrounds.com/portal/view/478067"},
    {"name": "Mouth Tutorial",            "url": "https://www.newgrounds.com/portal/view/477862"},
    {"name": "Advanced Shading Tutorial", "url": "https://www.newgrounds.com/portal/view/477821"},
    {"name": "Tripicus",                  "url": "https://www.newgrounds.com/portal/view/471714"},
    {"name": "FBF in 30 minutes",         "url": "https://www.newgrounds.com/portal/view/467493"},
    {"name": "Spermatron v2",             "url": "https://www.newgrounds.com/portal/view/451057"},
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}


# ── Helpers ────────────────────────────────────────────────────────────────

def to_int(s) -> int | None:
    if s is None:
        return None
    cleaned = re.sub(r"[^\d]", "", str(s))
    return int(cleaned) if cleaned else None


def to_float(s) -> float | None:
    if s is None:
        return None
    m = re.search(r"[\d]+\.?[\d]*", str(s))
    return float(m.group()) if m else None


def parse_date(raw: str) -> tuple[str, str]:
    """Returns (iso_date, display_date). Handles ISO attrs, long human dates, short dates."""
    raw = raw.strip()
    if not raw:
        return ("", "")

    # Already has ISO prefix from <time datetime="...">
    iso_m = re.match(r"(\d{4}-\d{2}-\d{2})", raw)
    if iso_m:
        return (iso_m.group(1), raw)

    # Human-readable: "Jun 18, 2012" or "June 18, 2012" (with optional time suffix)
    date_m = re.search(r"([A-Za-z]{3,9})\s+(\d{1,2}),?\s+(\d{4})", raw)
    if date_m:
        date_str = f"{date_m.group(1)} {date_m.group(2)} {date_m.group(3)}"
        for fmt in ("%b %d %Y", "%B %d %Y"):
            try:
                d = datetime.strptime(date_str, fmt)
                return (d.strftime("%Y-%m-%d"), raw)
            except ValueError:
                continue

    return ("", raw)


def get_ld_json(soup) -> dict:
    """Extract the first valid JSON-LD block from the page."""
    for tag in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(tag.string or "")
            if isinstance(data, dict):
                return data
        except Exception:
            pass
    return {}


def search_text(pattern: str, text: str, group: int = 1):
    """Regex search on full page text, return group or None."""
    m = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
    return m.group(group).strip() if m else None


# ── Core scraper ───────────────────────────────────────────────────────────

def scrape_game(game: dict) -> dict:
    ng_id = game["url"].rstrip("/").split("/")[-1]
    base = {
        "ng_id":              ng_id,
        "ng_url":             game["url"],
        "title":              game["name"],
        "upload_date_iso":    "",
        "upload_date_display": "",
        "views":              None,
        "votes":              None,
        "faves":              None,
        "score":              None,
        "genre":              "",
        "tags":               [],
        "description":        "",
        "credits":            {},
    }

    try:
        resp = None
        for attempt in range(3):
            try:
                resp = requests.get(game["url"], headers=HEADERS, timeout=20)
                break
            except requests.exceptions.Timeout:
                if attempt == 2:
                    base["error"] = "Timeout after 3 attempts"
                    return base
                time.sleep(3)
        if resp is None or resp.status_code != 200:
            base["error"] = f"HTTP {resp.status_code if resp else 'no response'}"
            return base

        soup = BeautifulSoup(resp.text, "html.parser")
        ld   = get_ld_json(soup)

        # ── Title ──────────────────────────────────────────────────────────
        base["title"] = ld.get("name") or game["name"]

        # ── Description (Author Comments — preferred over JSON-LD) ─────────
        desc_el = soup.find("div", id="author_comments")
        if desc_el:
            base["description"] = desc_el.get_text("\n", strip=True)
        if not base["description"]:
            base["description"] = ld.get("description", "")

        # ── Upload date ────────────────────────────────────────────────────
        # NOTE: soup.find("time") intentionally skipped — those elements are
        # comment timestamps, not the upload date.
        #
        # Priority 1: JSON-LD datePublished / uploadDate
        raw = ld.get("datePublished") or ld.get("uploadDate", "")
        if raw:
            iso, display = parse_date(raw)
            base["upload_date_iso"]     = iso
            base["upload_date_display"] = display or raw

        # Priority 2: "Uploaded Mon DD, YYYY HH:MM AM/PM TZ" in page text
        if not base["upload_date_iso"]:
            page_text = soup.get_text(" ", strip=True)
            raw = search_text(
                r"Uploaded\s*:?\s*([A-Za-z]{3,9}\s+\d{1,2},?\s*\d{4}"
                r"(?:[,\s]+\d{1,2}:\d{2}\s*[APap][Mm]\s*\w+)?)",
                page_text,
            )
            if raw:
                iso, display = parse_date(raw)
                base["upload_date_iso"]     = iso
                base["upload_date_display"] = raw.strip()

        # ── Views ──────────────────────────────────────────────────────────
        # Priority 1: JSON-LD interactionStatistic (PlayAction or ViewAction)
        for stat in ld.get("interactionStatistic", []):
            itype = str(stat.get("interactionType", "")).lower()
            if "play" in itype or "view" in itype or "watch" in itype:
                base["views"] = to_int(stat.get("userInteractionCount"))
                break

        # Priority 2: regex on page text
        if base["views"] is None:
            page_text = soup.get_text(" ", strip=True)
            raw = search_text(r"Views?\s*:?\s*([\d,]+)", page_text)
            base["views"] = to_int(raw)

        # ── Score ──────────────────────────────────────────────────────────
        # Priority 1: aggregateRating in JSON-LD
        agg = ld.get("aggregateRating", {})
        if agg:
            base["score"] = to_float(agg.get("ratingValue"))
            base["votes"] = to_int(agg.get("ratingCount"))

        # Priority 2: #score_number element
        if base["score"] is None:
            score_el = soup.find(id="score_number") or soup.find("h3", id="score_number")
            if score_el:
                base["score"] = to_float(score_el.get_text(strip=True))

        # Priority 3: regex on page text
        if base["score"] is None:
            page_text = soup.get_text(" ", strip=True)
            raw = search_text(r"Score\s*:?\s*([\d.]+)\s*/\s*5", page_text)
            base["score"] = to_float(raw)

        # ── Votes (if not set from JSON-LD) ────────────────────────────────
        if base["votes"] is None:
            page_text = soup.get_text(" ", strip=True)
            raw = search_text(r"Votes?\s*:?\s*([\d,]+)", page_text)
            base["votes"] = to_int(raw)

        # ── Faves ──────────────────────────────────────────────────────────
        # Newgrounds doesn't include faves in JSON-LD — parse from HTML
        # Try several possible selectors
        faves_el = (
            soup.find(id="faves_load") or
            soup.find(id="faves") or
            soup.find(class_="faves-count") or
            soup.find("span", class_="faves")
        )
        if faves_el:
            base["faves"] = to_int(faves_el.get_text(strip=True))

        # Fallback: regex
        if base["faves"] is None:
            page_text = soup.get_text(" ", strip=True)
            raw = search_text(r"(?:Faves?|Favorites?)\s*:?\s*([\d,]+)", page_text)
            base["faves"] = to_int(raw)

        # ── Genre ──────────────────────────────────────────────────────────
        base["genre"] = str(ld.get("genre", "")).strip()

        if not base["genre"]:
            page_text = soup.get_text(" ", strip=True)
            raw = search_text(
                r"Genre\s*:?\s*([A-Za-z][A-Za-z\s\-]+?)(?=\s{2,}|Tags?|Views?|Score|Uploaded|Featured|\Z)",
                page_text,
            )
            base["genre"] = (raw or "").strip()

        # ── Tags ───────────────────────────────────────────────────────────
        # NG tag links use href pattern: /search/...?match=tags&tags=NAME
        tag_els = [
            a for a in soup.find_all("a", href=True)
            if "match=tags" in a.get("href", "")
        ]
        if tag_els:
            base["tags"] = [a.get_text(strip=True) for a in tag_els if a.get_text(strip=True)]
        else:
            # JSON-LD keywords fallback
            kw = ld.get("keywords", "")
            if isinstance(kw, str) and kw:
                base["tags"] = [t.strip() for t in kw.split(",") if t.strip()]
            elif isinstance(kw, list):
                base["tags"] = kw

        # ── Credits ────────────────────────────────────────────────────────
        # Actual NG structure:
        #   <div class="item-details">
        #     <div class="item-details-main"><h4><a href="user.newgrounds.com">Name</a></h4></div>
        #     <div class="item-details-meta"><div class="role"><em>Role</em></div></div>
        #   </div>
        for block in soup.find_all("div", class_="item-details"):
            name_div = block.find("div", class_="item-details-main")
            role_div = block.find("div", class_="role")
            if not name_div or not role_div:
                continue
            a   = name_div.find("a", href=True)
            em  = role_div.find("em")
            if not a or not em:
                continue
            if "newgrounds.com" not in a.get("href", ""):
                continue
            name = a.get_text(strip=True)
            role = em.get_text(strip=True)
            if name and role:
                if role in base["credits"]:
                    base["credits"][role] = base["credits"][role] + ", " + name
                else:
                    base["credits"][role] = name

        # Fallback: JSON-LD author
        if not base["credits"]:
            author = ld.get("author", {})
            if isinstance(author, dict) and author.get("name"):
                base["credits"]["Artist"] = author["name"]
            elif isinstance(author, list):
                for a in author:
                    if isinstance(a, dict) and a.get("name"):
                        base["credits"]["Artist"] = a["name"]
                        break

    except Exception as exc:
        base["error"] = str(exc)

    return base


# ── Main ───────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import sys
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    results = []

    for i, game in enumerate(GAMES_LIST):
        print(f"[{i + 1}/{len(GAMES_LIST)}] {game['name']} ...", end=" ", flush=True)
        data = scrape_game(game)
        results.append(data)

        if "error" in data:
            print(f"ERR  {data['error']}")
        else:
            date_str = data["upload_date_iso"] or data["upload_date_display"] or "?"
            print(
                f"OK   date={date_str}"
                f"  views={data['views']}"
                f"  votes={data['votes']}"
                f"  faves={data['faves']}"
                f"  score={data['score']}"
                f"  tags={len(data['tags'])}"
                f"  credits={list(data['credits'].keys())}"
            )

        time.sleep(1.5)  # polite delay

    # Write output alongside portfolio.json so BacklogView can import it
    script_dir  = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, "..", "..", "src", "infrastructure", "data", "newgrounds_scraped.json")
    output_path = os.path.normpath(output_path)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    ok    = sum(1 for r in results if "error" not in r)
    errs  = len(results) - ok
    print(f"\n{'-' * 60}")
    print(f"OK  {ok} / {len(results)} scraped successfully")
    if errs:
        print(f"WARN  {errs} errors — check output above")
    print(f"   Saved → {output_path}")
