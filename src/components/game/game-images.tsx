import * as React from 'react';
import EventEmitter from 'events';

import { PAGE_UPDATED_EVENT, eventPageUpdated } from '../..';

import AnimatedElement, { I_AnimationState, E_AnimationState } from '../multi-scripts-use/mother-classes/animated-element';

import { GetCurrentGameImagesByIndex, GetCurrentGameProperties } from "../multi-scripts-use/game-properties";

export interface I_GameImagesState extends I_AnimationState {
    windowSize: number;
}

export default class GameImages<P, S extends I_GameImagesState> extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            windowSize: window.innerWidth,
        } as S;
    }

    componentDidMount(): void {
        window.addEventListener('resize', this.Resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.Resize);
    }

    private Resize = () => {
        this.setState({
            ...this.state,
            windowSize: window.innerWidth,
        });
    }

    render() {
        return (
            <section className="game-images">
                {
                    this.state.windowSize > 800 &&
                    <div className="side-container">
                        <SideImage imagePath={GetCurrentGameImagesByIndex(0)} imageIndex={0} key={0} />
                        <SideImage imagePath={GetCurrentGameImagesByIndex(2)} imageIndex={2} key={2} />
                    </div>
                }
                <MiddleImage />
                {
                    this.state.windowSize > 800 &&
                    <div className="side-container">
                        <SideImage imagePath={GetCurrentGameImagesByIndex(1)} imageIndex={1} key={1} />
                        <SideImage imagePath={GetCurrentGameImagesByIndex(3)} imageIndex={3} key={3} />
                    </div>
                }
            </section>
        )
    }
}

interface I_GameImageProps {
    imagePath: string;
    imageIndex: number;
}

export const eventClickOnImage = new EventEmitter();
export const CLICK_ON_IMAGE_EVENT = "ClickOnImage";

class SideImage<P extends I_GameImageProps, S extends I_AnimationState> extends AnimatedElement<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            ...this.state,
            animationState: E_AnimationState.OnLocked,
        } as S;
    }

    private ClickOnImage() {
        eventClickOnImage.emit(CLICK_ON_IMAGE_EVENT, this.props.imageIndex);
    }

    render(): React.ReactNode {
        return (
            this.props.imagePath !== "" ?
                <button className={"image-container" + this.GetCurrentStateName()}
                    onAnimationEnd={() => this.SetAnimToLocked()}
                    onClick={() => this.ClickOnImage()}>
                    <img className={"image" + this.GetCurrentStateName()}
                        src={this.props.imagePath}
                        alt="Game image"
                        onMouseEnter={() => this.SetAnimHover(true)}
                        onMouseLeave={() => this.SetAnimHover(false)} />
                </button>
                :
                <div className="blank"></div>
        )
    }
}

interface I_GameImageState extends I_AnimationState {
    imageIndex: number;
    src: string;
    timeout: NodeJS.Timeout;
}

class MiddleImage<P, S extends I_GameImageState> extends AnimatedElement<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            ...this.state,
            src: GetCurrentGameImagesByIndex(0),
            imageIndex: 0,
            animationState: GetCurrentGameProperties().nGameImages > 1 ? E_AnimationState.OffToOn : E_AnimationState.OffLocked,
        } as S;
    }

    componentDidMount(): void {
        eventClickOnImage.addListener(CLICK_ON_IMAGE_EVENT, (imageIndex: number) => {
            this.SetImage(imageIndex);
        })

        eventPageUpdated.addListener(PAGE_UPDATED_EVENT, this.PageUpdated);
    }

    componentWillUnmount(): void {
        eventClickOnImage.removeAllListeners();
        eventPageUpdated.removeListener(PAGE_UPDATED_EVENT, this.PageUpdated);
    }

    private PageUpdated = () => {
        this.SetImage(0);
    }

    private SetImage(imageIndex: number) {
        clearTimeout(this.state.timeout);

        this.setState({
            ...this.state,
            imageIndex: imageIndex,
            animationState: E_AnimationState.OffToOn,
        })
    }

    private ImageLoop() {
        let nextImageIndex = this.state.imageIndex + 1;

        if (!GetCurrentGameProperties()) return;

        if (nextImageIndex >= GetCurrentGameProperties().nGameImages)
            nextImageIndex = 0;

        this.SetImage(nextImageIndex);
    }

    protected override AnimFadeInOutInBetween = (): void => {
        this.setState({
            ...this.state,
            src: GetCurrentGameImagesByIndex(this.state.imageIndex),
            animationState: E_AnimationState.OnToOff,
            isAnimEnded: false,
            timeout: GetCurrentGameProperties().nGameImages > 1 ? setTimeout(() => this.ImageLoop(), 5000) : null,
        });
    }

    render(): React.ReactNode {
        return (
            <div className="container">
                <img className="middle" src={this.state.src} alt="Game image" />
                <div className={"fade-in-out" + this.GetCurrentStateName()} onAnimationEnd={() => this.SetAnimInOut()}></div>
            </div>
        )
    }
}