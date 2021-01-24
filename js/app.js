const id = "1ILBc__8JEni21H8ZAvEhF_1jYySZK-iryQBs6w7k2hw";
const key = "AIzaSyAnTMDkCp-b2p4DsADBxO54Jx-2XPhD6-w";

const table = document.getElementById("table")
const places = document.getElementById("places")
const games = document.getElementById("games")

let datos
let conf

main()

async function leeHoja(range){
    const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?key=${key}`;
    let arreglo;
    await fetch(url)
        .then(response => response.json())
        .then(data => arreglo = data.values)
    return arreglo;
}

async function leeAPI(){
    datos = await leeHoja('Sumatoria!A1:I')
    conf = await leeHoja('Datos!A1:B')
}

function imprime(){
    datos.forEach((row, idx) => {
        if(idx == 0){
            agregaHead(row)
        }
        else{
            agregaRow(row)
        }
        
    })
}


function agregaHead(row){
    const tr = document.createElement("tr")
    
    row.forEach(column => {
        const td = document.createElement("th")
        td.innerHTML += `${column}`
        tr.appendChild(td)
    })
    table.appendChild(tr)
}

function agregaRow(row){
    const tr = document.createElement("tr")
    
    row.forEach((column, idx) => {
        let td
        if(idx == 0){
            td = document.createElement("th")
            td.setAttribute("scope", "row")
        }else{
            td = document.createElement("td")
        }

        td.innerHTML += `${column}`
        tr.appendChild(td)
    })
    table.appendChild(tr)
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
    actual = parseInt(conf[0][1])
    
    for(let i = 1; i <= actual; i++){
        const ref = document.createElement('a')
        ref.setAttribute('href', `./jornada.html?id=${i}`)

        const element = document.createElement('li')
        element.innerHTML = `Jornada ${i}`
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