import { DOM } from "./dom";
import { conversionFunction } from "./button";
import { Clear } from "./button";
import { sortingValues } from "./button";

const URL = "https://api.exchangerate.host/latest";

let data = await (await fetch(URL)).json();

async function createDropDown(arrayElement, ID) {
  Object.keys(arrayElement).forEach((element) =>
    ID.insertAdjacentHTML(
      "beforeend",
      `<option class="${element}">${element}</option>`
    )
  );
}

createDropDown(data.rates, DOM.dropDownBase);
createDropDown(data.rates, DOM.dropDownConverted);

DOM.form.addEventListener("submit", (event) => {
  event.preventDefault();
  let inputValue = document.querySelector(".textInput").value;
  let toBeConverted = document.querySelector(".dropDownConverted").value;
  let baseCurrency = document.querySelector(".dropDownBase").value;
  if (Number.isNaN(inputValue / 1)) {
    alert("Non-number Amount Entered");
  } else if (
    baseCurrency == "Base Currency" ||
    toBeConverted == "Converted Currency"
  ) {
    alert("Requires Currency Type");
  } else {
    conversionFunction.execute(
      DOM.output,
      data.rates,
      inputValue,
      baseCurrency,
      toBeConverted
    );
    Clear.execute("", "Converted Currency", "Base Currency");
  }
});

let entries = Object.entries(data.rates);

entries.forEach((element) => {
  if (element[0] == "USD") {
  } else {
    conversionFunction.execute(DOM.output, data.rates, 1, "USD", element[0]);
  }
});

DOM.clearButton.addEventListener("click", function () {
  DOM.output.textContent = "";
});

DOM.leastValued.addEventListener("click", function () {
  sortingValues.display(DOM.outputRankings, entries, (a, b) => b[1] - a[1]);
});

DOM.mostValued.addEventListener("click", function () {
  sortingValues.display(DOM.outputRankings, entries, (a, b) => a[1] - b[1]);
});

sortingValues.display(DOM.outputRankings, entries, (a, b) => b[1] - a[1]);
