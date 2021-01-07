const section = document.getElementById('section');
const board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

const modeBtn = document.getElementById('mode');
const resetBtn = document.getElementById('reset');
const darkImage = document.getElementById('darkImage');
const lightImage = document.getElementById('lightImage');
let dark = false;
modeBtn.addEventListener('click',function(){
    if(dark === false){
        document.documentElement.style.setProperty('--backgroundColor', '#000');
        document.documentElement.style.setProperty('--player1Color', '#00f');
        document.documentElement.style.setProperty('--player2Color', ' #ff0');
        document.documentElement.style.setProperty('--rowColor', '#fff');
        
        darkImage.classList.add('hidden');
        lightImage.classList.remove('hidden');
        dark = true;
    }
    else{
        document.documentElement.style.setProperty('--backgroundColor', '#fff');
        document.documentElement.style.setProperty('--player1Color', '#000');
        document.documentElement.style.setProperty('--player2Color', '#f00');
        document.documentElement.style.setProperty('--rowColor', '#00f');

        lightImage.classList.add('hidden');
        darkImage.classList.remove('hidden');
        dark = false;
    }
})

resetBtn.addEventListener('click', cleanBoard)

const LINES = board.length
const COLUMNS = board[0].length 

//Criate LayOut
for(let i = 0; i < COLUMNS; i++){
    
    const divContainer = document.createElement('div')
    divContainer.setAttribute('class', 'column')
    
    for(let j = 0; j < LINES; j++){
        
        const divLine = document.createElement('div')
        divLine.setAttribute('class', 'row')
        divLine.setAttribute('id', `${[j]},${[i]}`  )
        divContainer.appendChild(divLine)
        
    }
    
    section.appendChild(divContainer)
    
}

const message = document.createElement('p');
message.classList.add('message');
document.body.appendChild(message);

const postionArray = document.querySelectorAll('.row');

postionArray.forEach(function(el,ind,arr){
    el.addEventListener('click',clickColumns);
});

let player = 1;

const selectFirstColorBtn = document.getElementById('discColor');

selectFirstColorBtn.addEventListener("click", function(evt){
    const selectedColor = evt.target.id;

    if(player === 1) {
        player = 2;

    } else {
        player = 1;
    }

    console.log(player);
});

function clickColumns(event) {
    const disc = document.createElement('div');
    const positionId = event.target.id;
    const selectedColumn = document.getElementById(positionId).parentElement;  
    let index = null;
    let boardPosition;

    for(let i = 0; i < 6; i++) {
        const discsInside = selectedColumn.children[i].childElementCount;        

        if (discsInside === 0) {
            selectedColumn.children[i].appendChild(disc)
            index = selectedColumn.children[i].id
        }
    }

   

    if(index !== null){
        boardPosition = board[index[0]][index[2]];
        board[index[0]][index[2]] = player;
        
        if(validation(index[0],index[2])){
            postionArray.forEach(function(el,ind,arr){
                el.removeEventListener('click',clickColumns);
            });
        }
       
    }

    let draw = verifyEmptySpaces(board);
    if(draw === false){
        postionArray.forEach(function(el,ind,arr){
            el.removeEventListener('click',clickColumns);
        });
        message.innerText = "Empatou";
    }
    
    
    if( player  === 1 && boardPosition !== undefined){
        disc.setAttribute('class', 'disc black');
        player = 2;
    } 
    else{
        disc.setAttribute('class', 'disc red');
        player = 1;
    }

    selectFirstColorBtn.classList.add('hidden')
};

function validation(posLine, posColumn){
    let output = false
    
    if(virifyHorizontal(posLine) || virifyVertical(posLine, posColumn) || verifyDiagonal(posLine, posColumn)){
        output = true
    }
  
    return output
}

function virifyHorizontal(posLine){
    let output = false
    const lineArray = board[posLine]

    output = verifyWinner(lineArray)

    return output
}

function virifyVertical(posLine, posColumn){
    let output = false
    let arrayColoumn = [];
    
    for(let i = 0; i < 6 ; i++){
       let columnValue = board[i][posColumn];
       arrayColoumn.push(columnValue)
    }

    output = verifyWinner(arrayColoumn)

    return output
    
    
}

function verifyDiagonal(posLine, posColumn) {
    posLine = Number(posLine);
    posColumn = Number(posColumn)

    let arrayDiagonalTopLeft = []; 
    let arrayDiagonalTopRight = [];
    let arrayDiagonalBottomLeft = [];
    let arrayDiagonalBottomRight = [];
    let output =  false;   

    //console.log(posLine, posColumn)
    for(let i = 0; i < 6; i++){
        if(posLine- i > -1 && posColumn+i <= 6){
            arrayDiagonalTopRight.push(board[posLine-i][posColumn+i])
        }

        if(posLine- i > -1 && posColumn-i <= 6 && board[posLine-i][posColumn-i] !== undefined){
            arrayDiagonalTopLeft.push(board[posLine-i][posColumn-i])
        }

        if(posLine+ i < 6 && posColumn+i <= 6 && board[posLine+i][posColumn+i] !== undefined){
            arrayDiagonalBottomRight.push(board[posLine+i][posColumn+i])
        }

        if(posLine+ i < 6 && posColumn-i <= 6 && board[posLine+i][posColumn-i] !== undefined){
            arrayDiagonalBottomLeft.push(board[posLine+i][posColumn-i])
        }

    }

    let arrayLeftToRight = arrayDiagonalBottomLeft.reverse().concat(arrayDiagonalTopRight.slice(1));
    let arrayRightToLeft = arrayDiagonalBottomRight.reverse().concat(arrayDiagonalTopLeft.slice(1));
      
    if (verifyWinner(arrayLeftToRight) || verifyWinner(arrayRightToLeft)){
        output = true
    }
    
    
    return output
};

function verifyEmptySpaces(board){
    for(let i = 0; i< board.length; i++){
        if(board[i].includes(0)){
            return true
        }
    }
    return false
}

function verifyWinner(array){

    if(array.join("").includes("1111")){
        message.innerText = "Preto Ganhou!";
        return true
    }
    if(array.join("").includes("2222")){
        message.innerText = "Vermelho Ganhou!";
        return true
    }

}

function cleanBoard(){
    postionArray.forEach(function(el){
        el.innerHTML = "";
        el.addEventListener('click',clickColumns);
    })
    board.forEach(function(el,ind){
        board[ind] = [0, 0, 0, 0, 0, 0, 0];
    })
    message.innerText = "";
    
}