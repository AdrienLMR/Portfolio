import * as React from 'react';

import Traduction from '../multi-scripts-use/traduction';

import AnimatedElement, { I_AnimationState, E_AnimationState } from "../multi-scripts-use/mother-classes/animated-element";
import OnScreenDisplayAnim, { I_OnScreenDisplayAnimProps, I_OnScreenDisplayAnimState } from "../multi-scripts-use/mother-classes/on-screen-display-anim";

import { sectionTitleMap, experienceTitleMap, experienceMap } from './profile-traduction';
import { PORTFOLIO_URL } from '../..';

type ExperiencePathType = {
    image: string;
    alt: string;
}

const imageMap = new Map<number, ExperiencePathType>([
    [0, { image: "/profile/experiences/isart-digital.png", alt: "Isart Digital Logo" }],
    [1, { image: "/profile/experiences/arthur-gauthier.png", alt: "Arthur-Gauthier Logo" }],
    [2, { image: "/profile/experiences/polywitch.png", alt: "Polywitch Logo" }],
    [3, { image: "/profile/experiences/game-jam.png", alt: "Game Jams Logo" }],
    [4, { image: "/profile/experiences/veni-verdi.png", alt: "Veni Verdi Logo" }],
    [5, { image: "/profile/experiences/course-en-cours.png", alt: "Course-en-Cours Logo" }],
]);

interface I_ExperiencesSection extends I_OnScreenDisplayAnimState {
    experiences: React.RefObject<ExperienceElement<any, any>>[];
}

export default class ExperiencesSection<P extends I_OnScreenDisplayAnimProps, S extends I_ExperiencesSection> extends OnScreenDisplayAnim<P, S> {
    constructor(props: P) {
        super(props);

        let experiences: React.RefObject<OnScreenDisplayAnim<any, any>>[] = Array(imageMap.size);

        //Array.fill() ne marche pas car il appelerait une seule fois createref et assignerais cette référence à tous les index
        for (var i = 0; i < experiences.length; i++) {
            experiences[i] = React.createRef();
        }

        this.state = {
            ...this.state,
            className: "profile-experiences",
            scrollToTopOffSet: 50,
            experiences: experiences,
        } as S;
    }

    public override SetAnimOnOff (isOn: boolean): void {
        super.SetAnimOnOff(isOn);

        this.state.experiences.forEach((children) => {
            children.current?.SetAnimOnOff(isOn);
        });
    }

    render() {
        return (
            <section className={this.state.className}>
                <p className={"text" + this.GetCurrentStateName()} onAnimationEnd={() => this.SetAnimToLocked()}>{Traduction.Translate(0, sectionTitleMap)}</p>
                <ul className="container">
                    {
                        Array.from(imageMap.keys()).map((key: number) => {
                            let tag: ExperiencePathType | undefined = imageMap.get(key);

                            return tag ? (
                                <ExperienceElement tag={tag}
                                    key={key}
                                    experienceKey={key}
                                    ref={this.state.experiences[key]} />
                            ) : null;
                        })
                    }
                </ul>
            </section>
        );
    }
}

const EXPERIENCE_ELEMENT_APPEARING_DELAY: number = 200;

interface I_ExperienceElementState extends I_AnimationState {
    experienceHover: number;
    experienceText: React.RefObject<ExperienceText<any, any>>;
}

interface I_ExperienceElementProps {
    experienceKey: number;
    tag: ExperiencePathType;
}

class ExperienceElement<P extends I_ExperienceElementProps, S extends I_ExperienceElementState> extends AnimatedElement<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            ...this.state,
            experienceText: React.createRef(),
        } as S;
    }

    public SetAnimOnOff = (isOn: boolean): void => {
        if (isOn)
            this.DelaySetState(E_AnimationState.OffToOn, EXPERIENCE_ELEMENT_APPEARING_DELAY * this.props.experienceKey);
        else {
            if (this.state.isAnimEnded)
                this.SetAnimState(E_AnimationState.OnToOff);
            else
                this.SetAnimState(E_AnimationState.OffLocked);
        }
    }

    private MouseHover(isEnter: boolean) {
        if (isEnter && !this.state.isAnimEnded) return;

        this.SetAnimHover(isEnter);

        this.state.experienceText.current?.SetAnimOnOff(isEnter);
    }

    render() {
        return (
            <li key={this.props.experienceKey}
                className={"experience" + this.GetCurrentStateName()}
                onAnimationEnd={() => this.SetAnimToLocked()}
                onMouseEnter={() => this.MouseHover(true)}
                onMouseLeave={() => this.MouseHover(false)}>
                < div className={"image-container" + this.GetCurrentStateName()} >
                    <img className={"image" + this.GetCurrentStateName()} src={PORTFOLIO_URL + this.props.tag.image} alt={this.props.tag.alt} />
                </div >
                <div className={"text-container" + this.GetCurrentStateName()}>
                    <p className="title">{Traduction.Translate(this.props.experienceKey, experienceTitleMap)}</p>
                </div>
                <ExperienceText experienceKey={this.props.experienceKey} ref={this.state.experienceText} />
            </li >
        )
    }
}

interface I_ExperienceTextProps {
    experienceKey: number;
}

class ExperienceText<P extends I_ExperienceTextProps, S extends I_AnimationState> extends AnimatedElement<P, S>{
    render() {
        return (
            <div className="description-container">
                <p className={"text" + this.GetCurrentStateName()}
                    onAnimationEnd={() => this.SetAnimToLocked()}>
                    {Traduction.Translate(this.props.experienceKey, experienceMap)}
                </p>
            </div>
        )
    }
}