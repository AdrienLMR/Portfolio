import * as React from 'react';
import { isMobile } from 'react-device-detect';

import { PAGE_UPDATED_EVENT, eventPageUpdated } from '../../index';

import { GetCurrentGameProperties } from "../multi-scripts-use/game-properties";

import ParticleSystem from './particle/particle-system';

import GameTop from "./game-top";
import GameMain from "./game-main";
import GameImages from "./game-images";
import Contacts from "../multi-scripts-use/contacts/contacts";

import './css/game.css';
import './css/game-top.css';
import './css/game-main.css';
import './css/game-images.css';
import '../multi-scripts-use/contacts/contacts.css';

const CURSOR_URL: string = "url(games/games-cursor.png) 14.5 14.5, auto";
const CURSOR_CLICK_URL: string = "url(games/games-cursor-click.png) 10.5 10.5, auto";

interface GameState {
    gameName: string;
    cursorState: object;
}

export interface GameProps {
    gameName: string;
}

export default class Game<P, S extends GameState> extends React.Component<P, S> {
    private static Instance: Game<any, any>;

    constructor(props: any) {
        super(props);

        this.state = {
            gameName: this.GetGameName(),
            cursorState: { cursor: CURSOR_URL },
        } as S

        Game.Instance = this;
    }

    componentDidMount(): void {
        eventPageUpdated.addListener(PAGE_UPDATED_EVENT, this.PageUpdated);
        window.addEventListener('mousedown', () => this.OnClick(true));
        window.addEventListener('mouseup', () => this.OnClick(false));
    }

    componentWillUnmount(): void {
        eventPageUpdated.removeListener(PAGE_UPDATED_EVENT, this.PageUpdated);
        window.removeEventListener('mousedown', () => this.OnClick(true));
        window.removeEventListener('mouseup', () => this.OnClick(false));
    }

    private GetGameName(): string {
        return window.location.href.slice(window.location.href.lastIndexOf("/") + 1);
    }

    public static GetGameName(): string {
        return this.Instance.GetGameName();
    }

    private PageUpdated = () => {
        this.setState({
            ...this.state,
            gameName: this.GetGameName(),
        })
    }

    private OnClick(press: boolean) {
        this.setState({
            ...this.state,
            cursorState: { cursor: press ? CURSOR_CLICK_URL : CURSOR_URL },
        })
    }

    render() {
        return (
            <div className="game-page" style={this.state.cursorState}>
                <button className="fixed-background"
                    style={{ backgroundImage: "radial-gradient(circle, " + GetCurrentGameProperties().colors.backgroundColors + ")" }}>
                </button>
                <div className="banner" style={{ backgroundImage: "linear-gradient(" + GetCurrentGameProperties().colors.bannerColor + ")" }}></div>
                <div className="content">
                    {
                        (!isMobile) &&
                        <ParticleSystem />
                    }
                    <GameTop gameName={this.state.gameName} />
                    <GameMain gameName={this.state.gameName} />
                    {
                        GetCurrentGameProperties().nGameImages > 0 &&
                        <GameImages gameName={this.state.gameName} />
                    }
                </div>
                <Contacts />
            </div>
        )
    }
}