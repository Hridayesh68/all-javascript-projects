//1.deposit some money
//2.determine number of lines to bet on
//3.spin the slot machine
//4.check if the use won
//5.give the user their warnings
//6.play again
//7.spin the slot machine
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
};

const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
};

// Deposit
const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return numberDepositAmount;
        }
    }
};

// Get number of lines
const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter number of lines to bet on (1-3): ");
        const numberOfLines = parseInt(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numberOfLines;
        }
    }
};

// Get bet
const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter bet per line: ");
        const numberBet = parseFloat(bet);

        if (
            isNaN(numberBet) ||
            numberBet <= 0 ||
            numberBet > balance / lines
        ) {
            console.log("Invalid bet. Try again.");
        } else {
            return numberBet;
        }
    }
};

// Spin
const spin = () => {
    const symbols = [];

    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];

    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols]; // FIX: copy array

        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];

            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};

// Transpose
const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);

        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]); // FIX: swapped indexes
        }
    }

    return rows;
};

// Print rows
const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";

        for (let i = 0; i < row.length; i++) {
            rowString += row[i];

            if (i !== row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings=(rows,bet,lines)=>{
    let winnings=0;
    for(let row=0; row<lines; row++){
        const symbols =rows[row];
        let allsame=true;
for(const symbol of symbols){
if(symbol!=symbols[0]){
allsame=false;
break;
}
}
if(allsame){
    winnings+=bet* SYMBOLS_VALUES[symbols[0]]
}
    }
    return winnings;
};
const game=()=>{
let balance = deposit();
while(true){
    console.log("You have a balance of $"+balance);
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);

balance -= bet * numberOfLines;

const reels = spin();
const rows = transpose(reels);

printRows(rows);
const winnings=getWinnings(rows,bet,numberOfLines)
balance +=winnings;
console.log("you won, $"+winnings.toString());
if(balance<=0){
    console.log("you ran out of money!");
    break;
}
const playAgain =prompt("Do you  want to play again (y/n)?"  );
if (playAgain!="y")break;
}
}

game();