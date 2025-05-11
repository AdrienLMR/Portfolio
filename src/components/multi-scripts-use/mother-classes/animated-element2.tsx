import * as React from 'react';

export enum E_StateFrom {
    On = 10,
    Off = 20,
    Hover = 30,
    Clicked = 40,
}

export enum E_StateTo {
    On = 1,
    Off = 2,
    Hover = 3,
    Clicked = 4,
    Locked = 5,
}

export enum E_AnimationState {
    OffLocked = E_StateFrom.Off + E_StateTo.Locked,
    OnLocked = E_StateFrom.On + E_StateTo.Locked,
    HoverLocked = E_StateFrom.Hover + E_StateTo.Locked,
    ClickedLocked = E_StateFrom.Clicked + E_StateTo.Locked,

    OffToOn = E_StateFrom.Off + E_StateTo.On,
    OnToOff = E_StateFrom.On + E_StateTo.Off,
    HoverToOn = E_StateFrom.Hover + E_StateTo.On,
    OnToHover = E_StateFrom.On + E_StateTo.Hover,
    HoverToClicked = E_StateFrom.Hover + E_StateTo.Clicked,
    ClickedToHover = E_StateFrom.Clicked + E_StateTo.Hover,
}

//OffLocked => OffToOn
//OnLocked => OnToOff, OnToHover
//HoverLocked => HoverToOn, HoverToClicked
//ClickedLocked => ClickedToHover

//OffToOn => OnLocked, OnToOff, OnToHover
//OnToOff => OffLocked, OffToOn
//HoverToOn => 


const stateToCSSName: Map<number, string> = new Map<number, string>([
    [E_StateFrom.Off + E_StateTo.Locked, " off-locked"],
    [E_StateFrom.On + E_StateTo.Locked, " on-locked"],
    [E_StateFrom.Hover + E_StateTo.Locked, " hover-locked"],
    [E_StateFrom.Clicked + E_StateTo.Locked, " clicked-locked"],
    [E_StateFrom.Off + E_StateTo.On, " off-to-on"],
    [E_StateFrom.On + E_StateTo.Off, " on-to-off"],
    [E_StateFrom.Hover + E_StateTo.On, " hover-to-on"],
    [E_StateFrom.On + E_StateTo.Hover, " on-to-hover"],
    [E_StateFrom.Hover + E_StateTo.Clicked, " hover-to-clicked"],
    [E_StateFrom.Clicked + E_StateTo.Hover, " clicked-to-hover"],
])

const ANIMATION_OFFSET: number = 100;


export interface I_AnimationState {
    animationState: E_AnimationState;
    // isAnimEnded: boolean;
    // animationStartOffset: NodeJS.Timeout;
}

export default abstract class AnimatedElement<P, S extends I_AnimationState> extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            animationState: E_AnimationState.OffLocked,
            // isAnimEnded: true,
        } as S;
    }

    //#region Get state name
    protected GetCurrentStateName = (): string => {
        return AnimatedElement.GetStateName(this.state.animationState);
    }

    public static GetStateName = (animationState: E_AnimationState): string => {
        let name: string | undefined = stateToCSSName.get(animationState);

        return name != null ? name : "";
    }
    //#endregion

    //#region Set animation
    protected SetAnimState(animationState: E_AnimationState, isIllogical: boolean = false, isTimeOffset = true) {
        let isAnimEnded: boolean = true;

        // if (!isIllogical) {
        //     if ((animationState === 12 ||
        //         animationState === 13) && (
        //             this.state.animationState !== 15 &&
        //             this.state.animationState !== 21 &&
        //             this.state.animationState !== 31)) {
        //         // if (isTimeOffset) clearTimeout(this.state.animationStartOffset);
        //         return;
        //     }

        //     if ((animationState === 31 ||
        //         animationState === 34) && (
        //             this.state.animationState !== 35 &&
        //             this.state.animationState !== 13 &&
        //             this.state.animationState !== 43)) {
        //         // if (isTimeOffset) clearTimeout(this.state.animationStartOffset);
        //         return;
        //     }

        //     if (animationState === 21 && (
        //         this.state.animationState !== 25 &&
        //         this.state.animationState !== 12)) {
        //         // if (isTimeOffset) clearTimeout(this.state.animationStartOffset);
        //         return;
        //     }

        //     if (animationState === 43 && (
        //         this.state.animationState !== 45 &&
        //         this.state.animationState !== 34)) {
        //         // if (isTimeOffset) clearTimeout(this.state.animationStartOffset);
        //         return;
        //     }










            
        //     if ((animationState === E_AnimationState.OnToOff ||
        //         animationState === E_AnimationState.OnToHover) && (
        //             this.state.animationState !== E_AnimationState.OnLocked &&
        //             this.state.animationState !== E_AnimationState.OffToOn &&
        //             this.state.animationState !== E_AnimationState.HoverToOn)) {
        //         if (isTimeOffset) clearTimeout(this.state.animationStartOffset);
        //         return;
        //     }

        //     if (animationState === E_AnimationState.OffToOn && (
        //         this.state.animationState !== E_AnimationState.OffLocked &&
        //         this.state.animationState !== E_AnimationState.OnToOff)) {
        //         if (isTimeOffset) clearTimeout(this.state.animationStartOffset);
        //         return;
        //     }

        //     if ((animationState === E_AnimationState.HoverToOn ||
        //         animationState === E_AnimationState.HoverToClicked) && (
        //             this.state.animationState !== E_AnimationState.HoverLocked &&
        //             this.state.animationState !== E_AnimationState.OnToHover &&
        //             this.state.animationState !== E_AnimationState.ClickedToHover)) {
        //         if (isTimeOffset) clearTimeout(this.state.animationStartOffset);
        //         return;
        //     }

        //     if (animationState === E_AnimationState.ClickedToHover && (
        //         this.state.animationState !== E_AnimationState.ClickedLocked &&
        //         this.state.animationState !== E_AnimationState.HoverToClicked)) {
        //         if (isTimeOffset) clearTimeout(this.state.animationStartOffset);
        //         return;
        //     }
        // }

        switch (animationState) {
            case E_AnimationState.OnToOff:
            case E_AnimationState.OffToOn:
            case E_AnimationState.HoverToOn:
            case E_AnimationState.OnToHover:
            case E_AnimationState.ClickedToHover:
            case E_AnimationState.HoverToClicked:
                isAnimEnded = false;
                break;
            default:
                break;
        }

        // if (isTimeOffset) {
        //     clearTimeout(this.state.animationStartOffset);

        //     this.setState({
        //         ...this.state,
        //         animationStartOffset: setTimeout(() => this._SetAnimState(animationState, isAnimEnded), ANIMATION_OFFSET),
        //     })
        // }
        // else
        //     this._SetAnimState(animationState, isAnimEnded)
    }
}