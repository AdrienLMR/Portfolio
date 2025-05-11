import * as React from 'react';

import { PAGE_UPDATED_EVENT, eventPageUpdated } from '../../..';

import { Maths2, Vector2 } from '../../multi-scripts-use/utils';

import { GetCurrentGameProperties } from '../../multi-scripts-use/game-properties';
import { ParticlesDataManager } from './particle-type-management';
import ParticleUtils from './particle-utils';

import P_Base, { E_ParticleBehavior } from './particle-behaviors/p_base';
import PDirectional from './particle-behaviors/p_random-directional';
import PRandomMovement from './particle-behaviors/p_random-movement';
import PLinear from './particle-behaviors/p_linear';

import './css/particle-spawner.css';

export interface I_ParticleSystemState {
    //ParticleSystem
    gameInterval: NodeJS.Timer;
    areaSize: Vector2;
    //Particles
    particles: React.RefObject<P_Base<any, any>>[];
    particlesJsx: JSX.Element[];
    particleUtils: React.RefObject<ParticleUtils<any, any>>;
    particlesSettingsManager: ParticlesDataManager;
    //Events
    mousePosition: Vector2;
    scrollTimeout: NodeJS.Timeout;
    scrolled: boolean;
}

const UPDATE_SPEED: number = 1;
const SCROLL_TIMEOUT = 10;

export default class ParticleSystem<P, S extends I_ParticleSystemState> extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        this.state = this.GetStateOnStart(true);
    }

    //#region Mount
    componentDidMount(): void {
        eventPageUpdated.addListener(PAGE_UPDATED_EVENT, this.OnPageUpdated);

        window.addEventListener('mousemove', this.OnMouseMove);
        window.addEventListener('resize', this.OnResize);
        window.addEventListener('scroll', this.OnScroll);

        this.ManageChangingEvents(true);
    }

    componentWillUnmount(): void {
        clearInterval(this.state.gameInterval);
        clearTimeout(this.state.scrollTimeout);

        this.setState({
            ...this.state,
            gameInterval: null,
            scrollTimeout: null,
        })

        this.ManageChangingEvents(false);

        window.removeEventListener('mousemove', this.OnMouseMove);
        window.removeEventListener('resize', this.OnResize);
        window.removeEventListener('scroll', this.OnScroll);

        eventPageUpdated.removeListener(PAGE_UPDATED_EVENT, this.OnPageUpdated);
    }
    //#endregion

    //#region Start
    private GetStateOnStart(firstTime: boolean = false): S {
        const particlesSettingsManager: ParticlesDataManager = GetCurrentGameProperties().particlesSettingsManager;

        particlesSettingsManager.InitManagers();

        const particles: React.RefObject<P_Base<any, any>>[] = [];

        for (var i = particlesSettingsManager.particleSettings.nParticles; i > 0; i--) {
            particles.push(React.createRef());
        }

        return {
            ...this.state,
            //ParticleSystem
            gameInterval: firstTime ? setInterval(this.MoveParticles, UPDATE_SPEED) : this.state.gameInterval,
            areaSize: new Vector2(window.innerWidth, window.innerHeight),
            //Particles
            particleUtils: React.createRef(),
            particles: particles,
            particlesJsx: this.GetParticlesAsJSXElement(particlesSettingsManager, particles),
            particlesSettingsManager: particlesSettingsManager,
            //Events
            mousePosition: Maths2.One.Multiply(-100),
            scrolled: false,
        }
    }

    private GetParticlesAsJSXElement(particlesSettingsManager: ParticlesDataManager, particles: React.RefObject<P_Base<any, any>>[]): JSX.Element[] {
        let jsxElements: JSX.Element[] = [];

        particles.forEach((particle, index) => {
            switch (particlesSettingsManager.behaviorSettings.behavior) {
                case E_ParticleBehavior.Amber:
                case E_ParticleBehavior.Fall:
                    jsxElements.push(
                        <PDirectional key={index}
                            ref={particle as React.RefObject<PDirectional<any, any>>}
                            particlesDataManager={particlesSettingsManager} />
                    );
                    break;
                case E_ParticleBehavior.Linear:
                    jsxElements.push(
                        <PLinear key={index}
                            ref={particle as React.RefObject<PLinear<any, any>>}
                            particlesDataManager={particlesSettingsManager} />
                    );
                    break;
                default:
                    jsxElements.push(
                        <PRandomMovement key={index}
                            ref={particle as React.RefObject<PRandomMovement<any, any>>}
                            particlesDataManager={particlesSettingsManager} />
                    );
                    break;
            }
        })

        return jsxElements;
    }
    //#endregion

    //#region Main methods
    private MoveParticles = () => {
        this.state.particles.forEach((particle) => {
            particle.current?.Update();
        })
    }

    private Respawn = () => {
        this.setState(this.GetStateOnStart());
    }
    //#endregion

    //#region Events
    private OnPageUpdated = () => {
        clearTimeout(this.state.scrollTimeout);

        this.setState({
            ...this.state,
            particleUtils: null,
            particles: [],
            particlesJsx: [],
            particlesType: null,
            areaSize: Maths2.Zero,
        })

        setTimeout(this.Respawn, 1);

        this.ManageChangingEvents(false);
        this.ManageChangingEvents(true);
    }

    private OnMouseMove = (event: MouseEvent) => {
        this.setState({
            ...this.state,
            mousePosition: new Vector2(event.clientX, event.clientY),
        });
    }

    private OnResize = () => {
        this.setState({
            ...this.state,
            areaSize: new Vector2(window.innerWidth, window.innerHeight),
        });
    }

    private OnScroll = () => {
        clearTimeout(this.state.scrollTimeout);

        this.setState({
            ...this.state,
            scrollTimeout: setTimeout(this.EndScroll, SCROLL_TIMEOUT),
            scrolled: true,
        });
    }

    private EndScroll = () => {
        clearTimeout(this.state.scrollTimeout);

        this.setState({
            ...this.state,
            scrollTimeout: null,
            scrolled: false,
        });
    }
    //#endregion

    //#region Changing events
    private ManageChangingEvents(isAddEvent: boolean) {
        if (isAddEvent) {
            if (this.state.particlesSettingsManager.mouseBehaviorsManager.onMouseUp ||
                this.state.particlesSettingsManager.mouseBehaviorsManager.onMouseDown) {
                window.addEventListener('mouseup', this.OnMouseUp);
                window.addEventListener('mousedown', this.OnMouseDown);
            }
        }
        else {
            window.removeEventListener('mousedown', (e) => this.OnMouseDown);
            window.removeEventListener('mouseup', this.OnMouseUp);
        }
    }

    private OnMouseDown = (e: MouseEvent) => {
        this.state.particlesSettingsManager.mouseBehaviorsManager.onMouseDown?.PS_OnSetMode();

        if (this.IsClickingOnBackground(e)) {
            this.state.particles.forEach((particle) => {
                particle.current?.SetModeMouseDown();
            });
        }
    }

    private OnMouseUp = (e: MouseEvent) => {
        this.state.particlesSettingsManager.mouseBehaviorsManager.onMouseUp?.PS_OnSetMode();

        if (this.IsClickingOnBackground(e)) {
            this.state.particles.forEach((particle) => {
                particle.current?.SetModeMouseUp();
            });
        }
    }

    private IsClickingOnBackground = (e: MouseEvent): boolean => {
        const elementType: string = (e.target as HTMLElement).tagName;

        return (elementType !== "A" && elementType !== "BUTTON" && elementType !== "IMG");
    }
    //#endregion

    render() {
        return (
            <ul className="particle-area">
                <ParticleUtils key={-1} ref={this.state.particleUtils} scrolled={this.state.scrolled} areaSize={this.state.areaSize} mousePosition={this.state.mousePosition} />
                {
                    this.state.particlesJsx.map((particle) => (
                        particle //As JSX.Element
                    ))
                }
            </ul>
        )
    }
}