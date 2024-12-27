const { JSDOM } = require("jsdom");
const fs = require("fs");

function getNumber(td) {
    let content = td.textContent.trim().replace(/\D/g, '');
    return parseInt(content) || 0;
}

async function fetchEquipmentDetails(equipmentJson) {
    console.log("Processing " + equipmentJson.name);
    const response = await fetch(equipmentJson.url);
    const responseHtml = await response.text();
    const wikiDocument = new JSDOM(responseHtml);
    const tables = wikiDocument.window.document.querySelectorAll("table.wikitable");
    const datatable = tables[1];
    const rows = datatable.querySelectorAll("tbody > tr");
    const topRow = rows[0];
    const topRowData = topRow.querySelectorAll("th");
    let oreStartCol = 0;
    let oreSpan = 0;
    for (let i = 0; i < topRowData.length; ++i) {
        const td = topRowData[i];
        const colspan = parseInt(td.getAttribute("colspan")) || 1;
        if (td.textContent.trim().toLowerCase() === "upgrade cost") {
            oreSpan = colspan;
            break;
        }
        oreStartCol += colspan;
    }
    const shinyIndex = oreStartCol;
    const glowyIndex = oreStartCol + 1;
    const starryIndex = oreStartCol + 2;
    const hasStarry = oreSpan === 3;
    const blacksmithIndex = glowyIndex + (hasStarry ? 2 : 1);

    const levelData = [];

    for (let i = 2; i < rows.length; ++i) {
        const row = rows[i];
        const rowData = row.querySelectorAll("td");
        const level = i - 1;
        const shiny = getNumber(rowData[shinyIndex]);
        const glowy = getNumber(rowData[glowyIndex]);
        const starry = hasStarry ? getNumber(rowData[starryIndex]) : 0;
        const blacksmith = getNumber(rowData[blacksmithIndex]);
        levelData.push({
           level: level,
           shiny_ore: shiny,
           glowy_ore: glowy,
           starry_ore: starry,
           blacksmith: blacksmith
        });
    }

    return levelData;

}

async function fetchAllEquipmentLevels() {
    const equipmentListRaw = fs.readFileSync("./../_scrape/equipment-list.json", "utf-8");
    const equipmentList = JSON.parse(equipmentListRaw);

    for (const heroCategory of equipmentList["equipment"]) {
        for (const equipment of heroCategory["equipment"]) {
            equipment["levels"] = await fetchEquipmentDetails(equipment);
        }
    }

    return {equipment: equipmentList};
}

fetchAllEquipmentLevels().then(data =>
    fs.writeFileSync("./../_scrape/equipment-levels.json", JSON.stringify(data, null, 2), "utf-8")
);


