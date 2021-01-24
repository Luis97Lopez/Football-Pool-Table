const url_string = window.location.href
const url = new URL(url_string)
const jornada = url.searchParams.get('id')
const title = document.getElementById('title')

document.title = `Jornada ${jornada}`
title.innerHTML = `Respuestas de la jornada ${jornada}`