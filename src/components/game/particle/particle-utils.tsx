import React from "react";

import { Maths2, Vector2 } from "../../multi-scripts-use/utils";

interface I_ParticleUtilsProps {
    scrolled: boolean;
    mousePosition: Vector2;
    areaSize: Vector2;
}

const GAME_TOP_HEIGHT: number = 150;
const FRICTION: number = 0.975;

export default class ParticleUtils<P extends I_ParticleUtilsProps, S> extends React.Component<P, S> {
    private static Instance: ParticleUtils<any, any>;

    constructor(props: P) {
        super(props);

        ParticleUtils.Instance = this;
    }

    //#region Get value
    public static GetMousePosition(): Vector2 {
        return this.Instance.props.mousePosition;
    }

    public static GetAreaSize(): Vector2 {
        return (this.Instance.props.areaSize as Vector2);
    }

    public static GetCurrentTop(): number {
        return window.scrollY > GAME_TOP_HEIGHT ? window.scrollY : GAME_TOP_HEIGHT  - 100;
    }

    public static GetPositionFromTop(position: Vector2): Vector2 {
        return new Vector2(position.x, position.y - ParticleUtils.GetCurrentTop())
    }

    public static GetCenterArea(): Vector2 {
        return Maths2.One.Multiply2(this.Instance.props.areaSize).Divide(2).Add2(new Vector2(window.scrollX, window.scrollY));
    }

    public static GetSpeedWithFriction(speed: number, defaultSpeed: number): number {
        if (speed > defaultSpeed)
            speed *= FRICTION;
        if (speed < defaultSpeed)
            speed = defaultSpeed;

        return speed;
    }
    //#endregion

    //#region Get bools
    public static HasScrolled(): boolean {
        return this.Instance.props.scrolled;
    }

    public static IsPositionInsideArea(position: Vector2): boolean {
        return position.x > 0 &&
            position.x < window.innerWidth &&
            position.y > this.GetCurrentTop() &&
            position.y < window.innerHeight + window.scrollY;
    }
    //#endregion

    //#region Vector to vector
    public static DirectionToCenterArea(position: Vector2): Vector2 {
        return Maths2.Normalize(this.GetCenterArea().Substract2(position));
    }

    public static MouseToPosition(position: Vector2): Vector2 {
        return Maths2.Copy(position).Substract2(Maths2.Copy(this.Instance.props.mousePosition).Add2(new Vector2(0, window.scrollY)));
    }

    public static MouseToPositionNormalized(position: Vector2): Vector2 {
        return Maths2.Normalize(this.MouseToPosition(position));
    }

    public static MouseToPositionMagnitude(position: Vector2): number {
        return Maths2.Magnitude(this.MouseToPosition(position));
    }

    public static DirectionToMouse(position: Vector2): Vector2 {
        return this.MouseToPositionNormalized(position).Multiply(-1);
    }
    //#endregion

    //#region Calculate
    public static CalculatePositionYWarped(currentPositionY: number): number {
        let currentTop: number = this.GetCurrentTop();

        if (currentPositionY < currentTop)
            return (currentPositionY - currentTop) + window.innerHeight + currentTop;
        else if (currentPositionY > currentTop + window.innerHeight)
            return currentPositionY - (window.innerHeight + currentTop) + currentTop;

        return currentPositionY;
    }

    public static CalculatePositionXWarped(currentPositionX: number): number {
        if (currentPositionX < 0)
            return window.innerWidth;
        else if (currentPositionX > window.innerWidth)
            return 0;

        return currentPositionX;
    }

    public static CalculateNextPosition(position: Vector2, direction: Vector2, speed: number): Vector2 {
        return Maths2.Copy(position).Add2(Maths2.Copy(direction).Multiply(speed));
    }
    //#endregion

    render() {
        return null
    }
}