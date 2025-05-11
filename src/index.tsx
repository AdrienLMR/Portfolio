import * as React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

import EventEmitter from 'events';
import { Route, Routes, HashRouter as Router } from 'react-router-dom';

import Traduction from "./components/multi-scripts-use/traduction";

import Hud from "./components/hud/hud";
import GameFinder from "./components/hud/hud-game-finder";
import Profile from "./components/profile/profile";
import Home from "./components/home/home";
import Game from "./components/game/game";

//npm start
//npm run deploy

//Jeu de l'accueil => Quand t'appuies sur espace, les trois cartes disparaissent et laissent place à un jeu genre pong

//Tout revoir => QA + code + taille de text (3max ?) + const à la place de let

//Vérifier le touch => Hud descend quand on monte et monte quand on descend
//En reload de page, mettre un timer avant de virer le hud header
//Hud => Déplacer la logique d'animation dans le hud de base. Il possède plusieurs fonctions : (Open, OpenWithAnim, Close, CloseWithAnim) qui va appeler les bonnes fonctions des composants

export const PORTFOLIO_URL = "/Portfolio/";

export const PROFILE = "profile/";
export const HOME = "home/";
export const GAME = "game";

export const eventPageUpdated = new EventEmitter();
export const PAGE_UPDATED_EVENT = "UpdatePage";

export const eventRefresh = new EventEmitter();
export const REFRESH_EVENT = "Refresh";

interface I_Entrypoint {
  currentPage: any;
}

export default class EntryPoint<P, S extends I_Entrypoint> extends React.Component<P, S> {
  constructor(props: P) {
    super(props);

    this.state = {
      currentPage: null,
    } as S;
  }

  componentDidMount(): void {
    eventPageUpdated.setMaxListeners(100);

    eventRefresh.addListener(REFRESH_EVENT, () => {
      this.setState({});

      GameFinder.SetActive(false);
    });
  }

  componentWillUnmount(): void {
    eventRefresh.removeAllListeners();
  }

  private PageUpdated = (jsxElement: React.JSX.Element): React.JSX.Element => {
    eventPageUpdated.emit(PAGE_UPDATED_EVENT);

    let currentPage: string = window.location.href.slice(window.location.href.lastIndexOf("/") + 1);

    if (currentPage !== this.state.currentPage &&
      !currentPage.includes(GAME)) {
      window.scrollTo({ top: 0, behavior: "auto" });

      this.state = {
        ...this.state,
        currentPage: currentPage,
      }
    }

    return jsxElement;
  }

  render() {
    return (
      <Router>
        <Traduction />
        <Hud />
        <Routes>
          <Route path="/" element={<Redirector />} />
          <Route path={PROFILE} element={this.PageUpdated(<Profile />)} />
          <Route path={HOME} element={this.PageUpdated(<Home />)} />
          <Route path={GAME + "/*"} element={this.PageUpdated(<Game />)} />
        </Routes>
      </Router>
    )
  }
}

class Redirector<P, S extends I_Entrypoint> extends React.Component<P, S> {
  constructor(props: P) {
    super(props);

    window.location.href = window.location.href + "/#/" + HOME;
  }

  render() {
    return null;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <EntryPoint />
  // </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();