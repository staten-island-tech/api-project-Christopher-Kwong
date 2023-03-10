const conversionFunction = {
  execute: function (
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

const reset = {
  execute: function (firstString, secondString, thirdString) {
    document.querySelector(".textInput").value = firstString;
    document.querySelector(".dropDownConverted").value = secondString;
    document.querySelector(".dropDownBase").value = thirdString;
  },
};

export { reset };

const clear = {
  execute: function (button, HTMLArea) {
    button.addEventListener("click", function () {
      HTMLArea.textContent = "";
    });
  },
};

export { clear };

const formSubmit = {
  execute: function (DOM, inputFunction, HTMLArea, subArray, inputFunction2) {
    DOM.addEventListener("submit", (event) => {
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
        inputFunction(
          HTMLArea,
          subArray,
          inputValue,
          baseCurrency,
          toBeConverted
        );
        inputFunction2("", "Converted Currency", "Base Currency");
      }
    });
  },
};

export { formSubmit };

const ordering = {
  execute: function (
    DOM,
    inputFunction,
    HTMLArea,
    inputArray,
    compareFunction
  ) {
    DOM.addEventListener("click", function () {
      inputFunction(HTMLArea, inputArray, compareFunction);
    });
  },
};

export { ordering };
