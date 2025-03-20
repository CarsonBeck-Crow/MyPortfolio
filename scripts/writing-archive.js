/*Load check*/
console.log ("Archive is loaded.");

import {poems} from "./writing.js";
import {shorts} from "./writing.js";
import {essays} from "./writing.js";
import {lore} from "./writing.js";
import {novels} from "./writing.js";
import {dropdownArrow} from "./main.js";

document.addEventListener("DOMContentLoaded", () =>{
    loadPoems();
    loadShorts();
    loadEssays();
    loadLore();
    loadNovels();
    dropdownArrow();
});

/*Poems*/
function loadPoems() {
    const poemContainer = document.getElementById("poetry-list");

    if (!poemContainer) {
        console.error("Archive poem container not found.");
        return;
    }

    if (typeof poems === "undefined" || !Array.isArray(poems)) {
        console.error("Poem array is missing or not found.");
        return;
    }

    const sortedPoems = poems.sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedPoems.forEach((poem) => {

        const formattedContent = poem.content.replace(/\n/g, "<br>");

        let poemElement = `
        <div class="poetry-list">
            <ul>
                <li>
                    <div class="poetry-item">
                            <span class="poem-title">${poem.title}</span>
                            <span class="dropdown-arrow"><i class="at-arrow-down"></i></span>
                    </div>
                    <div class="poem-content">${formattedContent || "Content not available."}</div>
                </li>
            </ul>
        </div>
        `;
        poemContainer.insertAdjacentHTML("beforeend", poemElement);
    });
}


/*Short Stories*/
function loadShorts() {
    const shortsContainer = document.getElementById("short-stories-list");

    if (!shortsContainer) {
        console.error("Archive Short Story container not found.");
        return;
    }

    if (typeof shorts === "undefined" || !Array.isArray(shorts)) {
        console.error("Short Story array is missing or not found.");
        return;
    }

    const sortedShorts = shorts.sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedShorts.forEach((short) => {
        let shortElement = `
        <div class="short-stories-list">
            <ul>
                <li><a href="${short.title}"><a href="${short.url}">${short.title}</a></a></li>
            </ul>
        </div>
        `;
        shortsContainer.insertAdjacentHTML("beforeend", shortElement);
    });
}

/*Essays*/
function loadEssays() {
    const essaysContainer = document.getElementById("essays-list");

    if (!essaysContainer) {
        console.error("Archive Essay container not found.");
        return;
    }

    if (typeof essays === "undefined" || !Array.isArray(essays)) {
        console.error("Essay array is missing or not found.");
        return;
    }

    const sortedEssays = essays.sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedEssays.forEach((essay) => {
        let essayElement = `
        <div class="essay-list">
            <ul>
                <li><a href="${essay.title}"><a href="${essay.url}">${essay.title}</a></a></li>
            </ul>
        </div>
        `;
        essaysContainer.insertAdjacentHTML("beforeend", essayElement);
    });
}

/*Lore*/
function loadLore() {
    const loreContainer = document.getElementById("lore-list");

    if (!loreContainer) {
        console.error("Archive Lore container not found.");
        return;
    }

    if (typeof lore === "undefined" || !Array.isArray(lore)) {
        console.error("Lore array is missing or not found.");
        return;
    }

    const sortedLore = lore.sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedLore.forEach((lort) => {
        let lortElement = `
        <div class="lore-list">
            <ul>
                <li><a href="${lort.title}"><a href="${lort.url}">${lort.title}</a></a>
                    <div class="lore-description">${lort.description}</div>
                </li>
            </ul>
        </div>
        `;
        loreContainer.insertAdjacentHTML("beforeend", lortElement);
    });
}

/*Novels*/
function loadNovels() {
    const novelsContainer = document.getElementById("novels-list");

    if (!novelsContainer) {
        console.error("Archive Novel container not found.");
        return;
    }

    if (typeof novels === "undefined" || !Array.isArray(novels)) {
        console.error("Novel array is missing or not found.");
        return;
    }

    const sortedNovels = novels.sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedNovels.forEach((novel) => {
        let novelElement = `
        <div class="novel-list">
            <ul>
                <li><a href="${novel.title}"><a href="${novel.url}">${novel.title}</a></a>
                    <div class="novel-description" style="word-wrap: normal;">${novel.description}</div>
                </li>
            </ul>
        </div>
        `;
        novelsContainer.insertAdjacentHTML("beforeend", novelElement);
    });
}