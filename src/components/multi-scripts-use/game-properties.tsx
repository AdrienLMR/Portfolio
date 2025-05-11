import { PORTFOLIO_URL } from "../..";

import { Maths2, Vector2 } from "./utils";

import Game from "../game/game";

import { ModifiersManager, MouseBehaviorsManager, ParticlesDataManager, StylesManager } from "../game/particle/particle-type-management";

import { BehaviorSettings, E_ParticleBehavior } from "../game/particle/particle-behaviors/p_base";
import { P_RandomSettings } from "../game/particle/particle-behaviors/p_random";
import { P_RandomDirectionalSettings } from "../game/particle/particle-behaviors/p_random-directional";

import { E_Modifier } from "../game/particle/particle-components/pc_modifiers";
import { PCMouseBehaviors_Down_AttractAll, PCMouseBehaviors_Down_VortexAll, PCMouseBehaviors_Up_RepelAll, PCMouseBehaviors_Up_RepelNear } from "../game/particle/particle-components/pc_mouse-behaviors";
import { PCStyle_ColorRainbow, PCStyle_MouseUp_RandomRotationNear, PCStyle_RandomColorAtSpawn, PCStyle_RandomRotationAtSpawn, PCStyle_RotationFromMovement, PCStyle_UnitedInfiniteRotation } from "../game/particle/particle-components/pc_styles";

//#region types
export type GameProperties = {
    name: string;
    href: string;
    tagsIds: number[];

    download: boolean;
    description: React.ReactNode[];
    nGameImages: number;
    videoRef?: string;

    colors: GameColors;
    particlesSettingsManager: ParticlesDataManager;

    teammate?: Teammate[];
}

export type GameColors = {
    titleColor: string;
    textColor: string;
    tagsColor: string;
    backgroundColors: string;
    mainBackgroundColor: string;
    bannerColor: string;
    downloadColor?: string;
    downloadColorHover?: string;
}

type Teammate = {
    names: string[];
    job: JobType;
}

enum JobType {
    GA,
    GD,
    GDP,
    GP,
    MS,
    PRD,
    S,
}
//#endregion

//#region Get functions
export function GetGameProperties(gameName: string | undefined): GameProperties {
    if (!gameName) {
        console.error("Wrong game name at \"home-best-game\"");
        return gameProperties.get("bread") as GameProperties;
    }

    return gameProperties.get(gameName) as GameProperties;
}

export function GetCurrentGameProperties(): GameProperties {
    return gameProperties.get(Game.GetGameName()) as GameProperties;
}

export function GetAssetsPath(href: string | undefined): string {
    if (!href) {
        console.error("Wrong game name at \"home-best-game\"");
        return PORTFOLIO_URL + "games/bread/";
    }

    return PORTFOLIO_URL + "games/" + href + "/";
}

export function GetCurrentAssetsPath(): string {
    return PORTFOLIO_URL + "games/" + GetCurrentGameProperties().href + "/";
}

export function GetCurrentGameImagesByIndex(index: number): string {
    if (index + 1 > GetCurrentGameProperties().nGameImages)
        return "";

    return GetCurrentAssetsPath() + "image" + (index + 1) + ".png";
}
//#endregion

export const gameProperties: Map<string, GameProperties> = new Map([
    ["parasited-caverns", {
        name: "PARASITED CAVERNS",
        href: "parasited-caverns",
        tagsIds: [0, 100, 103, 105, 208, 300, 400, 500, 501, 502, 503],
        download: false,
        description: [
            <span><b>Parasited Caverns</b> was the <b>first project</b> I developed at ISART DIGITAL. The goal was to make a <b>2D</b> "<b>Shoot Them Up</b>" with a <b>horizontal scroll</b> while adding a <b>feature from our imagination</b>. I chose to make my ship intangible for a certain amount of time. Constraints: add bonus, breakable walls and an end-game boss.<br />
                I entirely realized the game (Game Design, Level Design, Programming) except for the art.
                <br /><br />
                The game is no longer playable because of Adobe Flash shutting down.
                <br /><br />
                Development engine and language: <b>Animate, AS3</b>.<br />
                Project length: <b>two months</b>.</span>,

            <span><b>Parasited Caverns</b> a été le <b>premier projet</b> développé à ISART DIGITAL. Le but était de créer un "<b>Shoot Them Up</b>" en <b>2D</b> avec un <b>scroll horizontal</b> en utilisant une <b>fonctionnalité de notre imagination</b>. J'ai choisi de rendre mon vaisseau intangible pendant un certain temps. Contraintes : ajouter des bonus, des murs cassables, un boss à la fin.<br />
                J'ai entièrement réalisé le projet (Game Design, Level Design, Programming...) à l'exception des graphismes.
                <br /><br />
                Le jeu n'est plus jouable dû à l'arrêt d'Adobe Flash.
                <br /><br />
                Programmes de développement : <b>Animate, AS3</b>.<br />
                Durée du projet : <b>deux mois</b>.</span>],
        videoRef: "https://www.youtube.com/embed/MDeqs77GafE",
        nGameImages: 4,
        colors: {
            titleColor: "#00CC72",
            textColor: "#2D0000",
            tagsColor: "white",
            backgroundColors: "#00FF8F, #370000",
            mainBackgroundColor: "11, 230, 134",
            bannerColor: "#2D0000, black",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomSettings(E_ParticleBehavior.RandomMovement, Math.PI / 1000, Math.PI / 2),
            {
                nParticles: 20,
                mouseAreaMinMax: new Vector2(50, 100),
                speedMinMax: new Vector2(0.3, 0.4),
                sprites: ["fly"],
                size: Maths2.One.Multiply(8),
            },
            new ModifiersManager(
                [E_Modifier.SpeedOnNearMouse, E_Modifier.PositionOutsideMouseArea, E_Modifier.DirectionOnNearMouse],
                [E_Modifier.SpeedOnNearMouse, E_Modifier.PositionOutsideMouseArea, E_Modifier.DirectionOnNearMouse],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea]
            ),
            new MouseBehaviorsManager(new PCMouseBehaviors_Up_RepelNear(new Vector2(2, 5)), new PCMouseBehaviors_Down_AttractAll(new Vector2(2, 4))),
            new StylesManager([new PCStyle_RotationFromMovement()]),
        ),
    }],
    ["sokoban", {
        name: "SOKOBAN",
        href: "sokoban",
        tagsIds: [0, 100, 104, 105, 205, 300, 400, 500, 501, 502],
        download: false,
        description: [
            <span>Here is the <b>second game</b> I worked on at ISART DIGITAL and the <b>first as part of a group</b>. The goal was to create a “<b>Sokoban</b>” with the constraint of adding a <b>feature from our imagination</b>. We chose to add <b>portals</b> on the blocks. They exchange positions when we push a bloc with a portal in another one.
                <br /><br />
                The game is no longer playable because it is no more hosted by the server.
                <br /><br />
                Development engine and language: <b>Haxe</b>.<br />
                Project length: <b>two months</b>.<br />
                A <b>four-people</b> team.</span>,

            <span>Voici le <b>deuxième jeu</b> sur lequel j'ai travaillé à ISART DIGITAL et le <b>premier en groupe</b>. Le but était de recréer un "<b>Sokoban</b>" en utilisant une <b>fonctionnalité de notre imagination</b>. Nous avons choisi d'ajouter des <b>portails</b> sur les blocs. Quand on pousse un bloc avec un portail dans un autre bloc, ils échangent de position.
                <br /><br />
                Le jeu n'est plus jouable car il n'est plus hébergé sur le serveur.
                <br /><br />
                Programmes de développement : <b>Haxe</b>.<br />
                Durée du projet : <b>deux mois</b>.<br />
                Equipe de <b>quatre</b>.</span>],
        nGameImages: 4,
        colors: {
            titleColor: "#E4E7CC",
            textColor: "black",
            tagsColor: "white",
            backgroundColors: "#E4E7CC, #646657",
            mainBackgroundColor: "240, 242, 218",
            bannerColor: "#332900, black",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomSettings(E_ParticleBehavior.RandomMovement, Math.PI / 1000, Math.PI / 2),
            {
                nParticles: 100,
                mouseAreaMinMax: new Vector2(50, 100),
                speedMinMax: new Vector2(0.15, 0.2),
                sprites: ["yellow-square"],
                size: Maths2.One.Multiply(8),
            },
            new ModifiersManager(
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea]
            ),
            new MouseBehaviorsManager(new PCMouseBehaviors_Up_RepelAll(new Vector2(2, 5))),
            new StylesManager([new PCStyle_RandomRotationAtSpawn()]),
        ),
        teammates: [
            {
                names: ["Samuel HOARAU", "Nils GOURIOU", "Zacharie CALLANDREAU"],
                job: JobType.GDP
            }
        ],
    }],
    ["magnetic-swift", {
        name: "MAGNETIC SWIFT",
        href: "magnetic-swift",
        tagsIds: [0, 100, 103, 105, 207, 300, 400, 500, 501, 502, 503],
        download: false,
        description: [
            <span><b>Magnetic Swift</b> was the <b>third project</b> I developed at ISART DIGITAL, I entirely realized it (Game Design, Programming, “Art”..). The goal was to create a “<b>One Button Game</b>”. This involved using the <b>electromagnetic fields</b> of the magnet in the center to move and prevent it from crashing. When clicked, it reversed the polarity of the magnet.
                <br /><br />
                The game is no longer playable because of Adobe Flash shutting down.
                <br /><br />
                Development engine and language: <b>Animate, AS3</b>.<br />
                Project length: <b>two months</b>.</span>,

            <span><b>Magnetic Swift</b> a été le <b>troisième projet</b> développé à ISART DIGITAL, et je l'ai entièrement réalisé (Game Design, Level Design, Programming..). Le but était de créer un "<b>One Button Game</b>". Il s'agissait d'utiliser les <b>champs électromagnétiques</b> de l'aimant au centre pour bouger et lui éviter de s'écraser. Quand on cliquait, cela inversait la polarité de l'aimant.
                <br /><br />
                Le jeu n'est plus jouable dû à l'arrêt d'Adobe Flash.
                <br /><br />
                Programmes de développement : <b>Animate, AS3</b>.<br />
                Durée du projet : <b>deux mois</b>.</span>],
        videoRef: "https://www.youtube.com/embed/OKqHUbopUlQ",
        nGameImages: 4,
        colors: {
            titleColor: "#989BD9",
            textColor: "#0A001A",
            tagsColor: "white",
            backgroundColors: "#989BD9, #2D2F59",
            mainBackgroundColor: "149, 153, 230",
            bannerColor: "#16003B, black",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomSettings(E_ParticleBehavior.RandomMovement, Math.PI / 1000, Math.PI / 2),
            {
                nParticles: 100,
                mouseAreaMinMax: new Vector2(50, 100),
                speedMinMax: new Vector2(0.15, 0.2),
                sprites: ["rainbow-square-blue"],
                size: Maths2.One.Multiply(8),
            },
            new ModifiersManager(
                [E_Modifier.SpeedOnNearMouse, E_Modifier.PositionOutsideMouseArea, E_Modifier.DirectionOnNearMouse],
                [E_Modifier.SpeedOnNearMouse, E_Modifier.PositionOutsideMouseArea, E_Modifier.DirectionOnNearMouse],
                [E_Modifier.SpeedOnNearMouse, E_Modifier.PositionOutsideMouseArea, E_Modifier.DirectionOnNearMouse],
                [E_Modifier.SpeedOnNearMouse, E_Modifier.PositionOutsideMouseArea, E_Modifier.DirectionOnNearMouse]
            ),
            new MouseBehaviorsManager(new PCMouseBehaviors_Up_RepelAll(new Vector2(10, 10)), new PCMouseBehaviors_Down_AttractAll(new Vector2(5, 5))),
            new StylesManager([new PCStyle_RandomRotationAtSpawn(), new PCStyle_ColorRainbow(true)]),
        ),
    }],
    ["epyleptic", {
        name: "EPYLEPTIC",
        href: "epyleptic",
        tagsIds: [1, 100, 103, 106, 205, 301, 401, 500, 502, 503],
        download: true,
        description: [
            <span><b>/!\ Epileptic game /!\</b>
                <br /><br />
                <b>Epyleptic</b> was developed during my <b>second year</b> at ISART DIGITAL. The goal was to reproduce the game “<b>Rush</b>” on <b>Unity</b> while adding <b>our own levels</b>. Rush is a <b>Puzzle Game</b>. There are cubes that move forward and we have to put tiles on the level design to change their path and get them from A to B.
                <br /><br />
                Creating the level 5 was particularly enjoyable.
                <br /><br />
                Development engine and language: <b>Unity</b>, <b>C#</b>.<br />
                Project length: <b>two months</b>.</span>,

            <span><b>/!\ Jeu épileptique /!\</b>
                <br /><br />
                <b>Epyleptic</b> a été développé durant ma <b>deuxième année</b> à ISART DIGITAL. Le but était de reproduire le jeu "<b>Rush</b>" sur <b>Unity</b> en ajoutant <b>mes propres levels</b>. Rush est un <b>Puzzle Game</b> où l'on doit amener des cubes d'un point A à un point B en rajoutant des tuiles d'actions qui vont changer leur chemin.
                <br /><br />
                J'ai beaucoup aimé créer et développer le niveau 5 !
                <br /><br />
                Programme de développement : <b>Unity</b>, <b>C#</b>.<br />
                Durée du projet : <b>deux mois</b>.</span>],
        videoRef: "https://www.youtube.com/embed/4VQfDRPxmfk",
        nGameImages: 4,
        colors: {
            titleColor: "white",
            textColor: "white",
            tagsColor: "white",
            backgroundColors: "#323232, black",
            mainBackgroundColor: "0, 0, 0",
            bannerColor: "#1A1A1A, black",
            downloadColor: "white",
            downloacColorHover: "green",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomSettings(E_ParticleBehavior.RandomMovement, Math.PI / 1000, Math.PI / 2),
            {
                nParticles: 100,
                mouseAreaMinMax: new Vector2(50, 200),
                speedMinMax: new Vector2(0.15, 0.2),
                sprites: ["rainbow-square-yellow"],
                size: Maths2.One.Multiply(8),
            },
            new ModifiersManager(
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea]
            ),
            new MouseBehaviorsManager(new PCMouseBehaviors_Up_RepelNear(new Vector2(2, 5))),
            new StylesManager([new PCStyle_RandomRotationAtSpawn(), new PCStyle_ColorRainbow(true)]),
        ),
    }],
    ["frogulous", {
        name: "FROGULOUS",
        href: "frogulous",
        tagsIds: [1, 100, 104, 105, 200, 301, 401, 500, 501, 502],
        download: true,
        description: [
            <span><b>Frogulous</b> was developed during my <b>second year</b> at ISART DIGITAL. The goal was to make a <b>platformer</b> with two features presented by the teachers.
                <br /><br />
                You will play a great diva on her way to THE ball. Unfortunately, sometimes things don't go as one would like: on the road, you will find yourself speechless... In no time, you will go to the wood fairy for help! But the lazy fairy doesn't care about such things. What's going to happen?
                <br /><br />
                Development engine and language: <b>Unity, C#</b>.<br />
                Project length: <b>two months</b>.<br />
                A <b>thirteen-person team</b>.</span>,

            <span><b>Frogulous</b> a été développé durant ma <b>deuxième année</b> à ISART DIGITAL. Le but était de faire un <b>platformer</b> en ajoutant des fonctionnalités présentées par les professeurs.
                <br /><br />
                Vous incarnerez une grande diva en route vers LE bal. Malheureusement, parfois, les choses ne se passent pas comme on le voudrait : sur la route, elle se retrouve sans voix... En un rien de temps, elle se rend chez la fée des bois pour obtenir de l'aide ! Mais la fée paresseuse ne se soucie pas de ces choses-là. Que va-t-il se passer ?
                <br /><br />
                Programme de développement : <b>Unity, C#</b>.<br />
                Durée du projet : <b>deux mois</b>.<br />
                Equipe de <b>treize</b>.</span>],
        videoRef: "https://www.youtube.com/embed/hM6Nzbj0590",
        nGameImages: 4,
        colors: {
            titleColor: "#E5C2B8",
            textColor: "#261721",
            tagsColor: "white",
            backgroundColors: "#E5C2B8, #402420",
            mainBackgroundColor: "229, 194, 184",
            bannerColor: "#331423, black",
            downloadColor: "white",
            downloadColorHover: "green",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomSettings(E_ParticleBehavior.RandomMovement, Math.PI / 1000, Math.PI / 2),
            {
                nParticles: 50,
                mouseAreaMinMax: new Vector2(50, 100),
                speedMinMax: new Vector2(0.15, 0.2),
                sprites: ["frogulous-fly"],
                size: Maths2.One.Multiply(12),
            },
            new ModifiersManager(
                [E_Modifier.SpeedOnNearMouse, E_Modifier.PositionOutsideMouseArea, E_Modifier.DirectionOnNearMouse],
                [E_Modifier.SpeedOnNearMouse, E_Modifier.PositionOutsideMouseArea, E_Modifier.DirectionOnNearMouse],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea]
            ),
            new MouseBehaviorsManager(new PCMouseBehaviors_Up_RepelNear(new Vector2(2, 5)), new PCMouseBehaviors_Down_AttractAll(new Vector2(2, 4))),
            new StylesManager([new PCStyle_RotationFromMovement()]),
        ),
        teammates: [
            {
                names: ["Garance LESPAGNOL", "Loic BURTRE", "Samuel HOARAU"],
                job: JobType.GDP
            },
            {
                names: ["Ana BUTNARIU", "Antonin RABAUX", "Eve GROS", "Luca LAMA", "Léa CAPELLETTI", "Léane HUPREL", "Léa MENARD", "Luca SIMEONE"],
                job: JobType.GA
            },
            {
                names: ["Jules BOREL", "Tom MOESCH"],
                job: JobType.MS
            }
        ],
    }],
    ["brick-block", {
        name: "BRICK BLOCK",
        href: "brick-block",
        tagsIds: [1, 100, 104, 105, 200, 301, 401, 500, 501, 502],
        download: false,
        description: [
            <span><b>Brick Block</b> was developed during my <b>second year</b> at ISART DIGITAL. The goal was to make a <b>Free to Play</b> with an emphasis on <b>monetization principles</b>.<br />
                We made a brick breaker.
                <br /><br />
                We had some accidents during the production of this game that made the game non-playable.
                <br /><br />
                Development engine and language: <b>Unity, C#</b>.<br />
                Project length: <b>two months</b>.<br />
                An <b>eight-person team</b>.</span>,

            <span><b>Brick Block</b> a été développé durant ma <b>deuxième année</b> à ISART DIGITAL. Le but était de faire un <b>Free to Play</b> en mettant un accent sur les <b>principes de monétisation</b>.<br />
                Nous avons fait un casse brick.
                <br /><br />
                On a eu quelques accidents de productions qui nous ont empêché de rendre le jeu jouable.
                <br /><br />
                Programme de développement : <b>Unity, C#</b>.<br />
                Durée du projet : <b>deux mois</b>.<br />
                Equipe de <b>huit</b>.</span>
        ],
        nGameImages: 0,
        colors: {
            titleColor: "purple",
            textColor: "white",
            tagsColor: "yellow",
            backgroundColors: "purple, black",
            mainBackgroundColor: "0, 0, 0",
            bannerColor: "purple, black",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new BehaviorSettings(E_ParticleBehavior.Linear),
            {
                nParticles: 3,
                mouseAreaMinMax: new Vector2(100, 200),
                speedMinMax: new Vector2(0.8, 1.6),
                sprites: ["yellow-ball", "blue-ball", "red-ball"],
                size: Maths2.One.Multiply(32),
            },
            new ModifiersManager(
                [E_Modifier.BounceOnNear, E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.BounceOnNear, E_Modifier.PositionOutsideMouseArea],
            ),
            new MouseBehaviorsManager(new PCMouseBehaviors_Up_RepelNear(Maths2.One)),
            new StylesManager(),
        ),
        teammates: [
            {
                names: ["Henri VIELLARD", "Taïs PRIÉ", "Pierre MILLIN", "Vianney MATHIEU", "Félix JEANMONNOT"],
                job: JobType.GD
            },
            {
                names: ["Nils GOURIOU", "Anaëlle MENCIAS"],
                job: JobType.GDP
            }
        ],
    }],
    ["welcome-easter-island", {
        name: "WELCOME EASTER ISLAND",
        href: "welcome-easter-island",
        tagsIds: [2, 100, 102, 104, 106, 204, 301, 401, 500],
        download: true,
        description: [
            <span><b>Welcome Easter Island</b> was the first project I developed during a <b>Game Jam</b> at ISART DIGITAL. The theme was “<b>60 million consumers</b>”.
                <br /><br />
                You will play the last Moaï statue from Easter Island. Your goal is to exterminate humans that pollute the island, diminish the level of the ocean and bring out your lost friends.
                <br /><br />
                There are <b>two game versions</b>, the <b>Game Jam version</b> and the <b>final version</b>. Here is the <b>final one</b>.
                <br /><br />
                Development engine and language: <b>Unity, C#</b>.<br />
                Project length: <b>Game jam version (1 week) / final version (10 days)</b>.<br />
                A <b>nine-people</b> team.</span>,

            <span><b>Welcome Easter Island</b> est un projet réalisé pendant une <b>Game Jam</b> à ISART DIGITAL. Le thème était "<b>60 millions de consommateurs</b>".
                <br /><br />
                Vous jouez la dernière statue Moaï de l'île de Paques. Votre but est d'exterminer les humains qui polluent l'île, pour diminuer le niveau de l'océan et faire émerger vos anciens amis.
                <br /><br />
                Il y a <b>deux versions</b> du jeu, la version de la <b>Game Jam</b> et la <b>version finale</b>. Voici la <b>version finale</b>.
                <br /><br />
                Programme de développement : <b>Unity, C#</b>.<br />
                Durée du projet : <b>version de la Game Jam (une semaine) / version finale (dix jours)</b>.<br />
                Equipe de <b>neuf</b>.</span>],
        videoRef: "https://www.youtube.com/embed/39p6-jkCtio",
        nGameImages: 4,
        colors: {
            titleColor: "#96B123",
            textColor: "#1F2600",
            tagsColor: "white",
            backgroundColors: "#96B123, #1F2600",
            mainBackgroundColor: "158, 179, 71",
            bannerColor: "#16283f, black",
            downloadColor: "white",
            downloadColorHover: "white",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomSettings(E_ParticleBehavior.RandomMovement, Math.PI / 1000, Math.PI / 2),
            {
                nParticles: 200,
                mouseAreaMinMax: new Vector2(50, 100),
                speedMinMax: new Vector2(0.3, 0.4),
                sprites: ["water"],
                size: Maths2.One.Multiply(10),
            },
            new ModifiersManager(
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea],
            ),
            new MouseBehaviorsManager(new PCMouseBehaviors_Up_RepelNear(new Vector2(2, 5))),
            new StylesManager(),
        ),
        teammates: [
            {
                names: ["Axel GERBEAUD"],
                job: JobType.GP
            },
            {
                names: ["Sarah JABY", "Ronan LE GOUBEY", "Maelle FOURNIER", "Etienne SACHOT"],
                job: JobType.GA
            },
            {
                names: ["Paul MALLET", "David DIAN"],
                job: JobType.GD
            },
            {
                names: ["Loic BILLEN"],
                job: JobType.MS
            }
        ],
    }],
    ["a-second-chance", {
        name: "A SECOND CHANCE",
        href: "a-second-chance",
        tagsIds: [2, 100, 104, 106, 20, 204, 302, 402, 500, 501, 502],
        download: true,
        description: [
            <span><b>A Second Chance</b> is a project from my <b>third year</b> at ISART DIGITAL. The goal was to create an <b>Action Narration</b> game, not necessarily a “Point and Click”.
                <br /><br />
                In this game, you play an alien on a planet far away. You lived in peace with your congeners until other aliens crashed on your planet.<br />
                At first, everything went well, and then you noticed that nature had slowly changed. Unfortunately, it was too late, the new aliens had started to adapt nature to their needs, and your people were starting to die. Before disappearing, your species gathered its strength and the energy of the planet one last time to bring you back to the past and try to change the course of things. Will you take your revenge and eradicate the other aliens? Or try to find a way to coexist?<br />
                You have one...last...chance.
                <br /><br />
                Development engine and language: <b>Unreal Engine</b>, <b>Blueprint</b>.<br />
                Project length: <b>Two months</b>.<br />
                A <b>four-people</b> team.</span>,

            <span><b>A Second Chance</b> est un projet de <b>troisième année</b> à ISART DIGITAL. Le but était de créer un jeu <b>narratif</b> avec de l'<b>action</b>, et non nécessairement un "Point And Click".
                <br /><br />
                Dans ce jeu, vous jouez un alien sur une planète lointaine. Vous viviez en paix avec vos congénères jusqu'à ce que d'autres aliens s'écrasent sur votre planète.<br />
                Au début tout se passe bien, et puis vous remarquez que la nature change lentement. Malheureusement, il est trop tard, les nouveaux extraterrestres ont adapté la nature à leurs besoins, et votre peuple commence à mourir. Avant de disparaître, votre espèce rassemble une dernière fois ses forces et l'énergie de la planète pour vous faire revenir dans le passé, et tenter de changer le cours des choses. Allez-vous prendre votre revanche et éradiquer les autres aliens ? Ou essayer de trouver un moyen de coexister ?<br />
                Vous avez une... dernière... chance.
                <br /><br />
                Programme de développement : <b>Unreal Engine</b>, <b>Blueprint</b>.<br />
                Durée du projet : <b>deux mois</b>.<br />
                Equipe de <b>quatre</b>.</span>],
        videoRef: "https://www.youtube.com/embed/gOMWWb-wd7E",
        nGameImages: 4,
        colors: {
            titleColor: "#ADBF80",
            textColor: "#1E2608",
            tagsColor: "white",
            backgroundColors: "#ADBF80, #1E2608",
            mainBackgroundColor: "173, 191, 128",
            bannerColor: "#1E2608, black",
            downloadColor: "white",
            downloadColorHover: "blue",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomSettings(E_ParticleBehavior.RandomMovement, Math.PI / 1000, Math.PI / 2),
            {
                nParticles: 200,
                mouseAreaMinMax: new Vector2(50, 100),
                speedMinMax: new Vector2(0.3, 0.4),
                sprites: ["water"],
                size: Maths2.One.Multiply(10),
            },
            new ModifiersManager(
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea],
            ),
            new MouseBehaviorsManager(new PCMouseBehaviors_Up_RepelNear(new Vector2(2, 5))),
            new StylesManager(),
        ),
        teammates: [
            {
                names: ["Clément MARTIN", "Valentin RINCHEVAL", "Stephen SIBA"],
                job: JobType.GDP
            }
        ],
    }],
    ["depth-of-budapest", {
        name: "DEPTH OF BUDAPEST",
        href: "depth-of-budapest",
        tagsIds: [2, 100, 104, 106, 201, 206, 302, 402, 500],
        download: true,
        description: [
            <span><b>Depth Of Budapest</b> is a project from my <b>third year</b> at ISART DIGITAL. The goal was to create a <b>RPG</b>.
                <br /><br />
                Since “The Fall”, Budapest has become a central town where you can extract and exchange a special ore: The Shroomore.<br />
                Play as Agnes Toth, director of an ambitious start-up seeking to recover mineral deposits.<br />
                •	Confront your enemies strategically with your own drill: you must find a balance between defending yourself against attacks from competitors and using your energy to recover as much ore as possible.<br />
                •	Explore the completely transformed city of Budapest and become the manager of the richest company.
                <br /><br />
                Development engine and language: <b>Unreal Engine</b>, <b>Blueprint</b>.<br />
                Project length: <b>Three months</b>.<br />
                A <b>twenty-one</b> people team.</span>,

            <span><b>Depth Of Budapest</b> est un projet de <b>troisième année</b> à ISART DIGITAL. Le but était de créer un <b>RPG</b>.
                <br /><br />
                Depuis "La chute", Budapest est devenu une ville centrale pour extraire et échanger un minerai spécial : le Shroomore.<br />
                Jouez en tant qu'Agnes Toth, dirigeante d'une ambitieuse start-up cherchant à récupérer les dépôts de minerais.<br />
                •	Affrontez vos ennemis stratégiquement avec votre propre foreuse : vous devez trouver un équilibre entre votre défense contre les attaques des concurrents, et l'utilisation de votre énergie pour récupérer le plus possible de minerais.<br />
                •	Explorez la ville de Budapest complètement transformée et devenez la gérante de l'entreprise la plus riche.
                <br /><br />
                Programme de développement : <b>Unreal Engine</b>, <b>Blueprint</b>.<br />
                Durée du projet : <b>trois mois</b>.<br />
                Equipe de <b>vingt et un</b>.</span>],
        videoRef: "https://www.youtube.com/embed/l_dwpl9eDiE",
        nGameImages: 4,
        colors: {
            titleColor: "#453375",
            textColor: "#B2C0D7",
            tagsColor: "white",
            backgroundColors: "#453375, #190F33",
            mainBackgroundColor: "83, 61, 140",
            bannerColor: "#190F33, black",
            downloadColor: "white",
            downloadColorHover: "gray",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomDirectionalSettings(E_ParticleBehavior.Amber, Math.PI / 100, Math.PI / 10, new Vector2(-Math.PI * 7 / 10, -Math.PI * 3 / 10)),
            {
                nParticles: 40,
                mouseAreaMinMax: new Vector2(50, 100),
                speedMinMax: new Vector2(0.3, 0.5),
                sprites: [
                    "amber1",
                    "amber2", "amber2", "amber2",
                    "amber3", "amber3", "amber3",
                    "amber4", "amber4",
                    "amber5", "amber5",
                    "amber6"],
                size: Maths2.One.Multiply(8),
            },
            new ModifiersManager(),
            new MouseBehaviorsManager(),
            new StylesManager([new PCStyle_RotationFromMovement()]),
        ),
        teammates: [
            {
                names: ["Titouan MIRABEAU", "Raphaël MACHADO DA COSTA", "William GARRABOS", "Louis-Marie KERBERENES", "Hugo MADONNA"],
                job: JobType.GD
            },
            {
                names: ["Valentin RINCHEVAL", "Anaelle MENCIAS", "Gabriel MUGNAINI"],
                job: JobType.GDP
            },
            {
                names: ["Ange MALAURIE", "Léane HUPREL", "Léa HINARD", "Sarah JABY", "Stefano MANENTE", "Lyam BARRÈS", "Marie LE GUEN", "Floriane MADÉRY", "Léa GAUDIN"],
                job: JobType.GA
            },
            {
                names: ["Sasha LEGRAND", "Léo LORCET", "Manon MÉHALIN"],
                job: JobType.GP
            }
        ],
    }],
    ["bread", {
        name: "BREAD",
        href: "bread",
        tagsIds: [3, 100, 104, 106, 107, 207, 302, 402, 500, 501, 502],
        download: true,
        description: [
            <span><b>Bread</b> was my <b>first game in VR</b> at ISART DIGITAL during my <b>fourth year</b>.
                <br /><br />
                You are a baker and must master the entire production chain (cultivating the wheat, making the dough, cooking it, and selling the bread) to satisfy an increasing number of customers.
                <br /><br />
                Development engine and language: <b>Unreal Engine</b>, <b>Blueprint</b>.<br />
                Project length: <b>Three months</b>.<br />
                A <b>four-people</b> team.</span>,

            <span><b>Bread</b> fut mon <b>premier projet en VR</b> à ISART DIGITAL durant ma <b>4ème année</b>.
                <br /><br />
                Vous êtes boulanger et devez maitriser toute la chaine de production (cultiver le blé, fabriquer la pâte, la faire cuire, et vendre le pain) pour satisfaire des clients de plus en plus nombreux.
                <br /><br />
                Programme de développement : <b>Unreal Engine</b>, <b>Blueprint</b>.<br />
                Durée du projet : <b>trois mois</b>.<br />
                Equipe de <b>quatre</b>.</span>],
        videoRef: "https://www.youtube.com/embed/ipFOtwEr6RM",
        nGameImages: 3,
        colors: {
            titleColor: "#D38B29",
            textColor: "#331D00",
            tagsColor: "white",
            backgroundColors: "#D38B29, #331D00",
            mainBackgroundColor: "211, 139, 41",
            bannerColor: "#331D00, black",
            downloadColor: "white",
            downloadColorHover: "red",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomDirectionalSettings(E_ParticleBehavior.Amber, Math.PI / 100, Math.PI / 10, new Vector2(-Math.PI * 9 / 10, -Math.PI / 10)),
            {
                nParticles: 100,
                mouseAreaMinMax: new Vector2(50, 100),
                speedMinMax: new Vector2(0.2, 0.3),
                sprites: [
                    "amber1",
                    "amber2", "amber2", "amber2",
                    "amber3", "amber3", "amber3",
                    "amber4", "amber4",
                    "amber5", "amber5",
                    "amber6"],
                size: Maths2.One.Multiply(8),
            },
            new ModifiersManager(),
            new MouseBehaviorsManager(),
            new StylesManager([new PCStyle_RotationFromMovement()]),
        ),
        teammates: [
            {
                names: ["Gabriel BERNABEU", "Jordan SALLOT", "Thomas DEBAILLEUX"],
                job: JobType.GDP
            }
        ],
    }],
    ["out-of-bones", {
        name: "OUT OF BONES",
        href: "out-of-bones",
        tagsIds: [3, 100, 104, 107, 302, 402, 500, 501, 503],
        download: true,
        description: [
            <span><b>Out of Bones</b> was my <b>last project</b> at ISART DIGITAL during my <b>fourth and last year</b>.<br />
                It was a cooperative game in VR where you had to solve puzzles.
                <br /><br />
                You play as two skeletons who were once guinea pigs in a milk factory, forgotten after its closure.<br />
                Following the absurd request of a skeleton who appeared out of nowhere, you must embark on a quest to find the legendary Golden Milk.<br />
                As skeletons, you can detach your arms to create a pole, allowing them to reach tricky places or items. Additionally, you can attach your arms elsewhere to control them remotely.
                <br /><br />
                Development engine and language: <b>Unreal Engine</b>, <b>Blueprint</b>.<br />
                Project length: <b>Nine months</b>.<br />
                A <b>sixteen-people</b> team.</span>,

            <span><b>Out of Bones</b> fut mon <b>dernier projet</b> à ISART DIGITAL durant ma <b>4ème année</b>.
                Ce fut le <b>projet de fin d'étude</b> qui clôtura mon Master. Un <b>puzzle game VR en coopération</b>.
                <br /><br />
                Vous incarnez deux squelettes qui furent autrefois cobayes dans une usine de lait, puis oubliés après sa fermeture.<br />
                À la suite de la demande insensée d'un squelette venu de nulle part, vous devrait partir à la recherche du légendaire Lait d'Or.<br />
                En tant que squelettes, vous aurez la capacité de détacher vos bras pour créer une perche, vous permettant d'atteindre des endroits ou des objets difficiles d'accès. De plus, vous pourrez fixer vos bras à d'autres endroits pour les contrôler à distance.
                <br /><br />
                Programme de développement : <b>Unreal Engine</b>, <b>Blueprint</b>.<br />
                Durée du projet : <b>neuf mois</b>.<br />
                Equipe de <b>seize</b>.</span>],
        nGameImages: 4,
        videoRef: "https://www.youtube.com/embed/CI3KHoK9lwA",
        colors: {
            titleColor: "#2A284F",
            textColor: "#FFFFFF",
            tagsColor: "#FFFFFF",
            backgroundColors: "#A56728, #2A284F",
            mainBackgroundColor: "0, 0, 0",
            bannerColor: "#2A284F, #D08132",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomDirectionalSettings(E_ParticleBehavior.Amber, Math.PI / 100, Math.PI / 10, new Vector2(-Math.PI * 9 / 10, -Math.PI / 10)),
            {
                nParticles: 100,
                mouseAreaMinMax: new Vector2(50, 100),
                speedMinMax: new Vector2(0.2, 0.3),
                sprites: [
                    "amber1",
                    "amber2", "amber2", "amber2",
                    "amber3", "amber3", "amber3",
                    "amber4", "amber4",
                    "amber5", "amber5",
                    "amber6"],
                size: Maths2.One.Multiply(8),
            },
            new ModifiersManager(),
            new MouseBehaviorsManager(),
            new StylesManager([new PCStyle_RotationFromMovement()]),
        ),
        teammates: [
            {
                names: ["Loïc BURTRE"],
                job: JobType.GDP
            },
            {
                names: ["Max HUMBERT", "Romain ANCIAUME"],
                job: JobType.PRD
            },
            {
                names: ["Guillaume CHICLET, Lancelot MARECHAL"],
                job: JobType.GP
            },
            {
                names: ["Roman RALITE", "Joseph PERNISCO", "Lily ROZIER", "Stefano MANENTE", "Naëlle TRAVO"],
                job: JobType.GA
            },
            {
                names: ["Valentin BOIDART"],
                job: JobType.MS
            },
            {
                names: ["Malo GUYON", "Justin LEGER", "Quentin CUDEL", "Pierre MILLIN"],
                job: JobType.GD
            }
        ],
    }],
    ["morpion", {
        name: "MORPION",
        href: "morpion",
        tagsIds: [0, 101, 103, 105, 206, 300, 400, 500, 503],
        download: false,
        description: [
            <span><b>Morpion</b> was my <b>first personal project</b> that I developed during my <b>first year</b> at ISART DIGITAL.<br />
                This is a simple tic-tac-toe.
                <br /><br />
                The game is no longer playable because of Adobe Flash shutting down.
                <br /><br />
                Development engine and language: <b>Animate, AS3</b>.
            </span>,

            <span>Le <b>Morpion</b> a été mon <b>premier projet personnel</b> que j'ai développé pendant ma <b>première année</b> à ISART DIGITAL.<br />
                Comme le nom l'indique, c'est un simple morpion.
                <br /><br />
                Le jeu n'est plus jouable dû à l'arrêt d'Adobe Flash.
                <br /><br />
                Programmes de développement : <b>Animate et AS3</b>.</span>],
        nGameImages: 2,
        colors: {
            titleColor: "#D3DAE9",
            textColor: "#687A94",
            tagsColor: "white",
            backgroundColors: "#FCF9EA, #687A94",
            mainBackgroundColor: "252, 249, 234",
            bannerColor: "#1A2433, black",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomDirectionalSettings(E_ParticleBehavior.Fall, Math.PI / 100, Math.PI / 10, new Vector2(Math.PI / 10, Math.PI * 9 / 10)),
            {
                nParticles: 150,
                mouseAreaMinMax: new Vector2(50, 100),
                speedMinMax: new Vector2(0.15, 0.2),
                sprites: ["flake1", "flake2", "flake3"],
                size: Maths2.One.Multiply(8),
            },
            new ModifiersManager(
                [E_Modifier.PositionOutsideMouseArea, E_Modifier.SpeedStopOnTopOfMouse],
                [E_Modifier.PositionOutsideMouseArea, E_Modifier.SpeedStopOnTopOfMouse],
            ),
            new MouseBehaviorsManager(),
            new StylesManager([new PCStyle_UnitedInfiniteRotation(1)]),
        ),
    }],
    ["you", {
        name: "YOU",
        href: "you",
        tagsIds: [1, 101, 103, 202, 203, 401, 500, 501, 503],
        download: true,
        description: [
            <span>“<b>You</b>” was my <b>second personal project</b> that I developed during my <b>first year</b> at ISART DIGITAL. It is a <b>textual game</b>.
                <br /><br />
                A little fantasy game lasting around fifteen minutes in the style of a “Book in which you are the hero”.
                <br /><br />
                Development engine and language: <b>C#</b>.</span>,

            <span>"<b>You</b>" a été mon <b>deuxième projet personnel</b> que j'ai développé après ma <b>première année</b> à ISART DIGITAL. C'est un <b>jeu textuel</b>.
                <br /><br />
                Un petit jeu de fantaisie d'une quinzaine de minute à la manière d'un « Livre dont vous êtes le héros ».
                <br /><br />
                Langage de développement : <b>C#</b>.</span>],
        nGameImages: 0,
        colors: {
            titleColor: "gray",
            textColor: "black",
            tagsColor: "white",
            backgroundColors: "#606060, black",
            mainBackgroundColor: "96, 96, 96",
            bannerColor: "black, black",
            downloadColor: "gray",
            downloadColorHover: "white",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomSettings(E_ParticleBehavior.RandomMovement, Math.PI / 1000, Math.PI / 2),
            {
                nParticles: 150,
                mouseAreaMinMax: new Vector2(50, 100),
                speedMinMax: new Vector2(0.15, 0.2),
                sprites: [
                    "you/a",
                    "you/b",
                    "you/c",
                    "you/d",
                    "you/e",
                    "you/f",
                    "you/g",
                    "you/h",
                    "you/i",
                    "you/j",
                    "you/k",
                    "you/l",
                    "you/m",
                    "you/n",
                    "you/o",
                    "you/p",
                    "you/q",
                    "you/r",
                    "you/s",
                    "you/t",
                    "you/u",
                    "you/v",
                    "you/w",
                    "you/x",
                    "you/y",
                    "you/z",
                    "you/!",
                    "you/{",
                    "you/}",
                    "you/0",
                    "you/1",
                    "you/2",
                    "you/3",
                    "you/4",
                    "you/5",
                    "you/6",
                    "you/7",
                    "you/8",
                    "you/9"
                ],
                size: Maths2.One.Multiply(8),
            },
            new ModifiersManager(
                [E_Modifier.PositionOutsideMouseArea, E_Modifier.DirectionOnNearMouse],
                [E_Modifier.PositionOutsideMouseArea, E_Modifier.DirectionOnNearMouse],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea]
            ),
            new MouseBehaviorsManager(new PCMouseBehaviors_Up_RepelNear(new Vector2(2, 5)), new PCMouseBehaviors_Down_VortexAll(new Vector2(4, 5))),
            new StylesManager([new PCStyle_RandomRotationAtSpawn(), new PCStyle_MouseUp_RandomRotationNear()]),
        ),
    }],
    ["ultimate-button", {
        name: "ULTIMATE BUTTON",
        href: "ultimate-button",
        tagsIds: [1, 102, 104, 105, 207, 301, 401, 500, 501],
        download: true,
        description: [
            <span><b>Ultimate Button</b> is a game I developed during my <b>first Game Jam</b>. It was organized by some students at ISART DIGITAL. The theme was “<b>Make this button fun</b>”, it comes from <b>Jonas Tyroller</b>'s video on Youtube: <a href="https://www.youtube.com/watch?v=7L1B5YaxxoA" target="_blank" rel="noreferrer">https://www.youtube.com/watch?v=7L1B5YaxxoA</a>.<br />
                We also had the modifier: “<b>Color</b>”.<br />
                The goal is to match the background color and the button before the time's up.<br />
                You have <b>three lives</b>. Try to last!
                <br /><br />
                Development engine and language: <b>Unity, C#</b>.<br />
                Project length: <b>Three hours</b>.<br />
                A <b>two-person</b> team.</span>,

            <span><b>Ultimate Button</b> est jeu réalisé au cours de ma <b>première Game Jam</b>, organisée par des élèves à ISART DIGITAL. La <b>Game Jam</b> avait pour thème : "<b>Rendez ce bouton fun</b>", il vient de la vidéo de <b>Jonas Tyroller</b> : <a href="https://www.youtube.com/watch?v=7L1B5YaxxoA" target="_blank" rel="noreferrer">https://www.youtube.com/watch?v=7L1B5YaxxoA</a>.<br />
                Nous avions aussi le modificateur : "<b>Couleur</b>".<br />
                Le but est de faire correspondre la couleur du bouton avec celle du fond d'écran avant qu'il ne change.<br />
                Vous disposez de <b>trois vies</b>. Essayez de tenir le plus longtemps !
                <br /><br />
                Programme de développement : <b>Unity, C#</b>.<br />
                Durée du projet : <b>3 heures</b>.<br />
                Equipe de <b>deux</b>.</span>],
        nGameImages: 0,
        colors: {
            titleColor: "#E647DD",
            textColor: "white",
            tagsColor: "white",
            backgroundColors: "#E647DD, #2020B3",
            mainBackgroundColor: "178, 192, 215",
            bannerColor: "#330030, black",
            downloadColor: "white",
            downloadColorHover: "green",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomSettings(E_ParticleBehavior.RandomMovement, Math.PI / 1000, Math.PI / 2),
            {
                nParticles: 100,
                mouseAreaMinMax: new Vector2(50, 100),
                speedMinMax: new Vector2(0.15, 0.2),
                sprites: ["rainbow-square-yellow"],
                size: Maths2.One.Multiply(8),
            },
            new ModifiersManager(
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea]
            ),
            new MouseBehaviorsManager(new PCMouseBehaviors_Up_RepelAll(new Vector2(2, 5)), new PCMouseBehaviors_Down_AttractAll(new Vector2(2, 4))),
            new StylesManager([new PCStyle_RandomRotationAtSpawn(), new PCStyle_RandomColorAtSpawn([0, 60, 120, 180, 240, 300]), new PCStyle_MouseUp_RandomRotationNear()]),
        ),
        teammates: [
            {
                names: ["Florian MARCELLOT"],
                job: JobType.GDP,
            }
        ],
    }],
    ["carroot", {
        name: "CARROOT",
        href: "carroot",
        tagsIds: [2, 102, 104, 105, 200, 301, 401, 500, 503],
        download: true,
        description: [
            <span><b>Carroot</b> is a Game I made during the <b>Global Game Jam 2023</b>. The theme was “<b>Root</b>”.
                <br /><br />
                In <b>Carroot</b>, a <b>single-player 2D Platformer</b>, you become a fierce carrot seed trying to escape hungry bunnies. Even if you <b>can't jump</b>, your surprising abilities, "Throw-rtal" and "Sprout-climbing", allow you to reach far horizons with special moves.<br />
                Will you manage to escape quickly enough in these mazes?
                <br /><br />
                Development engine and language: <b>Unity, C#</b>.<br />
                Project length: <b>Two days</b>.<br />
                A <b>five-people</b> team.</span>,

            <span><b>Carroot</b> est un jeu sur lequel j'ai travaillé pendant la <b>Global Game Jam 2023</b>. Le thème était : "<b>Root</b>".
                <br /><br />
                Dans <b>Carroot</b>, un <b>Platformer 2D jouable en solo</b>, devenez une féroce graine de carotte essayant d'échapper aux lapins affamés. Même si vous n'êtes <b>pas capable de sauter</b>, vos capacités surprenantes, "Throw-rtal" et "Sprout-climbing" vous permettent d'atteindre de lointain horizons avec des déplacements spéciaux.<br />
                Allez-vous réussir à vous échapper assez vite dans ces labyrinthes ?
                <br /><br />
                Programme de développement : <b>Unity, C#</b>.<br />
                Durée du projet : <b>deux jours</b>.<br />
                Equipe de <b>cinq</b>.</span>],
        videoRef: "https://www.youtube.com/embed/yGyrPeGtDqw",
        nGameImages: 4,
        colors: {
            titleColor: "#884B2B",
            textColor: "#260000",
            tagsColor: "white",
            backgroundColors: "#884B2B, #260D00",
            mainBackgroundColor: "204, 137, 102",
            bannerColor: "#260D00, black",
            downloadColor: "white",
            downloadColorHover: "white",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomDirectionalSettings(E_ParticleBehavior.Fall, Math.PI / 1000, Math.PI / 10, new Vector2(Math.PI * 3 / 10, Math.PI * 7 / 10)),
            {
                nParticles: 20,
                mouseAreaMinMax: new Vector2(50, 100),
                speedMinMax: new Vector2(0.15, 0.2),
                sprites: ["leaf"],
                size: Maths2.One.Multiply(32),
            },
            new ModifiersManager(
                [E_Modifier.SpeedStopOnTopOfMouse, E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.SpeedStopOnTopOfMouse, E_Modifier.PositionOutsideMouseArea],
                [],
                []
            ),
            new MouseBehaviorsManager(),
            new StylesManager([new PCStyle_RotationFromMovement()]),
        ),
        teammates: [
            {
                names: ["Alexandre COULON", "Christian CHAUX", "Clément MARTIN"],
                job: JobType.GDP
            },
            {
                names: ["Vincent DUPONT"],
                job: JobType.GD
            }
        ],
    }],
    ["flowtex", {
        name: "FLOWTEX",
        href: "flowtex",
        tagsIds: [2, 102, 104, 105, 207, 301, 401, 500, 503],
        download: true,
        description: [
            <span>I worked on <b>Flowtex</b> during the <b>Scientific Game Jam 2023</b>. The theme was to create an <b>educational game</b> on a <b>thesis</b> about <b>vortices in a quantum fluid</b>, with the help of a <b>physicist</b> who guided us on-site.
                <br /><br />
                A deviant robot challenges its creator. They pull out all the stops and clash with quantum vortexes! The mechanics are based on interactions between vortices in quantum fluids. Two vortices with the same rotation will create a stronger one while two different vortices will cancel each other out.
                <br /><br />
                <b>At least one controller is required to play, ideally two.</b>
                <br /><br />
                Development engine and language: <b>Unity, C#</b>.<br />
                Project length: <b>Two days</b>.<br />
                A <b>six-person</b> team.
            </span>,

            <span>J'ai travaillé sur <b>Flowtex</b> pendant la <b>Scientific Game Jam 2023</b>. Le thème était de réaliser un <b>jeu à but éducatif</b> sur une <b>thèse</b> à propos des <b>vortex dans un fluide quantique</b>, avec l'aide d'un <b>physicien</b> qui nous guidait sur place.
                <br /><br />
                Un robot déviant défie sa créatrice. Ils sortent le grand jeu et s'affrontent à coups de vortex quantiques ! Les mécaniques sont basées sur les interactions entre vortex dans les fluides quantiques. Deux vortex de même rotation vont en créer un plus fort tandis que deux vortex différents vont s'annuler.
                <br /><br />
                <b>Au moins une manette est nécessaire pour jouer, idéalement deux.</b>
                <br /><br />
                Programme de développement : <b>Unity, C#</b>.<br />
                Durée du projet : <b>deux jours</b>.<br />
                Equipe de <b>six</b>.</span>],
        videoRef: "https://www.youtube.com/embed/eeOS3ZAgExI",
        nGameImages: 4,
        colors: {
            titleColor: "#C3C1C1",
            textColor: "#333232",
            tagsColor: "white",
            backgroundColors: "#C3C1C1, #333232",
            mainBackgroundColor: "195, 193, 193",
            bannerColor: "#333232, black",
            downloadColor: "white",
            downloadColorHover: "gray",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomSettings(E_ParticleBehavior.RandomMovement, Math.PI / 1000, Math.PI / 2),
            {
                nParticles: 100,
                mouseAreaMinMax: new Vector2(25, 100),
                speedMinMax: new Vector2(0.15, 0.2),
                sprites: ["cell"],
                size: Maths2.One.Multiply(8),
            },
            new ModifiersManager(
                [E_Modifier.ReverseSpeedOnNearMouse, E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.ReverseSpeedOnNearMouse, E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea]
            ),
            new MouseBehaviorsManager(new PCMouseBehaviors_Up_RepelAll(new Vector2(2, 5)), new PCMouseBehaviors_Down_VortexAll(new Vector2(2, 3))),
            new StylesManager(),
        ),
        teammates: [
            {
                names: ["Myrann ABOBAKER"],
                job: JobType.S
            },
            {
                names: ["Simon DUCOS"],
                job: JobType.GD
            },
            {
                names: ["Clément MARTIN"],
                job: JobType.GDP
            },
            {
                names: ["Aimé ESTRAGON"],
                job: JobType.GA
            },
            {
                names: ["Adrien DAUTEL"],
                job: JobType.MS
            }
        ],
    }],
    ["la-vie-nulle-de-robert", {
        name: "LA VIE NULLE DE ROBERT",
        href: "la-vie-nulle-de-robert",
        tagsIds: [3, 102, 104, 105, 301, 401, 500, 501, 503],
        download: true,
        description: [
            <span>I worked on <b>La Vie Nulle de Robert</b> during the <b>Global Game Jam 2024</b>. The theme was : <b>Make us laugh</b>.
                <br />
                It is a <b>narrative game</b> in which we follow the life of a character from <b>birth to death</b>.
                <br /><br />
                Development engine and language: <b>Unity, C#</b>.<br />
                Project length: <b>Two days</b>.<br />
                A <b>six-person</b> team.
            </span>,
            <span><b>La Vie Nulle de Robert</b> est un jeu sur lequel j'ai travaillé pendant la <b>Global Game Jam 2024</b>. Le thème était : <b>Faites-nous rire</b>.
                <br />
                C'est un <b>jeu narratif</b> dans lequel on suit la vie d'un personnage de sa <b>naissance à sa mort</b>.
                <br /><br />
                Programme de développement : <b>Unity, C#</b>.<br />
                Durée du projet : <b>deux jours</b>.<br />
                Equipe de <b>six</b>.</span>],
        videoRef: "https://www.youtube.com/embed/23HxIe2BvWY",
        nGameImages: 4,
        colors: {
            titleColor: "#F6C968",
            textColor: "black",
            tagsColor: "white",
            backgroundColors: "#957144, #350D09",
            mainBackgroundColor: "0, 0, 0",
            bannerColor: "#350D09, black",
            downloadColor: "white",
            downloadColorHover: "white",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new BehaviorSettings(E_ParticleBehavior.Linear),
            {
                nParticles: 10,
                mouseAreaMinMax: new Vector2(50, 200),
                speedMinMax: new Vector2(0.2, 0.4),
                sprites: ["balloon1", "balloon2", "balloon3"],
                size: Maths2.One.Multiply(64),
            },
            new ModifiersManager(
                [E_Modifier.BounceOnNear, E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.BounceOnNear, E_Modifier.PositionOutsideMouseArea],
            ),
            new MouseBehaviorsManager(new PCMouseBehaviors_Up_RepelAll(new Vector2(5, 10))),
            new StylesManager(),
        ),
        teammates: [
            {
                names: ["Clément MARTIN"],
                job: JobType.GDP
            },
            {
                names: ["Clémentine LEMAIRE", "Guy MARSAC", "Némo DALFOVO"],
                job: JobType.GA
            },
            {
                names: ["Leonard GRELLIER"],
                job: JobType.MS
            }
        ],
    }],
    ["de-exorcismis", {
        name: "DE EXORCISMIS",
        href: "de-exorcismis",
        tagsIds: [3, 102, 104, 105, 301, 401, 500, 503],
        download: false,
        description: [
            <span>I worked on <b>De Exorcismis</b> during the <b>Scientific Game Jam 2024</b>. The theme was to create an <b>educational game</b> on a <b>thesis</b> about <b>exorcisms during the middle age</b>, with the help of a <b>historian</b> who guided us on-site.
                <br /><br />
                You play as Father Salomon, a new exorcist priest sent to the village of Loudun around the year 1632. This village is the victim of numerous rumors, founded or not, according to which several cases of possession have been reported. He will have to investigate and detect who is the real and unfortunate possessed person while continuing his learning of exorcism rites and the creation of his own texts, compiling the knowledge of his predecessors and other more or less legitimate authors accepted by the Church…
                <br /><br />
                This game is a <b>point and click</b> in which you will have to discover who to <b>exorcise</b> using which <b>rituals</b>.
                <br /><br />
                Development engine and language: <b>Unity, C#</b>.<br />
                Project length: <b>Two days</b>.<br />
                A <b>seven-person</b> team.</span>,

            <span>J'ai travaillé sur <b>De exorcismis</b> pendant la <b>Scientific Game Jam 2024</b>. Le thème était de réaliser un <b>jeu à but éducatif</b> sur une <b>thèse</b> à propos des <b>exorcismes au moyen-âge</b>, avec l'aide d'une <b>historienne</b> qui nous guidait sur place.
                <br /><br />
                Vous incarnez le Père Salomon, nouveau prêtre exorciste envoyé au sein du village de Loudun aux alentours de l'an 1632. Ce village est victime de nombreuses rumeurs, fondées ou non selon lesquelles plusieurs cas de possessions auraient été déclarés. Il va devoir enquêter et déceler qui est le véritable et malheureux possédé tout en continuant son apprentissage des rites d'exorcismes et de la création de ses propres textes, compilant le savoir de ses prédécesseurs et d'autres auteurs plus ou moins légitimes et acceptés par l'Eglise…
                <br /><br />
                Ce jeu est un <b>point and click</b> dans lequel vous allez devoir déceler qui <b>exorciser</b> en utilisant quels <b>rituels</b>.
                <br /><br />
                Programme de développement : <b>Unity, C#</b>.<br />
                Durée du projet : <b>deux jours</b>.<br />
                Equipe de <b>sept</b>.</span>],
        videoRef: "https://www.youtube.com/embed/hDzQLojy1rc",
        nGameImages: 3,
        colors: {
            titleColor: "#B3B2B3",
            textColor: "#B3B2B3",
            tagsColor: "white",
            backgroundColors: "#861110, #000000",
            mainBackgroundColor: "0, 0, 0",
            bannerColor: "#861110, black",
            downloadColor: "white",
            downloadColorHover: "white",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomDirectionalSettings(E_ParticleBehavior.Fall, Math.PI / 100 * 2, Math.PI / 100, new Vector2(Math.PI / 100 * 45, Math.PI / 100 * 45)),
            {
                nParticles: 75,
                mouseAreaMinMax: new Vector2(25, 50),
                speedMinMax: new Vector2(5, 5),
                sprites: ["water-drop1", "water-drop2", "water-drop3"],
                size: Maths2.One.Multiply(8),
            },
            new ModifiersManager(
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea],
            ),
            new MouseBehaviorsManager(),
            new StylesManager([new PCStyle_RotationFromMovement()]),
        ),
        teammates: [
            {
                names: ["Anne-Charlotte PIVOT"],
                job: JobType.S
            },
            {
                names: ["Maxence BARTOLI"],
                job: JobType.GD
            },
            {
                names: ["Clément MARTIN"],
                job: JobType.GDP
            },
            {
                names: ["Sarah JANIN", "Pa Ming CHIU"],
                job: JobType.GA
            },
            {
                names: ["Andy-Andriamaro RAKOTONIAINA"],
                job: JobType.MS
            }
        ],
    }],
    ["captain-nemo", {
        name: "CAPTAIN NEMO",
        href: "captain-nemo",
        tagsIds: [4, 102, 104, 105, 301, 401, 500, 501],
        download: true,
        description: [
            <span>I worked on <b>Captain Nemo</b> during the <b>Global Game Jam 2025</b>. The theme was : <b>Bubble</b>.
                <br /><br />
                The brave Captain Nemo has to manage oxygen bubbles, pressure valves, and freezing temperatures to keep himself alive in his malfunctioning diving suit. How deep can you go before it’s too late?
                <br /><br />
                You can play the game using the <b>mouse</b> (to fix issues with the diving suit) and the <b>arrows</b> (to move the mouth and breath bubbles).
                <br /><br />
                Development engine and language: <b>Unity, C#</b>.<br />
                Project length: <b>Two days</b>.<br />
                A <b>six-person</b> team.</span>,

            <span>J'ai travaillé sur <b>Captain Nemo</b> pendant la <b>Globale Game Jam 2025</b>. Le thème était : <b>Bulle</b>.
                <br /><br />
                Le courageux capitaine Nemo doit gérer les bulles d'oxygène, les valves de pression et les températures glaciales pour se maintenir en vie dans sa combinaison de plongée défectueuse. Jusqu’où pouvez-vous aller avant qu’il ne soit trop tard ?
                <br /><br />
                Vous pouvez jouer au jeu en utilisant la souris (pour régler les problèmes de la combinaison) et les flèches pour bouger la bouche et respirer les bulles.
                <br /><br />
                Programme de développement : <b>Unity, C#</b>.<br />
                Durée du projet : <b>deux jours</b>.<br />
                Equipe de <b>six</b>.</span>],
        nGameImages: 2,
        colors: {
            titleColor: "#4F7A88",
            textColor: "#4F7A88",
            tagsColor: "white",
            backgroundColors: "#2A3554, #000000",
            mainBackgroundColor: "0, 0, 0",
            bannerColor: "#4F7A88, black",
            downloadColor: "white",
            downloadColorHover: "white",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomDirectionalSettings(E_ParticleBehavior.Amber, Math.PI / 100, Math.PI / 20, new Vector2(-Math.PI * 5 / 6, -Math.PI / 6)),
            {
                nParticles: 10,
                mouseAreaMinMax: new Vector2(25, 50),
                speedMinMax: new Vector2(0.5, 1),
                sprites: ["bubble1", "bubble2", "bubble3"],
                size: Maths2.One.Multiply(30),
            },
            new ModifiersManager(
                [E_Modifier.PositionOutsideMouseArea, E_Modifier.SpeedOnNearMouse],
                [E_Modifier.PositionOutsideMouseArea, E_Modifier.SpeedOnNearMouse],
            ),
            new MouseBehaviorsManager(),
            new StylesManager([new PCStyle_RotationFromMovement()]),
        ),
        teammates: [
            {
                names: ["Milhouzer", "Alexandre BACCOT", "Clément MARTIN"],/*Milan PABLO si on se fie au titre sous le pseudo Discord*/
                job: JobType.GDP
            },
            {
                names: ["Némo DALFOVO", "Guy MARSAC"],
                job: JobType.GA
            }
        ],
    }],
    ////
    ["scarattack", {
        name: "SCARATTACK",
        href: "scarattack",
        tagsIds: [4, 102, 104, 105, 301, 401, 500, 501],
        download: true,
        description: [
            <span>I worked on <b>Scarattack</b> during the <b>Scientific Game Jam 2025</b>. The theme was to create an <b>educational game</b> on a <b>thesis</b> about <b>the invasion of japanese beetles in europe</b>, with the help of a <b>scientist</b> who guided us on-site.
                <br /><br />
                Hover over the defense method you wish to use to understand its action on beetles. 
                Click on an object then click on a spot on the ground to place it. 
                Beetles are not always visible, detect them as quickly as possible to get rid of them! 
                Be careful, each means of defense has its drawback, place them intelligently!
                <br /><br />
                Development engine and language: <b>Unity, C#</b>.<br />
                Project length: <b>Two days</b>.<br />
                A <b>five-person</b> team.</span>,

            <span>J'ai travaillé sur <b>Scarattack</b> pendant la <b>Scientific Game Jam 2025</b>. Le thème était de créer un <b>jeu pédagogique</b> autour d'une <b>thèse</b> sur <b>l'invasion des scarabées japonais en Europe</b>, avec l'aide d'une <b>scientifique</b> qui nous a guidés sur place.
                <br /><br />
                Survolez le moyen de défense que vous souhaitez poser pour comprendre son action sur les scarabées. 
                Cliquez sur un objet puis cliquez sur un endroit du terrain pour le poser. 
                Les scarabées ne sont pas toujours visibles, détectez-les au plus vite pour vous en débarrasser ! 
                Attention, chaque moyen de défense a son inconvénient, placez-les intelligemment !
                <br /><br />
                Programme de développement : <b>Unity, C#</b>.<br />
                Durée du projet : <b>deux jours</b>.<br />
                Equipe de <b>cinq</b>.</span>
            ],
        nGameImages: 3,
        colors: {
            titleColor: "#317029",
            textColor: "#317029",
            tagsColor: "white",
            backgroundColors: "#1D602A, #000000",
            mainBackgroundColor: "0, 0, 0",
            bannerColor: "#317029, black",
            downloadColor: "white",
            downloadColorHover: "white",
        },
        particlesSettingsManager: new ParticlesDataManager(
            new P_RandomSettings(E_ParticleBehavior.RandomMovement, Math.PI / 1000, Math.PI / 2),
            {
                nParticles: 20,
                mouseAreaMinMax: new Vector2(100, 200),
                speedMinMax: new Vector2(0.2, 0.3),
                sprites: ["japanese-beetle"],
                size: Maths2.One.Multiply(16),
            },
            new ModifiersManager(
                [E_Modifier.SpeedOnNearMouse, E_Modifier.PositionOutsideMouseArea, E_Modifier.DirectionOnNearMouse],
                [E_Modifier.SpeedOnNearMouse, E_Modifier.PositionOutsideMouseArea, E_Modifier.DirectionOnNearMouse],
                [E_Modifier.PositionOutsideMouseArea],
                [E_Modifier.PositionOutsideMouseArea]
            ),
            new MouseBehaviorsManager(new PCMouseBehaviors_Up_RepelNear(new Vector2(2, 5)), new PCMouseBehaviors_Down_AttractAll(new Vector2(2, 4))),
            new StylesManager([new PCStyle_RotationFromMovement()]),
        ),
        teammates: [
            {
                names: ["Alexandre BACCOT", "Théo FONTANY"],
                job: JobType.GDP
            },
            {
                names: ["Célian PENNELLO"],
                job: JobType.GA
            },
            {
                names: ["Ambre DECHAMPS"],
                job: JobType.S
            }
        ],
    }],
]);