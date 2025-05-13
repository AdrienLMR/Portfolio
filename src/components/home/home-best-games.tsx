import * as React from 'react';
import { Link } from 'react-router-dom';

import { GAME, PAGE_UPDATED_EVENT, eventPageUpdated } from '../..';

import AnimatedElement, { E_AnimationState, I_AnimationState } from '../multi-scripts-use/mother-classes/animated-element';
import { GetGameProperties, GetAssetsPath } from "../multi-scripts-use/game-properties";

import Traduction from '../multi-scripts-use/traduction';
import { homeMap, descriptionRectoMap, descriptionVersoMap, madeFromRectoMap } from './home-traduction';

const bestGameIndexs = new Map<number, string>([
    [0, "welcome-easter-island"],
    [1, "out-of-bones"],
    [2, "flowtex"],
]);

export default class BestGames<P, S> extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            ...this.state,
        } as S;
    }

    render() {
        return (
            <main className="best-games">
                <p className="title">{Traduction.Translate(0, homeMap)}</p>
                <ul className="game-cards">
                    <GameCard index={0} />
                    <GameCard index={1} />
                    <GameCard index={2} />
                </ul>
            </main>
        )
    }
}

interface I_GameCardProps {
    index: number;
}

export class GameCard<P extends I_GameCardProps, S extends I_AnimationState> extends AnimatedElement<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            ...this.state,
            animationState: E_AnimationState.OffToOn,
            isAnimEnded: true,
        } as S;
    }

    private UpdatePage() {
        eventPageUpdated.emit(PAGE_UPDATED_EVENT);
    }

    render() {
        return (
            <div className="card"
                key={this.props.index}
                onMouseEnter={() => this.SetAnimHover(true)}
                onMouseLeave={() => this.SetAnimHover(false)}>
                <div className={"recto" + this.GetCurrentStateName()} onAnimationEnd={this.SetAnimToLocked}>
                    <p className="title">{GetGameProperties(bestGameIndexs.get(this.props.index)).name}</p>
                    <img className="photo" src={GetAssetsPath(bestGameIndexs.get(this.props.index)) + "game-logo.png"} alt="Game" />
                    <div className="text-container">
                        <p className='text'>{Traduction.Translate(this.props.index, descriptionRectoMap)}</p>
                        <p className='game-from'>{Traduction.Translate(this.props.index, madeFromRectoMap)}</p>
                    </div>
                </div>
                <div className={"verso" + this.GetCurrentStateName()} onAnimationEnd={this.SetAnimToLocked}>
                    <p className='text'>{Traduction.Translate(this.props.index, descriptionVersoMap)}</p>
                    <Link className="click-to-open"
                        to={"/" + GAME + "/" + GetGameProperties(bestGameIndexs.get(this.props.index)).href}
                        onClick={this.UpdatePage}>
                        {Traduction.Translate(1, homeMap)}
                    </Link>
                </div>
            </div>
        )
    }
}