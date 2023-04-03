import * as particles from "pixi-particles"
import {Container} from "pixi.js";
import {AnimatedParticle} from "pixi-particles";

export class BaseAnimatedparticle extends particles.Emitter {
    public tickupRequest: any;
    public elapsedTick: any;

    constructor(particleParent: Container, particleImages: any, config: any) {
        super(particleParent, particleImages, config)
        this.particleConstructor = AnimatedParticle;
        this.elapsedTick = Date.now();
        this.tick();

    }

    tick = () => {
        this.tickupRequest && window.cancelAnimationFrame(this.tickupRequest);
        this.tickupRequest ='';
        this.tickupRequest = requestAnimationFrame(this.tick);       
        const now = Date.now();
        if (this) {
            this.update((now - this.elapsedTick) * 0.001);
        }
        this.elapsedTick = now;
    }
}