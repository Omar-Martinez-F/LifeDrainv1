"use strict";

const playerGrid = document.querySelector("#player-grid");
const undoButton = document.querySelector("#undo-button");
const resetButton = document.querySelector("#reset-button");

const actionHistory = [];

//life controls

document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-life-change]");

    if(!button){
        return;
    }

    const playerCard = button.closest(".player-card");
    const lifeDisplay = playerCard.querySelector(".life-total");

    const previousLife = Number(lifeDisplay.textContent);
    const lifeChange = Number(button)
})