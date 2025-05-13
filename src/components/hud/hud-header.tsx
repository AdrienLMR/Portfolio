import { Link } from 'react-router-dom';

import { PROFILE, HOME, eventPageUpdated, PAGE_UPDATED_EVENT, PORTFOLIO_URL } from "../../index";

import Traduction, { eventLanguage, UPDATE_LANGUAGE_EVENT } from "../multi-scripts-use/traduction"

import AnimatedElement, { I_AnimationState, E_AnimationState, } from "../multi-scripts-use/mother-classes/animated-element";

import BlurryBackground from './hud-blurry-background';
import GameFinder from './hud-game-finder';
import { hudMap } from './hud-traduction';


export interface I_HudState extends I_AnimationState {
    windowSize: number;
    isLocked: boolean;
}

export default class Header<P, S extends I_HudState> extends AnimatedElement<P, S> {
    private static Instance: Header<any, any>;

    constructor(props: P) {
        super(props);

        this.state = {
            animationState: E_AnimationState.OffToOn,
            isAnimEnded: false,
            isLocked: false,
        } as S;

        Header.Instance = this;
    }

    componentDidMount(): void {
        window.addEventListener('resize', this.Resize);
        eventPageUpdated.addListener(PAGE_UPDATED_EVENT, this.PageUpdated);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.Resize);
        eventPageUpdated.removeListener(PAGE_UPDATED_EVENT, this.PageUpdated);
    }

    private Resize = () => {
        this.setState({
            ...this.state,
            windowSize: window.innerWidth,
        });
    }

    private PageUpdated = () => {
        this.setState({
            ...this.state,
            animationState: E_AnimationState.OffToOn,
            isAnimEnded: false,
            isLocked: false,
        });
    }

    private UpdateState(isOn: boolean) {
        if (this.state.isLocked)
            return;

        this.SetAnimOnOff(isOn);
    }

    //#region Buttons
    private Language() {
        eventLanguage.emit(UPDATE_LANGUAGE_EVENT, Traduction.GetKeyLanguage());
    };

    private GameFinderClick = () => {
        this.setState({
            ...this.state,
            isLocked: !this.state.isLocked,
        });

        BlurryBackground.SetActive(!this.state.isLocked);
        GameFinder.SetActive(!this.state.isLocked, true);
    }
    //#endregion

    public static DelayCall() {
        Header.Instance.SetAnimState(E_AnimationState.OnToOff);
    }

    public static SetActive(active: boolean) {
        if (active) {
            Header.Instance.setState({
                ...Header.Instance.state,
                // animationState: E_AnimationState.OffToOn,
                isLocked: active,
            });
        }
        else {
            Header.Instance.setState({
                ...Header.Instance.state,
                // animationState: E_AnimationState.OnToOff,
                isAnimEnded: false,
                isLocked: active,
            });
        }

        setTimeout(() => Header.Instance.SetAnimState(active ? E_AnimationState.OffToOn : E_AnimationState.OnToOff), 1);
    }

    private RemoveGameFinder = () => {
        if (!this.state.isLocked)
            return;

        this.setState({
            ...this.state,
            isLocked: !this.state.isLocked,
        });

        BlurryBackground.SetActive(!this.state.isLocked);
        GameFinder.SetActive(!this.state.isLocked, true);
    }

    private GetLanguageIcon():string{
        return PORTFOLIO_URL + (Traduction.GetKeyLanguage() === 0 ? "hud/language-en.png" : "hud/language-fr.png");
    }

    render() {
        return (
            <section className="hud-header"
                onMouseEnter={() => this.UpdateState(true)}
                onMouseLeave={() => this.UpdateState(false)}>
                <img className="triangle left" src={PORTFOLIO_URL + "hud/triangle.png"} alt="Left Triangle" />
                <img className="triangle right" src={PORTFOLIO_URL + "hud/triangle.png"} alt="Right Triangle" />
                <div className={"header-border" + this.GetCurrentStateName()} onAnimationEnd={() => this.SetAnimToLocked()}>
                    <div className="header-background">
                        {
                            this.state.animationState !== E_AnimationState.OffLocked &&
                            <div className="header-container">
                                <div className="left-container">
                                    <Link className="img" to={PROFILE} onClick={this.RemoveGameFinder}>
                                        <img src={PORTFOLIO_URL + "hud/logo.png"} alt="Logo" />
                                    </Link>
                                    {
                                        window.innerWidth > 770 &&
                                        <Link className="name" to={PROFILE} onClick={this.RemoveGameFinder}>ADRIEN LEMAIRE</Link>
                                    }
                                    {
                                        window.innerWidth >= 1050 &&
                                        <Link className="occupation" to={PROFILE} onClick={this.RemoveGameFinder}>Game Designer & Programmer</Link>
                                    }
                                </div>
                                {
                                    (window.innerWidth > 450 &&
                                    <menu className="menu-text">
                                        <button className="language" onClick={this.Language}>
                                            <img src={this.GetLanguageIcon()} alt="Language" />
                                        </button>
                                        <Link to={HOME} onClick={this.RemoveGameFinder}>{Traduction.Translate(1, hudMap)}</Link>
                                        <Link to={PROFILE} onClick={this.RemoveGameFinder}>{Traduction.Translate(0, hudMap)}</Link>
                                        <button onClick={this.GameFinderClick}>{Traduction.Translate(3, hudMap)}</button>
                                    </menu>)
                                    ||
                                    <menu className="menu-image">
                                        <button className="language" onClick={this.Language}>
                                            <img src={this.GetLanguageIcon()} alt="Language" />
                                        </button>
                                        <Link to={HOME} onClick={this.RemoveGameFinder}>
                                            <img src={PORTFOLIO_URL + "hud/home.png"} alt="Home" />
                                        </Link>
                                        <Link to={PROFILE} onClick={this.RemoveGameFinder}>
                                            <img src={PORTFOLIO_URL + "hud/profile.png"} alt="Profile" />
                                        </Link>
                                        <button onClick={this.GameFinderClick}>
                                            <img src={PORTFOLIO_URL + "hud/game-finder.png"} alt="Games" />
                                        </button>
                                    </menu>
                                }
                            </div>
                        }
                    </div>
                </div>
            </section>
        )
    }
}