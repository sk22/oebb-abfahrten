const table = document.getElementById('bahnhoefe')
const operatorsDiv = document.getElementById('operators')
const search = document.getElementById('search')
const rows = []

// from https://meine.oebb.at/webdisplay/templates/config.json
const operators = {
  "BOB": "assets/operators/brb.jpg",
  "CAT": "assets/operators/cat.jpg",
  "DB": "assets/operators/db.jpg",
  "DB-FV": "assets/operators/db.jpg",
  "DB-REGIO": "assets/operators/db.jpg",
  "DBR": "assets/operators/db.jpg",
  "GKB": "assets/operators/gkb.jpg",
  "LILO": "assets/operators/lilo.jpg",
  "MBS": "assets/operators/mbs.jpg",
  "MERIDIAN": "assets/operators/meridian.jpg",
  "NOVOG": "assets/operators/novog.jpg",
  "NOEVOG": "assets/operators/novog.jpg",
  "ÖBB": "assets/operators/oebb.jpg",
  "BB": "assets/operators/oebb.jpg",
  "EVU_GR1": "assets/operators/oebb.jpg",
  "EVU_GR2": "assets/operators/oebb.jpg",
  "EVU_GR3": "assets/operators/oebb.jpg",
  "EVU_GR4": "assets/operators/oebb.jpg",
  "EVU_GR5": "assets/operators/oebb.jpg",
  "EVU_GR6": "assets/operators/oebb.jpg",
  "EVU_GR7": "assets/operators/oebb.jpg",
  "FW": "assets/operators/oebb.jpg",
  "GV-RCA": "assets/operators/oebb.jpg",
  "GV-RCA-P": "assets/operators/oebb.jpg",
  "IS": "assets/operators/oebb.jpg",
  "LOK": "assets/operators/oebb.jpg",
  "NB": "assets/operators/oebb.jpg",
  "NETLOG": "assets/operators/oebb.jpg",
  "N-INFRA": "assets/operators/oebb.jpg",
  "N-IS": "assets/operators/oebb.jpg",
  "N-ÖBB": "assets/operators/oebb.jpg",
  "ÖBB-INFRA": "assets/operators/oebb.jpg",
  "PR-ÖBB": "assets/operators/oebb.jpg",
  "PR-ÖBB-MZ": "assets/operators/oebb.jpg",
  "PV_POST": "assets/operators/oebb.jpg",
  "PV-FV": "assets/operators/oebb.jpg",
  "PV-KTN": "assets/operators/oebb.jpg",
  "PV-NÖSB": "assets/operators/oebb.jpg",
  "PV-N": "assets/operators/oebb.jpg",
  "PV-OÖ": "assets/operators/oebb.jpg",
  "PV-OST1": "assets/operators/oebb.jpg",
  "PV-OST2": "assets/operators/oebb.jpg",
  "PV-OST": "assets/operators/oebb.jpg",
  "PV-PINZ": "assets/operators/oebb.jpg",
  "PV-SBG": "assets/operators/oebb.jpg",
  "PV-STMK": "assets/operators/oebb.jpg",
  "PV-TAU": "assets/operators/oebb.jpg",
  "PV-TIROL": "assets/operators/oebb.jpg",
  "PV-VLBG": "assets/operators/oebb.jpg",
  "PV": "assets/operators/oebb.jpg",
  "REG": "assets/operators/oebb.jpg",
  "ST": "assets/operators/oebb.jpg",
  "TK": "assets/operators/oebb.jpg",
  "TS": "assets/operators/oebb.jpg",
  "PLB": "assets/operators/plb.jpg",
  "RBC": "assets/operators/rbc.jpg",
  "ROEEE": "assets/operators/rbc.jpg",
  "RJAT": "assets/operators/rgj.jpg",
  "SLB LEX": "assets/operators/slb.jpg",
  "SLB S1": "assets/operators/slb.jpg",
  "SLB": "assets/operators/slb.jpg",
  "STB": "assets/operators/stb.jpg",
  "STLB": "assets/operators/stb.jpg",
  "STH": "assets/operators/sth.jpg",
  "STH R": "assets/operators/sth.jpg",
  "STH SB": "assets/operators/sth.jpg",
  "WALSER": "assets/operators/walser.jpg",
  "WEST": "assets/operators/west.jpg",
  "WLB": "assets/operators/wlb.jpg",
  "ZB": "assets/operators/zb.jpg"
};

new Set(Object.values(operators)).forEach(op => {
  const img = document.createElement('img')
  img.className = 'operator'
  img.src = `https://meine.oebb.at/abfahrtankunft/webdisplay/${op}`
  operatorsDiv.appendChild(img)
})

fetch('./oebb-db640-codes-2024.csv').then(async res => {
  const csv = await res.text()
  const bhfs = csv.split('\n').slice(1).map(l => l.slice(1, -1).split('","'))
  bhfs.forEach(bhf => {
    const name = bhf[0]
    const code = bhf[1].replace(/\s+/g, '').toUpperCase()
    rows.push([code, name])
  })
  renderRows()
})

const renderRows = () => {
  table.innerHTML = ''
  const filter = search.value.toLowerCase()
  rows.forEach(([code, name]) => {
    if (!code.toLowerCase().includes(filter) && !name.toLowerCase().includes(filter)) return;

    const tr = document.createElement('tr')
    const bhfTd = document.createElement('td')
    bhfTd.innerText = name
    bhfTd.className = 'station-name'
    tr.appendChild(bhfTd)

    const abfahrten = document.createElement('a')
    abfahrten.innerText = 'Abfahrten'
    abfahrten.href = `https://meine.oebb.at/webdisplay/?stationId=${code}&contentType=departure&staticLayout=true&page=1&offset=0&ignoreIncident=true`
    const abfahrtenTd = document.createElement('td')
    abfahrtenTd.appendChild(abfahrten)
    tr.appendChild(abfahrtenTd)
    
    const ankuenfte = document.createElement('a')
    ankuenfte.innerText = 'Ankünfte'
    ankuenfte.href = `https://meine.oebb.at/webdisplay/?stationId=${code}&contentType=arrival&staticLayout=true&page=1&offset=0&ignoreIncident=true`
    const ankuenfteTd = document.createElement('td')
    ankuenfteTd.appendChild(ankuenfte)
    tr.appendChild(ankuenfteTd)
    
    const mobile = document.createElement('a')
    mobile.innerText = 'Mobile'
    mobile.href = `https://meine.oebb.at/webdisplay/?stationId=${code}&contentType=departure&staticLayout=false&page=1&offset=0&ignoreIncident=true`
    const mobileTd = document.createElement('td')
    mobileTd.appendChild(mobile)
    tr.appendChild(mobileTd)

    table.appendChild(tr)
  })
}

search.addEventListener('input', renderRows)
