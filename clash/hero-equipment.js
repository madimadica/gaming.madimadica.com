function $div(className = "", parent) {
    const div = document.createElement("div");
    div.className = className;
    if (parent) {
        parent.appendChild(div);
    }
    return div;
}

function makeSnakeCase(input) {
    return input
        .toLowerCase()
        .replace(/[^a-z\s]/g, '')
        .replace(/\s+/g, '_');
}

/**
 * Get a local-storage value by key. If the key does not exist, set it to the `initValue` and return that.
 * Otherwise, return the already stored value.
 * @param {string} key 
 * @param {string} initValue if no key-value association exists, store and use this value
 * @returns {string} value in local storage
 */
function localStorageGetWithDefault(key, initValue) {
    let currentValue = localStorage.getItem(key);
    if (currentValue === null) {
        currentValue = initValue;
        localStorage.setItem(key, initValue);
    }
    return currentValue;
}

function $selectInt(rangeStart, rangeEnd, selectedValue, prefix) {
    const select = document.createElement("select");
    select.className = "form-select";

    for (let i = rangeStart; i <= rangeEnd; ++i) {
        const option = document.createElement("option");
        option.setAttribute("value", `${i}`);
        option.innerHTML = `${prefix}${i}`;
    }
    return select;
}



async function init() {
    // Need to have a league selector
    // Need to have a war town hall selector
    // maybe have a war-activity selector and-or winrate
    const fileResponse = await fetch("/_scrape/equipment-levels.json");
    const data = await fileResponse.json();
    const heroes = data["equipment"]["equipment"];

    const e_heroes = document.querySelector(".heroes");

    for (const hero of heroes) {
        const e_hero = document.createElement("section");
        e_hero.className = "hero-section";

        const h2 = document.createElement("h2");
        h2.textContent = hero.hero;
        e_hero.appendChild(h2);

        const equipmentList = $div("hero-equipment-list");
        for (const equipment of hero["equipment"]) {
            let maxLevel = 1;
            for (const level of equipment["levels"]) {
                maxLevel = Math.max(maxLevel, level["level"]);
            }
            const baseKey = makeSnakeCase(equipment["name"]);
            const currentKey = `${baseKey}-current_level`;
            const targetKey = `${baseKey}-target_level`;
            const currentLevel = parseInt(localStorageGetWithDefault(currentKey, "1"));
            const targetLevel = parseInt(localStorageGetWithDefault(targetKey, `${maxLevel}`));

            const e_equipmentWrapper = $div("hero-equipment-wrapper");
            const e_equipment = $div("hero-equipment-icon", e_equipmentWrapper);
            const e_equipmentLevels = $div("hero-equipment-levels", e_equipmentWrapper);

            const e_currentLevelSelect = $selectInt(1, maxLevel, currentLevel, "Level ");
            const e_targetLevelSelect = $selectInt(1, maxLevel, targetLevel, "Level ");
            e_currentLevelSelect.addEventListener('change', () => {
                localStorage.setItem(currentKey, e_currentLevelSelect.value);
            });
            e_targetLevelSelect.addEventListener('change', () => {
                localStorage.setItem(targetKey, e_targetLevelSelect.value);
            });
            // need better MVC handling for these changes and renders


            const e_equipmentLevelCurrent = $div("hero-equipment-level-current", e_equipmentLevels);
            const e_equipmentLevelTarget = $div("hero-equipment-level-target", e_equipmentLevels);

        }
    }
    // const file = await fileResponse.json();
}

init();
