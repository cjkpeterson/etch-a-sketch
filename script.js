const container = document.querySelector(".container");
const height = 16;
const width = 16;

function whenHover() {}

for (let i = 0; i < width; i++) {
    let col = document.createElement("div");
    col.classList.add("col");
    for (let i = 0; i < height; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.addEventListener("hover", whenHover);
        col.appendChild(pixel);
    }
    container.appendChild(col);
}