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
    const tr = document.createElement('tr')
    const bhfTd = document.createElement('td')
    const name = bhf[0]
    const code = bhf[1].replace(/\s+/g, '')
    bhfTd.innerText = name;
    bhfTd.className = 'station-name'
    tr.appendChild(bhfTd)

    const abfahrten = document.createElement('a')
    abfahrten.innerText = 'Abfahrten'
    abfahrten.href = `https://meine.oebb.at/abfahrtankunft/webdisplay/#/?stationId=${code}&contentType=departure&staticLayout=true`
    // abfahrten.href = `https://meine.oebb.at/abfahrtankunft/departure?evaNr=${bhf[0]}&static=true`
    const abfahrtenTd = document.createElement('td')
    abfahrtenTd.appendChild(abfahrten)
    tr.appendChild(abfahrtenTd)
    
    const ankuenfte = document.createElement('a')
    ankuenfte.innerText = 'Ankünfte'
    ankuenfte.href = `https://meine.oebb.at/abfahrtankunft/webdisplay/#/?stationId=${code}&contentType=arrival&staticLayout=true`
    // ankuenfte.href = `https://meine.oebb.at/abfahrtankunft/arrival?evaNr=${bhf[0]}&static=true`
    const ankuenfteTd = document.createElement('td')
    ankuenfteTd.appendChild(ankuenfte)
    tr.appendChild(ankuenfteTd)

    table.appendChild(tr)
    rows.push({ code, name, tr })
  })
})

search.addEventListener('keydown', (event) => {
  const value = event.target.
  rows.forEach(({ code, name, tr }) => {
    i
  })
})
