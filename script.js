const container = document.querySelector(".container");
const clearButton = document.querySelector("#clear");
const resizeButton = document.querySelector("#resize");
const picker = document.querySelector("#colorPicker");
const randomButton = document.querySelector("#random");
const eraserButton = document.querySelector("#eraser");
const lightenButton = document.querySelector("#lightener");
const darkenButton = document.querySelector("#darkener");
const togglers = document.querySelector("#togglers");

let pixels;
let isMouseDown = false;
let isRandom = false;
let currentColor = "rgb(0, 0, 0)";

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
    letter.style.color = getRandomColor(160); //Makes sure colors aren't too light
    letter.style.fontWeight = "bold"; //Makes it stick out a little more
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
    if (!targ) { //If the target is blank, it's one of the letters of "Random Colors", so we need to go to it's parent
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

function changeRGB(pixel, brightness) {
    const bgColor = window.getComputedStyle(pixel).backgroundColor;
    console.log(bgColor);
    const currRGB = bgColor.match(/\d+/g);
    console.log(currRGB);
    return currRGB.map( value => {
        value =  parseInt(value) + brightness;
        if (value > 255) {
            value = 255;
        }
        else if (value < 0) {
            value = 0;
        }
        return value;
    });
}

function color(e) {
    const pixel = e.target;
    if (eraserButton.classList.contains("active")) {
        pixel.classList.add("blank");
    }
    else if (lightenButton.classList.contains("active")) {
        const newRGB = changeRGB(pixel, 25);
        pixel.style.backgroundColor = `rgb(${newRGB[0]}, ${newRGB[1]}, ${newRGB[2]})`;
        // Considering checking whether this causes the pixel to become fully white,
        // and then adding it to "blank," but for now don't see any real need.
    }
    else if (darkenButton.classList.contains("active")) {
        if (pixel.classList.contains("blank")) { //darken it just a little
            pixel.classList.remove("blank");
            pixel.style.backgroundColor = "rgb(230, 230, 230)";
        }
        else {
            const newRGB = changeRGB(pixel, -25);
            pixel.style.backgroundColor = `rgb(${newRGB[0]}, ${newRGB[1]}, ${newRGB[2]})`;
        }
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

function reset() {
    picker.value = "#000000";
    currentColor = "rgb(0, 0, 0)";
    toggleOff(); //Reset everything
}

function clear(e) {
    reset();
    pixels.forEach(pix => pix.classList.add("blank"));
}

clearButton.addEventListener("click", clear);

function resize(e) {
    let newSize = 0;
    while (newSize < 1 || newSize > 100) {
        newSize = parseInt(prompt("Enter the new number of pixels per side (between 1 and 100)", "16"));
    }
    if (newSize) { //Make sure it's not NULL, which would mean the user hit cancel
        reset();
        container.replaceChildren();
        makeGrid(newSize);
    }
}

resizeButton.addEventListener("click", resize);

makeGrid();