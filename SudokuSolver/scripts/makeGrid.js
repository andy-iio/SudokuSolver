// makeGrid.js
export function makeGrid() {
    const sudokuBoard = document.querySelector("#puzzle")
    const squares = 81

    for (let i=0; i<squares; i++) {
        const inputElement = document.createElement("input");
        document.body.appendChild(inputElement);
        console.log(document.body.contains(inputElement)); // should return true
        console.log(inputElement.length); // should return the number of input elements in the DOM

        inputElement.setAttribute('type', 'number')
        inputElement.setAttribute('data-index', i)
        
        inputElement.setAttribute('min', '1')
        inputElement.setAttribute('max', '9')

        if (
            ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
            ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
            ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
            ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
            ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
        ) {
            inputElement.classList.add('odd-section')
        }
        let previousValue = ""
        const inputs = document.querySelectorAll("input");
        inputs.forEach(input => {
            input.addEventListener("keydown", function(event) {
                if (event.keyCode === 8 || event.keyCode === 46) {
                    event.target.value = "";
                    previousValue = "";
                }
            });
            input.addEventListener("input", function(event) {
                let value = event.target.value;
                if (value < 1 || value > 9) {
                    event.target.value = previousValue;
                } else if(value === ""){
                    previousValue = "";
                } else {
                    previousValue = value;
                }
            });
        });
        sudokuBoard.appendChild(inputElement)
    }  
}