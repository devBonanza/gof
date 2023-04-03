import * as PIXI from 'pixi.js'

class EventBus {
    static eventBus: any;
    static getEventBus() {
        if (!EventBus.eventBus) {
            EventBus.eventBus = new PIXI.utils.EventEmitter();
        }
        return EventBus.eventBus;
    }
}

export default EventBus;