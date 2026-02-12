const table = document.getElementById("bahnhoefe");
const operatorsDiv = document.getElementById("operators");
/** @type HTMLInputElement */
const search = document.getElementById("search");
const infoBanner = document.getElementById("info");

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
