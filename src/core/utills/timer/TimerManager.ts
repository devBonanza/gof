import Timer from './Timer';

export default class TimerManager {
    private timers: Array<Timer>;
    private _timersToDelete: Array<Timer>;
    private _last: number;
    public elapsedTick: any
    private request :any;

    constructor() {
        this.timers = [];
        this._timersToDelete = [];
        this.elapsedTick = Date.now();

        this._last = 0;
        this.tick.call(this);
        document.removeEventListener("visibilitychange",this.visibilitychange.bind(this));
        document.addEventListener("visibilitychange",this.visibilitychange.bind(this));
      
    }
    onGameResume() {
        const now = Date.now();
        this.elapsedTick = now;
    }

    onGamePause() {
        const now = Date.now();
        this.elapsedTick = now;
    }
    tick = () => {
        if(this.request){
           window.cancelAnimationFrame(this.request);
        }
       this.request ='';
       this.request = requestAnimationFrame(this.tick);
        const now = Date.now();
        if (this) {
            this.update((now - this.elapsedTick) * 0.001);
        }
        this.elapsedTick = now;
    }
    update(delta?: any) {
        let deltaMS;
        if (!delta && delta !== 0) {
            deltaMS = this._getDeltaMS();
            delta = deltaMS / 1000;
        } else {
            deltaMS = delta * 1000;
        }

        for (let i = 0; i < this.timers.length; i++) {
            let timer: any = this.timers[i];
            if (timer.active) {
                timer.update(delta, deltaMS);
                if (timer.isEnded && timer.expire) {
                    timer.remove();
                }
            }else{
                if (timer.isEnded && timer.expire) {
                    timer.remove();
                }
            }
        }

        if (this._timersToDelete.length) {
            for (let i = 0; i < this._timersToDelete.length; i++) {
                this._remove(this._timersToDelete[i]);
            }
            this._timersToDelete.length = 0;
        }
    }

    removeTimer(timer: any) {
        
       
        this._timersToDelete.push(timer);

    }

    addTimer(timer: any) {
        timer.manager = this;
        this.timers.push(timer);
    }

    createTimer(time: any) {
        
        // document.removeEventListener("visibilitychange",this.visibilitychange.bind(this));
        // document.addEventListener("visibilitychange",this.visibilitychange.bind(this));
        // document.addEventListener("visibilitychange", () => {
        //     if (document.visibilityState === 'visible') {
        //         this.onGameResume();
        //     } else {
        //         this.onGamePause()
        //     }
        // });
       
        
        return new Timer(time, this);
    }
    visibilitychange() {
        if (document.visibilityState === 'visible') {
            this.onGameResume();
        } else {
            this.onGamePause()
        }
    }

    _remove(timer: any) {
        let index = this.timers.indexOf(timer);
        if (index > -1) this.timers.splice(index, 1);
    }

    _getDeltaMS() {
        if (this._last === 0) this._last = Date.now();
        let now = Date.now();
        let deltaMS = now - this._last;
        this._last = now;
        return deltaMS;
    }
}
