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

