export interface DomainEvent {
  type: string;
  timestamp: number;
  payload?: any;
}

export interface NodeSelectedEvent extends DomainEvent {
  type: 'NODE_SELECTED';
  payload: {
    nodeId: string;
    nodeName: string;
    category: string;
  };
}

export interface SkillFilterChangedEvent extends DomainEvent {
  type: 'SKILL_FILTER_CHANGED';
  payload: {
    category: string | null;
  };
}

export interface AudioEffectTriggeredEvent extends DomainEvent {
  type: 'AUDIO_EFFECT_TRIGGERED';
  payload: {
    effectName: string;
    volume?: number;
  };
}

export type AppDomainEvent =
  | NodeSelectedEvent
  | SkillFilterChangedEvent
  | AudioEffectTriggeredEvent;

type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => void;

class EventBus {
  private listeners: Map<string, Set<EventHandler<any>>> = new Map();

  /**
   * Subscribe to a specific domain event type.
   */
  subscribe<T extends AppDomainEvent>(eventType: T['type'], handler: EventHandler<T>): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    const handlers = this.listeners.get(eventType)!;
    handlers.add(handler);

    return () => {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.listeners.delete(eventType);
      }
    };
  }

  /**
   * Publish a domain event to all subscribers.
   */
  publish<T extends AppDomainEvent>(event: T): void {
    const handlers = this.listeners.get(event.type);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(event);
        } catch (err) {
          console.error(`[DomainEventBus] Error handling event "${event.type}":`, err);
        }
      });
    }
  }

  /**
   * Clear all subscribers (useful for tests or teardown).
   */
  clear(): void {
    this.listeners.clear();
  }
}

export const DomainEventBus = new EventBus();
