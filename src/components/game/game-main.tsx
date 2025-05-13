import * as React from 'react';

import Traduction from '../multi-scripts-use/traduction';

import { GetCurrentGameProperties } from "../multi-scripts-use/game-properties";
import { TagType, tagsMap } from '../multi-scripts-use/tags';

import { GameProps } from "./game";

export default class GameMain<P extends GameProps, S> extends React.Component<P, S> {
    private GetTags(): string {
        let returnTags: string = "";
    
        let tags: TagType | undefined;
    
        for (var i = 0; i < GetCurrentGameProperties().tagsIds.length; i++) {
            tags = tagsMap.get(GetCurrentGameProperties().tagsIds[i]);
    
            if (tags !== undefined)
                returnTags += "#" + tags.name[Traduction.GetKeyLanguage()] + "    ";
        }
    
        return returnTags;
    }

    render() {
        return (
            <main className="game-main"
                style={{ backgroundColor: "rgba(" + GetCurrentGameProperties().colors.mainBackgroundColor + ", 0.2)" }}>
                <p className="tags"
                    style={{ color: GetCurrentGameProperties().colors.tagsColor }}>
                    {this.GetTags()}
                </p>
                {
                    GetCurrentGameProperties().videoRef &&
                    <YoutubeEmbed />
                }
                <p className="description"
                    style={{ color: GetCurrentGameProperties().colors.textColor }}>
                    {GetCurrentGameProperties().description[Traduction.GetKeyLanguage()]}
                </p>
            </main>
        )
    }
}

export class YoutubeEmbed<P, S> extends React.Component<P, S> {
    render(): React.ReactNode {
        return (
            <div className="video-container">
                <iframe
                    src={GetCurrentGameProperties().videoRef + "?mute=1&autoplay=1"}
                    allow="encrypted-media;"
                    allowFullScreen
                    title={GetCurrentGameProperties().name} />
            </div>
        )
    }
}