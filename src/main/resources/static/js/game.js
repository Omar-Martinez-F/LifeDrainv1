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
    const lifeChange = Number(button.dataset.lifeChange);
    //log changes here
    actionHistory.push({
        lifeDisplay: lifeDisplay,
        previousLife: previousLife
    });
    //update on screen
    lifeDisplay.textContent= String(previousLife + lifeChange);
    updateUndoButton();
});

    //undo recent changes
    undoButton.addEventListener("click",() => {
        const previousAction = actionHistory.pop();
        //check here
        if(!previousAction){
            return;
        }

        previousAction.lifeDisplay.textContent = String(previousAction.previousLife);
        updateUndoButton();
    });

        function updateUndoButton() {
            undoButton.disabled = actionHistory.length === 0;
        }
    //time

    const timerDisplay = document.querySelector("#timer");
    const timerButton = document.querySelector("#timer-button");

    let elapsedBeforeCurrentRun = 0;
    let currentRunStartedAt = Date.now();
    let timerRunning = true;

    function getElapsedMiliiseconds() {
        if(!timerRunning){
            return elapsedBeforeCurrentRun;
        }

        return elapsedBeforeCurrentRun + (Date.now() - currentRunStartedAt);
    }

    function renderTimer() {
        const totalSeconds = Math.floor(getElapsedMiliiseconds()/1000);
        const hours = Math.floor(totalSeconds/3600);
        const minutes = Math.floor((totalSeconds %3600)/60);
        const seconds = totalSeconds % 60;
        const formattedSeconds = String(seconds).padStart(2,"0");
        const formattedMinutes = String(minutes).padStart(2,"0");

        if(hours >0){
            timerDisplay.textContent = `${hours}:${formattedMinutes}:${formattedSeconds}`;
        } else{
            timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
        }

    }

    timerButton.addEventListener("click",() => {
        if(timerRunning){
            elapsedBeforeCurrentRun += Date.now() - currentRunStartedAt;
            timerRunning = false;
            timerButton.textContent = "Resume";
        }else{
            currentRunStartedAt = Date.now();
            timerRunning = true;
            timerButton.textContent = "Pause";
        }
        renderTimer();
    });

    //reset
    resetButton.addEventListener("click",() => {
        const confirmed = window.confirm(
            "Reset all life totals and restart the timer?"
        );

        if(!confirmed){
            return;
        }
        const startingLife = Number(playerGrid.dataset.startingLife);

        document.querySelectorAll(".life-total").forEach((lifeDisplay) => {
            lifeDisplay.textContent = String(startingLife);
        });

        actionHistory.length =0;
        updateUndoButton();

        elapsedBeforeCurrentRun = 0;
        currentRunStartedAt = Date.now();
        timerRunning = true;
        timerButton.textContent = "Pause";

        renderTimer();
    });
    setInterval(renderTimer,250);
    renderTimer();