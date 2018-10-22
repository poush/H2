const waitForLoader = (DOMSelector, MAX_TIME = 10000) => {
  let timeout = 0;

  const waitForContainerElement = (resolve, reject) => {
    const container = document.querySelector(DOMSelector);
    timeout += 30;
    if (timeout >= MAX_TIME) reject("Element not found");
    if (!container || container.length === 0) {
      setTimeout(waitForContainerElement.bind(this, resolve, reject), 30);
    } else {
      resolve(container);
    }
  };
  return new Promise((resolve, reject) => {
    waitForContainerElement(resolve, reject);
  });
};
let loader = document.createElement("div");
loader.setAttribute("id", "loading");
loader.setAttribute("class", "loading");
loader.innerHTML = "Loading&#8230;";
document.body.appendChild(loader);
waitForLoader("#circle")
  .then(res => {
    document.getElementById("loading").remove();
  })
  .catch(err => {
    alert("Something went wrong, you may need to reinstall H2.");
  });
