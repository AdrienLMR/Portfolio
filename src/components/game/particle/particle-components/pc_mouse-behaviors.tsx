import ParticleUtils from "../particle-utils";

import { Maths, Maths2, Vector2 } from "../../../multi-scripts-use/utils";

import { E_MovementState } from "../particle-behaviors/p_base";
import { MovementParams } from "./pc_modifiers";
import ParticleComponents from "./particle-components";

const MAX_REPEL_ANGLE: number = 0.1;

const PROPORTION_VORTEX_COS_SIN: Vector2 = new Vector2(0.8, 0.2);

export default abstract class PCMouseBehaviors extends ParticleComponents {
    public PS_OnSetMode() { }

    public P_OnSetMode(movement: MovementParams) { }

    public P_Action(movement: MovementParams): E_MovementState {
        return E_MovementState.VOID;
    }
}

//#region Down
export abstract class PCMouseBehaviors_Down extends PCMouseBehaviors { }

export abstract class PCMouseBehaviors_Down_Attract extends PCMouseBehaviors_Down {
    protected speed: number;

    constructor(speedMinMax: Vector2) {
        super();

        this.speed = Maths.GetRandomBetweenMinMax2(speedMinMax);
    }
}

export class PCMouseBehaviors_Down_AttractAll extends PCMouseBehaviors_Down_Attract {
    public override P_OnSetMode(movement: MovementParams) {
        movement.currentSpeed = this.speed;
    }

    public override P_Action(movement: MovementParams): E_MovementState {
        movement.direction = ParticleUtils.DirectionToMouse(movement.position);
        movement.targetDirection = movement.direction;

        return E_MovementState.ATTRACTED;
    }
}

export class PCMouseBehaviors_Down_VortexAll extends PCMouseBehaviors_Down_Attract {
    public P_OnSetMode(movement: MovementParams) {
        movement.currentSpeed = this.speed;
    }

    public P_Action(movement: MovementParams): E_MovementState {
        const vortexSin = ParticleUtils.DirectionToMouse(movement.position);
        const vortexCos = new Vector2(-vortexSin.y, vortexSin.x);

        movement.direction = Maths2.Lerp(vortexSin, vortexCos, PROPORTION_VORTEX_COS_SIN.x);
        movement.targetDirection = movement.direction;

        return E_MovementState.VOID;
    }
}
//#endregion

//#region Up
export abstract class PCMouseBehaviors_Up extends PCMouseBehaviors {
    public SetFriction(movement: MovementParams): E_MovementState {
        movement.currentSpeed = ParticleUtils.GetSpeedWithFriction(movement.currentSpeed, movement.defaultSpeed);

        return movement.currentSpeed === movement.defaultSpeed ? E_MovementState.MOVE : E_MovementState.VOID;
    }
}

export abstract class PCMouseBehaviors_Up_Repel extends PCMouseBehaviors_Up {
    protected repelSpeedMinMax: Vector2;

    constructor(repelSpeedMinMax: Vector2) {
        super();

        this.repelSpeedMinMax = repelSpeedMinMax;
    }

    protected GetExpulsedDirectionWithRandomizedOffset(position: Vector2): Vector2 {
        let currentExpulseDirection: Vector2 = ParticleUtils.MouseToPositionNormalized(position);
        let nextAngle: number = (Math.random() * 2 - 1) * MAX_REPEL_ANGLE + Math.atan2(currentExpulseDirection.y, currentExpulseDirection.x);

        return new Vector2(Math.cos(nextAngle), Math.sin(nextAngle));
    }

    public override P_Action(movement: MovementParams): E_MovementState {
        return this.SetFriction(movement);
    }
}

export class PCMouseBehaviors_Up_RepelAll extends PCMouseBehaviors_Up_Repel {
    public override P_OnSetMode(movement: MovementParams) {
        movement.direction = this.GetExpulsedDirectionWithRandomizedOffset(movement.position);
        movement.targetDirection = movement.direction;
        movement.currentSpeed = Maths.GetRandomBetweenMinMax2(this.repelSpeedMinMax);
    }
}

export class PCMouseBehaviors_Up_RepelAllFromDistance extends PCMouseBehaviors_Up_Repel {
    public override P_OnSetMode(movement: MovementParams) {
        movement.direction = this.GetExpulsedDirectionWithRandomizedOffset(movement.position);
        movement.targetDirection = movement.direction;
        movement.currentSpeed =
            Maths.Lerp2(this.repelSpeedMinMax,
                Maths.Alpha2(this.particleSettings.mouseAreaMinMax,
                    Maths.Clamp2(this.particleSettings.mouseAreaMinMax,
                        ParticleUtils.MouseToPositionMagnitude(movement.position))));
    }
}

export class PCMouseBehaviors_Up_RepelNear extends PCMouseBehaviors_Up_RepelAll {
    public override P_OnSetMode(movement: MovementParams) {
        if (ParticleUtils.MouseToPositionMagnitude(movement.position) <= this.particleSettings.mouseAreaMinMax.y) {
            movement.currentSpeed = Maths.GetRandomBetweenMinMax2(this.repelSpeedMinMax);
            super.P_OnSetMode(movement);
        }
    }
}
//#endregion