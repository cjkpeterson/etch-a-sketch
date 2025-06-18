const container = document.querySelector(".container");
const clearButton = document.querySelector("#clear");
const resizeButton = document.querySelector("#resize");
let pixels;

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

function makeGrid(size=16) {
    for (let i = 0; i < size; i++) {
        let col = document.createElement("div");
        col.classList.add("col");
        for (let i = 0; i < size; i++) {
            let pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.addEventListener("mousedown", color);
            pixel.addEventListener("mouseenter", colorCheck);
            col.appendChild(pixel);
        }
        container.appendChild(col);
    }
    pixels = document.querySelectorAll(".pixel");
}

function clear(e) {
    pixels.forEach(pix => pix.classList.remove("colored"));
}

clearButton.addEventListener("click", clear);

function resize(e) {
    clear(e);
    container.replaceChildren();
    let newSize = 0;
    while (newSize < 1 || newSize > 100) {
        newSize = parseInt(prompt("Enter the new number of pixels per side (between 1 and 100)", "16"));
    }
    makeGrid(newSize);
}

resizeButton.addEventListener("click", resize);

makeGrid();