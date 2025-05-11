import * as React from 'react';

import { eventPageUpdated, PAGE_UPDATED_EVENT } from "../../index";

import Header from './hud-header';
import GameFinder from './hud-game-finder';

interface BlurryBackgroundState {
    active: boolean;
}

export default class BlurryBackground<P, S extends BlurryBackgroundState> extends React.Component<P, S> {
    private static Instance: BlurryBackground<any, any>;

    constructor(props: P) {
        super(props);

        this.state = {
            ...this.state,
            active: false,
        } as S;

        BlurryBackground.Instance = this;
    }

    componentDidMount(): void {
        eventPageUpdated.addListener(PAGE_UPDATED_EVENT, this.PageUpdated);

    }

    componentWillUnmount(): void {
        eventPageUpdated.removeListener(PAGE_UPDATED_EVENT, this.PageUpdated);
    }

    private PageUpdated = () => {
        BlurryBackground.SetActive(false);
    }

    private BackgroundClick() {
        Header.SetActive(false);
        BlurryBackground.SetActive(false);
        GameFinder.SetActive(false, true);
    }

    public static SetActive(active: boolean) {
        document.documentElement.style.overflow = active ? "hidden" : "auto";

        BlurryBackground.Instance.setState({
            ...BlurryBackground.Instance.state,
            active: active,
        })
    }

    render() {
        return (
            this.state.active && <div className={"hud-blurry-background"} onClick={() => this.BackgroundClick()}></div>
        )
    }
}