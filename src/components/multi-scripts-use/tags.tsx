export type TagType = {
    name: string[];
    distinctTags: number[];
}

export const tagsMap = new Map<number, TagType>([
    [0, { name: ["2020", "2020"], distinctTags: [1, 2, 3, 4, 5, 101, 102, 106, 107, 301, 302, 401, 402] }],
    [1, { name: ["2021", "2021"], distinctTags: [0, 2, 3, 4, 5, 107, 302, 402] }],
    [2, { name: ["2022", "2022"], distinctTags: [0, 1, 3, 4, 5, 107] }],
    [3, { name: ["2023", "2023"], distinctTags: [0, 1, 2, 4, 5] }],
    [4, { name: ["2024", "2024"], distinctTags: [0, 1, 2, 3, 5] }],
    [5, { name: ["2025", "2025"], distinctTags: [0, 1, 2, 3, 4] }],
    
    [100, { name: ["Isart Digital", "Isart Digital"], distinctTags: [101, 102] }],
    [101, { name: ["Personnal project", "Projet personnel"], distinctTags: [0, 100, 102] }],
    [102, { name: ["Game jam", "Game jam"], distinctTags: [0, 100, 101] }],
    
    [103, { name: ["Made in solo", "Projet solo"], distinctTags: [104] }],
    [104, { name: ["Made in group", "Projet de groupe"], distinctTags: [103] }],
    
    [105, { name: ["2D", "2D"], distinctTags: [106, 107] }],
    [106, { name: ["3D", "3D"], distinctTags: [0, 105, 107] }],
    [107, { name: ["VR", "VR"], distinctTags: [0, 1, 2, 105, 106] }],

    // // [200, ["Platformer", "Platformer"]],
    // // [201, ["Rpg", "Rpg"]],
    // // [202, ["Choices", "Jeu à choix"]],
    // // [203, ["Textual game", "Jeu textuel"]],
    // // [204, ["Open world", "Monde ouvert"]],
    // // [205, ["Puzzle", "Puzzle"]],
    // // [206, ["Strategy", "Stratégie"]],
    // // [207, ["Reflex", "Réflexes"]],
    // // [208, ["Shooter", "Shooter"]],

    // // [300, ["Uncommon engin", "Moteur peu commun"]],
    [301, { name: ["Unity", "Unity"], distinctTags: [0, 402] }],
    [302, { name: ["Unreal", "Unreal"], distinctTags: [0, 1, 401] }],

    // // [400, ["Uncommon languages", "Language peu commun"]],
    [401, { name: ["C#", "C#"], distinctTags: [0, 302, 402] }],
    [402, { name: ["Blueprint", "Blueprint"], distinctTags: [0, 1, 301, 401] }],
    
    [500, { name: ["Coding part", "Rôle programmeur"], distinctTags: [] }],
    [501, { name: ["GD part", "Rôle GD"], distinctTags: [] }],
    [502, { name: ["LD part", "Rôle LD"], distinctTags: [] }],
    [503, { name: ["UI/UX part", "Rôle UI/UX"], distinctTags: [] }],
]);