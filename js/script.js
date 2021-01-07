const section = document.querySelector('section')
const board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

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

const postionArray = document.querySelectorAll('.row');

postionArray.forEach(function(el,ind,arr){
    el.addEventListener('click',clickColumns);
});

let player = 1;

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
        console.log(validation(index[0],index[2]))
       
    }    
    
    if( player  === 1 && boardPosition !== undefined){
        disc.setAttribute('class', 'disc black');
        player = 2;
    } 
    else{
        disc.setAttribute('class', 'disc red');
        player = 1;
    }
};


function virifyHorizontal(posLine){
    let output = false
    const lineArray = board[posLine]

    if( lineArray.join("").includes("1111") || lineArray.join("").includes("2222") ){
        output = true
    }

    return output
}


function validation(posLine, posColumn){
    let output = false
    
    if(virifyHorizontal(posLine) || virifyVertical(posLine, posColumn)){
        output = true
    }
  
    return output
}

function virifyVertical(posLine, posColumn){
    let output = false
    let arrayColoumn = [];
    
    for(let i = 0; i < 6 ; i++){
       let columnValue = board[i][posColumn];
       arrayColoumn.push(columnValue)
        
    }

    if(arrayColoumn.join("").includes("1111") || arrayColoumn.join("").includes("2222") ){
      output = true
    }
    
    return output
}

