const table = document.getElementById('bahnhoefe')
const operatorsDiv = document.getElementById('operators')
const search = document.getElementById('search')
const rows = []

// from https://meine.oebb.at/abfahrtankunft/webdisplay/config/config.js
const operators = {
  CAT: 'cat.jpg',
  DB: 'db.jpg',
  GKB: 'gkb.jpg',
  LILO: 'lilo.jpg',
  MBS: 'mbs.jpg',
  MERIDIAN: 'meridian.jpg',
  NOVOG: 'novog.jpg',
  ÖBB: 'oebb.jpg',
  RBC: 'rbc.jpg',
  SLB: 'slb.jpg',
  STB: 'stb.jpg',
  STH: 'sth.jpg',
  WALSER: 'walser.jpg',
  WEST: 'west.jpg',
  WLB: 'wlb.jpg',
  ZB: 'zb.jpg',
};

Object.values(operators).forEach(op => {
  const img = document.createElement('img')
  img.className = 'operator'
  img.src = `https://meine.oebb.at/abfahrtankunft/webdisplay/assets/operators/${op}`
  operatorsDiv.appendChild(img)
})

fetch('./oebb-db640-codes-2024.csv').then(async res => {
  const csv = await res.text()
  const bhfs = csv.split('\n').slice(1).map(l => l.slice(1, -1).split('","'))
  bhfs.forEach(bhf => {
    const name = bhf[0]
    const code = bhf[1].replace(/\s+/g, '')
    rows.push([code, name])
  })
  renderRows()
})

const renderRows = (ev) => {
  table.innerHTML = ''
  const filter = search.value.toLowerCase()
  rows.forEach(([code, name]) => {
    if (!code.toLowerCase().includes(filter) && !name.toLowerCase().includes(filter)) return;

    const tr = document.createElement('tr')
    const bhfTd = document.createElement('td')
    bhfTd.innerText = name;
    bhfTd.className = 'station-name'
    const abfahrten = document.createElement('a')
    tr.appendChild(bhfTd)
    abfahrten.innerText = 'Abfahrten'
    abfahrten.href = `https://meine.oebb.at/abfahrtankunft/webdisplay/#/?stationId=${code}&contentType=departure&staticLayout=true`
    const abfahrtenTd = document.createElement('td')
    abfahrtenTd.appendChild(abfahrten)
    tr.appendChild(abfahrtenTd)
    
    const ankuenfte = document.createElement('a')
    ankuenfte.innerText = 'Ankünfte'
    ankuenfte.href = `https://meine.oebb.at/abfahrtankunft/webdisplay/#/?stationId=${code}&contentType=arrival&staticLayout=true`
    const ankuenfteTd = document.createElement('td')
    ankuenfteTd.appendChild(ankuenfte)
    tr.appendChild(ankuenfteTd)

    table.appendChild(tr)
  })
}

search.addEventListener('input', renderRows)
