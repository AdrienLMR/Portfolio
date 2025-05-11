import * as React from 'react';

import BestGames from './home-best-games';
import Contacts from '../multi-scripts-use/contacts/contacts';

import './css/home.css';
import './css/home-best-games.css';
import './css/home-web-game.css';

export default class Home<P, S> extends React.Component<P, S> {
    render() {
        return (
            <div className="home-page">
                <img className="background" />
                <BestGames />
                <div className="center">
                    <Contacts />
                </div>
            </div>
        )
    }
}