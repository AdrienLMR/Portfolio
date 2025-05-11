import * as React from 'react';
import { PORTFOLIO_URL } from '../..';

export default class Top extends React.Component {
    render(): React.ReactNode {
        return (
            <section className="profile-top">
                <img src={PORTFOLIO_URL + "profile/top/club.png"} alt="club" />
                <img src={PORTFOLIO_URL + "profile/top/diamond.png"} alt="diamond" />
                <p>Adrien Lemaire</p>
                <img src={PORTFOLIO_URL + "profile/top/heart.png"} alt="heart" />
                <img src={PORTFOLIO_URL + "profile/top/spades.png"} alt="spades" />
            </section>
        )
    }
}