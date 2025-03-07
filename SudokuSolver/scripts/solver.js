// solver.js
let board = []

export function insertValues() {
    console.log('insertValues function called');
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input) => {
        if(input.value) {
            board.push(parseInt(input.value))
            input.classList.add('input-el')
            input.classList.add('user-input') 
        } else {
            board.push(0)
            input.classList.add('empty-el')
        }
    })
    console.log(board);
}


// index of 1d array to row and column
const indexToRowCol = (index) => { 
    return {row: Math.floor(index/9), col: index%9} 
}

// row, column back to index 
const RowColToindex = (row, col) => (row * 9 + col)

const acceptable = (board, index, value) => {
    let { row, col } = indexToRowCol(index)
    for (let r = 0; r < 9; ++r) {
        if (board[RowColToindex(r, col)] == value) return false
    }
    for (let c = 0; c < 9; ++c) {
        if (board[RowColToindex(row, c)] == value) return false
    }

    let r1 = Math.floor(row / 3) * 3
    let c1 = Math.floor(col / 3) * 3
    for (let r = r1; r < r1 + 3; ++r) {
        for (let c = c1; c < c1 + 3; ++c) {
            if (board[RowColToindex(r, c)] == value) return false
        }
    }
    return true
}

export const getChoices = (board, index) => {
    console.log('getchoices function called');
    let choices = []
    for (let value = 1; value <= 9; ++value) {
        if (acceptable(board, index, value)) {
            choices.push(value)
        }
    }
    return choices
}

const bestBet = (board) => {
    console.log('bestBet function called');
    let index, moves, bestLen = 100
    for (let i = 0; i < 81; ++i) {
        if (!board[i]) {
            let m = getChoices(board, i)
            if (m.length < bestLen) {
                bestLen = m.length
                moves = m
                index = i
                if (bestLen == 0) break
            }
        }
    }
    console.log('bestBet:',index, moves);
    return { index, moves }
}

export const solve = () => {
    let { index, moves } = bestBet(board) 
    if (index == null) return true          
    for (let m of moves) {
        board[index] = m                  
        if (solve()) return true        
    }
    board[index] = 0
    return false
}


export function populateValues() {
    console.log('populateValues function called');
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input, i) => input.value = board[i])
}

export function giveHint() {
    board = []
    insertValues() 
    console.log('giveHint function called');
    let index, moves, bestLen = 100
    for (let i = 0; i < board.length; i++) {
        if (board[i] === 0) {
            let m = getChoices(board, i)
            if (m.length < bestLen) {
                bestLen = m.length
                moves = m
                index = i
                if (bestLen == 0) {
                    break
                }
            }
        }
    }
    if (index != null && moves.length > 0) {
        board[index] = moves[0];
        const inputEl = document.querySelector(`input[data-index="${index}"]`);
        console.log('inputEl:',inputEl);
        inputEl.value = moves[0];
    }
}