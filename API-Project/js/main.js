import { DOM } from "./dom";
import { displayCreation } from "./display";
import { arrayDisplay } from "./display";
import { conversionFunction } from "./button";
import { clear } from "./button";
import { reset } from "./button";
import { sortingValues } from "./button";

const URL = "https://api.exchangerate.host/latest";

let data = await (await fetch(URL)).json();
let entries = Object.entries(data.rates);

displayCreation.createDropDown(data.rates, DOM.dropDownBase);
displayCreation.createDropDown(data.rates, DOM.dropDownConverted);

arrayDisplay.execute(
  conversionFunction.execute,
  entries,
  DOM.output,
  data.rates
);

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
    reset.execute("", "Converted Currency", "Base Currency");
  }
});

clear.execute(DOM.clearButton, DOM.output);

DOM.leastValued.addEventListener("click", function () {
  sortingValues.display(DOM.outputRankings, entries, (a, b) => b[1] - a[1]);
});

DOM.mostValued.addEventListener("click", function () {
  sortingValues.display(DOM.outputRankings, entries, (a, b) => a[1] - b[1]);
});

sortingValues.display(DOM.outputRankings, entries, (a, b) => b[1] - a[1]);
