const displayCreation = {
  createDropDown: async function (arrayElement, ID) {
    Object.keys(arrayElement).forEach((element) =>
      ID.insertAdjacentHTML(
        "beforeend",
        `<option class="${element}">${element}</option>`
      )
    );
  },
};

export { displayCreation };

const arrayDisplay = {
  execute: function (arrayInput, inputFunction, HTMLArea, subArray) {
    arrayInput.forEach((element) => {
      if (element[0] == "USD") {
      } else {
        inputFunction(HTMLArea, subArray, 1, "USD", element[0]);
      }
    });
  },
};

export { arrayDisplay };

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
