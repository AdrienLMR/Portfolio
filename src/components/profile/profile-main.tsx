import * as React from 'react';

import Traduction from '../multi-scripts-use/traduction';

import { E_AnimationState } from "../multi-scripts-use/mother-classes/animated-element";
import OnScreenDisplayAnim, { I_OnScreenDisplayAnimProps, I_OnScreenDisplayAnimState } from "../multi-scripts-use/mother-classes/on-screen-display-anim";

import { mainMap } from './profile-traduction';

export default class Main<P extends I_OnScreenDisplayAnimProps, S extends I_OnScreenDisplayAnimState> extends OnScreenDisplayAnim<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            ...this.state,
            animationState: E_AnimationState.OffToOn,
            className: "profile-main",
            isViewHover: true,
            scrollToTopOffSet: 200,
        } as S;
    }

    render() {
        return (
            <main className={this.state.className}>
                <div className={"leftBar" + this.GetCurrentStateName()}></div>
                <p className={"text" + this.GetCurrentStateName()} onAnimationEnd={this.SetAnimToLocked}>{Traduction.Translate(0, mainMap)}</p>
                <div className={"rightBar" + this.GetCurrentStateName()}></div>
            </main>
        )
    }
}