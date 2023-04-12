const table = document.getElementById('bahnhoefe')
const operatorsDiv = document.getElementById('operators')

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

fetch('./at.csv').then(async res => {
  const csv = await res.text()
  const bhfs = csv.split('\n').map(l => l.split(';'))
  bhfs.forEach(bhf => {
    const tr = document.createElement('tr')
    const bhfTd = document.createElement('td')
    bhfTd.innerText = bhf[1];
    bhfTd.className = 'station-name'
    tr.appendChild(bhfTd)

    const abfahrten = document.createElement('a')
    abfahrten.innerText = 'Abfahrten'
    abfahrten.href = `https://meine.oebb.at/abfahrtankunft/departure?evaNr=${bhf[0]}&static=true`
    const abfahrtenTd = document.createElement('td')
    abfahrtenTd.appendChild(abfahrten)
    tr.appendChild(abfahrtenTd)
    
    const ankuenfte = document.createElement('a')
    ankuenfte.innerText = 'Ankünfte'
    ankuenfte.href = `https://meine.oebb.at/abfahrtankunft/arrival?evaNr=${bhf[0]}&static=true`
    const ankuenfteTd = document.createElement('td')
    ankuenfteTd.appendChild(ankuenfte)
    tr.appendChild(ankuenfteTd)

    table.appendChild(tr)
  })
})