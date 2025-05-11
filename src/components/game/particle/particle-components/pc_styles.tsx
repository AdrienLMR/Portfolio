import Utils, { Lists, Maths, Maths2, Maths3, Vector3 } from "../../../multi-scripts-use/utils";
import ParticleUtils from "../particle-utils";
import ParticleComponents from "./particle-components";

import { MovementParams } from "./pc_modifiers";

export class StyleParams {
    public rotation: number = 0;
    public rotateClockwiseSpeed: number = 0;
    public color: string = "";
    public hueColor: number = 0;

    constructor(rotation: number, hueColor: number, rotateClockwise?: number) {
        this.rotation = rotation;
        this.hueColor = hueColor;

        if (rotateClockwise)
            this.rotateClockwiseSpeed = rotateClockwise;
    }

    static get Null() {
        return new StyleParams(0, 0);
    }
}

export default abstract class PCStyles extends ParticleComponents {
    public Start(style: StyleParams, movement: MovementParams) { }

    public Update(style: StyleParams, movement: MovementParams) { }

    // public SetMove(style: StyleParams, movement: MovementParams) { }

    // public SetReturnInArea(style: StyleParams, movement: MovementParams) { }

    public SetMouseDown(style: StyleParams, movement: MovementParams) { }

    public SetMouseUp(style: StyleParams, movement: MovementParams) { }

    public End(css: React.CSSProperties, style: StyleParams, movement: MovementParams) { }
}

//#region Colors
export class PCStyle_Colors extends PCStyles {
    public hueColors: number[];

    constructor(hueColors?: number[]) {
        super();

        this.hueColors = hueColors ? hueColors : [];
    }

    protected GetCssHueRotate(hueColor: number): string {
        return "hue-rotate(" + hueColor + "deg)";
    }
}

export class PCStyle_RandomColorAtSpawn extends PCStyle_Colors {
    public override Start(style: StyleParams, movement: MovementParams) {
        style.hueColor = Lists.RandomInList(this.hueColors);
    }

    public override End(css: React.CSSProperties, style: StyleParams, movement: MovementParams) {
        css.WebkitFilter = this.GetCssHueRotate(style.hueColor);;
        css.filter = css.WebkitFilter;
    }
}

export class PCStyle_ColorByDirection extends PCStyle_Colors {
    public override End(css: React.CSSProperties, style: StyleParams, movement: MovementParams) {
        const cssString: string =
            this.GetCssHueRotate(Math.round(Maths.Lerp(this.hueColors[1], this.hueColors[0], Maths.Alpha(-1, 1, movement.direction.y))));

        css.WebkitFilter = cssString;
        css.filter = cssString;
    }

    protected override GetCssHueRotate(hueColor: number): string {
        return "hue-rotate(0deg) brightness(" + (100 - (hueColor - 50)) + "%)";
    }
}

export class PCStyle_ColorRainbow extends PCStyle_Colors {
    private unitedColors: boolean;

    constructor(unitedColors: boolean) {
        super();

        this.unitedColors = unitedColors;
    }

    public override Start(style: StyleParams, movement: MovementParams) {
        if (!this.unitedColors)
            style.hueColor = Maths.GetRandomRound(360);
    }

    public override Update(style: StyleParams, movement: MovementParams) {
        style.hueColor = (style.hueColor + 0.25) % 360;
    }

    public override End(css: React.CSSProperties, style: StyleParams, movement: MovementParams) {
        css.WebkitFilter = this.GetCssHueRotate(style.hueColor);
        css.filter = css.WebkitFilter;
    }
}
//#endregion

//#region Rotation
export class PCStyle_Rotation extends PCStyles {
    public override End(css: React.CSSProperties, style: StyleParams, movement: MovementParams) {
        css.transform = `rotate(${style.rotation}deg)`;
    }
}

export class PCStyle_RandomRotationAtSpawn extends PCStyle_Rotation {
    public override Start(style: StyleParams, movement: MovementParams) {
        style.rotation = Maths2.DirectionToRotationDegree(movement.direction);
    }

    public override End(css: React.CSSProperties, style: StyleParams, movement: MovementParams) {
        css.transform = `rotate(${style.rotation}deg)`;
    }
}

export class PCStyle_UnitedInfiniteRotation extends PCStyle_Rotation {
    private rotateClockwiseSpeed: number = 0;

    constructor(rotateClockwiseSpeed: number) {
        super();
        this.rotateClockwiseSpeed = rotateClockwiseSpeed;

        if (rotateClockwiseSpeed)
            this.rotateClockwiseSpeed = Math.round(Math.random()) == 0 ?
                rotateClockwiseSpeed : rotateClockwiseSpeed * - 1;
    }

    public override Start(style: StyleParams, movement: MovementParams) {
        style.rotation = Maths.GetRandomRound(360);
    }

    public override Update(style: StyleParams, movement: MovementParams): void {
        style.rotation += this.rotateClockwiseSpeed;
    }
}

export class PCStyle_NotUnitedInfiniteRotation extends PCStyle_Rotation {
    private rotateClockwiseSpeed: number = 0;

    constructor(rotateClockwiseSpeed: number) {
        super();
        this.rotateClockwiseSpeed = rotateClockwiseSpeed;
    }

    public override Start(style: StyleParams, movement: MovementParams) {
        style.rotation = Maths.GetRandomRound(360);

        if (this.rotateClockwiseSpeed)
            style.rotateClockwiseSpeed = Math.round(Math.random()) == 0 ?
                this.rotateClockwiseSpeed : this.rotateClockwiseSpeed * - 1;
    }

    public override Update(style: StyleParams, movement: MovementParams): void {
        style.rotation += style.rotateClockwiseSpeed;
    }
}

export class PCStyle_RotationFromMovement extends PCStyle_Rotation {
    public override End(css: React.CSSProperties, style: StyleParams, movement: MovementParams) {
        css.transform = `rotate(${Maths2.DirectionToRotationDegree(movement.direction)}deg)`;
    }
}

export class PCStyle_MouseUp_RandomRotationNear extends PCStyle_Rotation {
    public SetMouseUp(style: StyleParams, movement: MovementParams): void {
        style.rotation = Maths.GetRandomRound(360);
    }
}
//#endregion