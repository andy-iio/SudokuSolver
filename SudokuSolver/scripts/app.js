// app.js
import { solve, insertValues, populateValues, giveHint, getChoices } from './solver.js'
import { makeGrid } from './makeGrid.js'

const solveButton = document.querySelector("#solve-button")
const clearButton = document.querySelector("#clear-button")
const hintButton = document.querySelector("#hint-button");



function main() {
    makeGrid()
    hintButton.addEventListener("click", () => {
        giveHint()
    });
    solveButton.addEventListener('click', () => {
        insertValues()
        if(solve()) {
            populateValues()
        } else {
            alert("Can't solve this puzzle!")
        }
    })

    clearButton.addEventListener('click', () => window.location.reload(true))
}
main()