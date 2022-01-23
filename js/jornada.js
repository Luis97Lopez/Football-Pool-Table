import {leeTodosJornada, jornada_especial} from './function.js'
import {agregaHead} from './html.js'

const url_string = window.location.href
const url = new URL(url_string)
const jornada = url.searchParams.get('id')
const title = document.getElementById('title')

document.title = `Jornada ${jornada}`

if(jornada < 18){
    title.innerHTML = `Respuestas de la jornada ${jornada}`
}else{
    title.innerHTML = `Respuestas de ${jornada_especial[jornada]}`
}

let datos

const container = document.getElementById('container')
const table = document.getElementById("table")

main()

function transformData(){
    const users = []
    let numPartidos = 0
    datos.forEach((d, idx) => {
        if(idx == 0){
            let row = {};

            let equipos = [];

            const equiposTmp = d.values[0]
            numPartidos = equiposTmp.length / 2
            
            for(let i = 0; i < numPartidos; i++){
                equipos[i] = equiposTmp[2*i] + ' vs ' + equiposTmp[2*i + 1]
            }

            row.nombre = 'Nombre'
            row.total = 'Total'
            row.pronostico = equipos

            users.push(row);
        }else{
            let row = {};
            let _data = d.values[0];

            row.resultado = _data.splice(0,numPartidos);
            
            _data = _data.filter(i=>i!="")
            row.total = _data.splice(0,1);
            

            if(_data.length == 0){
                row.pronostico = Array(numPartidos).fill('NO DISPONIBLE')
                row.resultado = Array(numPartidos).fill(-1)
            }else{
                row.pronostico = _data; 
            }

            
            row.nombre = d.range.split('!')[0]

            users.push(row);
        }
    });

    return users
}

function agregaRow(row){
    const {nombre, resultado, total, pronostico} = row;

    const tr = document.createElement("tr")
    let td;

    td = document.createElement("th")
    td.setAttribute("scope", "row")
    td.innerHTML += nombre;
    tr.appendChild(td)
    
    row.pronostico.forEach((column, idx) => {
        let td
        td = document.createElement("td")

        if(resultado[idx] == "0"){
            td.setAttribute("class", "answer-wrong")
        }else if(resultado[idx] == "1"){
            td.setAttribute("class", "answer-right")
        }else{
            td.setAttribute("class", "answer-null")
        }
        
        td.innerHTML += `${column}`
        tr.appendChild(td)
    })

    td = document.createElement("th")
    td.setAttribute("scope", "row")
    td.innerHTML += total;
    tr.appendChild(td)

    return tr
}

function imprime(){
    datos.forEach((row, idx) => {
        if(idx == 0){
            table.appendChild(agregaHead([row.nombre, ...row.pronostico, row.total]))
        }else{
            table.appendChild(agregaRow(row))
        }
        
    })
}

async function main(){
    datos = await leeTodosJornada(jornada)
    datos = transformData()

    imprime()
}