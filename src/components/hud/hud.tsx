import * as React from 'react';

import Header from './hud-header';
import BlurryBackground from './hud-blurry-background';
import GameFinder from './hud-game-finder';

import './css/hud.css';
import './css/hud-header.css';
import './css/hud-game-finder.css';
import './css/hud-blurry-background.css';

export interface I_Hud {
    scrollY: number;
}

export default class Hud<P, S extends I_Hud> extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            ...this.state,
            scrollY: 0,
        } as S;
    }

    componentDidMount(): void {
        // window.addEventListener('scroll', this.OnScroll);
    }

    private OnScroll = () => {
        if (window.scrollY > this.state.scrollY) {
            //Scroll down
            // if (Header.Instance.state.animationState != E_AnimationState.OffLocked &&
            //     Header.Instance.state.animationState != E_AnimationState.OnToOff)
                Header.SetActive(false);
        }
        else {
            // if (Header.Instance.state.animationState != E_AnimationState.OnLocked &&
            //     Header.Instance.state.animationState != E_AnimationState.OffToOn)
                Header.SetActive(true);
        }

        this.setState({
            ...this.state,
            scrollY: window.scrollY,
        })
    }

    render() {
        return (
            <header className="hud">
                <BlurryBackground />
                <Header />
                <GameFinder />
            </header>
        )
    }
}