/*
 * Run this file before running equipment-levels.js
 * Need to manually fix a few errors after running.
 * At the time of writing it's mainly just the images and electro boots a[href] title
 */

const { JSDOM } = require("jsdom");
const fs = require("fs");


const URL_ORE_LIST = "https://clashofclans.fandom.com/wiki/Hero_Equipment";


async function fetchEquipmentList() {
    const response = await fetch(URL_ORE_LIST);
    const responseHtml = await response.text();

    const wikiDocument = new JSDOM(responseHtml);

    const heroNames = wikiDocument.window.document.querySelectorAll("h2 > .mw-headline:first-child");
    const equipmentLists = wikiDocument.window.document.querySelectorAll("h2 + div.flexbox-display");

    const heroLen = heroNames.length;

    const allHeroEquipmentJson = [];

    for (let i = 0; i < heroLen; ++i) {
        const heroName = heroNames[i].textContent.trim();
        const heroEquipment = equipmentLists[i];
        const heroEquipmentLinks = heroEquipment.querySelectorAll("div.flexbox-display > div > div > a");
        const heroEquipmentImages = heroEquipment.querySelectorAll("div.flexbox-display img");

        const equipment = [];
        const equipmentLen = Math.min(6, heroEquipmentLinks.length); // bad formatting on electro boots
        for (let j = 0; j < equipmentLen; ++j) {
            const link = heroEquipmentLinks[j];
            const img = heroEquipmentImages[j];
            equipment.push({
                url: `https://clashofclans.fandom.com${link.href}`,
                img: `${img.src}`, // usually data:* need to manually fetch
                name: link.textContent.trim()
            });
        }

        allHeroEquipmentJson.push({
            "hero": heroName,
            "equipment": equipment
        });

    }
    return {
        "equipment": allHeroEquipmentJson
    };
}
//
// fetchEquipmentList().then(data =>
//     fs.writeFileSync("./../_scrape/equipment-list.json", JSON.stringify(data, null, 2), "utf-8")
// );
//

