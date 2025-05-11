import { GAME } from "../..";

const GoToBread = (): void => {
    window.location.href = "/#/" + GAME + "/bread";
}

const GoToWelcomeEasterIsland = (): void => {
    window.location.href = "/#/" + GAME + "/welcome-easter-island";
}

const GoToASecondChance = (): void => {
    window.location.href = "/#/" + GAME + "/a-second-chance";
}

export const friezeMap = new Map<number, React.ReactNode[]>([
    [0, ["ABOUT",
        "À PROPOS"]],
    [1, ["EXPERIENCES",
        "EXPÉRIENCES"]],
    [2, ["SKILLS",
        "COMPÉTENCES"]],
    [3, ["INTERESTS",
        "INTÉRÊTS"]],
]);

export const mainMap = new Map<number, React.ReactNode[]>([
    [0, [
        <span>I am studying a <b>Master</b> of <b>Game Design & Programming</b> at Isart Digital. I have been <b>passionate</b> for 4 years and I have gained experience on <b>different types of games</b>. I have been enthusiastically studying the creation and production of video games for <b>4 years</b>, and the more I learn, the more <b>passionate</b> I am.
            <br /><br />
            In programming, I try to achieve a <b>clean</b> and very <b>modular</b> result; In design, I prefer to take the player on a journey through the <b>narration</b>, the atmosphere and the <b>Level Design</b> of the game.
            <br /><br />
            I am very interested by <b>Serious Games</b>. I find it very attractive to succeed in creating a <b>useful</b>, <b>cultural</b> and at the same time <b>fun</b> application. This is actually what I'm looking to do for a <b>future job</b>, ideally.
            <br /><br />
            In the meantime, try my games and send me feedback!<br />
            Do not hesitate to contact me for any exchanges or questions :).
        </span>,

        <span>Je suis étudiant en <b>Master</b> de <b>Programmation et Conception</b> de jeux vidéo à Isart Digital. Cela fait <b>4 ans</b> que j'étudie avec enthousiasme la création et la réalisation de jeux vidéo, et plus j'apprends, plus cela me <b>passionne</b>.
            <br /><br />
            En programmation, j'essaye d'aboutir à un résultat <b>propre</b> et très <b>modulaire</b> ; En conception, je préfère faire voyager le joueur par la <b>narration</b>, l'ambiance et le <b>Level Design</b> du jeu.
            <br /><br />
            Je suis en général très intéressé par les <b>Serious Games</b>. Je trouve très séduisant de réussir à créer une application <b>utile</b>, <b>culturelle</b> et en même temps <b>amusante</b>. C'est d'ailleurs ce que je recherche à faire pour un <b>futur travail</b>, idéalement.
            <br /><br />
            En attendant, essayez mes jeux et envoyez-moi des retours !<br />
            N'hésitez pas à me contacter pour tout échanges ou questions :).
        </span>],
    ]
]);

export const sectionTitleMap = new Map<number, string[]>([
    [0, ["EXPERIENCES", "EXPÉRIENCES"]],
    [1, ["SKILLS", "COMPÉTENCES"]],
    [2, ["INTERESTS", "INTÉRÊTS"]],
]);

export const experienceTitleMap = new Map<number, string[]>([
    [0, ["Isart\n(2020 - 2024)", "Isart\n(2020 - 2024)"]],
    [1, ["Arthur-Gauthier (Internship)\n(2023 - 2024)", "Arthur-Gauthier (Internship)\n(2023 - 2024)"]],
    [2, ["Polywitch (Internship)\n(2022 - 2023)", "Polywitch (Internship)\n(2022 - 2023)"]],
    [3, ["Game Jams\n(2021 - ...)", "Game Jams(2021 - ...)"]],
    [4, ["Volunteering\n(2020 - 2021)", "Bénévolat\n(2020 - 2021)"]],
    [5, ["High School Project\n(2017 - 2018)", "Projet de Lycée\n(2017 - 2018)"]],
]);

export const experienceMap = new Map<number, React.ReactNode[]>([
    [0, [<span>In <b>Game Design & Programming</b> at <b>Isart Digital</b>, we work on at least <b>three project in a year</b>.<br />
        Among the different games created and presented on this site, the ones I prefer are: "<span onClick={GoToBread}><u>Bread</u></span>", "<span onClick={GoToWelcomeEasterIsland}><u>Welcome to Easter Island</u></span>" et "<span onClick={GoToASecondChance}><u>A Second Chance</u></span>".<br />
        I worked on other projects which were more basics to develop, but which allowed me to gain experience.</span>,
    <span>En <b>Game Design & Programming</b> à <b>Isart Digital</b>, nous travaillons sur au moins <b>trois projets par an</b>.<br />
        Parmi les différents jeux créés et présentés sur ce site, ceux que je préfère sont : "<span onClick={GoToBread}><u>Bread</u></span>", "<span onClick={GoToWelcomeEasterIsland}><u>Welcome to Easter Island</u></span>" et "<span onClick={GoToASecondChance}><u>A Second Chance</u></span>".<br />
        J'ai travaillé sur d'autres projets qui sont plutôt des bases à développer, mais qui m'ont permis de gagner en expérience.</span>]],

    [1, [<span>I am currently working as an intern at <b>Arthur-Gauthier</b>, a company that designs and deploys <b>digital experiences and solutions</b> (AR-VR, interfaces, configurators, Broadcast) for marketing and manufacturing purposes. I am working alone on a test project on<b> Unreal 5</b>, aiming to create a <b>gamified metaverse</b> using <b>pixel streaming</b>.</span>,
    <span>Je suis actuellement en alternance chez <b>Arthur-Gauthier</b>, une entreprise qui conçoit et déploie des <b>expériences et solutions digitales</b> (AR-VR, interfaces, configurateurs, Broadcast) à des fins de commercialisation et de fabrication. Je travaille seul sur un projet test sur <b>Unreal 5</b>, visant à créer un <b>metaverse gamifié</b> en utilisant le <b>pixel streaming</b>.</span>]],

    [2, [<span>I did a <b>1-year internship</b> at <b>Polywitch</b>, a <b>video game studio</b> where I mainly held the position of <b>Gameplay Programmer</b>.<br />
        In this company I learned to use many different aspects of creating a game or application using <b>Unity Custom Packages</b>, <b>React(Typescript)</b> or <b>Unity DOTS/ECS</b>...<br />
        It was a very enriching experience.</span>,
    <span>J'ai effectué un <b>stage d'1 an</b> à <b>Polywitch</b>, un studio de <b>jeux vidéo</b> où j'occupais principalement le poste de <b>Gameplay Programmer</b>.<br />
        Dans cette entreprise j'ai appris à utiliser beaucoup de différents aspects de la création d'un jeu ou d'une application en utilisant les <b>Custom Packages d'Unity</b>, <b>React(Typescript)</b> ou encore <b>Unity DOTS/ECS</b>...<br />
        Ce fût une expérience très enrichissante.</span>]],

    [3, [<span>The <b>Game Jams</b> in which I participated allowed me to <b>gain a lot in efficiency</b> and made me discover the pleasure of working intensely in a team with people I didn't know before.</span>,
    <span>Les <b>Game Jams</b> auxquelles j'ai participé m'ont permis de beaucoup <b>gagner en efficacité</b> et m'ont fait découvrir le plaisir de travailler intensément en équipe avec des personnes que je ne connaissais pas auparavant.</span>]],

    [4, [<span>During my first year at Isart Digital I went <b>volunteering</b> for a company that grows organic plants on Paris building roofs : <b>Veni Verdi</b>.<br />
        It was a <b>really good experience</b> in <b>human terms</b>.</span>,
    <span>Pendant ma première année à Isart Digital, je suis allé faire du <b>bénévolat</b> dans une association cultivant des légumes bio sur les toits de Paris : <b>Veni Verdi</b>.
        Une <b>très bonne expérience</b> sur le plan <b>humain</b>.</span>]],

    [5, [<span>I took part in the national “<b>Course en Cours</b>” competition. The goal was to <b>design and produce</b> a <b>mini electric car</b> and have it compete against those of other groups.<br />
        We also had to <b>create a stand</b>, <b>look for sponsors</b>, and <b>present our approach to the Jury</b>.<br />
        We finished <b>2nd in our region</b>.</span>,
    <span>J'ai participé au concours national « <b>Course en Cours</b> ». Le but était de <b>concevoir et produire</b> une <b>mini voiture électrique</b> et de la faire concourir contre celle d'autres groupes.<br />
        Il a aussi fallu <b>créer un stand</b>, <b>chercher des sponsors</b>, <b>présenter notre démarche au Jury</b>.<br />
        Nous avons fini <b>2ème de notre région</b>.</span>]],
]);

export const interestsMap = new Map<number, React.ReactNode[]>([
    [0, [<span>Travel: My favorite destinations are currently Jordan, Italy, and Canada.</span>,
    <span>Voyager : Mes destinations préférées étant jusqu'à présent la Jordanie, l'Italie, le Canada.</span>]],

    [1, [<span>Think: Solve puzzles, riddles, escape games. To invent some occasionally.</span>,
    <span>Réfléchir : Résoudre des puzzles, des énigmes et des escape games. En inventer parfois.</span>]],

    [2, [<span>Move: Climb and danse.</span>,
    <span>Bouger : L'escalade et la danse.</span>]],

    [3, [<span>Build: Models, technical legos, ugears or any structure, as complex as possible.</span>,
    <span>Construire : Maquettes, lego techniques, Ugears ou n'importe quelle structure, les plus complexes possibles.</span>]],

    [4, [<span>Nourish: To read mangas, watch animes and films.</span>,
    <span>S'alimenter : Lire des mangas, regarder des animés et des films.</span>]],

    [5, [<span>Play: Video games with others.</span>,
    <span>Jouer : Jeux vidéo à plusieurs.</span>]],
]);