import * as React from 'react';

import Traduction from '../../multi-scripts-use/traduction';
import { PORTFOLIO_URL } from '../../..';

export default class Contacts extends React.Component {
    private GetCVFromLanguage(): string {
        switch (Traduction.GetKeyLanguage()) {
            case 0:
                return PORTFOLIO_URL + "profile/contacts/Resume_Adrien_LEMAIRE_EN.pdf";
            case 1:
                return PORTFOLIO_URL + "profile/contacts/CV_Adrien_LEMAIRE_FR.pdf";
            default:
                return "";
        }
    }

    render() {
        return (
            <address className="contact">
                <a className="button linkedin" href="https://www.linkedin.com/in/adrien-lemaire-a106b0229/" target="_blank">
                    <img src={PORTFOLIO_URL + "profile/contacts/linkedin.png"} alt="LinkedIn" />
                    <p>LinkedIn</p>
                </a>
                <a className="button mail" href="mailto:adrienlemaire.pro32@gmail.com">
                    <img src={PORTFOLIO_URL + "profile/contacts/mail.png"} alt="Mail" />
                    <p>Mail</p>
                </a>
                <a className="button cv" href={this.GetCVFromLanguage()} download>
                    <img src={PORTFOLIO_URL + "profile/contacts/cv.png"} alt="CV" />
                    <p>CV</p>
                </a>
            </address>
        );
    }
}