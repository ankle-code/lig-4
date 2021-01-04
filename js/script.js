const section = document.querySelector('section')
const LINES = 6
const COLUMNS = 7


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



