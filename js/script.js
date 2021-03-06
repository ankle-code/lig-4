const section = document.getElementById('section');
const board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

const modeBtn = document.getElementById('mode');
const resetBtn = document.getElementById('reset');
const darkImage = document.getElementById('darkImage');
const lightImage = document.getElementById('lightImage');
let dark = false;
modeBtn.addEventListener('click',darkmode);

resetBtn.addEventListener('click', cleanBoard);

const LINES = board.length;
const COLUMNS = board[0].length ;


for(let i = 0; i < COLUMNS; i++){
    
    const divContainer = document.createElement('div');
    divContainer.setAttribute('class', 'column');
    
    for(let j = 0; j < LINES; j++){
        
        const divLine = document.createElement('div');
        divLine.setAttribute('class', 'row');
        divLine.setAttribute('id', `${[j]},${[i]}`);
        divContainer.appendChild(divLine);
        
    }
    
    section.appendChild(divContainer);
    
}

const message = document.getElementById('message');
message.classList.add('message');

const postionArray = document.querySelectorAll('.row');

postionArray.forEach(function(el){
    el.addEventListener('click',clickColumns);
});

let player = 1;

const selectFirstColorBtn = document.getElementById('discColor');
let changeColor = false;

selectFirstColorBtn.addEventListener("click", function(){
    if(dark === false && changeColor === false){
        document.documentElement.style.setProperty('--player1Color', '#FA8BFF');
        document.documentElement.style.setProperty('--player2Color', '#2BFF88');
        changeColor = true;
    }
    else if(dark === false && changeColor === true){
        document.documentElement.style.setProperty('--player1Color', '#2BFF88');
        document.documentElement.style.setProperty('--player2Color', '#FA8BFF');
        changeColor = false;
    }
    if(dark === true && changeColor === false){
        document.documentElement.style.setProperty('--player1Color', '#FF00B3');
        document.documentElement.style.setProperty('--player2Color', '#00DBDE');
        changeColor = true;
    }
    else if(dark === true && changeColor === true){
        document.documentElement.style.setProperty('--player1Color', '#00DBDE');
        document.documentElement.style.setProperty('--player2Color', '#FA8BFF');
        changeColor = false;
    }
});

function clickColumns(event) {
    const disc = document.createElement('div');
    const positionId = event.target.id;
    const selectedColumn = document.getElementById(positionId).parentElement;  
    let index = null;
    let boardPosition;
    const ballMessage = document.getElementById('ballMessage');

    for(let i = 0; i < 6; i++) {
        const discsInside = selectedColumn.children[i].childElementCount;        

        if (discsInside === 0) {
            selectedColumn.children[i].appendChild(disc);
            index = selectedColumn.children[i].id;
        }
    }

    if(index !== null){
        boardPosition = board[index[0]][index[2]];
        board[index[0]][index[2]] = player;
        
        if(validation(index[0],index[2])){
            postionArray.forEach(function(el){
                el.removeEventListener('click',clickColumns);
            });
        }
    }

    let draw = verifyEmptySpaces(board);
    if(draw === false){
        postionArray.forEach(function(el){
            el.removeEventListener('click',clickColumns);
        });
        message.innerHTML = '<span class="empate"> Empatou :S</span>';
    }
    
    if( player  === 1 && boardPosition !== undefined){
        disc.setAttribute('class', 'disc player1');
        ballMessage.innerHTML = 'NEXT: ' + '<span class="player2--text"> O</span>';
        player = 2;
    } 
    else{
        disc.setAttribute('class', 'disc player2');
        ballMessage.innerHTML = 'NEXT: ' + '<span class="player1--text"> O</span>';
        player = 1;
    }

    selectFirstColorBtn.classList.add('hidden');
};

function validation(posLine, posColumn){
    let output = false;
    
    if(virifyHorizontal(posLine) || virifyVertical(posLine, posColumn) || verifyDiagonal(posLine, posColumn)){
        output = true;
    }
  
    return output;
}

function virifyHorizontal(posLine){
    let output = false;
    const lineArray = board[posLine];

    output = verifyWinner(lineArray);

    return output;
}

function virifyVertical(posLine, posColumn){
    let output = false;
    let arrayColoumn = [];
    
    for(let i = 0; i < 6 ; i++){
       let columnValue = board[i][posColumn];
       arrayColoumn.push(columnValue);
    }
    output = verifyWinner(arrayColoumn);

    return output;
}

function verifyDiagonal(posLine, posColumn) {
    posLine = Number(posLine);
    posColumn = Number(posColumn);

    let arrayDiagonalTopLeft = []; 
    let arrayDiagonalTopRight = [];
    let arrayDiagonalBottomLeft = [];
    let arrayDiagonalBottomRight = [];
    let output =  false;   

    for(let i = 0; i < 6; i++){
        if(posLine- i > -1 && posColumn+i <= 6){
            arrayDiagonalTopRight.push(board[posLine-i][posColumn+i]);
        }

        if(posLine- i > -1 && posColumn-i <= 6 && board[posLine-i][posColumn-i] !== undefined){
            arrayDiagonalTopLeft.push(board[posLine-i][posColumn-i]);
        }

        if(posLine+ i < 6 && posColumn+i <= 6 && board[posLine+i][posColumn+i] !== undefined){
            arrayDiagonalBottomRight.push(board[posLine+i][posColumn+i]);
        }

        if(posLine+ i < 6 && posColumn-i <= 6 && board[posLine+i][posColumn-i] !== undefined){
            arrayDiagonalBottomLeft.push(board[posLine+i][posColumn-i]);
        }

    }

    let arrayLeftToRight = arrayDiagonalBottomLeft.reverse().concat(arrayDiagonalTopRight.slice(1));
    let arrayRightToLeft = arrayDiagonalBottomRight.reverse().concat(arrayDiagonalTopLeft.slice(1));
      
    if (verifyWinner(arrayLeftToRight) || verifyWinner(arrayRightToLeft)){
        output = true;
    }
    
    return output;
};

function verifyEmptySpaces(board){
    for(let i = 0; i< board.length; i++){
        if(board[i].includes(0)){
            return true;
        }
    }
    return false;
}

function verifyWinner(array){
    if(array.join("").includes("1111")){
        message.innerHTML = '<span class="player1--text"> Player 1</span>' + ' Ganhou :^)';
        return true;
    }
    if(array.join("").includes("2222")){
        message.innerHTML = '<span class="player2--text"> Player 2</span>' + ' Ganhou :^)';
        return true;
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
    selectFirstColorBtn.classList.remove('hidden');
    player = 1;
    message.innerText = "";    
    ballMessage.innerHTML = "";
}

function darkmode(){
    if(dark === false){
        document.documentElement.style.setProperty('--backgroundColor', '#000000');
        document.documentElement.style.setProperty('--player1Color', '#00DBDE');
        document.documentElement.style.setProperty('--player2Color', '#FF00B3');
        document.documentElement.style.setProperty('--foregroundColor', '#fff');
        document.documentElement.style.setProperty('--efectColor', '#000');
        
        darkImage.classList.add('hidden');
        lightImage.classList.remove('hidden');
        dark = true;
    }
    else{
        document.documentElement.style.setProperty('--backgroundColor', '#ffff');
        document.documentElement.style.setProperty('--player1Color', '#2BFF88');
        document.documentElement.style.setProperty('--player2Color', '#FA8BFF');
        document.documentElement.style.setProperty('--foregroundColor', '#000000');
        document.documentElement.style.setProperty('--efectColor', '#ffffff');

        lightImage.classList.add('hidden');
        darkImage.classList.remove('hidden');
        dark = false;
    }
}