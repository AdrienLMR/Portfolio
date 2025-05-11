import { Maths2 } from "../../../multi-scripts-use/utils";

import { ParticleSettings } from "../particle-type-management";

export default abstract class ParticleComponents {
    protected particleSettings: ParticleSettings = {
        nParticles: 0,
        mouseAreaMinMax: Maths2.Zero,
        speedMinMax: Maths2.Zero,
        sprites: [],
        size: Maths2.Zero,
    };

    public SetParticleSettings(particleSettings: ParticleSettings) {
        this.particleSettings = particleSettings;
    }
}