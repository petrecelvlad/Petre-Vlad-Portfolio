import { IProject } from './models';

export function getYoutubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// The video frame shows keyScreenshots[0] only when there's no playable video,
// so the gallery takes whatever the frame isn't already showing.
export function getGalleryScreenshots(project: IProject): string[] {
  const hasVideo = project.links.youtube ? getYoutubeId(project.links.youtube) !== null : false;
  return hasVideo ? project.keyScreenshots : project.keyScreenshots.slice(1);
}
