const URL = "https://api.exchangerate.host/latest";

const DOM = {
  textInput: document.querySelector(".textInput").value,
  dropDownBase: document.querySelector(".dropDownBase").value,
  dropDownConverted: document.querySelector(".dropDownConverted").value,
};

async function createDropDown(URL, ID) {
  let data = await (await fetch(URL)).json();
  Object.keys(data.rates).forEach((element) =>
    document
      .querySelector(ID)
      .insertAdjacentHTML(
        "beforeend",
        `<option class="${element}">${element}</option>`
      )
  );
}

createDropDown(URL, ".dropDownBase");
createDropDown(URL, ".dropDownConverted");

async function getData(URL, input1, type) {
  let data = await (await fetch(URL)).json();
  let baseRate = document.querySelector(".dropDownBase").value;
  document
    .getElementById("output")
    .insertAdjacentHTML(
      "beforeend",
      `<p>${input1} ${baseRate} = ${Number.parseFloat(
        (input1 / data.rates[baseRate]) * data.rates[type]
      ).toFixed(2)} ${type}</p>`
    );
}

function Clear(first, second, third) {
  first = "";
  second = "Base Currency";
  third = "Converted Currency";
}

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let test = document.querySelector(".textInput").value;
  let secondTest = document.querySelector(".dropDownConverted").value;
  if (secondTest == "Converted Currency") {
    alert("Requires Currency Type");
  } else {
    getData(URL, test, secondTest);
    Clear(DOM.textInput, DOM.dropDownBase, DOM.dropDownConverted);
  }
});

/*   console.log(Object.entries(data.rates));
  Object.entries(data.rates).forEach(([currencycode, conversion]) => {
    document
      .getElementById("app")
      .insertAdjacentHTML("beforeend", `<p>${currencycode}: ${conversion}</p>`);
  });  */
