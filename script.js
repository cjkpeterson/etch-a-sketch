const container = document.querySelector(".container");
const clearButton = document.querySelector("#clear");
const resizeButton = document.querySelector("#resize");
const picker = document.querySelector("#colorPicker");
const randomButton = document.querySelector("#random");
const eraserButton = document.querySelector("#eraser");
const togglers = document.querySelector("#togglers");

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

//Add the "Random Colors" with different colors
const spelt = ["R", "a", "n", "d", "o", "m", " ", "C", "o", "l", "o", "r", "s"];
spelt.forEach(char => {
    letter = document.createElement("span");
    letter.style.color = getRandomColor(175); //Makes sure colors aren't too light
    letter.style.fontWeight = "bold";
    letter.textContent = char;
    randomButton.appendChild(letter);
})

function toggleOff() {
    let togs = [...togglers.children];
    togs.forEach(el => {
        el.classList.remove("active");
    });
}

function toggleTarget(e) {
    let targ = e.target.id;
    if (!targ) {
        targ = e.target.parentElement.id;
    }
    let el = document.getElementById(targ);
    if (el.classList.contains("active")) { //If it's already active, remove it
        el.classList.remove("active");
    }
    else {
        toggleOff();
        el.classList.add("active");
    }
}

togglers.addEventListener("click", toggleTarget);

document.addEventListener("mousedown", () =>{
    isMouseDown = true;
});

document.addEventListener("mouseup", () =>{
    isMouseDown = false;
});

//If the picker is interacted with
picker.addEventListener("input", () => {
  currentColor = picker.value;
  toggleOff();
});


function color(e) {
    const pixel = e.target;
    if (eraserButton.classList.contains("active")) {
        pixel.classList.add("blank");
    }
    else {
        pixel.classList.remove("blank");
        if (randomButton.classList.contains("active")) {
            pixel.style.backgroundColor = getRandomColor();
        }
        else {
            pixel.style.backgroundColor = currentColor;
        }
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
    toggleOff(); //Reset everything
    pixels.forEach(pix => pix.classList.add("blank"));
}

clearButton.addEventListener("click", clear);

function resize(e) {
    let newSize = 0;
    while (newSize < 1 || newSize > 100) {
        newSize = parseInt(prompt("Enter the new number of pixels per side (between 1 and 100)", "16"));
    }
    if (newSize) { //Make sure it's not NULL, which would mean the user hit cancel
        clear(e);
        container.replaceChildren();
        makeGrid(newSize);
    }
}

resizeButton.addEventListener("click", resize);

makeGrid();