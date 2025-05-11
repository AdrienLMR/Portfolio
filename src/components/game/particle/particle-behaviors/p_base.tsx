import React from "react";

import { PORTFOLIO_URL } from "../../../..";

import { Lists, Maths2, Vector2 } from "../../../multi-scripts-use/utils";

import ParticleUtils from "../particle-utils";

import PCModifiers, { MovementParams } from "../particle-components/pc_modifiers";
import { StyleParams } from "../particle-components/pc_styles";
import { ParticlesDataManager } from "../particle-type-management";

export class BehaviorSettings {
    public behavior: E_ParticleBehavior;

    constructor(
        behavior: E_ParticleBehavior) {
        this.behavior = behavior;
    }
}

export enum E_ParticleBehavior {
    RandomMovement,
    Fall,
    Amber,
    Linear,
}

export interface I_ParticleProps {
    particlesDataManager: ParticlesDataManager;
}

export interface I_ParticleState {
    Action: (movement: MovementParams) => void;
    movementState: E_MovementState;
    movement: MovementParams;
    style: StyleParams;
    sprite: string;
    size: Vector2;
}

export enum E_MovementState {
    VOID,
    MOVE,
    RETURN_IN_AREA,
    ATTRACTED,
    REPELLED,
}

export default abstract class P_Base<P extends I_ParticleProps, S extends I_ParticleState> extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        const movementParams: MovementParams = this.GetStartRandomMovement(props);

        const styleParams: StyleParams = StyleParams.Null;

        if (props.particlesDataManager.stylesManager.styles) {
            props.particlesDataManager.stylesManager.styles.forEach(style => {
                style.Start(styleParams, movementParams);
            })
        }

        this.state = {
            ...this.state,
            movement: movementParams,
            style: styleParams,
            size: props.particlesDataManager.particleSettings.size,
            sprite: Lists.RandomInList(props.particlesDataManager.particleSettings.sprites),
            movementState: E_MovementState.MOVE,
        } as S;
    }

    //#region Start
    protected GetStartRandomMovement(props: P): MovementParams {
        const positionFromTop: Vector2 = new Vector2(0, ParticleUtils.GetCurrentTop());

        const speed: number = Math.random() *
            (props.particlesDataManager.particleSettings.speedMinMax.y - props.particlesDataManager.particleSettings.speedMinMax.x) +
            props.particlesDataManager.particleSettings.speedMinMax.x;
            
        const position = new Vector2(Math.random(), Math.random())
        .Multiply2(Maths2.Copy(ParticleUtils.GetAreaSize()).Substract2(positionFromTop))
        .Add2(positionFromTop);

        const direction = this.GetStartRandomDirection(props);

        return new MovementParams(position, direction, direction, speed, speed);
    }

    protected GetStartRandomDirection(props: P): Vector2 {
        return Maths2.Normalize(new Vector2(Math.random(), Math.random()).Multiply(2).Substract(1));
    }
    //#endregion

    //#region Update
    public Update() {
        this._Update();
    }

    private _Update() {
        let movement: MovementParams = this.state.movement;

        this.state.Action(movement);

        movement.position = ParticleUtils.CalculateNextPosition(this.state.movement.position, movement.direction, movement.currentSpeed);

        let style: StyleParams = this.state.style;

        if (this.props.particlesDataManager.stylesManager.styles) {
            this.props.particlesDataManager.stylesManager.styles.forEach((componentStyle) => {
                componentStyle.Update(style, movement);
            })
        }

        this.setState({
            movement: movement,
            style: style,
        });
    }
    //#endregion

    //#region Set mode
    protected SetModeMove = () => {
        // if (this.props.styles) {
        //     this.props.styles.forEach((style) => {
        //         style.SetMove(this.state.style, this.state.movement);
        //     })
        // }

        this.setState({
            Action: this.Move,
            movementState: E_MovementState.MOVE,
        });
    }

    protected SetModeReturnInArea = () => { }

    public SetModeMouseDown = () => {
        this.props.particlesDataManager.mouseBehaviorsManager.onMouseDown?.P_OnSetMode(this.state.movement);

        if (this.props.particlesDataManager.stylesManager.styles) {
            this.props.particlesDataManager.stylesManager.styles.forEach((style) => {
                style.SetMouseDown(this.state.style, this.state.movement);
            })
        }

        this.setState({
            ...this.state,
            Action: this.MouseDown,
            movementState: E_MovementState.ATTRACTED,
            style: this.state.style,
        });
    }

    public SetModeMouseUp = () => {
        this.props.particlesDataManager.mouseBehaviorsManager.onMouseUp?.P_OnSetMode(this.state.movement);

        if (this.props.particlesDataManager.stylesManager.styles) {
            this.props.particlesDataManager.stylesManager.styles.forEach((style) => {
                style.SetMouseUp(this.state.style, this.state.movement);
            })
        }

        this.setState({
            ...this.state,
            Action: this.MouseUp,
            movementState: E_MovementState.REPELLED,
        });
    }

    public TrySetMode(movementState: E_MovementState) {
        switch (movementState) {
            case this.state.movementState:
            case E_MovementState.VOID:
                return;
            case E_MovementState.MOVE:
                this.SetModeMove();
                break;
            case E_MovementState.RETURN_IN_AREA:
                this.SetModeReturnInArea();
                break;
            case E_MovementState.ATTRACTED:
                this.SetModeMouseDown();
                break;
            case E_MovementState.REPELLED:
                this.SetModeMouseUp();
                break;
        }
    }

    protected TryReturnInArea(position: Vector2) { }
    //#endregion

    //#region States
    protected Move(movement: MovementParams) {
        movement.currentSpeed = ParticleUtils.GetSpeedWithFriction(movement.currentSpeed, movement.defaultSpeed);

        if (this.props.particlesDataManager.modifiersManager.onMove)
            this.AddModifiersBeforeStateUpdate(this.props.particlesDataManager.modifiersManager.onMove, movement);

        if (!(ParticleUtils.MouseToPositionMagnitude(movement.position) <= this.props.particlesDataManager.particleSettings.mouseAreaMinMax.y) &&
            !ParticleUtils.IsPositionInsideArea(movement.position))
            this.TryReturnInArea(movement.position);
    }

    protected ReturnInArea(movement: MovementParams) { }

    protected MouseDown = (movement: MovementParams) => {
        if (this.props.particlesDataManager.mouseBehaviorsManager.onMouseDown)
            this.TrySetMode(this.props.particlesDataManager.mouseBehaviorsManager.onMouseDown.P_Action(movement));

        if (this.props.particlesDataManager.modifiersManager.onMouseDown)
            this.AddModifiersBeforeStateUpdate(this.props.particlesDataManager.modifiersManager.onMouseDown, movement);
    }

    protected MouseUp = (movement: MovementParams) => {
        if (this.props.particlesDataManager.mouseBehaviorsManager.onMouseUp)
            this.TrySetMode(this.props.particlesDataManager.mouseBehaviorsManager.onMouseUp.P_Action(movement));

        if (this.props.particlesDataManager.modifiersManager.onMouseUp)
            this.AddModifiersBeforeStateUpdate(this.props.particlesDataManager.modifiersManager.onMouseUp, movement);
    }
    //#endregion

    //#region Modifiers
    protected AddModifiersBeforeStateUpdate(modifiers: PCModifiers[], callBack: MovementParams): MovementParams {
        modifiers.forEach((modifier) => {
            modifier.Modify(callBack);
        })

        return callBack;
    }
    //#endregion

    //#region Styles
    protected GetStyle = (): React.CSSProperties | undefined => {
        let css: React.CSSProperties = {
            left: `${this.state.movement.position.x - this.state.size.x / 2}px`,
            top: `${this.state.movement.position.y - this.state.size.y / 2}px`,
            width: `${this.state.size.x}px`,
            height: `${this.state.size.y}px`,
        }

        if (this.props.particlesDataManager.stylesManager.styles) {
            this.props.particlesDataManager.stylesManager.styles.forEach((style) => {
                style.End(css, this.state.style, this.state.movement);
            })
        }

        return css;
    }
    //#endregion

    render() {
        return (
            <img className="particle" src={PORTFOLIO_URL + "games/_particles/" + this.state.sprite + ".png"} alt="Particle" style={this.GetStyle()} />
        )
    }
}