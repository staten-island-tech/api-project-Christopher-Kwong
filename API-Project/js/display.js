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
        inputFunction.execute(HTMLArea, subArray, 1, "USD", element[0]);
      }
    });
  },
};

export { arrayDisplay };
