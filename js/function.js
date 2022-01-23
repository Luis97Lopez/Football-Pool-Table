export async function getParticipantes () {
    const vars = await getEnvVars();
    const id = vars.datasheet_id;
    const key = vars.key;
    const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Sumatoria!B1:1?key=${key}`;
    let participantes;
    await fetch(url)
        .then(response => response.json())
        .then(data => participantes = data.values)
    return participantes;
}

export const jornada_especial = {
    18: 'Cuartos de Final Ida',
    19: 'Cuartos de Final Vuelta',
    20: 'Semifinales Ida',
    21: 'Semifinales Vuelta',
    22: 'Final Ida',
    23: 'Final Vuelta',
}

function moveChar(c,n) {
    return String.fromCharCode(c.charCodeAt(0) + n);
}

export async function leeHoja(range){
    const vars = await getEnvVars();
    const id = vars.datasheet_id;
    const key = vars.key;
    const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?key=${key}`;
    let arreglo;
    await fetch(url)
        .then(response => response.json())
        .then(data => arreglo = data.values)
    return arreglo
}

export async function leeHojaLotes(ranges, majorDimension){
    const vars = await getEnvVars();
    const id = vars.datasheet_id;
    const key = vars.key;
    const url = 
        `https://sheets.googleapis.com/v4/spreadsheets/${id}/values:batchGet?`;

    const params = new URLSearchParams({
        key: key,
        majorDimension: majorDimension
    })

    ranges.forEach(r => {
        params.append("ranges", r)
    });

    let arreglo;
    await fetch(url + params)
        .then(response => response.json())
        .then(data => arreglo = data.valueRanges)
    return arreglo
}

export async function leeTodosJornada(j){
    let datos = {}
    let params = []

    //const c = moveChar('B', j-1);
    j = parseInt(j) + 1

    params.push(`Partidos!B${j}:S${j}`)

    const participantes = (await getParticipantes())[0];
    participantes.forEach(async p => {
        params.push(p + '!K' + j + ':AC' + j)
    })

    datos = await leeHojaLotes(params, "ROWS");
    return datos
}

async function getEnvVars() {
    let vars = ""
    await fetch("../vars.json")
    .then(response => {
       return response.json();
    })
    .then(jsondata => vars = jsondata);
    return vars;
}