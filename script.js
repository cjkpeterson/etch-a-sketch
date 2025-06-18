const container = document.querySelector(".container");
const clearButton = document.querySelector("#clear");
let height = 16;
let width = 16;

let isMouseDown = false;

document.addEventListener("mousedown", () =>{
    isMouseDown = true;
});

document.addEventListener("mouseup", () =>{
    isMouseDown = false;
});

function color(e) {
    e.target.classList.add("colored");
}

function colorCheck(e) {
    isMouseDown && color(e);
}

for (let i = 0; i < width; i++) {
    let col = document.createElement("div");
    col.classList.add("col");
    for (let i = 0; i < height; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.addEventListener("mousedown", color);
        pixel.addEventListener("mouseenter", colorCheck);
        col.appendChild(pixel);
    }
    container.appendChild(col);
}

const pixels = document.querySelectorAll(".pixel");

function clear(e) {
    pixels.forEach(pix => pix.classList.remove("colored"));
}

clearButton.addEventListener("click", clear);
