const URL = "https://api.exchangerate.host/latest";

let data = await (await fetch(URL)).json();

const DOM = {
  output: document.querySelector("#output"),
  dropDownBase: document.querySelector(".dropDownBase"),
  dropDownConverted: document.querySelector(".dropDownConverted"),
};

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

let dataValues = Object.values(data.rates);
console.log(data.rates);
// dataValues.sort((a, b) => a - b);

console.log(Object.entries(data.rates));
let entries = Object.entries(data.rates);

console.log(`${dataValues.sort((a, b) => a - b)}`);
