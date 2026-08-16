import { SkinId } from '@/src/context/SkinContext';
import { SlotName } from './ports';
import { SkinRegistry } from './SkinRegistry';
import { SlotRegistry } from '@/src/core/domain/skinStrategy';

export function resolveSlot<S extends SlotName>(skin: SkinId, slot: S): SlotRegistry[S] {
  return SkinRegistry.resolveSlot(skin, slot);
}

