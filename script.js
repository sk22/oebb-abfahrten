const table = document.getElementById("bahnhoefe");
const operatorsDiv = document.getElementById("operators");
const search = document.getElementById("search");

// from https://meine.oebb.at/webdisplay/templates/config.json
const operators = [
	"assets/operators/brb.jpg",
	"assets/operators/cat.jpg",
	"assets/operators/db.jpg",
	"assets/operators/gkb.jpg",
	"assets/operators/lilo.jpg",
	"assets/operators/mbs.jpg",
	"assets/operators/meridian.jpg",
	"assets/operators/novog.jpg",
	"assets/operators/oebb.jpg",
	"assets/operators/plb.jpg",
	"assets/operators/rbc.jpg",
	"assets/operators/rgj.jpg",
	"assets/operators/slb.jpg",
	"assets/operators/stb.jpg",
	"assets/operators/sth.jpg",
	"assets/operators/walser.jpg",
	"assets/operators/west.jpg",
	"assets/operators/wlb.jpg",
	"assets/operators/zb.jpg",
];

for (const op of operators) {
	const img = document.createElement("img");
	img.className = "operator";
	img.src = `https://meine.oebb.at/abfahrtankunft/webdisplay/${op}`;
	operatorsDiv.appendChild(img);
}

fetch("./oebb-db640-codes.tsv").then(async (res) => {
	const rows = (await res.text())
		.split("\n")
		.slice(1)
		.filter((l) => l.length)
		.map((l) => {
			const [name, code] = l.split("	");
			return [code, name, l];
		});
	window.rows = rows;
	render(rows);
});

function render(rows) {
	table.innerHTML = "";
	const filter = search.value.toLowerCase();
	rows.forEach(([code, name, line]) => {
		if (!line.toLowerCase().includes(filter)) return;
		// intentionally removing one space
		// "Gae H1" → "GaeH1", "Nw  H2" → "Nw H2"
		const stationId = code.replace(" ", "");

		const tr = document.createElement("tr");
		const bhfTd = document.createElement("td");
		bhfTd.innerHTML = `<strong>${name}</strong> <small>${code}</small>`;
		bhfTd.className = "station-name";
		tr.appendChild(bhfTd);

		const abfahrten = document.createElement("a");
		abfahrten.innerText = "Abfahrten";
		abfahrten.href = `https://meine.oebb.at/webdisplay/?stationId=${stationId}&contentType=departure&staticLayout=true&page=1&offset=0&ignoreIncident=true`;
		const abfahrtenTd = document.createElement("td");
		abfahrtenTd.appendChild(abfahrten);
		tr.appendChild(abfahrtenTd);

		const ankuenfte = document.createElement("a");
		ankuenfte.innerText = "Ankünfte";
		ankuenfte.href = `https://meine.oebb.at/webdisplay/?stationId=${stationId}&contentType=arrival&staticLayout=true&page=1&offset=0&ignoreIncident=true`;
		const ankuenfteTd = document.createElement("td");
		ankuenfteTd.appendChild(ankuenfte);
		tr.appendChild(ankuenfteTd);

		const mobile = document.createElement("a");
		mobile.innerText = "Mobile";
		mobile.href = `https://meine.oebb.at/webdisplay/?stationId=${stationId}&contentType=departure&staticLayout=false&page=1&offset=0&ignoreIncident=true`;
		const mobileTd = document.createElement("td");
		mobileTd.appendChild(mobile);
		tr.appendChild(mobileTd);

		table.appendChild(tr);
	});
}

search.addEventListener("input", render);
