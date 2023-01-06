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
    document.getElementById("app").textContent = data.rates.AED;
    document.getElementById("app").textContent = data.forEach(
      (element) => element.rates
    );
  } catch (error) {
    console.log("error");
  }
}

getData(URL);

const data = await (await fetch(URL)).json();
console.log(data);
data.forEach((element) => console.log(element.rates));
