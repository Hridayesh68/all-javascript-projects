//1.deposit some money
//2.determine number of lines to bet on
//3.spin the slot machine
//4.check if the use won
//5.give the user their warnings
//6.play again
//7.spin the slot machine
const prompt =require("prompt-sync")();
const Rows= 3;
const Cols=3;
const SYMBOLS_COUNT={
    "A":2,
    "B":4,
    "C":6,
    "D":8
}
const SYMBOLS_VALUES={
    "A":5,
    "B":4,
    "C":3,
    "D":2
}
const deposit=()=>{
    while(true){
const depositAmount=prompt("Enter a deposit amount: ");
const numberDepositAmount=parseFloat(depositAmount);
if(isNaN(numberDepositAmount)||numberDepositAmount<=0){
    console.log("Invalid deposit amount, try again.");
}
else{
    return numberDepositAmount;
}
    }
}
const getNumberOfLines=()=>{
while(true){
const lines=prompt("Enter the number of lines to bet ");
const numberoflines=parseFloat(lines);
if(isNaN(lines)||lines<=0 || lines>3){
    console.log("Invalid number of lines, try again.");
}
else{
    return numberoflines;
}
}
};
const getbet=(blance,lines)=>{
while(true){
const bet=prompt("Enter the total bet");
const numberbet=parseFloat(bet);
if(isNaN(numberbet)||numberbet<=0 || numberbet>balance/lines){
    console.log("Invalid bet. try again");
}
else{
    return numberbet;
}
}
};
const spin=()=>{
    const symbols=[];
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
       for(let i=0; i<count; i++){
symbols.push(symbol);
       }
    }
    const reels=[];
    for (let i=0; i<Cols; i++){
        reels.push([]);
        const reelSymbols=[symbols];
        for(let j=0; j<Rows; j++){
            const randomIndex=Math.floor(Math.random()*reelSymbols.length);
const selectedSymbol=reelSymbols[randomIndex];
reels[i].push(selectedSymbol);
reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;
};
const transpose=(reels)=>{
    const rows=[];
    for(let i=0; i<Rows; i++){
        rows.push([]);
        for(let j=0; j<Cols; j++){
            rows[i].push(reels[i][j]);
        }
    }
    return rows;
}
let balance=deposit();
const numberoflines=getNumberOfLines();
const bet=getbet(balance,numberoflines);
const reels=spin();
const rows=transpose(reels);
console.log(reels);
console.log(rows);
const printRows=(rows)=>{
    for(const row of rows){
let rowString ="A";
for(const[i,symbol] of rows.entries()){
rowString+=symbol
}
    }
}