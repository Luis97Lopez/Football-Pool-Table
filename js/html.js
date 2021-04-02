function agregaHead(row){
    const tr = document.createElement("tr")
    
    row.forEach(column => {
        const td = document.createElement("th")
        td.innerHTML += `${column}`
        tr.appendChild(td)
    })
    return tr
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
    return tr
}

export { agregaHead, agregaRow};