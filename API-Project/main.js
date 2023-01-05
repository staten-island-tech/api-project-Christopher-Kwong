/* const URL = "https://api.quotable.io/random";

async function getData(URL) {
  try {
    const data = await (await fetch(URL)).json();
    console.log(data.content);
    document.getElementById("app").textContent = data.content;
  } catch (error) {}
}

getData(URL);
 */

const URL = "https://api.exchangerate.host/latest";

async function getData(URL) {
  try {
    const data = await (await fetch(URL)).json();
    console.log(data.rates);
    data.forEach((element) => {
      document.getElementById("app").textContent = element.rates;
    });
  } catch (error) {
    console.log("error");
  }
}

getData(URL);
