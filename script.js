const ul = document.getElementById('bahnhoefe')

fetch('./at.csv').then(async res => {
  const csv = await res.text()
  console.log(csv)
  const bhfs = csv.split('\n').map(l => l.split(';'))
  bhfs.forEach(bhf => {
    const li = document.createElement('li')
    const abfahrten = document.createElement('a')
    abfahrten.innerText = 'Abfahrten'
    abfahrten.href = `https://meine.oebb.at/abfahrtankunft/departure?evaNr=${bhf[0]}&static=true`
    li.appendChild(abfahrten)
    li.appendChild(document.createTextNode(' / '))
    const ankuenfte = document.createElement('a')
    ankuenfte.innerText = 'Ankünfte'
    ankuenfte.href = `https://meine.oebb.at/abfahrtankunft/arrival?evaNr=${bhf[0]}&static=true`
    li.appendChild(ankuenfte)
    li.appendChild(document.createTextNode(` - ${bhf[1]}`))
    ul.appendChild(li)
  })
})