const URL = "https://api.exchangerate.host/latest";

const DOM = {
  form: document.querySelector("#form"),
  output: document.querySelector("#output"),
  outputRankings: document.querySelector(".outputRankings"),
  dropDownBase: document.querySelector(".dropDownBase"),
  dropDownConverted: document.querySelector(".dropDownConverted"),
  clearButton: document.querySelector(".clearButton"),
  leastValued: document.querySelector(".leastValued"),
  mostValued: document.querySelector(".mostValued"),
};

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

async function getData(
  HTML,
  arrayElement,
  inputValue,
  baseCurrency,
  toBeConverted
) {
  HTML.insertAdjacentHTML(
    "beforeend",
    `<h2 class="log">${inputValue} ${baseCurrency} = ${Number.parseFloat(
      (inputValue / arrayElement[baseCurrency]) * arrayElement[toBeConverted]
    )} ${toBeConverted}</h2>`
  );
}

function Clear(firstString, secondString, thirdString) {
  document.querySelector(".textInput").value = firstString;
  document.querySelector(".dropDownConverted").value = secondString;
  document.querySelector(".dropDownBase").value = thirdString;
}

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
    getData(DOM.output, data.rates, inputValue, baseCurrency, toBeConverted);
    Clear("", "Converted Currency", "Base Currency");
  }
});

let entries = Object.entries(data.rates);

entries.forEach((element) => {
  if (element[0] == "USD") {
  } else {
    getData(DOM.output, data.rates, 1, "USD", element[0]);
  }
});

function sortingValues(HTMLArea, arrayInput, compareFunction) {
  HTMLArea.textContent = "";
  for (let count = 0; count < 25; count++) {
    arrayInput.sort(compareFunction);
    DOM.outputRankings.insertAdjacentHTML(
      "beforeend",
      `<p>${[count + 1]}. ${entries[count][0]}</p>`
    );
  }
}

DOM.clearButton.addEventListener("click", function () {
  DOM.output.textContent = "";
});

DOM.leastValued.addEventListener("click", function () {
  sortingValues(DOM.outputRankings, entries, (a, b) => b[1] - a[1]);
});

DOM.mostValued.addEventListener("click", function () {
  sortingValues(DOM.outputRankings, entries, (a, b) => a[1] - b[1]);
});

sortingValues(DOM.outputRankings, entries, (a, b) => b[1] - a[1]);
