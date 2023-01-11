const URL = "https://api.exchangerate.host/latest";

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

async function getData(URL, inputValue, baseCurrency, toBeConverted) {
  let data = await (await fetch(URL)).json();
  document
    .querySelector("#output")
    .insertAdjacentHTML(
      "beforeend",
      `<p>${inputValue} ${baseCurrency} = ${Number.parseFloat(
        (inputValue / data.rates[baseCurrency]) * data.rates[toBeConverted]
      ).toFixed(2)} ${toBeConverted}</p>`
    );
}

function Clear() {
  document.querySelector(".textInput").value = "";
  document.querySelector(".dropDownBase").value = "Base Currency";
  document.querySelector(".dropDownConverted").value = "Converted Currency";
}

document.querySelector("#form").addEventListener("submit", (event) => {
  event.preventDefault();
  let inputValue = document.querySelector(".textInput").value;
  let toBeConverted = document.querySelector(".dropDownConverted").value;
  let baseCurrency = document.querySelector(".dropDownBase").value;
  if (
    baseCurrency == "Base Currency" ||
    toBeConverted == "Converted Currency"
  ) {
    alert("Requires Currency Type");
  } else {
    getData(URL, inputValue, baseCurrency, toBeConverted);
    Clear();
  }
});

/*   console.log(Object.entries(data.rates));
  Object.entries(data.rates).forEach(([currencycode, conversion]) => {
    document
      .getElementById("app")
      .insertAdjacentHTML("beforeend", `<p>${currencycode}: ${conversion}</p>`);
  });  */
