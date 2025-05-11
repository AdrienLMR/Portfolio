import * as React from 'react';

export default class WebGame<P, S> extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            ...this.state,

        } as S;
    }

    render() {
        return (
            <section className="web-game">
            </section>
        )
    }
}