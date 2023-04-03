import MathAdv from "./math";
import { TIMER } from "../../utills/timer";
import { TweenTarget } from "./tween-target";
import Easing from "./easing";

export class PathTween {
    public pathFunction: any
    public easing: any
    public closed: any
    public xPoints: any
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
    public targets: any
    private tickupRequest: any;
    private gamePause: boolean;
    private onUpdateFunc: any;
    private onCompleteFunc: any;

    constructor(
        target: any,
        path: any,
        duration: any,
        pathFunction: any,
        easingfunc: any,
        startDelay: any = null,
        closed: any = true,
        followRotation: any = true,
        onUpdate: any = () => { },
        onComplete: any = () => { },
        
    ) {
        this.gamePause = false;
        this.onUpdateFunc = onUpdate;
        this.onCompleteFunc = onComplete;
        var i,
            target,
            pathTween = this,
            instantPath = [];
        //catmullRom
        //bezier
        //linear
        if (typeof pathFunction === "string") {
            // @ts-ignore
            this.pathFunction = MathAdv[pathFunction + "Interpolation"];
        } else if (typeof pathFunction === "function") {
            this.pathFunction = pathFunction;
        }
        if (typeof easingfunc === "string") {
            // @ts-ignore
            this.easing = Easing[easingfunc];
        } else if (typeof easingfunc === "function") {
            this.easing = easingfunc;
        }

        if (this.easing === undefined) {
            console.error("unrecognized easing function");
            // @ts-ignore
            return null;
        }
        this.closed = closed;

        if (this.closed === true) {
            path.push(path[0]);
        }

        this.xPoints = [];
        this.yPoints = [];

        for (i = 0; i < path.length; i += 1) {
            this.xPoints.push(path[i].x);
            this.yPoints.push(path[i].y);
        }

        this.easeFunction = this.ease;
        this.duration = duration;
        this.followRotation = followRotation;
        this.lastPoint = path[0];

        this.elapsed = 0;
        this.elapsedTick = Date.now();

        this.target = new TweenTarget();
        this.target.setProperties(target);
        this.path = path;

        this.running = false;
        if (startDelay === null || startDelay === undefined) {
            this.start();
        } else if (startDelay === -1) {
            this.target.object = { x: path[0].x, y: path[0].y };
            this.elapsed = -1;
            this.running = true;
            for (i = 0; i < this.duration; i += 1) {
                this.elapsed += 1;
                this.onUpdate({ elapsed: 0 });
                if (this.running === true) {
                    instantPath.push({
                        x: this.target.object.x,
                        y: this.target.object.y
                    });
                }
            }
            // @ts-ignore
            return instantPath;
        } else {
            let timer = TIMER.TimerManager.createTimer(startDelay)
            timer.on('end', (e: any) => {
                e.remove();
                pathTween.start();
            })
            timer.start();
        }
      //  document.removeEventListener("visibilitychange",this.visibilitychange.bind(this));
      //  document.addEventListener("visibilitychange",this.visibilitychange.bind(this));
        // document.addEventListener("visibilitychange", () => {
        //     if (document.visibilityState === 'visible') {
        //         this.onGameResume();
        //     } else {
        //         this.onGamePause()
        //     }
        // });
        cancelAnimationFrame(this.tickupRequest);
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
            this.onUpdate({ elapsed: (now - this.elapsedTick) * 0.001 });
        }
        this.elapsedTick = now;
    }

    /**
     * Adds the update event handler
     * starts the tween
     */
    start() {
        this.running = true;
        this.elapsed = 0;
    }

    /**
     * Sets the target to final positions and remove the update handler
     */
    stop() {
        if (this.running === true) {
            this.running = false;
            cancelAnimationFrame(this.tickupRequest);
            this.elapsed = this.duration;
            this.ease();
            this.dispose();
            this.onCompleteFunc && this.onCompleteFunc(this);
        }
    }

    call(event: any) {

    }

    /**
     *
     * @param {Object} event
     */
    onUpdate(event: any) {
        if (this.running === true) {
            this.onUpdateFunc && this.onUpdateFunc(this);
            this.elapsed += event.elapsed;
            if (this.elapsed < this.duration) {
                this.ease();
            } else {
                if (this.closed === true) {
                    this.elapsed = 0;
                    this.ease();
                } else {
                    this.stop();
                }
            }
        }
    }

    /**
     * Uses the easing function to get a normalized value to pas to the path function
     *
     */
    ease() {

        let time = this.easing(this.elapsed, 0, 1, this.duration);
        this.target.object.x = this.pathFunction.call(MathAdv, this.xPoints, time);
        this.target.object.y = this.pathFunction.call(MathAdv, this.yPoints, time);
        if (this.followRotation === true) {
            this.target.object.rotation = MathAdv.angleBetweenPoints(
                this.target.object,
                this.lastPoint
            );
            this.lastPoint = { x: this.target.object.x, y: this.target.object.y };
        }
    }

    /**
     * Removes the onUpdate handler and listener, and disposes of the targets
     * @param {Object} event
     */
    dispose(event?: any) {
        if (this.running === true) {
            cancelAnimationFrame(this.tickupRequest);
            this.running = false;
        }

        this.target = null;
        cancelAnimationFrame(this.tickupRequest);
        for (let target in this.targets) {
            this.targets[target].dispose();
        }
        this.targets = null;
    }
}