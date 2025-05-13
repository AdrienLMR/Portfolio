import Traduction from '../multi-scripts-use/traduction';

import AnimatedElement, { E_AnimationState, I_AnimationState } from "../multi-scripts-use/mother-classes/animated-element";
import OnScreenDisplayAnim, { I_OnScreenDisplayAnimProps, I_OnScreenDisplayAnimState } from "../multi-scripts-use/mother-classes/on-screen-display-anim";
import { isMobile } from 'react-device-detect';

import { sectionTitleMap } from './profile-traduction';
import { PORTFOLIO_URL } from '../..';

type SkillParam = {
    image: string;
    alt: string;
    href: string;
}

const imageMap = new Map<number, SkillParam>([
    [0, { image: "/profile/skills/unity", alt: "Unity logo", href: "https://unity.com/" }],
    [1, { image: "/profile/skills/unreal", alt: "Unreal Engine logo", href: "https://www.unrealengine.com/" }],
    [2, { image: "/profile/skills/c_sharp", alt: "C# logo", href: "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)" }],
    // [2, { image: "/profile/skills/cpp", alt: "C++ logo", href: "" }],
    [3, { image: "/profile/skills/react", alt: "React logo", href: "https://react.dev/" }],
    [4, { image: "/profile/skills/git", alt: "Git logo", href: "https://git-scm.com/" }],
    [5, { image: "/profile/skills/perforce", alt: "Helix Core logo", href: "https://www.perforce.com/products/helix-core" }],
]);

export default class Skills<P extends I_OnScreenDisplayAnimProps, S extends I_OnScreenDisplayAnimState> extends OnScreenDisplayAnim<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            ...this.state,
            className: "profile-skills",
            scrollToTopOffSet: 150,
        } as S;
    }

    render() {
        return (
            <section className={this.state.className + this.GetCurrentStateName()} onAnimationEnd={() => this.SetAnimToLocked()}>
                <p className={"title" + this.GetCurrentStateName()}>{Traduction.Translate(1, sectionTitleMap)}</p>
                <ul className="skill-container">
                    {
                        imageMap.size > 0 ? (
                            Array.from(imageMap.keys()).map((horizontalKey: number) => {
                                let skill: SkillParam | undefined = imageMap.get(horizontalKey);

                                return skill ? (
                                    <SkillsElement key={horizontalKey} skillParam={skill} />
                                ) : null;
                            })
                        ) : null
                    }
                </ul>
            </section>
        );
    }
}

interface I_SkillsElementProps {
    key: number;
    skillParam: SkillParam;
}

class SkillsElement<P extends I_SkillsElementProps, S extends I_AnimationState> extends AnimatedElement<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            ...this.state,
            animationState: E_AnimationState.OnLocked,
        } as S;
    }

    private OnHover(hover: boolean) {
        if (!isMobile)
            this.SetAnimHover(hover);
    }

    render() {
        return (
            <div key={this.props.key} className="skill"
                onMouseEnter={() => this.OnHover(true)}
                onMouseLeave={() => this.OnHover(false)}>
                <a className={"white" + this.GetCurrentStateName()} onAnimationEnd={() => this.SetAnimToLocked()} href={this.props.skillParam.href} target="_blank" rel="noreferrer">
                    <img src={PORTFOLIO_URL + this.props.skillParam.image + "_white.png"} alt={this.props.skillParam.alt} />
                </a>
                <a className={"colored" + this.GetCurrentStateName()} href={this.props.skillParam.href} target="_blank" rel="noreferrer">
                    <img src={PORTFOLIO_URL + this.props.skillParam.image + "_colored.png"} alt={this.props.skillParam.alt} />
                </a>
            </div>
        )
    }
}