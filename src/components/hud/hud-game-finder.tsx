import * as React from 'react';
import { Link } from 'react-router-dom';

import { GAME, PAGE_UPDATED_EVENT, PORTFOLIO_URL, eventPageUpdated } from "../../index";

import Traduction from '../multi-scripts-use/traduction';
import { GameProperties, GetAssetsPath, gameProperties } from '../multi-scripts-use/game-properties';
import { TagType, tagsMap } from '../multi-scripts-use/tags';

import AnimatedElement, { I_AnimationState, E_AnimationState } from '../multi-scripts-use/mother-classes/animated-element';

import { hudMap } from './hud-traduction';

export interface I_GameFinderState extends I_AnimationState {
    tagsClicked: number[];
    gamesHaveTags: GameProperties[];
    isActive: boolean;
    gameContainer: React.RefObject<GameContainer<any, any>>;
}

export default class GameFinder<P, S extends I_GameFinderState> extends AnimatedElement<P, S> {
    private static Instance: GameFinder<any, any>;

    constructor(props: P) {
        super(props);

        const gamesHaveTags: GameProperties[] = [];

        gameProperties.forEach(element => {
            gamesHaveTags.push(element);
        });

        this.state = {
            ...this.state,
            tagsClicked: [],
            gamesHaveTags: gamesHaveTags,
            isActive: false,
            gameContainer: React.createRef(),
        } as S;

        GameFinder.Instance = this;
    }

    componentDidMount(): void {
        window.addEventListener('resize', () => this.forceUpdate());

        eventPageUpdated.addListener(PAGE_UPDATED_EVENT, this.PageUpdated);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.forceUpdate());

        eventPageUpdated.removeListener(PAGE_UPDATED_EVENT, this.PageUpdated);
    }

    private PageUpdated = () => {
        GameFinder.SetActive(false);
    }

    public static SetActive(active: boolean, withAnim: boolean = false) {
        GameFinder.Instance.setState({
            ...GameFinder.Instance.state,
            isActive: withAnim,
            animationState: active ? E_AnimationState.OffToOn : withAnim ? E_AnimationState.OnToOff : E_AnimationState.OffLocked,
        });
    }

    private AnimationEnd() {
        this.SetAnimToLocked();

        if (this.state.animationState === E_AnimationState.OnToOff) {
            this.setState({
                ...this.state,
                isActive: false,
            })
        }
    }

    //#region Tags
    private ClickOnTag(index: number) {
        const tagsClicked: number[] = [...this.state.tagsClicked];
        const gamesHaveTags: GameProperties[] = [];

        let gameHasTags: boolean;

        if (!tagsClicked.includes(index))
            tagsClicked.push(index);
        else
            tagsClicked.splice(tagsClicked.indexOf(index), 1);

        gameProperties.forEach(element => {
            gameHasTags = true;

            for (var j = 0; j < tagsClicked.length; j++) {
                if (!element.tagsIds.includes(tagsClicked[j])) {
                    gameHasTags = false;
                    break;
                }
            }

            if (gameHasTags)
                gamesHaveTags.push(element);
        });

        this.setState({
            ...this.state,
            tagsClicked: tagsClicked,
            gamesHaveTags: gamesHaveTags,
        })

        this.state.gameContainer.current?.SetAnimOnOff(true, true, false);
    };

    private DeleteAllTags() {
        const gamesHaveTags: GameProperties[] = [];
        const tagsClicked: number[] = [];

        gameProperties.forEach(element => {
            gamesHaveTags.push(element);
        });

        this.setState({
            ...this.state,
            tagsClicked: tagsClicked,
            gamesHaveTags: gamesHaveTags,
        })

        this.state.gameContainer.current?.SetAnimOnOff(true, true);
    }
    //#endregion

    private IsButtonEnabled(tag: number): boolean | undefined {
        let IsButtonEnabled: boolean = true;

        this.state.tagsClicked.forEach((tagClicked) => {
            if (tagsMap.get(tagClicked)?.distinctTags.includes(tag))
                IsButtonEnabled = false;
        })

        return IsButtonEnabled;
    }

    render(): React.ReactNode {
        return (
            this.state.isActive
            &&
            <section className={"hud-game-finder" + this.GetCurrentStateName()} onAnimationEnd={() => this.AnimationEnd()}>
                <div className='top'>
                    <p className="help">
                        {Traduction.Translate(4, hudMap)}
                    </p>
                    {
                        window.innerWidth > 500 &&
                        <button className="delete-tags" onClick={() => this.DeleteAllTags()}>
                            {Traduction.Translate(5, hudMap)}
                        </button>
                        ||
                        <button className="delete-tags" onClick={() => this.DeleteAllTags()}>X</button>
                    }
                </div>
                <ul className="tags-scroll">
                    {Array.from(tagsMap.keys()).map((key: number) => {
                        let tag: TagType | undefined = tagsMap.get(key);
                        let name: string | undefined = tag?.name[Traduction.GetKeyLanguage()];
                        let isEnabled: boolean | undefined = this.IsButtonEnabled(key);

                        return tag ? (
                            <button key={key}
                                className={isEnabled ? this.state.tagsClicked.includes(key) ? "btn-clicked" : "btn-default" : "btn-disabled"}
                                onClick={() => this.ClickOnTag(key)}
                                disabled={!isEnabled}>
                                {name}
                            </button>
                        ) : null;
                    })}
                </ul>
                <div className="separator"></div>
                <GameContainer gamesHaveTags={this.state.gamesHaveTags} ref={this.state.gameContainer} />
            </section>
        )
    }
}

export interface I_GameContainerProps {
    gamesHaveTags: GameProperties[];
}

class GameContainer<P extends I_GameContainerProps, S extends I_AnimationState> extends AnimatedElement<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            animationState: E_AnimationState.OffToOn,
            isAnimEnded: false,
        } as S;
    }

    private UpdatePage() {
        eventPageUpdated.emit(PAGE_UPDATED_EVENT);
    }

    render(): React.ReactNode {
        return (
            <ul className="games">
                {this.props.gamesHaveTags.map((gameProperties, index) => (
                    <Link key={index}
                        to={GAME + "/" + gameProperties.href}
                        className={"game" + this.GetCurrentStateName()}
                        onClick={this.UpdatePage}
                        onAnimationEnd={() => this.SetAnimToLocked()}>
                        <img className="logo" src={ GetAssetsPath(gameProperties.href) + "/game-logo.png"} alt="Game Logo" />
                    </Link>
                ))}
            </ul>
        )
    }
}