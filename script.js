const container = document.querySelector(".container");
const clearButton = document.querySelector("#clear");
const resizeButton = document.querySelector("#resize");
const picker = document.querySelector("#colorPicker");
const randomButton = document.querySelector("#random");

let pixels;
let isMouseDown = false;
let isRandom = false;
let currentColor = "black";

function getRandomColor(max=255) {
    let red = Math.random() * max;
    let green = Math.random() * max;
    let blue = Math.random() * max;
    return `rgb(${red}, ${green}, ${blue})`;
}

//Add the 
const spelt = ["R", "a", "n", "d", "o", "m", " ", "C", "o", "l", "o", "r", "s"];
spelt.forEach(char => {
    letter = document.createElement("span");
    letter.style.color = getRandomColor(175); //Makes sure colors aren't too light
    letter.style.fontWeight = "bold";
    letter.textContent = char;
    randomButton.appendChild(letter);
})


function toggleRandom(e) {
    isRandom ? isRandom = false : isRandom = true; //reverse the state of isRandom
    randomButton.classList.toggle("active");
}

function offRandom(e) {
    isRandom = false;
    randomButton.classList.remove("active");
}

randomButton.addEventListener("click", toggleRandom);

document.addEventListener("mousedown", () =>{
    isMouseDown = true;
});

document.addEventListener("mouseup", () =>{
    isMouseDown = false;
});

picker.addEventListener("input", () => {
  // HEX value like #ff0000
  currentColor = picker.value;
});


function color(e) {
    const pixel = e.target;
    pixel.classList.remove("blank");
    if (isRandom) {
        pixel.style.backgroundColor = getRandomColor();
    }
    else {
        pixel.style.backgroundColor = currentColor;
    }
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
            pixel.classList.add("pixel", "blank");
            pixel.addEventListener("mousedown", color);
            pixel.addEventListener("mouseenter", colorCheck);
            col.appendChild(pixel);
        }
        container.appendChild(col);
    }
    pixels = document.querySelectorAll(".pixel");
}

function clear(e) {
    picker.value = "#000000";
    currentColor = "black";
    offRandom(e); //Reset everything
    pixels.forEach(pix => pix.classList.add("blank"));
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