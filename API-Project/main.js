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

let entries = Object.entries(data.rates);
let values = Object.values(data.rates);

/* entries.forEach((element) => console.log(`${element[0]}: ${element[1]}`)); */

/* entries.forEach((element) => console.log(`${element[0]}: ${element[1]}`)); */
/*   .sort((a, b) => a - b); */

/* entries
  .sort((a, b) => a[1] - b[1])
  .forEach((element) => console.log(`${element[0]}: ${element[1]}`)); */

entries
  .sort((a, b) => a[1] - b[1])
  .forEach((element) =>
    document
      .getElementById("rankings")
      .insertAdjacentHTML("beforeend", `<p>${element[0]}</p>`)
  );

testing();
/* console.log(`${dataValues.sort((a, b) => a - b)}`); */
