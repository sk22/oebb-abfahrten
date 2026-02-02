const table = document.getElementById("bahnhoefe");
const operatorsDiv = document.getElementById("operators");
/** @type HTMLInputElement */
const search = document.getElementById("search");
const infoBanner = document.getElementById("info");

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

const trs = document.getElementsByClassName("station");

let timeout = null;

function performFilter() {
    const searchTerm = search.value.toLowerCase();
    timeout = null;
    document.startViewTransition(() => {
      info.style.display = searchTerm.length ? "none" : "block";
      for (const tr of trs) {
        const { name, plc } = tr.dataset;
        const found =
          searchTerm.length === 0 ||
          name.toLowerCase().includes(searchTerm) ||
          plc.includes(searchTerm);
        tr.dataset.hidden = !found;
      }
    });
  }

search.addEventListener("input", () => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(performFilter, 200);
});

performFilter();
