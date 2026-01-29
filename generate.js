import fs from "node:fs/promises";

const infoToGoHtml = await (await fetch("https://infotogo.oebb.at")).text();
const ulStartString =
	'<ul class="station-search-field-list js-station-search-field-list">';
const ulStartIndex = infoToGoHtml.indexOf(ulStartString);
const ulEndString = "</ul>";
const oebbStationsHtml = infoToGoHtml.slice(
	ulStartIndex + ulStartString.length,
	infoToGoHtml.indexOf(ulEndString, ulStartIndex),
);

const liRegex = /<li[\s\S]+?data-plc="(\d+)"[\s\S]*?>\s*(.*?)\s*<\/li>/g;
const oebbStations = Array.from(oebbStationsHtml.matchAll(liRegex)).map(
	([_match, plc, name]) => [plc, name],
);
fs.writeFile("stations.tsv", oebbStations.map((s) => s.join("\t")).join("\n"));

const tableHtml = oebbStations
	.map(
		([plc, name]) =>
			`<tr class="station" data-plc="${plc}" data-name="${name}" style="view-transition-name: plc-${plc};">
				<td class="station-name"><strong>${name}</strong> <small>${plc}</small></td>
				<td><a href="https://meine.oebb.at/webdisplay/?stationId=${plc}&contentType=departure&staticLayout=true&page=1&offset=0&ignoreIncident=true">Abfahrten</a></td>
				<td><a href="https://meine.oebb.at/webdisplay/?stationId=${plc}&contentType=arrival&staticLayout=true&page=1&offset=0&ignoreIncident=true">Ankünfte</a></td>
				<td><a href="https://meine.oebb.at/webdisplay/?stationId=${plc}&contentType=departure&staticLayout=false&page=1&offset=0&ignoreIncident=true">Mobile</a></td>
			</tr>`,
	)
	.join("\n");

const templateHtml = await fs.readFile("index.template", "utf8");
fs.writeFile("index.html", templateHtml.replace("{{contents}}", tableHtml));
