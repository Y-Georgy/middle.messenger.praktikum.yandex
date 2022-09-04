import { TUnknownFuncVoid } from "../../types/types";

class EventBus {
  listeners: Record<string, TUnknownFuncVoid[]>

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: TUnknownFuncVoid) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: TUnknownFuncVoid) {
	if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function(listener) {
      listener(...args);
    });
  }
}

export default EventBus;