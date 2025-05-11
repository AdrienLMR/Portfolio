import * as React from 'react';
import EventEmitter from 'events';

import { eventRefresh, REFRESH_EVENT } from "../../index";

export const eventLanguage = new EventEmitter();
export const UPDATE_LANGUAGE_EVENT = "UpdateLanguage";

const N_LANGUAGE = 2;

interface TraductionState {
    keyLanguage: number;
}

const gameProperties: Map<String, number> = new Map([
    ["en", 0],
    ["fr", 1],
]);

export default class Traduction<P, S extends TraductionState> extends React.Component<P, S> {
    private static Instance: Traduction<any, any>;

    constructor(props: P) {
        super(props);

        let language:number | undefined = gameProperties.get(navigator.language);

        this.state = {
            keyLanguage: language === undefined ? 0 : language,
        } as S;

        Traduction.Instance = this;
    };

    componentDidMount(): void {
        eventLanguage.addListener(UPDATE_LANGUAGE_EVENT, () => {
            this.setState({
                ...this.state,
                keyLanguage: (this.state.keyLanguage + 1) % N_LANGUAGE,
            });

            eventRefresh.emit(REFRESH_EVENT);
        });
    }

    componentWillUnmount(): void {
        eventLanguage.removeListener(UPDATE_LANGUAGE_EVENT, () => { });
    }

    public static GetKeyLanguage(): number {
        return Traduction.Instance.state.keyLanguage;
    }

    public static Translate(key: number, traductionMap: Map<number, React.ReactNode[]>): React.ReactNode {
        let sentence: React.ReactNode[] | undefined = traductionMap.get(key);

        return sentence ? sentence[Traduction.Instance.state.keyLanguage] : "NOT_FOUND";
    }

    render() {
        return null;
    }
}