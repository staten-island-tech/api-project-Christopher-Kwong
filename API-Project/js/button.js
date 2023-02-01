const conversionFunction = {
  execute: async function (
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
  },
};

export { conversionFunction };

const Clear = {
  execute: function (firstString, secondString, thirdString) {
    document.querySelector(".textInput").value = firstString;
    document.querySelector(".dropDownConverted").value = secondString;
    document.querySelector(".dropDownBase").value = thirdString;
  },
};

export { Clear };

const sortingValues = {
  display: function (HTMLArea, arrayInput, compareFunction) {
    HTMLArea.textContent = "";
    for (let count = 0; count < 25; count++) {
      arrayInput.sort(compareFunction);
      HTMLArea.insertAdjacentHTML(
        "beforeend",
        `<h3>${[count + 1]}. ${arrayInput[count][0]}</h3>`
      );
    }
  },
};

export { sortingValues };
