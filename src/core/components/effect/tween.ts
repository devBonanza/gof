import { TweenTarget } from "./tween-target";
import Easing from "./easing";
import {TIMER} from "../../utills";

/**
 * @classdesc Tween

 * @constructs Tween
 * @extends module:Prime.EventHandler
 * @memberOf module:Prime
 * @param {Object[]} targets
 * @param {Object[]} properties Contains each property to be changed along with their start and end values (If start value is set to null the tween with using the current value as the start point)
 * Example: {"x" : {start : 15, end : 100), "y" : {start : null, end : 100)...}
 * @param {Number} duration Milliseconds
 * @param {String | function} easingfunc [Functions]{@link module:Prime.Easing}. Alternatively, a different function can be passed through
 * @param {Number} [startDelay] Milliseconds
 * @param {Number} [overshoot]
 * @param {Number} [amplitude]
 * @param {Number} [period]
 *
 */
export class Tween  {
    public easing: any
    public closed: any
    public yPoints: any
    public easeFunction: any
    public duration: any
    public followRotation: any
    public lastPoint: any
    public elapsed: any
    public elapsedTick: any
    public target: any
    public path: any
    public running: any
    public yoyo: any
    public loop: any
    public ease: any
    public overshoot: any
    public amplitude: any
    public period: any
    public targets: any
    public properties: any
    private tickupRequest: any;
    private onUpdateFunc: any;
    public onCompleteFunc: any;
    private gamePause: boolean;
    constructor(targets:any, properties:any, duration:number, easingfunc:any, yoyo:any, startDelay?:any, overshoot?:any, amplitude?:any, period?:any, loop?:any,
    onUpdate:any=()=>{},
    onComplete:any=()=>{}) {
        this.gamePause = false;
        this.onUpdateFunc = onUpdate;
        this.onCompleteFunc = onComplete;
        let i,
            target,
            tween = this;

        if (typeof easingfunc === "string") {
            // @ts-ignore
            this.easing = Easing[easingfunc];
        } else if (typeof easingfunc === "function") {
            this.easing = easingfunc;
        }

        this.yoyo = yoyo;
        this.loop = loop;
        this.easeFunction = this.ease;
        this.duration = duration;
        this.elapsed = 0;
        this.elapsedTick = Date.now();
        this.overshoot = overshoot === null ? undefined : overshoot;
        this.amplitude = amplitude === null ? undefined : amplitude;
        this.period = period === null ? undefined : period;

        this.targets = [];
        for (target in targets) {
            let targetobj = new TweenTarget();
            targetobj.setProperties(targets[target], properties);
            this.targets.push(targetobj);
        }
        this.properties = JSON.parse(JSON.stringify(properties)); //deep copy

        if (this.targets.length === 1) {
            this.target = this.targets[0];
            this.easeFunction = this.easeSingle;
        } else {
            this.target = null;
            this.easeFunction = this.easeMultiple;
        }
        this.running = false;
        if (!startDelay) {
            this.start();
        } else {
            let timer = TIMER.TimerManager.createTimer(startDelay)
            timer.on('end', (e: any) => {
                e.remove();
                tween.start();
            })
            timer.start();
        }
        // document.addEventListener("visibilitychange", () => {
        //     if (document.visibilityState === 'visible') {
        //          this.onGameResume();
        //     } else {
        //          this.onGamePause()
        //     }
        // });

        
        this.tick();
    }
    visibilitychange() {
        if (document.visibilityState === 'visible') {
            this.onGameResume();
        } else {
            this.onGamePause()
        }
    }
    onGameResume() {
        const now = Date.now();
        this.elapsedTick = now;
        this.gamePause = false;
        this.running = true
    }

    onGamePause() {
        const now = Date.now();
        this.elapsedTick = now;
        this.gamePause = true;
        this.running = false
    }
    tick = () => {
        this.tickupRequest && window.cancelAnimationFrame(this.tickupRequest);
        this.tickupRequest ='';
        this.tickupRequest = requestAnimationFrame(this.tick);
        const now = Date.now();
        if (this) {
            this.onUpdate({elapsed: (now - this.elapsedTick) * 0.001});
        }
        this.elapsedTick = now;
    }

    /**
     * Adds the update event handler
     */
    addTarget(target:any) {
        let targetobj = new TweenTarget();
        targetobj.setProperties(target, this.properties);
        this.targets.push(targetobj);
        if (this.targets.length === 1) {
            this.target = this.targets[0];
            this.easeFunction = this.easeSingle;
        } else {
            this.target = null;
            this.easeFunction = this.easeMultiple;
        }
    }

    /**
     * Adds the update event handler
     */
    removeTarget(target:any) {
        let i,
            targetlength = this.targets.length;
        for (i = 0; i < targetlength; i += 1) {
            if (target === this.targets[i].object) {
                this.targets.splice(i, 1);
                i = targetlength;
            }
        }
       // document.removeEventListener("visibilitychange",this.visibilitychange);
      //
    }

    /**
     * Adds the update event handler
     */
    start() {
        this.running = true;
        this.elapsed = 0;
        //document.removeEventListener("visibilitychange",this.visibilitychange);
        //document.addEventListener("visibilitychange",this.visibilitychange.bind(this));
    }
    /**
     * Sets the target to final positions and remove the update handler
     */
    stop(jumpToEnd?:any) {
        if (this.running === true) {
            if (jumpToEnd === undefined) {
                jumpToEnd = true;
            }
            this.running = false;
            this.elapsed = this.duration;
            if (jumpToEnd === true) {
                if (this.yoyo === true) {
                    this.yoyo = false;
                    for (let target in this.targets) {
                        this.targets[target].swapProperties();
                    }
                }
                this.easeFunction();
                cancelAnimationFrame(this.tickupRequest);
                this.onCompleteFunc && this.onCompleteFunc(this);
            }
            this.dispose();
        }
    }
    /**
     *
     * @param {Object} event
     */
    onUpdate(event:any) {
        if (this.running === true) {
            this.onUpdateFunc && this.onUpdateFunc(this);
            this.elapsed += event.elapsed;
            if (this.elapsed < this.duration) {
                this.easeFunction();
            } else {
                if (this.yoyo === true) {
                    if (this.loop !== true) {
                        this.yoyo = false;
                    }
                    this.elapsed = this.duration;
                    this.easeFunction();
                    this.elapsed = 0;

                    for (let target in this.targets) {
                        this.targets[target].swapProperties();
                    }
                } else {
                    this.stop();
                }
            }
        }
    }
    /**
     * Uses the easing function on all targets
     */
    easeMultiple() {
        let current, temp;
        for (let target in this.targets) {
            current = this.targets[target];
            for (let prop in current.properties) {
                temp = current.properties[prop];
                current.object[prop] = this.easing.call(
                    Easing,
                    this.elapsed,
                    temp.start,
                    temp.change,
                    this.duration,
                    this.overshoot,
                    this.amplitude,
                    this.period
                );
            }
        }
    }
    /**
     * Uses the easing function on the target
     */
    easeSingle() {
        let temp;
        for (let prop in this.target.properties) {
            temp = this.target.properties[prop];
            this.target.object[prop] = this.easing.call(
                Easing,
                this.elapsed,
                temp.start,
                temp.change,
                this.duration,
                this.overshoot,
                this.amplitude,
                this.period
            );
        }
    }
    /**
     * Removes the onUpdate handler and listener, and disposes of the targets
     * @param {Object} event
     */
    dispose(event?:any) {
        this.running = false;
        this.target = null;
        for (let target in this.targets) {
            this.targets[target].dispose();
        }
        this.targets = null;
        this.easing = null;
        this.easeFunction = null;
        for (let prop in this.properties) {
            this.properties[prop] = null;
        }
        this.properties = null;
    }
}
