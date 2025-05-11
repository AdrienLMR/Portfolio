import * as React from 'react';

import Traduction from '../multi-scripts-use/traduction';

import AnimatedElement, { E_AnimationState, I_AnimationState } from "../multi-scripts-use/mother-classes/animated-element";
import OnScreenDisplayAnim, { I_OnScreenDisplayAnimProps, I_OnScreenDisplayAnimState } from "../multi-scripts-use/mother-classes/on-screen-display-anim";

import { interestsMap, sectionTitleMap } from './profile-traduction';

const WAIT_BEFORE_APPEARING: number = 100;

interface I_InterestsState extends I_OnScreenDisplayAnimState {
    interests: React.RefObject<InterestElement<any, any>>[];
}

export default class Interests<P extends I_OnScreenDisplayAnimProps, S extends I_InterestsState> extends OnScreenDisplayAnim<P, S> {
    constructor(props: P) {
        super(props);

        let interests: React.RefObject<InterestElement<any, any>>[] = Array(interestsMap.size);

        //Array.fill() ne marche pas car il appelerait une seule fois createref et assignerais cette référence à tous les index
        for (var i = 0; i < interests.length; i++) {
            interests[i] = React.createRef();
        }

        this.state = {
            ...this.state,
            className: "profile-interests",
            scrollToTopOffSet: 50,
            interests: interests,
        } as S;
    }

    public override SetAnimOnOff(isOn: boolean): void {
        super.SetAnimOnOff(isOn);

        this.state.interests.forEach((children) => {
            children.current?.SetAnimOnOff(isOn);
        });
    }

    render() {
        return (
            <section className={this.state.className}>
                <p className={"title" + this.GetCurrentStateName()}>{Traduction.Translate(2, sectionTitleMap)}</p>
                <ul className="interests-elements">
                    {
                        Array.from(interestsMap.keys()).map((key: number) => {
                            let tag: React.ReactNode[] | undefined = interestsMap.get(key);

                            return tag ? (
                                <InterestElement key={key} interestKey={key} ref={this.state.interests[key]} />
                            ) : null;
                        })
                    }
                </ul>
            </section>
        );
    }
}

interface I_InterestElementProps {
    interestKey: number;
}

class InterestElement<P extends I_InterestElementProps, S extends I_AnimationState> extends AnimatedElement<P, S> {
    public override SetAnimOnOff = (isOn: boolean): void => {
        if (isOn)
            this.DelaySetState(E_AnimationState.OffToOn, WAIT_BEFORE_APPEARING * this.props.interestKey);
        else
            this.DelaySetState(E_AnimationState.OnToOff, WAIT_BEFORE_APPEARING - WAIT_BEFORE_APPEARING * this.props.interestKey);
    }

    render() {
        return (
            <p className={"text" + this.GetCurrentStateName()}
                onAnimationEnd={() => this.SetAnimToLocked()}>
                {Traduction.Translate(this.props.interestKey, interestsMap)}
            </p>
        )
    }
}