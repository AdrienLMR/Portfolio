import * as React from 'react';

import OnScreenDisplayAnim, { ON_ENTER_EVENT, ON_ENTER } from "../multi-scripts-use/mother-classes/on-screen-display-anim";

import Contacts from "../multi-scripts-use/contacts/contacts";
import '../multi-scripts-use/contacts/contacts.css';

import Top from './profile-top';
import Main from './profile-main';
import ExperiencesSection from './profile-experiences';
import Skills from './profile-skills';
import Interests from './profile-interests';

import './css/profile.css';
import './css/profile-top.css';
import './css/profile-main.css';
import './css/profile-experiences.css';
import './css/profile-skills.css';
import './css/profile-interests.css';
import Traduction from '../multi-scripts-use/traduction';
import { friezeMap } from './profile-traduction';

interface I_ProfileState {
    frieze: React.RefObject<ProfileScrollFrieze<any, any>>;
    components: React.RefObject<OnScreenDisplayAnim<any, any>>[];
}

export default class Profile<P, S extends I_ProfileState> extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        let components: React.RefObject<OnScreenDisplayAnim<any, any>>[] = Array(4);

        //Array.fill() ne marche pas car il appelerait une seule fois createref et assignerais cette référence à tous les index
        for (var i = 0; i < components.length; i++) {
            components[i] = React.createRef();
        }

        this.state = {
            ...this.state,
            frieze: React.createRef(),
            components: components,

        } as S;
    }

    componentDidMount(): void {
        window.addEventListener('resize', this.OnViewUpdate);
        window.addEventListener('scroll', this.OnViewUpdate);
    }

    componentWillUnmount(): void {
        window.removeEventListener("resize", this.OnViewUpdate);
        window.removeEventListener("scroll", this.OnViewUpdate);
    }

    private OnViewUpdate = () => {
        this.forceUpdate();

        this.state.components.forEach((component) => {
            component.current?.OnViewUpdate();
        });
    }

    render() {
        return (
            <div className="profile-page">
                <div className="fixed-background"></div>
                {
                    window.innerWidth > 750 &&
                    <ProfileScrollFrieze profile={this} ref={this.state.frieze} />
                }
                <div className="content">
                    <Top />
                    <Main
                        indexInList={0}
                        ref={this.state.components[0] as React.RefObject<Main<any, any>>} />
                    <ExperiencesSection
                        indexInList={1}
                        ref={this.state.components[1] as React.RefObject<ExperiencesSection<any, any>>} />
                    <Skills
                        indexInList={2}
                        ref={this.state.components[2] as React.RefObject<Skills<any, any>>} />
                    <Interests
                        indexInList={3}
                        ref={this.state.components[3] as React.RefObject<Interests<any, any>>} />
                </div>
                <Contacts />
            </div>
        )
    }
}

interface I_ProfileScrollFriezeProps {
    profile: Profile<any, any>;
}

interface I_ProfileScrollFriezeState {
    currentElementKey: number;
    elementsFriezeState: string[];
}

export class ProfileScrollFrieze<P extends I_ProfileScrollFriezeProps, S extends I_ProfileScrollFriezeState> extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        let elementsFriezeState: string[] = Array(4).fill("start-off");
        elementsFriezeState[0] = "hover";

        this.state = {
            ...this.state,
            currentElementKey: 0,
            elementsFriezeState: elementsFriezeState,
        } as S;
    }

    componentDidMount(): void {
        ON_ENTER_EVENT.addListener(ON_ENTER, (indexInList: number) => {
            let elementsFriezeState: string[] = this.state.elementsFriezeState;

            elementsFriezeState[this.state.currentElementKey] = "default";
            elementsFriezeState[indexInList] = "hover";

            this.setState({
                ...this.state,
                currentElementKey: indexInList,
                elementsFriezeState: elementsFriezeState,
            })
        });
    }

    componentWillUnmount(): void {
        ON_ENTER_EVENT.removeAllListeners();
    }

    private ScrollTo(componentIndex: number) {
        let component: OnScreenDisplayAnim<any, any> | null = this.props.profile.state.components[componentIndex].current;

        component?.ScrollToTop(component?.state.scrollToTopOffSet);
    }

    render() {
        return (
            <nav className="frieze">
                <div className="bar"></div>
                <ul className='legend'>
                    <button className={this.state.elementsFriezeState[0]} onClick={() => this.ScrollTo(0)}>{Traduction.Translate(0, friezeMap)}</button>
                    <button className={this.state.elementsFriezeState[1]} onClick={() => this.ScrollTo(1)}>{Traduction.Translate(1, friezeMap)}</button>
                    <button className={this.state.elementsFriezeState[2]} onClick={() => this.ScrollTo(2)}>{Traduction.Translate(2, friezeMap)}</button>
                    <button className={this.state.elementsFriezeState[3]} onClick={() => this.ScrollTo(3)}>{Traduction.Translate(3, friezeMap)}</button>
                </ul>
            </nav>
        );
    }
}