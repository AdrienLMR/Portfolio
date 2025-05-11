import { Maths, Maths2, Vector2 } from "../../../multi-scripts-use/utils";

import ParticleUtils from "../particle-utils";
import ParticleComponents from "./particle-components";

export class MovementParams {
    public direction: Vector2 = Maths2.Zero;
    public targetDirection: Vector2 = Maths2.Zero;
    public position: Vector2 = Maths2.Zero;
    public currentSpeed: number = 0;
    public defaultSpeed: number = 0;

    constructor(position: Vector2, direction: Vector2, targetDirection: Vector2, currentSpeed: number, defaultSpeed: number) {
        this.position = position;
        this.targetDirection = targetDirection;
        this.direction = direction;
        this.currentSpeed = currentSpeed;
        this.defaultSpeed = defaultSpeed;
    }

    static get Null() {
        return new MovementParams(Maths2.Zero, Maths2.Zero, Maths2.Zero, 0, 0);
    }
}

export default class PCModifiers extends ParticleComponents {
    public Modify(movement: MovementParams) { }
}

export enum E_Modifier {
    PositionOutsideMouseArea,
    DirectionOnNearMouse,
    SpeedOnNearMouse,
    ReverseSpeedOnNearMouse,
    SpeedStopOnTopOfMouse,
    BounceOnNear,
}

export class PCModifiers_PositionOutsideMouseArea extends PCModifiers {
    public override Modify(movement: MovementParams) {
        let mouseToParticle: Vector2 = ParticleUtils.MouseToPosition(movement.position);

        if (Maths2.Magnitude(mouseToParticle) < this.particleSettings.mouseAreaMinMax.x) {
            movement.position = Maths2.UnclampMagnitude(mouseToParticle, this.particleSettings.mouseAreaMinMax.x)
                .Add2(Maths2.Copy(ParticleUtils.GetMousePosition()).Add2(new Vector2(0, window.scrollY)));
        }
    }
}

export class PCModifiers_DirectionOnNearMouse extends PCModifiers {
    public override Modify(movement: MovementParams) {
        let mouseToParticle: Vector2 = ParticleUtils.MouseToPosition(movement.position);

        if (Maths.Alpha2(this.particleSettings.mouseAreaMinMax, Maths2.Magnitude(mouseToParticle)) <= 0.1) {
            movement.direction = Maths2.Normalize(mouseToParticle);
            movement.targetDirection = movement.direction;
        }
    }
}

export class PCModifiers_SpeedOnNearMouse extends PCModifiers {
    public override Modify(movement: MovementParams) {
        const mouseToParticle: Vector2 = ParticleUtils.MouseToPosition(movement.position);
        const mouseToParticleMagnitude: number = Maths2.Magnitude(mouseToParticle);

        if (mouseToParticleMagnitude < this.particleSettings.mouseAreaMinMax.y) {
            const speed0To1FromDot: number = (Maths2.Dot(movement.direction, Maths2.Normalize(mouseToParticle)) + 1) / 2;

            movement.currentSpeed = Maths.Lerp(
                this.GetRightSpeedFromAlpha(movement.defaultSpeed, speed0To1FromDot),
                movement.currentSpeed,
                Maths.Alpha2(this.particleSettings.mouseAreaMinMax, mouseToParticleMagnitude));
        }
    }

    protected GetRightSpeedFromAlpha(defaultSpeed: number, speed0To1FromDot: number): number {
        return speed0To1FromDot;
    }
}

export class PCModifiers_ReverseSpeedOnNearMouse extends PCModifiers_SpeedOnNearMouse {
    protected override GetRightSpeedFromAlpha(defaultSpeed: number, speed0To1FromDot: number): number {
        return (1 - speed0To1FromDot) + defaultSpeed;
    }
}

export class PCModifiers_SpeedStopOnTopOfMouse extends PCModifiers {
    public override Modify(movement: MovementParams) {
        if (ParticleUtils.GetMousePosition().y > movement.position.y &&
            ParticleUtils.MouseToPositionMagnitude(movement.position) < this.particleSettings.mouseAreaMinMax.x + 1) {
            movement.currentSpeed = 0;
        }
    }
}

export class PCModifiers_BounceOnNear extends PCModifiers {
    public override Modify(movement: MovementParams) {
        const mouseToParticle: Vector2 = ParticleUtils.MouseToPosition(movement.position);
        const mouseToParticleMagnitude: number = Maths2.Magnitude(mouseToParticle);

        if (mouseToParticleMagnitude <= this.particleSettings.mouseAreaMinMax.x)
        {
            movement.currentSpeed *= 2;
            movement.direction = Maths2.Normalize(mouseToParticle);
        }
    }
}