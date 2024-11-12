// Notes Section - Save, Load, Download, Clear
document.getElementById("saveNote").addEventListener("click", () => {
  const noteText = document.getElementById("noteText").value;
  localStorage.setItem("note", noteText);
  alert("Note saved to local storage!");
});

document.getElementById("downloadNote").addEventListener("click", () => {
  const noteText = document.getElementById("noteText").value;
  const blob = new Blob([noteText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  
  // Create a temporary download link
  const a = document.createElement("a");
  a.href = url;
  a.download = "note.txt";
  a.click();
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
  alert("Note downloaded as note.txt!");
});

document.getElementById("loadNote").addEventListener("click", () => {
  const savedNote = localStorage.getItem("note");
  if (savedNote) {
    document.getElementById("noteText").value = savedNote;
  } else {
    alert("No note found in local storage!");
  }
});

document.getElementById("clearNote").addEventListener("click", () => {
  document.getElementById("noteText").value = "";
  localStorage.removeItem("note");
  alert("Note cleared!");
});

// Drawing Section - Canvas Drawing
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Touch Events for mobile drawing
canvas.addEventListener("touchstart", startDraw);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", endDraw);

// Mouse Events for desktop drawing
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mouseout", endDraw);

function startDraw(event) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(getX(event), getY(event));
  event.preventDefault();
}

function draw(event) {
  if (!drawing) return;
  ctx.lineTo(getX(event), getY(event));
  ctx.strokeStyle = "#ff6363";
  ctx.lineWidth = 2;
  ctx.stroke();
  event.preventDefault();
}

function endDraw(event) {
  drawing = false;
  ctx.closePath();
  event.preventDefault();
}

function getX(event) {
  return (event.clientX || event.touches[0].clientX) - canvas.getBoundingClientRect().left;
}

function getY(event) {
  return (event.clientY || event.touches[0].clientY) - canvas.getBoundingClientRect().top;
}

// Clear Canvas Button
document.getElementById("clearCanvas").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
