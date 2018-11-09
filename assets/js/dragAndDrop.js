const dragEvents = ["dragenter", "dragover", "dragleave", "drop"];
const dragHighlight = ["dragenter", "dragover"];
const dragUnighlight = ["dragleave", "drop"];
const inputRange = document.querySelectorAll(".editor input");

const dropArea = document.getElementById("drop-area");
const iconElement = document.querySelector(".circle");
const editorElement = document.querySelector(".editor");

const preventDefaults = e => {
  e.preventDefault();
  e.stopPropagation();
};

const highlight = () => {
  iconElement.classList.add("highlight");
};

const unhighlight = () => {
  iconElement.classList.remove("highlight");
};

// Preview file
const previewFile = file => {
  document.getElementById("gallery").innerHTML = "<canvas></canvas>";
  document.getElementById("heading").setAttribute("style", "opacity:0;");
  document.getElementById("circle").setAttribute("style", "opacity:0;");
  document.getElementById("drag").setAttribute("style", "opacity:0;");
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let img = document.createElement("img");
    img.src = reader.result;
    img.setAttribute("id", "uploadedImage");
    document.getElementById("gallery").appendChild(img);
    editorElement.classList.add("is-visible");
    img.onload = drawCanvas;
  };

  function drawCanvas() {
    // Create an out of view canvas
    var canvas = document.querySelector("canvas"),
      ctx = canvas.getContext("2d");
    // Set canvas dimensions to original image
    canvas.width = this.width;
    canvas.height = this.height;
    ctx.drawImage(this, 0, 0);
    saveImage();
  }
};

// Setup to handle multiple files
// For now, keep as single file upload until I can do testing
const handleFiles = files => {
  files = [...files];
  files.forEach(previewFile);
};
// Drag and drop file(s) - Note: Keep as one file input for now.
const handleDrop = e => {
  let dt = e.dataTransfer;
  let files = dt.files;
  const filetype = files[0].type.split("/")[0];
  if (filetype !== "image") {
    alert("Sorry, you can only drag and drop images.");
  } else {
    handleFiles(files);
  }
};

// Editor controls
function handleUpdate() {
  const suffix = this.dataset.unit;
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}

// Save image
function saveImage() {
  var canvas = document.querySelector("canvas");

  // Set download link to save image
  var link = document.getElementById("downloadImage");
  link.setAttribute("download", "h2-image.png");
  link.setAttribute(
    "href",
    canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
  );
}

document.getElementById("downloadImage").onclick = function() {
  location.reload();
};

inputRange.forEach(input => input.addEventListener("change", handleUpdate));
inputRange.forEach(input => input.addEventListener("mousemove", handleUpdate));

inputRange.forEach(input => input.addEventListener("change", updateCanvas));
function updateCanvas() {
  // Create an out of view canvas
  const img = document.getElementById("uploadedImage");
  const canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d");
  // Get filter values
  let filterValues = document.documentElement.style.cssText;
  // Replace values to canvas filter CSS
  filterValues = filterValues
    .replace(/--/g, "")
    .replace(/:/g, "(")
    .replace(/;/g, ")");
  // Apply filters
  ctx.filter = filterValues;
  // Update canvas and save image href
  ctx.drawImage(img, 0, 0);
  saveImage();
}

dragEvents.forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

dragHighlight.forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

dragUnighlight.forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener("drop", handleDrop, false);
