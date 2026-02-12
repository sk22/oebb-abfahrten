#!/usr/bin/env node

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
			`<div class="station" data-plc="${plc}" data-name="${name}" style="view-transition-name: plc-${plc};">
				<div class="station-info"><a class="station-name" href="https://infotogo.oebb.at/~${plc}~">${name}</a> <small>${plc}</small></div>
				<div class="station-links">
					<a href="https://meine.oebb.at/abfahrtankunft/departure/?plc=${plc}&static=false">Mob<wbr>ile</a>
					<a href="webdisplay.html?stationId=${plc}&contentType=departure&prepend=construction,formation">Dep<wbr>artures</a>
					<a href="webdisplay.html?stationId=${plc}&contentType=arrival">Arr<wbr>ivals</a>
				</div>
			</div>`,
	)
	.join("\n");

const config = await (
	await fetch("https://meine.oebb.at/webdisplay/templates/config.json")
).json();
const operatorsHtml = Array.from(new Set(config.operators.map((o) => o.image)))
	.map((o) => `<img src="https://meine.oebb.at/abfahrtankunft/webdisplay/${o}" alt="">`)
	.join("\n");

const templateHtml = await fs.readFile("index.template", "utf8");
fs.writeFile(
	"index.html",
	templateHtml
		.replace("{{contents}}", tableHtml)
		.replace("{{operators}}", operatorsHtml),
);
