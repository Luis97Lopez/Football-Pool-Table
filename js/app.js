import {leeHoja} from './function.js'
import {agregaHead, agregaRow} from './html.js'

const table = document.getElementById("table")
const places = document.getElementById("places")
const games = document.getElementById("games")

let datos

main()

async function leeAPI(){
    datos = await leeHoja('Sumatoria!A1:I')
    //conf = await leeHoja('Datos!A1:B')
}

function imprime(){
    datos.forEach((row, idx) => {
        if(idx == 0){
            table.appendChild(agregaHead(row))
        }
        else{
            table.appendChild(agregaRow(row))
        }
        
    })
}


function obtenLugares(){
    let scores = datos[datos.length-1]
    scores.shift()

    let map = scores.map(function(v, i) {
        return [i, v]
    })
    

    map.sort(function(a, b){return b[1]-a[1]})
    return map
}

function imprimeLugares(numbers){
    const head = document.createElement("tr")
    
    let th = document.createElement("th")
    th.innerHTML += "Lugar"
    head.appendChild(th)

    th = document.createElement("th")
    th.innerHTML += "Nombre"
    head.appendChild(th)

    th = document.createElement("th")
    th.innerHTML += "Puntos"
    head.appendChild(th)


    places.appendChild(head)

    const names = datos[0]
    names.shift()

    numbers.forEach((value, idx) => {
        const tr = document.createElement("tr")
        
        let td = document.createElement("td")
        td.innerHTML += `${idx+1}.-`
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML += `${names[value[0]]}`
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML += `${value[1]} pts`
        tr.appendChild(td)

        places.appendChild(tr)
    })

}

function imprimeListaJornadas(){    
    for(let i = 1; i <= 17; i++){
        const ref = document.createElement('a')
        ref.setAttribute('href', `./jornada.html?id=${i}`)

        const element = document.createElement('li')
        element.innerHTML = `Jornada ${i}`

        element.setAttribute("class", "item-juegos")

        ref.appendChild(element)
        games.appendChild(ref)
    }
    
}

async function main(){
    await leeAPI()
    imprime()
    imprimeLugares(obtenLugares())
    imprimeListaJornadas()
}