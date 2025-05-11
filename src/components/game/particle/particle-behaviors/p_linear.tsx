import { Maths2, Vector2 } from '../../../multi-scripts-use/utils';

import ParticleUtils from '../particle-utils';

import P_Base, { E_MovementState, I_ParticleProps, I_ParticleState } from './p_base';
import { MovementParams } from '../particle-components/pc_modifiers';

import '../css/particle.css';

const SPEED_RETURN_IN_AREA: number = 1;

export default class PLinear<P extends I_ParticleProps, S extends I_ParticleState> extends P_Base<P, S> {
    constructor(props: P) {
        super(props);

        console.log(props.particlesDataManager);

        this.state = {
            ...this.state,
            Action: this.Move,
        } as S;
    }

    //#region Set mode
    protected override TryReturnInArea(position: Vector2): Vector2 {
        if (ParticleUtils.HasScrolled())
            position.y = ParticleUtils.CalculatePositionYWarped(position.y);
        else
            this.SetModeReturnInArea();

        return position;
    }

    protected override SetModeReturnInArea = () => {
        this.setState({
            ...this.state,
            Action: this.ReturnInArea,
            movementState: E_MovementState.RETURN_IN_AREA,
        });
    }
    //#endregion

    //#region States
    protected override Move = (movement: MovementParams) => {
        super.Move(movement);
    }

    protected override ReturnInArea = (movement: MovementParams) => {
        let direction: Vector2 = movement.direction;

        if (!ParticleUtils.IsPositionInsideArea(movement.position)) {
            if (movement.position.x < 0)
                direction.x = 1;
            else if (movement.position.x > window.innerWidth)
                direction.x = -1;

            if (movement.position.y < ParticleUtils.GetCurrentTop())
                direction.y = 1;
            else if (movement.position.y > window.innerHeight + window.scrollY)
                direction.y = -1;

            direction = Maths2.Normalize(direction);
        }

        movement.currentSpeed = SPEED_RETURN_IN_AREA;

        if (this.props.particlesDataManager.modifiersManager.onReturnInArea)
            this.AddModifiersBeforeStateUpdate(this.props.particlesDataManager.modifiersManager.onReturnInArea, movement);

        movement.direction = direction;
        movement.targetDirection = direction;

        if (ParticleUtils.IsPositionInsideArea(movement.position))
            this.SetModeMove();
    }
    //#endregion
}