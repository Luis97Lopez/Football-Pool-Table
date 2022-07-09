function agregaHead(row){
    const thead = document.createElement("thead")
    const tr = document.createElement("tr")
    thead.appendChild(tr)
    
    row.forEach(column => {
        const td = document.createElement("th")
        td.innerHTML += `${column}`
        tr.appendChild(td)
    })
    return thead
}

function agregaRow(row){
    const tbody = document.createElement("tbody")
    const tr = document.createElement("tr")
    tbody.appendChild(tr)
    
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
    return tbody
}

function agregaFoot(row){
    const tfoot = document.createElement("tfoot")
    const tr = document.createElement("tr")
    tfoot.appendChild(tr)
    
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
    return tfoot
}

export { agregaHead, agregaRow, agregaFoot };