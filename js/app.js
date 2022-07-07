import {leeHoja, jornada_especial} from './function.js'
import {agregaHead, agregaRow} from './html.js'

const table = document.getElementById("table")
const places = document.getElementById("places")
const games = document.getElementById("games")

let datos, conf

main()

async function leeAPI(){
    datos = await leeHoja('Sumatoria!A1:I')
    conf = await leeHoja('Datos!B1:1')
}

function imprime(){
    datos.forEach((row, idx) => {
        if(idx == 0){
            table.appendChild(agregaHead(row))
        }
        else if(idx <= conf[0]){
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

    let place = -1;
    let points = -1;

    numbers.forEach((value, idx) => {
        const tr = document.createElement("tr")

        if(points != parseInt(value[1])) place = idx + 1
        
        let td = document.createElement("td")
        td.innerHTML += `${place}.-`
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML += `${names[value[0]]}`
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML += `${value[1]} pts`
        tr.appendChild(td)

        points = parseInt(value[1])
        places.appendChild(tr)
    })

}

function imprimeListaJornadas(){    
    for(let i = 1; i <= conf[0]; i++){
        const ref = document.createElement('a')
        ref.setAttribute('href', `./jornada.html?id=${i}`)

        const element = document.createElement('li')
        if(i > 17){
            element.innerHTML = jornada_especial[i]
        }else{
            element.innerHTML = `Jornada ${i}`
        }

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