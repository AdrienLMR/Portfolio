import EventEmitter from 'events';

import AnimatedElement, { E_AnimationState, I_AnimationState } from '../multi-scripts-use/mother-classes/animated-element';
import { GetCurrentGameProperties, GetCurrentAssetsPath } from "../multi-scripts-use/game-properties";

import { GameProps } from "./game";
import { PORTFOLIO_URL } from '../..';

const NO_DOWNLOAD_IMG_PATH: string = "/games/no-download.png";

export const eventDownloadClicked = new EventEmitter();
export const DOWNLOAD_CLICKED = "DownloadClicked";

export default class GameTop<P extends GameProps, S extends I_AnimationState> extends AnimatedElement<P, S> {
    render() {
        return (
            <section className="game-top">
                <div className="game-profile">
                    <div className="left-container">
                        <img className="game-logo"
                            src={GetCurrentAssetsPath() + "game-logo.png"}
                            alt="Logo" />
                        <p className="title"
                            style={{ color: GetCurrentGameProperties().colors.titleColor }}>
                            {GetCurrentGameProperties().name}
                        </p>
                    </div>
                    {
                        (GetCurrentGameProperties().download &&
                        <DownloadButton />) ||
                        <img className="no-download"
                            src={PORTFOLIO_URL + NO_DOWNLOAD_IMG_PATH}
                            alt="No Download" />
                    }
                </div>
            </section>
        )
    }
}

interface GameTopState extends I_AnimationState {
    isHover: boolean;
}

export class DownloadButton<P, S extends GameTopState> extends AnimatedElement<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            ...this.state,
            animationState: E_AnimationState.OnLocked,
        } as S;
    }

    private OnMouseHover(isHover: boolean) {
        this.setState({
            ...this.state,
            animationState: isHover ? E_AnimationState.HoverLocked : E_AnimationState.OnLocked,
            isHover: isHover,
        });
    }

    render() {
        return (
            <a className={"download-button" + this.GetCurrentStateName()}
                onMouseEnter={() => this.OnMouseHover(true)}
                onMouseLeave={() => this.OnMouseHover(false)}
                href={"https://drive.google.com/drive/folders/1bYj2pksk0kZkFMnmOuLWyg0qQXrSAG-V?usp=sharing"}
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Example"
            ></a>
        )
    }
}