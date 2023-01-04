const URL = "https://api.quotable.io/random";

async function getData(URL) {
  try {
    const data = await (await fetch(URL)).json();
    console.log(data.content);
    document.getElementById("app").textContent = data.content;
  } catch (error) {}
}

getData(URL);
