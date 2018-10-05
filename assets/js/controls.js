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
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let img = document.createElement("img");
    img.src = reader.result;
    document.getElementById("gallery").appendChild(img);
    editorElement.classList.add("is-visible");
  };
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

inputRange.forEach(input => input.addEventListener("change", handleUpdate));
inputRange.forEach(input => input.addEventListener("mousemove", handleUpdate));

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
