export default class Utils {
    public static GetRandomHueColor(): Vector3 {
        return new Vector3(Maths.GetRandomRound(360), Maths.GetRandomRound(100), Maths.GetRandomRound(100));
    }
}

export class Lists {
    public static RandomInList<T>(list: T[]): T {
        return list[Math.floor(Math.random() * list.length)];
    }
}

export class Maths {
    //#region Basics
    public static Lerp(a: number, b: number, alpha: number): number {
        return (b - a) * alpha + a;
    }

    public static Alpha(min: number, max: number, value: number): number {
        return (value - min) / (max - min);
    }

    public static Clamp(min: number, max: number, value: number): number {
        return Math.min(Math.max(value, min), max);
    }
    //#endregion

    //#region Basics with Vector2
    public static Lerp2(ab: Vector2, alpha: number): number {
        return (ab.y - ab.x) * alpha + ab.x;
    }

    public static Alpha2(minMax: Vector2, value: number): number {
        return (value - minMax.x) / (minMax.y - minMax.x);
    }

    public static Clamp2(minMax: Vector2, value: number): number {
        return Math.min(Math.max(value, minMax.x), minMax.y);
    }
    //#endregion

    //#region Random
    public static GetRandomRound(number: number): number {
        return Math.round(Math.random() * number);
    }

    // public static GetRandomBetweenMinMax(min:number, max:number): number{
    //     return Math.random() * (max - min) + min;
    // }

    public static GetRandomBetweenMinMax2(minMax: Vector2): number {
        return Math.random() * (minMax.y - minMax.x) + minMax.x;
    }
    //#endregion
}

export class Vector2 {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    //#region Operators to number
    /**
    * Caution !!!
    * 
    * This function modifies the base vector (not a).
    * 
    * For optimisations.
    */
    public Add(a: number): Vector2 {
        this.x += a;
        this.y += a;
        return this;
    }

    /**
    * Caution !!!
    * 
    * This function modifies the base vector (not a).
    * 
    * For optimisations.
    */
    public Substract(a: number): Vector2 {
        this.x -= a;
        this.y -= a;
        return this;
    }

    /**
    * Caution !!!
    * 
    * This function modifies the base vector (not a).
    * 
    * For optimisations.
    */
    public Multiply(a: number): Vector2 {
        this.x *= a;
        this.y *= a;
        return this;
    }

    /**
    * Caution !!!
    * 
    * This function modifies the base vector (not a).
    * 
    * For optimisations.
    */
    public Divide(a: number): Vector2 {
        this.x /= a;
        this.y /= a;
        return this;
    }
    //#endregion

    //#region Operators to Vector2
    /**
    * Caution !!!
    * 
    * This function modifies the base vector (not a).
    * 
    * For optimisations.
    */
    public Add2(a: Vector2): Vector2 {
        this.x += a.x;
        this.y += a.y;
        return this;
    }

    /**
    * Caution !!!
    * 
    * This function modifies the base vector (not a).
    * 
    * For optimisations.
    */
    public Substract2(a: Vector2): Vector2 {
        this.x -= a.x;
        this.y -= a.y;
        return this;
    }

    /**
    * Caution !!!
    * 
    * This function modifies the base vector (not a).
    * 
    * For optimisations.
    */
    public Multiply2(a: Vector2): Vector2 {
        this.x *= a.x;
        this.y *= a.y;
        return this;
    }

    /**
    * Caution !!!
    * 
    * This function modifies the base vector (not a).
    * 
    * For optimisations.
    */
    // public Divide2(a: Vector2): Vector2 {
    //     this.x /= a.x;
    //     this.y /= a.y;
    //     return this;
    // }
    //#endregion
}

export class Maths2 {
    static get Zero() {
        return new Vector2(0, 0);
    }

    static get One() {
        return new Vector2(1, 1);
    }

    public static Copy(a: Vector2): Vector2 {
        return new Vector2(a.x, a.y);
    }

    public static Normalize(a: Vector2): Vector2 {
        return this.One.Multiply2(a).Divide(this.Magnitude(a));
    }

    public static Magnitude(a: Vector2): number {
        return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
    }

    public static ClampMagnitude(a: Vector2, magnitude: number): Vector2 {
        return this.Normalize(a).Multiply(Math.min(this.Magnitude(a), magnitude));
    }

    public static UnclampMagnitude(a: Vector2, magnitude: number): Vector2 {
        return this.Normalize(a).Multiply(Math.max(this.Magnitude(a), magnitude));
    }

    public static Dot(a: Vector2, b: Vector2): number {
        return a.x * b.x + a.y * b.y;
    }

    public static Alpha(min: Vector2, max: Vector2, value: number): number {
        return (Maths.Alpha(min.x, max.x, value) + Maths.Alpha(min.y, max.y, value)) / 2;
    }

    public static Lerp(min: Vector2, max: Vector2, alpha: number): Vector2 {
        return this.Copy(max).Substract2(min).Multiply(alpha).Add2(min);
    }

    public static MoveTowards(current: Vector2, target: Vector2, maxDistanceDelta: number): Vector2 {
        const currentToTarget: Vector2 = this.Copy(target).Substract2(current);
        const distance: number = this.Magnitude(currentToTarget);

        return distance < maxDistanceDelta ?
            target : this.Copy(currentToTarget).Divide(distance).Multiply(maxDistanceDelta).Add2(current);
    }

    public static AngleBetweenVectors(a: Vector2, b: Vector2): number {
        return Math.acos(this.Dot(this.Normalize(a), this.Normalize(b))) * (180 / Math.PI);
    }

    public static DirectionToRotationDegree(direction: Vector2): number {
        return Math.atan2(direction.y, direction.x) * 180 / Math.PI;
    }

    public static Perpendicular(direction: Vector2, up: number = 1): Vector2 {
        return new Vector2(-direction.y, direction.x).Multiply(up);
    }
}

export class Vector3 {
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static get Zero() {
        return new Vector3(0, 0, 0);
    }

    //#region Operators to number
    /**
       * Caution !!!
       * 
       * This function modifies the base vector (not a).
       * 
       * For optimisations.
       */
    // public Add(a: number): Vector3 {
    //     this.x += a;
    //     this.y += a;
    //     this.z += a;
    //     return this;
    // }

    /**
    * Caution !!!
    * 
    * This function modifies the base vector (not a).
    * 
    * For optimisations.
    */
    // public Substract(a: number): Vector3 {
    //     this.x -= a;
    //     this.y -= a;
    //     this.z -= a;
    //     return this;
    // }

    /**
    * Caution !!!
    * 
    * This function modifies the base vector (not a).
    * 
    * For optimisations.
    */
    public Multiply(a: number): Vector3 {
        this.x *= a;
        this.y *= a;
        this.z *= a;
        return this;
    }

    /**
    * Caution !!!
    * 
    * This function modifies the base vector (not a).
    * 
    * For optimisations.
    */
    // public Divide(a: number): Vector3 {
    //     this.x /= a;
    //     this.y /= a;
    //     this.z /= a;
    //     return this;
    // }
    //#endregion

    //#region Operators to Vector3
    /**
        * Caution !!!
        * 
        * This function modifies the base vector (not a).
        * 
        * For optimisations.
        */
    public Add3(a: Vector3): Vector3 {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this;
    }

    /**
    * Caution !!!
    * 
    * This function modifies the base vector (not a).
    * 
    * For optimisations.
    */
    public Substract3(a: Vector3): Vector3 {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this;
    }

    /**
    * Caution !!!
    * 
    * This function modifies the base vector (not a).
    * 
    * For optimisations.
    */
    // public Multiply3(a: Vector3): Vector3 {
    //     this.x *= a.x;
    //     this.y *= a.y;
    //     this.z *= a.z;
    //     return this;
    // }

    /**
    * Caution !!!
    * 
    * This function modifies the base vector (not a).
    * 
    * For optimisations.
    */
    // public Divide3(a: Vector3): Vector3 {
    //     this.x /= a.x;
    //     this.y /= a.y;
    //     this.z /= a.z;
    //     return this;
    // }
    //#endregion
}

export class Maths3 {
    static get Zero() {
        return new Vector3(0, 0, 0);
    }

    // static get One() {
    //     return new Vector3(1, 1, 1);
    // }

    public static Copy(a: Vector3): Vector3 {
        return new Vector3(a.x, a.y, a.z);
    }

    public static Round(a: Vector3): Vector3 {
        return new Vector3(Math.round(a.x), Math.round(a.y), Math.round(a.z));
    }

    // public static Normalize(a: Vector2): Vector2 {
    //     return Maths2.One.Multiply2(a).Divide(this.Magnitude(a));
    // }

    // public static Magnitude(a: Vector2): number {
    //     return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
    // }

    // public static ClampMagnitude(a: Vector2, magnitude: number): Vector2 {
    //     return this.Normalize(a).Multiply(Math.min(this.Magnitude(a), magnitude));
    // }

    // public static UnclampMagnitude(a: Vector2, magnitude: number): Vector2 {
    //     return this.Normalize(a).Multiply(Math.max(this.Magnitude(a), magnitude));
    // }

    // public static Dot(a: Vector2, b: Vector2): number {
    //     return a.x * b.x + a.y * b.y;
    // }

    // public static Alpha(min: Vector2, max: Vector2, value: number): number {
    //     return (Maths.Alpha(min.x, max.x, value) + Maths.Alpha(min.y, max.y, value)) / 2;
    // }

    public static Lerp(min: Vector3, max: Vector3, alpha: number): Vector3 {
        return Maths3.Copy(max).Substract3(min).Multiply(alpha).Add3(min);
    }

    // public static AngleBetweenVectors(a: Vector2, b: Vector2): number {
    //     return Math.acos(this.Dot(this.Normalize(a), this.Normalize(b))) * (180 / Math.PI);
    // }
}