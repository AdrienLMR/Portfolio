import { EventEmitter } from 'events';

import AnimatedElement, { E_AnimationState, I_AnimationState } from "./animated-element";

export interface I_OnScreenDisplayAnimProps {
    indexInList: number;
}

export interface I_OnScreenDisplayAnimState extends I_AnimationState {
    className: string;
    isViewHover: boolean;
    isInMiddle: boolean;
    isCenterBelowBottom: boolean;
    isCenterAboveTop: boolean;
    scrollToTopOffSet: number;
    childrens: React.RefObject<OnScreenDisplayAnim<any, any>>[];
}

const OFFSET_VIEW_HOVER: number = 100;

export const ON_ENTER_EVENT: EventEmitter = new EventEmitter();
export const ON_ENTER: string = "OnEnter"

export default abstract class OnScreenDisplayAnim<P extends I_OnScreenDisplayAnimProps, S extends I_OnScreenDisplayAnimState> extends AnimatedElement<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            ...this.state,
            isViewHover: false,
            isCenterBelowBottom: true,
            isCenterAboveTop: false,
            scrollToTopOffSet: 0,
        } as S;
    }

    //#region Scroll
    public ScrollToTop(offSet: number) {
        let elementTop: number = document.getElementsByClassName(this.state.className)[0].getBoundingClientRect().top - offSet;

        window.scrollTo({ top: window.scrollY + elementTop, behavior: 'smooth' });
    }

    public OnViewUpdate() {
        const elementList: HTMLCollectionOf<Element> = document.getElementsByClassName(this.state.className);

        if (!elementList || elementList.length != 1)
            return;

        const selfRect: DOMRect = elementList[0].getBoundingClientRect();

        let isViewHover: boolean = selfRect.top < window.innerHeight - OFFSET_VIEW_HOVER && selfRect.bottom > OFFSET_VIEW_HOVER;

        if (isViewHover != this.state.isViewHover)
            (isViewHover) ? this.SetAnimOnOff(true) : this.SetAnimOnOff(false);

        if (window.innerHeight / 2 - 50 <= selfRect.bottom && window.innerHeight / 2 + 50 >= selfRect.top) {
            if (!this.state.isInMiddle) {
                ON_ENTER_EVENT.emit(ON_ENTER, this.props.indexInList);

                this.setState({
                    ...this.state,
                    isInMiddle: true,
                })
            }
        }
        else {
            if (this.state.isInMiddle) {
                this.setState({
                    ...this.state,
                    isInMiddle: false,
                })
            }
        }
    }

    public override SetAnimOnOff (isOn: boolean): void {
        if (this.state.isAnimEnded) {
            if (isOn) {
                this.setState({
                    ...this.state,
                    isViewHover: true,
                    animationState: E_AnimationState.OffToOn,
                    isAnimEnded: false,
                });
            }
            else {
                this.setState({
                    ...this.state,
                    isViewHover: false,
                    animationState: E_AnimationState.OnToOff,
                    isAnimEnded: false,
                });
            }
        }
        else
            this.SetAnimState(isOn ? E_AnimationState.OnLocked : E_AnimationState.OffLocked);
    }
    //#endregion
}