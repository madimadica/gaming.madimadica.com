const { JSDOM } = require("jsdom");
const fs = require("fs");

const defenses = [
    {
        "name": "Cannon",
        "link": "https://clashofclans.fandom.com/wiki/Cannon/Home_Village"
    },
    {
        "name": "Archer Tower",
        "link": "https://clashofclans.fandom.com/wiki/Archer_Tower/Home_Village"
    },
    {
        "name": "Mortar",
        "link": "https://clashofclans.fandom.com/wiki/Mortar"
    },
    {
        "name": "Air Defense",
        "link": "https://clashofclans.fandom.com/wiki/Air_Defense"
    },
    {
        "name": "Wizard Tower",
        "link": "https://clashofclans.fandom.com/wiki/Wizard_Tower"
    },
    {
        "name": "Air Sweeper",
        "link": "https://clashofclans.fandom.com/wiki/Air_Sweeper"
    },
    {
        "name": "Hidden Tesla",
        "link": "https://clashofclans.fandom.com/wiki/Hidden_Tesla/Home_Village"
    },
    {
        "name": "Bomb Tower",
        "link": "https://clashofclans.fandom.com/wiki/Bomb_Tower"
    },
    {
        "name": "X-Bow",
        "link": "https://clashofclans.fandom.com/wiki/X-Bow/Home_Village"
    },
    {
        "name": "Inferno Tower",
        "link": "https://clashofclans.fandom.com/wiki/Inferno_Tower/Home_Village"
    },
    {
        "name": "Eagle Artillery",
        "link": "https://clashofclans.fandom.com/wiki/Eagle_Artillery"
    },
    {
        "name": "Scattershot",
        "link": "https://clashofclans.fandom.com/wiki/Scattershot"
    },
    {
        "name": "Builder's Hut",
        "link": "https://clashofclans.fandom.com/wiki/Builder%27s_Hut"
    },
    {
        "name": "Spell Tower",
        "link": "https://clashofclans.fandom.com/wiki/Spell_Tower"
    },
    {
        "name": "Monolith",
        "link": "https://clashofclans.fandom.com/wiki/Monolith"
    },
    {
        "name": "Multi-Archer Tower",
        "link": "https://clashofclans.fandom.com/wiki/Multi-Archer_Tower"
    },
    {
        "name": "Ricochet Cannon",
        "link": "https://clashofclans.fandom.com/wiki/Ricochet_Cannon"
    },
    {
        "name": "Firespitter",
        "link": "https://clashofclans.fandom.com/wiki/Firespitter"
    },
    {
        "name": "Giga Tesla",
        "link": "https://clashofclans.fandom.com/wiki/Town_Hall/Giga_Tesla"
    },
    {
        "name": "Giga Inferno (TH13)",
        "link": "https://clashofclans.fandom.com/wiki/Town_Hall/Giga_Inferno_(TH13)"
    },
    {
        "name": "Giga Inferno (TH14)",
        "link": "https://clashofclans.fandom.com/wiki/Town_Hall/Giga_Inferno_(TH14)"
    },
    {
        "name": "Giga Inferno (TH15)",
        "link": "https://clashofclans.fandom.com/wiki/Town_Hall/Giga_Inferno_(TH15)"
    },
    {
        "name": "Giga Inferno (TH16)",
        "link": "https://clashofclans.fandom.com/wiki/Town_Hall/Giga_Inferno_(TH16)"
    },
    {
        "name": "Inferno Artillery",
        "link": "https://clashofclans.fandom.com/wiki/Town_Hall/Inferno_Artillery"
    },
    {
        "name": "Wall",
        "link": "https://clashofclans.fandom.com/wiki/Wall"
    }
]

const traps = [
    {
        "name": "Bomb",
        "link": "https://clashofclans.fandom.com/wiki/Bomb"
    },
    {
        "name": "Spring Trap",
        "link": "https://clashofclans.fandom.com/wiki/Spring_Trap/Home_Village"
    },
    {
        "name": "Giant Bomb",
        "link": "https://clashofclans.fandom.com/wiki/Giant_Bomb"
    },
    {
        "name": "Air Bomb",
        "link": "https://clashofclans.fandom.com/wiki/Air_Bomb"
    },
    {
        "name": "Seeking Air Mine",
        "link": "https://clashofclans.fandom.com/wiki/Seeking_Air_Mine"
    },
    {
        "name": "Skeleton Trap",
        "link": "https://clashofclans.fandom.com/wiki/Skeleton_Trap"
    },
    {
        "name": "Tornado Trap",
        "link": "https://clashofclans.fandom.com/wiki/Tornado_Trap"
    },
    {
        "name": "Giga Bomb",
        "link": "https://clashofclans.fandom.com/wiki/Giga_Bomb"
    },
]

const resource_buildings = [
    {
        "name": "Town Hall",
        "link": "https://clashofclans.fandom.com/wiki/Town_Hall"
    },
    {
        "name": "Gold Mine",
        "link": "https://clashofclans.fandom.com/wiki/Gold_Mine/Home_Village"
    },
    {
        "name": "Elixir Collector",
        "link": "https://clashofclans.fandom.com/wiki/Elixir_Collector/Home_Village"
    },
    {
        "name": "Gold Storage",
        "link": "https://clashofclans.fandom.com/wiki/Gold_Storage/Home_Village"
    },
    {
        "name": "Elixir Storage",
        "link": "https://clashofclans.fandom.com/wiki/Elixir_Storage/Home_Village"
    },
    {
        "name": "Dark Elixir Drill",
        "link": "https://clashofclans.fandom.com/wiki/Dark_Elixir_Drill"
    },
    {
        "name": "Dark Elixir Storage",
        "link": "https://clashofclans.fandom.com/wiki/Dark_Elixir_Storage"
    },
    {
        "name": "Clan Castle",
        "link": "https://clashofclans.fandom.com/wiki/Clan_Castle"
    }
]

const army = [
    {
        "name": "Army Camp",
        "link": "https://clashofclans.fandom.com/wiki/Army_Camp/Home_Village"
    },
    {
        "name": "Barracks",
        "link": "https://clashofclans.fandom.com/wiki/Barracks"
    },
    {
        "name": "Dark Barracks",
        "link": "https://clashofclans.fandom.com/wiki/Dark_Barracks"
    },
    {
        "name": "Laboratory",
        "link": "https://clashofclans.fandom.com/wiki/Laboratory"
    },
    {
        "name": "Spell Factory",
        "link": "https://clashofclans.fandom.com/wiki/Spell_Factory"
    },
    {
        "name": "Hero Hall",
        "link": "https://clashofclans.fandom.com/wiki/Hero_Hall"
    },
    {
        "name": "Dark Spell Factory",
        "link": "https://clashofclans.fandom.com/wiki/Dark_Spell_Factory"
    },
    {
        "name": "Blacksmith",
        "link": "https://clashofclans.fandom.com/wiki/Blacksmith"
    },
    {
        "name": "Workshop",
        "link": "https://clashofclans.fandom.com/wiki/Workshop"
    },
    {
        "name": "Pet House",
        "link": "https://clashofclans.fandom.com/wiki/Pet_House"
    }
]

const buildings = [];

for (const defense of defenses) {
    const copy = structuredClone(defense);
    copy.type = "Defense"
    buildings.push(copy);
}
for (const x of traps) {
    const copy = structuredClone(x);
    copy.type = "Traps"
    buildings.push(copy);
}
for (const x of resource_buildings) {
    const copy = structuredClone(x);
    copy.type = "Resource"
    buildings.push(copy);
}
for (const x of army) {
    const copy = structuredClone(x);
    copy.type = "Army"
    buildings.push(copy);
}

async function cachePages(buildings) {
    for (const building of buildings) {
        console.log("Processing " + building.name);
        const response = await fetch(building.link);
        const responseHtml = await response.text();
        fs.writeFileSync(`C:\\Code\\madimadica\\gaming.madimadica.com\\_scrape\\home_village\\page_cache\\${building.name}.html`, responseHtml, "utf-8")
    }
}


function getTextContents(arr, skip = 0) {
    const output = [];
    let i = 0;
    for (const e of arr) {
        if (i >= skip) {
            output.push(e.textContent.trim());
        }
        i++;
    }
    return output;
}

function allDigits(x) {
    return /^-?\d+$/.test(x);
}

function removeSpaces(s) {
    return s.replace(/\s+/g,'');
}

function keepDigits(s) {
    return s.replace(/\D/g, '');
}

const MAX_TOWN_HALL = 17;
// cachePages(buildings);

function getNumberAvailable(building, dom) {

    const numberAvailableTable = dom.window.document.querySelector("#number-available-table");
    if (numberAvailableTable === null) {
        if (building.link.includes("/wiki/Town_Hall/")) {
            const output = [];
            for (let i = 1; i <= MAX_TOWN_HALL; ++i) {
                output.push({"town_hall": i, "limit": 1});
            }
            return output;
        } else {
            throw new Error(`No number available table found for ${building.name}`);
        }
    }
    const rows = numberAvailableTable.querySelectorAll("tr");
    if (rows.length !== 4) {
        throw new Error(`Expected 4 rows, found ${rows.length} in ${building.name}`);
    }

    const allTownHallHeaders = [...getTextContents(rows[0].children, 1), ...getTextContents(rows[2].children, 1)];
    const allAvailableData = [...getTextContents(rows[1].children, 1), ...getTextContents(rows[3].children, 1)];

    if (allTownHallHeaders.length !== MAX_TOWN_HALL) {
        throw new Error(`Expected ${MAX_TOWN_HALL} town halls, found ${allTownHallHeaders.length}`);
    }
    for (let i = 0; i < allTownHallHeaders.length; ++i) {
        if (parseInt(allTownHallHeaders[i]) !== (i + 1)) {
            throw new Error(`Non-linear town hall number ${allTownHallHeaders[i]} found in ${building.name}`);
        }
    }


    const output = [];
    let townHallLevel = 1;
    for (const x of allAvailableData) {
        let result = x;
        if (!allDigits(x)) {
            if (/^\d+\/\d+\*$/.test(x)) {
                // 7/3* ricochet for example
                result = parseInt(x.split("/")[1]);
            } else if (/^\d+\*#?$/.test(x)) {
                // 5*, builder hut for example, clan castle is 1*#
                result = parseInt(x);
            } else {
                throw new Error(`Non-parseable number ${x} found in ${building.name}`);
            }
        } else {
            result = parseInt(x);
        }
        output.push({
            "town_hall": townHallLevel,
            "limit": result
        });
        townHallLevel++;
    }
    return output;
}


function getSecondsFromBuildTime(buildTime) {
    if (buildTime === "N/A" || buildTime === "None") {
        return 0;
    }
    let seconds = 0;
    for (const part of buildTime.split(" ")) {
        const val = parseInt(part);
        const unit = part[part.length - 1];
        switch (unit) {
            case "s":
                seconds += val;
                break;
            case "m":
                seconds += (60 * val);
                break;
            case "h":
                seconds += (3600 * val);
                break;
            case "d":
                seconds += (86400 * val);
                break;
            default:
                throw new Error(`Unexpected unit ${unit}`);
        }
    }
    return seconds;
}


function getUpgrades(building, dom) {
    if (building.name === "Giga Inferno (TH16)") {
        return []; // no upgrades
    }
    const wikiTables = dom.window.document.querySelectorAll("table.wikitable");
    if (wikiTables === null) {
        throw new Error(`Count not find tables for ${building.name}`);
    }
    const targetStr = building.name === "Town Hall" ? "TH Level" : "Level";
    let upgradeTable = null;
    for (const wikiTable of wikiTables) {
        const tbody = wikiTable.children[0];
        const tr1 = tbody.children[0];
        if (tr1.children[0].textContent.trim() === targetStr) {
            upgradeTable = wikiTable;
            break;
        }
    }

    if (upgradeTable === null) {
        throw new Error(`Count not find upgrade table for ${building.name}, ${building.link}`);
    }

    const upgradeTableRows = upgradeTable.children[0].children;

    let currency = "";

    let maxRowspan = 1;
    const columnIndexes = {
        "cost": null,
        "time": null,
        "town_hall": null
    };
    let columnIndex = 0;
    for (const cell of upgradeTableRows[0].children) {
        const rowspan = parseInt(cell.getAttribute("rowspan")) || 1;
        const colspan = parseInt(cell.getAttribute("colspan")) || 1;
        maxRowspan = Math.max(maxRowspan, rowspan);
        const text = removeSpaces(cell.textContent);
        if ((text === "Cost" || text === "BuildCost") && columnIndexes.cost === null) {
            columnIndexes["cost"] = columnIndex;
            currency = cell.querySelector("img").getAttribute("data-image-name").split(".")[0]; // split .png name
        } else if (text === "BuildTime") {
            columnIndexes["time"] = columnIndex;
        } else if (text === "TownHallLevelRequired") {
            columnIndexes["town_hall"] = columnIndex;
        }
        columnIndex += colspan;
    }
    if (!["Gold", "Elixir", "Dark Elixir"].includes(currency)) {
        throw new Error(`Unexpected currency ${currency} for ${building.name}`);
    }
    if (columnIndexes.cost === null) {
        console.error(`Could not find cost for ${building.name}`);
    }
    if (columnIndexes.time === null && building.name !== "Wall") {
        console.error(`Could not find time for ${building.name}`);
    }
    if (columnIndexes.town_hall === null && building.name !== "Town Hall") {
        console.error(`Could not find town_hall for ${building.name}`);
    }
    if (building.name === "Wall") {
        currency = "Walls";
    }

    const upgrades = [];

    for (let i = maxRowspan; i < upgradeTableRows.length; ++i) {
        const row = upgradeTableRows[i].children;
        const upgrade = {
            "level": parseInt(row[0].textContent),
            "cost": parseInt(keepDigits(row[columnIndexes.cost].textContent)),
            "currency": currency,
            "seconds": 0,
            "town_hall": 1
        };
        if (columnIndexes.time !== null) {
            upgrade.seconds = getSecondsFromBuildTime(row[columnIndexes.time].textContent.trim());
        }
        if (building.name === "Town Hall") {
            upgrade.town_hall = upgrade.level - 1;
        } else {
            upgrade.town_hall = parseInt(row[columnIndexes.town_hall].textContent);
        }
        upgrades.push(upgrade);
    }
    return upgrades;
}

async function processPage(building) {
    const pageHTML = fs.readFileSync(`C:\\Code\\madimadica\\gaming.madimadica.com\\_scrape\\home_village\\page_cache\\${building.name}.html`, "utf-8")
    const dom = new JSDOM(pageHTML);
    const availableCounts = getNumberAvailable(building, dom);
    const upgrades = getUpgrades(building, dom);
    const copy = structuredClone(building);
    copy.upgrades = upgrades;
    copy.available = availableCounts;
    return copy;
}

(async function() {
        const dataset = [];
        for (const b of buildings) {
            console.log(b.name);
            let result = await processPage(b);
            dataset.push(result)
        }
        fs.writeFileSync(`C:\\Code\\madimadica\\gaming.madimadica.com\\_scrape\\home_village\\buildings.json`, JSON.stringify(dataset, null, 1), "utf-8")

})();


// lab
// heroes
// pets
// blacksmith*
