const URL = "https://api.exchangerate.host/latest";

const DOM = {
  output: document.querySelector("#output"),
  outputRankings: document.querySelector(".outputRankings"),
  dropDownBase: document.querySelector(".dropDownBase"),
  dropDownConverted: document.querySelector(".dropDownConverted"),
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
    `<p class="log">${inputValue} ${baseCurrency} = ${Number.parseFloat(
      (inputValue / arrayElement[baseCurrency]) * arrayElement[toBeConverted]
    ).toFixed(2)} ${toBeConverted}</p>`
  );
}

function Clear(firstString, secondString, thirdString) {
  document.querySelector(".textInput").value = firstString;
  document.querySelector(".dropDownConverted").value = secondString;
  document.querySelector(".dropDownBase").value = thirdString;
}

document.querySelector("#form").addEventListener("submit", (event) => {
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

function sortingValues(compareFunction) {
  DOM.outputRankings.textContent = "";
  for (let count = 0; count < 25; count++) {
    entries.sort(compareFunction);
    DOM.outputRankings.insertAdjacentHTML(
      "beforeend",
      `<p>${[count + 1]}: ${entries[count][0]}</p>`
    );
  }
}

DOM.leastValued.addEventListener("click", function () {
  sortingValues((a, b) => b[1] - a[1]);
});

DOM.mostValued.addEventListener("click", function () {
  sortingValues((a, b) => a[1] - b[1]);
});

/* function sortingValues() {
  for (let count = 0; count < 25; count++) {
    entries.sort((a, b) => a[1] - b[1]);
    DOM.rankings.insertAdjacentHTML(
      "beforeend",
      `<p>${[count + 1]}: ${entries[count][0]}</p>`
    );
  }
}

DOM.leastValued.addEventListener("click", function () {
  sortingValues();
}); */
