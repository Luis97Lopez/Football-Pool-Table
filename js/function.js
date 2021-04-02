export const participantes = [
    "Mario",
    "Davs",
    "Leo",
    "Juls",
    "Roul",
    "Ruben",
    "Loiz",
    "Chapa"
]

function moveChar(c,n) {
    return String.fromCharCode(c.charCodeAt(0) + n);
}

export async function leeHoja(range){
    const id = "1ILBc__8JEni21H8ZAvEhF_1jYySZK-iryQBs6w7k2hw";
    const key = "AIzaSyAnTMDkCp-b2p4DsADBxO54Jx-2XPhD6-w";
    const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?key=${key}`;
    let arreglo;
    await fetch(url)
        .then(response => response.json())
        .then(data => arreglo = data.values)
    return arreglo
}

export async function leeHojaLotes(ranges, majorDimension){
    const id = "1ILBc__8JEni21H8ZAvEhF_1jYySZK-iryQBs6w7k2hw";
    const key = "AIzaSyAnTMDkCp-b2p4DsADBxO54Jx-2XPhD6-w";
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

    participantes.forEach(async p => {
        params.push(p + '!K' + j + ':AC' + j)
    })

    datos = await leeHojaLotes(params, "ROWS");
    return datos
}