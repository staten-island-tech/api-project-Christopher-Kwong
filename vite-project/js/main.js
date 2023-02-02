import "../css/style.css";
import { DOM } from "./dom";
import { displayCreation } from "./display";
import { sortingValues } from "./display";
import { arrayDisplay } from "./display";
import { conversionFunction } from "./button";
import { clear } from "./button";
import { reset } from "./button";
import { formSubmit } from "./button";
import { ordering } from "./button";

const URL = "https://api.exchangerate.host/latest";

// let dataFromURL = fetch(URL);
// let data = dataFromURL.json();
// let data = fetch(URL).then((response) => response.json());
const asyncDataFn = async () => {
  const response = await fetch(URL); // Generate the Response object
  if (response.ok) {
    const jsonValue = await response.json(); // Get JSON value from the response body
    return Promise.resolve(jsonValue.rates);
  } else {
    return Promise.reject("ERROR!!!!");
  }
};
// let entries = Object.entries(data.rates);
let data = asyncDataFn();
let entries = Object.entries(data);

displayCreation.createDropDown(data.rates, DOM.dropDownBase);
displayCreation.createDropDown(data.rates, DOM.dropDownConverted);

arrayDisplay.execute(
  entries,
  conversionFunction.execute,
  DOM.output,
  data.rates
);

sortingValues.display(DOM.outputRankings, entries, (a, b) => b[1] - a[1]);

formSubmit.execute(
  DOM.form,
  conversionFunction.execute,
  DOM.output,
  data.rates,
  reset.execute
);

clear.execute(DOM.clearButton, DOM.output);

ordering.execute(
  DOM.leastValued,
  sortingValues.display,
  DOM.outputRankings,
  entries,
  (a, b) => b[1] - a[1]
);

ordering.execute(
  DOM.mostValued,
  sortingValues.display,
  DOM.outputRankings,
  entries,
  (a, b) => a[1] - b[1]
);
