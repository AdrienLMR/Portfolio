import { Maths, Maths2, Vector2 } from '../../../multi-scripts-use/utils';

import ParticleUtils from '../particle-utils';

import { E_ParticleBehavior, I_ParticleProps, I_ParticleState } from './p_base';
import P_Random, { P_RandomSettings } from './p_random';
import { MovementParams } from '../particle-components/pc_modifiers';

import '../css/particle.css';

export class P_RandomDirectionalSettings extends P_RandomSettings {
    public randomAngleClamped: Vector2;

    constructor(
        behavior: E_ParticleBehavior,
        maxAngleNewDirection: number,
        maxAngleNewTargetDirectionFromCurrentDirection: number,
        randomAngleClamped: Vector2) {
        super(behavior, maxAngleNewDirection, maxAngleNewTargetDirectionFromCurrentDirection);

        this.randomAngleClamped = randomAngleClamped;
    }
}

export default class PRandomDirectional<P extends I_ParticleProps, S extends I_ParticleState> extends P_Random<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            ...this.state,
            Action: this.Move,
        } as S;
    }

    protected override GetStartRandomDirection(props: P): Vector2 {
        const randomAngleClamped: number = Maths.Clamp2((props.particlesDataManager.behaviorSettings as P_RandomDirectionalSettings).randomAngleClamped, Math.random() * 2 * Math.PI);
        
        return new Vector2(Math.cos(randomAngleClamped), Math.sin(randomAngleClamped))
    }

    //#region States
    protected override Move = (movement: MovementParams) => {
        const randomDirectionalSettings:P_RandomDirectionalSettings = this.props.particlesDataManager.behaviorSettings as P_RandomDirectionalSettings;
        
        let targetDirection: Vector2 = movement.targetDirection;

        if (movement.direction === targetDirection) {
            const currentAngle: number = Math.atan2(movement.direction.y, movement.direction.x);
            let targetAngle = currentAngle + ((Math.random() * 2) - 1) * randomDirectionalSettings.maxAngleNewTargetDirectionFromCurrentDirection;

            targetAngle = Maths.Clamp2(randomDirectionalSettings.randomAngleClamped, targetAngle);

            movement.targetDirection = new Vector2(Math.cos(targetAngle), Math.sin(targetAngle));
        }

        movement.direction = Maths2.MoveTowards(movement.direction, targetDirection, randomDirectionalSettings.maxAngleNewDirection);

        super.Move(movement);
    }
    //#endregion

    protected override TryReturnInArea(position: Vector2): Vector2 {
        position.y = ParticleUtils.CalculatePositionYWarped(position.y);
        position.x = ParticleUtils.CalculatePositionXWarped(position.x);

        return position;
    }
}