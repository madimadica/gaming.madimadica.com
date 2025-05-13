const fs = require("fs");

const dataset = JSON.parse(fs.readFileSync(`C:\\Code\\madimadica\\gaming.madimadica.com\\_scrape\\home_village\\buildings.json`, "utf-8"));

function processTownHall(thLevel, dataset) {
    const allUpgradeCounts = [];
    for (const building of dataset) {
        let prevAvailable = 0;
        let currentAvailable = 0;
        for (const x of building.available) {
            if (x.town_hall === thLevel - 1) {
                prevAvailable = x.limit;
            }
            if (x.town_hall === thLevel) {
                currentAvailable = x.limit;
            }
        }
        const upgradeCounts = [];
        for (const upgrade of building.upgrades) {
            if (upgrade.town_hall === thLevel) {
                upgradeCounts.push({
                    upgrade: upgrade,
                    count: currentAvailable
                });
            } else if (upgrade.town_hall < thLevel) {
                if (currentAvailable - prevAvailable) {
                    upgradeCounts.push({
                        upgrade: upgrade,
                        count: currentAvailable - prevAvailable
                    });
                }
            } else {
                // ignored
            }
        }
        for (const e of upgradeCounts) {
            allUpgradeCounts.push(e);
        }
    }
    return allUpgradeCounts;
}

let allTime = 0;
for (let thLevel = 2; thLevel <= 17; ++thLevel) {
    const upgradeCounts = processTownHall(thLevel, dataset);
    const costs = {
        "Gold": 0,
        "Elixir": 0,
        "Dark Elixir": 0,
        "Walls": 0
    };
    let seconds = 0;
    for (const upgradeCount of upgradeCounts) {
        const upgrade = upgradeCount.upgrade;
        const scalar = upgradeCount.count;
        const currency = upgrade.currency;
        seconds += scalar * upgrade.seconds;
        costs[currency] += scalar * upgrade.cost;
    }
    allTime += seconds;
    const days = seconds / 86400;
    console.log(`Max Town Hall ${thLevel}:`);
    console.log(`  Days: ${days.toFixed(2)}     (6 builders: ${(days / 6).toFixed(2)})`);
    for (const [currency, amount] of Object.entries(costs)) {
        console.log(`  ${currency}: ${amount.toLocaleString()}`)
    }
    console.log("");
}

console.log((allTime / 86400) / 6);
