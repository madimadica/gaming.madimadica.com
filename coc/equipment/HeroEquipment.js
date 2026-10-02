"use strict";

const LEAGUE_ORES = [
  { league: "Skeleton 1", shiny: 300, glowy: 20, starry: 0 },
  { league: "Skeleton 2", shiny: 325, glowy: 21, starry: 0 },
  { league: "Skeleton 3", shiny: 350, glowy: 22, starry: 0 },
  { league: "Barbarian 4", shiny: 375, glowy: 23, starry: 0 },
  { league: "Barbarian 5", shiny: 400, glowy: 24, starry: 0 },
  { league: "Barbarian 6", shiny: 425, glowy: 25, starry: 0 },
  { league: "Archer 7", shiny: 450, glowy: 26, starry: 0 },
  { league: "Archer 8", shiny: 475, glowy: 27, starry: 1 },
  { league: "Archer 9", shiny: 500, glowy: 29, starry: 1 },
  { league: "Wizard 10", shiny: 525, glowy: 31, starry: 1 },
  { league: "Wizard 11", shiny: 550, glowy: 33, starry: 1 },
  { league: "Wizard 12", shiny: 575, glowy: 35, starry: 1 },
  { league: "Valkyrie 13", shiny: 600, glowy: 37, starry: 1 },
  { league: "Valkyrie 14", shiny: 625, glowy: 39, starry: 1 },
  { league: "Valkyrie 15", shiny: 650, glowy: 41, starry: 1 },
  { league: "Witch 16", shiny: 675, glowy: 43, starry: 1 },
  { league: "Witch 17", shiny: 725, glowy: 45, starry: 1 },
  { league: "Witch 18", shiny: 775, glowy: 47, starry: 1 },
  { league: "Golem 19", shiny: 825, glowy: 49, starry: 1 },
  { league: "Golem 20", shiny: 875, glowy: 51, starry: 1 },
  { league: "Golem 21", shiny: 900, glowy: 53, starry: 1 },
  { league: "P.E.K.K.A 22", shiny: 925, glowy: 54, starry: 1 },
  { league: "P.E.K.K.A 23", shiny: 950, glowy: 55, starry: 1 },
  { league: "P.E.K.K.A 24", shiny: 963, glowy: 56, starry: 1 },
  { league: "Titan 25", shiny: 1000, glowy: 57, starry: 1 },
  { league: "Titan 26", shiny: 1010, glowy: 58, starry: 1 },
  { league: "Titan 27", shiny: 1020, glowy: 59, starry: 1 },
  { league: "Dragon 28", shiny: 1030, glowy: 60, starry: 1 },
  { league: "Dragon 29", shiny: 1040, glowy: 61, starry: 1 },
  { league: "Dragon 30", shiny: 1050, glowy: 62, starry: 1 },
  { league: "Electro 31", shiny: 1060, glowy: 62, starry: 2 },
  { league: "Electro 32", shiny: 1070, glowy: 63, starry: 2 },
  { league: "Electro 33", shiny: 1080, glowy: 64, starry: 2 },
  { league: "Legend", shiny: 1100, glowy: 65, starry: 2 },
];

const WAR_ORES = [
  { townHall: 8, shiny: 380, glowy: 15, starry: 0 },
  { townHall: 9, shiny: 410, glowy: 18, starry: 0 },
  { townHall: 10, shiny: 460, glowy: 21, starry: 3 },
  { townHall: 11, shiny: 560, glowy: 24, starry: 3 },
  { townHall: 12, shiny: 610, glowy: 27, starry: 4 },
  { townHall: 13, shiny: 710, glowy: 30, starry: 4 },
  { townHall: 14, shiny: 810, glowy: 33, starry: 4 },
  { townHall: 15, shiny: 960, glowy: 36, starry: 5 },
  { townHall: 16, shiny: 1110, glowy: 39, starry: 6 },
  { townHall: 17, shiny: 1110, glowy: 39, starry: 6 },
];

// TODO independently confirm these scalars
const WAR_SCALAR_WIN = 1;
const WAR_SCALAR_LOSS = 0.5;
const WAR_SCALAR_DRAW = 0.57; // roughly 4/7 but not completely

const EQUIPMENT_RARITY_COMMON = "Common";
const EQUIPMENT_RARITY_EPIC = "Epic";

const HERO_KING = "Barbarian King";
const HERO_QUEEN = "Archer Queen";
const HERO_PRINCE = "Minion Prince";
const HERO_WARDEN = "Grand Warden";
const HERO_CHAMP = "Royal Champion";

// todo leftoff at blacksmith levels
const ALL_EQUIPMENT = [
  {
    hero: HERO_KING,
    equipment: "Barbarian Puppet",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_KING,
    equipment: "Rage Vial",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_KING,
    equipment: "Earthquake Boots",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_KING,
    equipment: "Vampstache",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_KING,
    equipment: "Giant Gauntlet",
    rarity: EQUIPMENT_RARITY_EPIC,
    blacksmith: 0,
  },
  {
    hero: HERO_KING,
    equipment: "Spiky Ball",
    rarity: EQUIPMENT_RARITY_EPIC,
    blacksmith: 0,
  },
  {
    hero: HERO_KING,
    equipment: "Snake Bracelet",
    rarity: EQUIPMENT_RARITY_EPIC,
    blacksmith: 0,
  },
  {
    hero: HERO_QUEEN,
    equipment: "Archer Puppet",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_QUEEN,
    equipment: "Invisibility Vial",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_QUEEN,
    equipment: "Giant Arrow",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_QUEEN,
    equipment: "Healer Puppet",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_QUEEN,
    equipment: "Frozen Arrow",
    rarity: EQUIPMENT_RARITY_EPIC,
    blacksmith: 0,
  },
  {
    hero: HERO_QUEEN,
    equipment: "Magic Mirror",
    rarity: EQUIPMENT_RARITY_EPIC,
    blacksmith: 0,
  },
  {
    hero: HERO_QUEEN,
    equipment: "Action Figure",
    rarity: EQUIPMENT_RARITY_EPIC,
    blacksmith: 0,
  },
  {
    hero: HERO_PRINCE,
    equipment: "Henchmen Puppet",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_PRINCE,
    equipment: "Dark Orb",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_PRINCE,
    equipment: "Metal Pants",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_PRINCE,
    equipment: "Noble Iron",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_PRINCE,
    equipment: "Dark Crown",
    rarity: EQUIPMENT_RARITY_EPIC,
    blacksmith: 0,
  },
  {
    hero: HERO_PRINCE,
    equipment: "Meteor Staff",
    rarity: EQUIPMENT_RARITY_EPIC,
    blacksmith: 0,
  },
  {
    hero: HERO_WARDEN,
    equipment: "Eternal Tome",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_WARDEN,
    equipment: "Life Gem",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_WARDEN,
    equipment: "Rage Gem",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_WARDEN,
    equipment: "Healing Tome",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_WARDEN,
    equipment: "Fireball",
    rarity: EQUIPMENT_RARITY_EPIC,
    blacksmith: 0,
  },
  {
    hero: HERO_WARDEN,
    equipment: "Lavaloon Puppet",
    rarity: EQUIPMENT_RARITY_EPIC,
    blacksmith: 0,
  },
  {
    hero: HERO_WARDEN,
    equipment: "Heroic Torch",
    rarity: EQUIPMENT_RARITY_EPIC,
    blacksmith: 0,
  },
  {
    hero: HERO_CHAMP,
    equipment: "Royal Gem",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_CHAMP,
    equipment: "Seeking Shield",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_CHAMP,
    equipment: "Hog Rider Puppet",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_CHAMP,
    equipment: "Haste Vial",
    rarity: EQUIPMENT_RARITY_COMMON,
    blacksmith: 0,
  },
  {
    hero: HERO_CHAMP,
    equipment: "Rocket Spear",
    rarity: EQUIPMENT_RARITY_EPIC,
    blacksmith: 0,
  },
  {
    hero: HERO_CHAMP,
    equipment: "Electro Boots",
    rarity: EQUIPMENT_RARITY_EPIC,
    blacksmith: 0,
  },
];

