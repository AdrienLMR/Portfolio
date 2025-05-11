import P_Base, { BehaviorSettings, E_ParticleBehavior, I_ParticleProps, I_ParticleState } from './p_base';

import '../css/particle.css';

export class P_RandomSettings extends BehaviorSettings {
    public maxAngleNewDirection: number;
    public maxAngleNewTargetDirectionFromCurrentDirection: number;

    constructor(
        behavior: E_ParticleBehavior,
        maxAngleNewDirection: number,
        maxAngleNewTargetDirectionFromCurrentDirection: number,
    ) {
        super(behavior);

        this.maxAngleNewDirection = maxAngleNewDirection;
        this.maxAngleNewTargetDirectionFromCurrentDirection = maxAngleNewTargetDirectionFromCurrentDirection;
    }
}

export default abstract class P_Random<P extends I_ParticleProps, S extends I_ParticleState> extends P_Base<P, S> { }