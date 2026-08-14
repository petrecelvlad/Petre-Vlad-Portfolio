import React, { ComponentType } from 'react';
import {
  CorkboardNote,
  ToggleSwitch,
  EmergencyButton,
  WoodTile,
  CardboardCeramicTile,
  LeatherStrap,
  PolaroidWaxSeal,
  RotaryFlapUnit,
  SlideGauge,
} from '../skins/gamified/widgets';

export type BentoWidgetType =
  | 'corkboard-note'
  | 'toggle-switch'
  | 'emergency-button'
  | 'wood-tile'
  | 'cardboard-ceramic-tile'
  | 'leather-strap'
  | 'polaroid-wax-seal'
  | 'rotary-flap-unit'
  | 'slide-gauge';

// Mapping table for Widget Factory
const WIDGET_REGISTRY: Record<BentoWidgetType, ComponentType<any>> = {
  'corkboard-note': CorkboardNote,
  'toggle-switch': ToggleSwitch,
  'emergency-button': EmergencyButton,
  'wood-tile': WoodTile,
  'cardboard-ceramic-tile': CardboardCeramicTile,
  'leather-strap': LeatherStrap,
  'polaroid-wax-seal': PolaroidWaxSeal,
  'rotary-flap-unit': RotaryFlapUnit,
  'slide-gauge': SlideGauge,
};

export class BentoWidgetFactory {
  /**
   * Returns the Component corresponding to the given widget type.
   */
  static getWidgetComponent<T = any>(type: BentoWidgetType): ComponentType<T> | undefined {
    return WIDGET_REGISTRY[type];
  }

  /**
   * Instantiates a widget element given its type and props.
   */
  static createWidget<P extends object>(type: BentoWidgetType, props: P): React.ReactElement | null {
    const Component = WIDGET_REGISTRY[type];
    if (!Component) {
      console.warn(`[BentoWidgetFactory] Unknown widget type: "${type}"`);
      return null;
    }
    return React.createElement(Component, props);
  }
}
