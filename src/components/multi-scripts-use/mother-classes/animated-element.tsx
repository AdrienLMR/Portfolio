import * as React from 'react';

export enum E_AnimationState {
    OffLocked,
    OnLocked,
    HoverLocked,
    ClickedLocked,

    OffToOn,
    OnToOff,
    HoverToOn,
    OnToHover,
    HoverToClicked,
    ClickedToHover,
}

const stateToName: Map<E_AnimationState, string> = new Map<E_AnimationState, string>([
    [E_AnimationState.OffLocked, " off-locked"],
    [E_AnimationState.OnLocked, " on-locked"],
    [E_AnimationState.HoverLocked, " hover-locked"],
    [E_AnimationState.ClickedLocked, " clicked-locked"],
    [E_AnimationState.OffToOn, " off-to-on"],
    [E_AnimationState.OnToOff, " on-to-off"],
    [E_AnimationState.HoverToOn, " hover-to-on"],
    [E_AnimationState.OnToHover, " on-to-hover"],
    [E_AnimationState.HoverToClicked, " hover-to-clicked"],
    [E_AnimationState.ClickedToHover, " clicked-to-hover"],
])

const ANIMATION_OFFSET: number = 100;

export interface I_AnimationState {
    animationState: E_AnimationState;
    isAnimEnded: boolean;
    animationStartOffset: NodeJS.Timeout;
}

export default abstract class AnimatedElement<P, S extends I_AnimationState> extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            animationState: E_AnimationState.OffLocked,
            isAnimEnded: true,
        } as S;
    }

    //#region Get state name
    protected GetCurrentStateName = (): string => {
        return AnimatedElement.GetStateName(this.state.animationState);
    }

    public static GetStateName = (animationState: E_AnimationState): string => {
        let name: string | undefined = stateToName.get(animationState);

        return name != null ? name : "";
    }
    //#endregion

    //#region Set animation
    protected SetAnimState(animationState: E_AnimationState, isIllogical: boolean = false, isTimeOffset = true) {
        let isAnimEnded: boolean = true;

        if (!isIllogical) {
            if ((animationState === E_AnimationState.OnToOff ||
                animationState === E_AnimationState.OnToHover) && (
                    this.state.animationState !== E_AnimationState.OnLocked &&
                    this.state.animationState !== E_AnimationState.OffToOn &&
                    this.state.animationState !== E_AnimationState.HoverToOn)) {
                if (isTimeOffset) clearTimeout(this.state.animationStartOffset);
                return;
            }

            if (animationState === E_AnimationState.OffToOn && (
                this.state.animationState !== E_AnimationState.OffLocked &&
                this.state.animationState !== E_AnimationState.OnToOff)) {
                if (isTimeOffset) clearTimeout(this.state.animationStartOffset);
                return;
            }

            if ((animationState === E_AnimationState.HoverToOn ||
                animationState === E_AnimationState.HoverToClicked) && (
                    this.state.animationState !== E_AnimationState.HoverLocked &&
                    this.state.animationState !== E_AnimationState.OnToHover &&
                    this.state.animationState !== E_AnimationState.ClickedToHover)) {
                if (isTimeOffset) clearTimeout(this.state.animationStartOffset);
                return;
            }

            if (animationState === E_AnimationState.ClickedToHover && (
                this.state.animationState !== E_AnimationState.ClickedLocked &&
                this.state.animationState !== E_AnimationState.HoverToClicked)) {
                if (isTimeOffset) clearTimeout(this.state.animationStartOffset);
                return;
            }
        }

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

        if (isTimeOffset) {
            clearTimeout(this.state.animationStartOffset);

            this.setState({
                ...this.state,
                animationStartOffset: setTimeout(() => this._SetAnimState(animationState, isAnimEnded), ANIMATION_OFFSET),
            })
        }
        else
            this._SetAnimState(animationState, isAnimEnded)
    }

    public _SetAnimState(animationState: E_AnimationState, isAnimEnded: boolean) {
        this.setState({
            ...this.state,
            animationState: animationState,
            isAnimEnded: isAnimEnded,
        });
    }

    public SetAnimHover = (isEnter: boolean, isIllogical: boolean = false) => {
        if (this.state.isAnimEnded)
            this.SetAnimState(isEnter ? E_AnimationState.OnToHover : E_AnimationState.HoverToOn, isIllogical);
        else
            this.SetAnimState(isEnter ? E_AnimationState.HoverLocked : E_AnimationState.OnLocked, isIllogical);
    }

    public SetAnimClick(isClicked: boolean, isIllogical: boolean = false, isTimeOffset = true) {
        if (this.state.isAnimEnded)
            this.SetAnimState(isClicked ? E_AnimationState.ClickedToHover : E_AnimationState.HoverToClicked, isIllogical);
        else
            this.SetAnimState(isClicked ? E_AnimationState.HoverLocked : E_AnimationState.ClickedLocked, isIllogical);
    }

    public SetAnimOnOff(isOn: boolean, isIllogical: boolean = false, isTimeOffset = true) {
        if (this.state.isAnimEnded)
            this.SetAnimState(isOn ? E_AnimationState.OffToOn : E_AnimationState.OnToOff, isIllogical, isTimeOffset);
        else
            this.SetAnimState(isOn ? E_AnimationState.OnLocked : E_AnimationState.OffLocked, isIllogical, isTimeOffset);
    }

    public SetAnimInOut = (isIllogical: boolean = false) => {
        switch (this.state.animationState) {
            case E_AnimationState.OffToOn:
                this.AnimFadeInOutInBetween();
                break;
            case E_AnimationState.OnToOff:
                this.SetAnimState(E_AnimationState.OffLocked, isIllogical);
                break;
        }
    }

    protected AnimFadeInOutInBetween = (isIllogical: boolean = false) => {
        this.SetAnimState(E_AnimationState.OnToOff, isIllogical);
    }

    protected SetAnimToLocked = () => {
        let animationState: E_AnimationState;

        switch (this.state.animationState) {
            case E_AnimationState.OnToOff:
                animationState = E_AnimationState.OffLocked;
                break;
            case E_AnimationState.OffToOn:
            case E_AnimationState.HoverToOn:
                animationState = E_AnimationState.OnLocked;
                break;
            case E_AnimationState.OnToHover:
            case E_AnimationState.ClickedToHover:
                animationState = E_AnimationState.HoverLocked;
                break;
            case E_AnimationState.HoverToClicked:
                animationState = E_AnimationState.ClickedLocked;
                break;
            default:
                return;
        }

        this.setState({
            ...this.state,
            animationState: animationState,
            isAnimEnded: true,
        });
    }
    //#endregion

    protected DelaySetState(animationState: E_AnimationState, delay: number, isIllogical: boolean = false) {
        setTimeout(() => this.SetAnimState(animationState, isIllogical), delay);
    }
}