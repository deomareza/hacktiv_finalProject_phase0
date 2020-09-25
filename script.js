let table = document.getElementById("sudokuInput");
let warning = false;
let solved = false;


document.addEventListener('DOMContentLoaded', colorTile);

document.getElementById("btn_solve").addEventListener("click", ()=>{
  if(!warning){
    solve(getInput());
    if(solved){
      solveBoard();
      console.log(solved);
    } else {
      alert("This combination is unsolve-able. Please try again.");
    }

  } else {
    alert("Please check the numbers.")
  }
}, false);

document.getElementById("btn_reset").addEventListener("click", resetBoard, false);
document.getElementById("btn_generate").addEventListener("click", generateBoard, false);
document.getElementById("sudokuInput").addEventListener("click", (event)=>{

  event.target.style.backgroundColor = "#f1f1f1";
  event.target.value = "";
  checkInput();
},false)


document.getElementById("sudokuInput").addEventListener("change",(event)=>{
  if(!isNaN(event.target.value)){
    checkInput();
  } else {
    alert("Input has to be a number");
    event.target.value = "";
  }
}, false)


function checkConsole(input){
  console.log("it's working! " + input)
}


function colorTile(){
  
  for (let y = 0; y < table.rows.length; y++) {
    const row = table.rows[y];
    let rowArr = [];

    for (let x = 0; x < row.cells.length; x++) {
      let x0 = Math.floor(x/3) * 3;
      let y0 = Math.floor(y/3) * 3;

      row.cells[x].childNodes[0].style.backgroundColor = "#ffffff";
      
      if ((x0 === 3 || y0 === 3) ){
        if(!(x0 === 3 && y0 === 3)){
          row.cells[x].childNodes[0].style.backgroundColor = "#e1e1e1";
        } 
      }

    }
  }
}


function getInput(){

  let output = [];
  
  for (let y = 0; y < table.rows.length; y++) {
    const row = table.rows[y];
    let rowArr = [];

    for (let x = 0; x < row.cells.length; x++) {
      let value = row.cells[x].childNodes[0].value;

      if(value === ""){
        rowArr.push(0);
      }else{
        rowArr.push(Number(value));
      }
    }  
    output.push(rowArr)
  }
  return output
  
}


function checkInput(){
  warning = false;
  let board = getInput();
  
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      let element = board[y][x];
      
      if(element !== 0 ){

        board[y][x] = 0;

        if(!checkOK(board,x,y,element)){          
          warningTileColor(x,y);
          warning = true;
        } 

        board[y][x] = element;
      }
            
    }

  }

  if(!warning){
    colorTile();
  }
}


function warningTileColor(xPos, yPos){
  table.rows[yPos].cells[xPos].childNodes[0].style.backgroundColor = "#ff4b5c";
}


function solveBoard(){
 let board = getInput();
  
 solve(board);

    for (let y = 0; y < table.rows.length; y++) {
      const row = table.rows[y];
  
      for (let x = 0; x < row.cells.length; x++) {
        row.cells[x].childNodes[0].value = board[y][x];
      }
      
    }
}


function resetBoard(){
  solved = false;
  warning = false;
  colorTile();

  for (let y = 0; y < table.rows.length; y++) {
    const row = table.rows[y];

    for (let x = 0; x < row.cells.length; x++) {
      row.cells[x].childNodes[0].value = "";
    } 
  }  
}


function generateBoard(){
  
  resetBoard();
  for (let i = 1; i < 10; i++) {
    let xPos = Math.floor(Math.random()*9);
    let yPos = Math.floor(Math.random()*9);

    table.rows[yPos].cells[xPos].childNodes[0].value = i;  
  }

  solveBoard();
  
  for (let i = 0; i < 80; i++) {
    let xPos = Math.floor(Math.random()*9);
    let yPos = Math.floor(Math.random()*9);

    table.rows[yPos].cells[xPos].childNodes[0].value = "";  
  }

  solved = false;
}


/////////// SUDOKU LOGIC ///////////////

function solve(board){

  let spot = findEmptySpot(board);
  let yPos = spot[0];
  let xPos = spot[1];

  if (yPos < 0){
      solved = true;
      return true;
      
  } else {

      for(let i = 1; i <= board.length; i++){
            if(checkOK(board,xPos,yPos,i)){
              board[yPos][xPos] = i;
              
              if(solve(board)){
                  return true;
              }

              board[yPos][xPos] = 0;
          }
      }
  }
  return false;

}

function checkOK(board, xPos, yPos, num){
  if(isRowOK(board,xPos,num) && isColOK(board,yPos,num) && isBoxOK(board,yPos,xPos,num)){
    return true;
  }else {
    return false;
  }
}

function isRowOK(board, xPos, num){
  
  for (let i = 0; i < board.length; i++){
      if(board[i][xPos] === num){
          return false;
      }
  }

  return true;
}


function isColOK(board, yPos, num){
  
  for (let i = 0; i < board.length; i++){
      if(board[yPos][i] === num){
          return false;
      }
  }

  return true;
}

function isBoxOK(board, yPos, xPos, num){

  let x0 = Math.floor(xPos/3) * 3;
  let y0 = Math.floor(yPos/3) * 3;

  for(let y = y0; y < y0 + 3; y++){
      for(let x = x0; x < x0 + 3; x++){

          if(board[y][x] === num){
              return false;
          }
          
      }
  }
  return true;
}


function findEmptySpot(board){
  let output = [-1,-1];

  for(let y = 0; y < board.length; y++){
      for(let x = 0; x < board.length; x++){
          if(board[y][x] === 0){
              return output = [y,x];
          } 
      }
  }

  return output;
}



