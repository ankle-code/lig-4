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

//const disc = document.createElement('div');
//disc.setAttribute('class', 'disc red');

//Cria LayOut
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
   

    if( player === 1){
        player = 2;
        disc.setAttribute('class', 'disc red');
    } else{
        player = 1;
        disc.setAttribute('class', 'disc black');
    }
    const positionId = event.target.id;
    
    const selectedRow = document.getElementById(positionId);
    if (selectedRow === null){
        return 
    }
    const selectedColumn = selectedRow.parentElement;

    for(let i = 0; i < 6; i++) {
     if (selectedColumn.children[i].childElementCount === 0) {
        selectedColumn.children[i].appendChild(disc)
     }
    }

   
    
 
};

