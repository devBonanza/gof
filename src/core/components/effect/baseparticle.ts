import * as particles from "pixi-particles"
import {Container} from "pixi.js";
import {EmitterConfig, OldEmitterConfig} from "pixi-particles";

export class Baseparticle extends particles.Emitter {
    private tickupRequest: any;
    private elapsed: any;

    constructor(particleParent: Container, particleImages: any, config: EmitterConfig | OldEmitterConfig, anim: any) {
        super(particleParent, particleImages, config)
        this.elapsed = Date.now();
        this.tick();
    }

    tick = () => {
        this.tickupRequest && window.cancelAnimationFrame(this.tickupRequest);
        this.tickupRequest ='';
        this.tickupRequest = requestAnimationFrame(this.tick);
        const now = Date.now();
        if (this) {
            this.update((now - this.elapsed) * 0.001);
        }
        this.elapsed = now;
    }
}