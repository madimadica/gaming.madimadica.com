const { JSDOM } = require("jsdom");
const fs = require("fs");

const URL_ORE_LIST = "https://clashofclans.fandom.com/wiki/Ores";

function getNumber(element) {
    let content = element.textContent.trim().replace(/\D/g, '');
    return parseInt(content) || 0;
}

async function fetchOreData() {
    const response = await fetch(URL_ORE_LIST);
    const responseHtml = await response.text();

    const wikiDocument = new JSDOM(responseHtml);

    const tables = wikiDocument.window.document.querySelectorAll("table");

    const leagueTableRows = tables[0].querySelectorAll("tbody > tr:not(:first-child)");
    const warTableRows = tables[1].querySelectorAll("tbody > tr:not(:first-child)");

    const leagueJsonList = []
    const warJsonList = []

    for (const tr of leagueTableRows) {
        const cols = tr.querySelectorAll("td");
        leagueJsonList.push({
            "league": cols[0],
            "shiny_ore": getNumber(cols[1]),
            "glowy_ore": getNumber(cols[2]),
            "starry_ore": 0
        });
    }

    for (const tr of warTableRows) {
        const cols = tr.querySelectorAll("td")
        const thLevels = cols[0].textContent.trim().split("-").map(s => parseInt(s));
        const startTownHall = thLevels[0];
        const endTownHall = thLevels[thLevels.length - 1];

        for (let townHall = startTownHall; townHall <= endTownHall; ++townHall) {
            warJsonList.push({
                "townHall": townHall,
                "shiny_ore": getNumber(cols[1]),
                "glowy_ore": getNumber(cols[2]),
                "starry_ore": getNumber(cols[3])
            });
        }
    }

    return {
        "league": leagueJsonList,
        "war": warJsonList
    };
}

fetchOreData().then(data =>
    fs.writeFileSync("./../_scrape/ores.json", JSON.stringify(data, null, 2), "utf-8")
);



