const container = document.querySelector('.container');
const sliderValue = document.querySelector('#gridSize');
const slider = document.querySelector('#slider');
const clear = document.querySelector('#clear');
const eraser = document.querySelector('#eraser');
const rainbow = document.querySelector('#rainbow')
const pencil = document.querySelector('#pencil')
const chooseColor = document.querySelector('#chooseColor')
const colorPicker = document.querySelector('#colorPicker')
let colorMode = 'pencil';

function createGrid(gridSize) {
    // Create grid of given size
    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        container.appendChild(row);
    }
    const rows = document.querySelectorAll('.row');
    rows.forEach(function (row) {
        for (let i = 0; i < gridSize; i++) {
            const col = document.createElement('div');
            col.classList.add('box');
            row.appendChild(col);
        };
    });
    // Fill color of div when mouse pass the div while 'clicked',
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(function (box) {
        box.addEventListener('mousedown', changeColor);
        box.addEventListener('mouseover', changeColor);
    });
};

function activateMode(newColorMode) {
    if (colorMode === 'color') {
        colorPicker.classList.remove('activateMode')
    } else if (colorMode === 'pencil') {
        pencil.classList.remove('activateMode');
    } else if (colorMode === 'rainbow') {
        rainbow.classList.remove('activateMode');
    } else if (colorMode === 'eraser') {
        eraser.classList.remove('activateMode');
    }

    if (newColorMode === 'color') {
        colorPicker.classList.add('activateMode');
    } else if (newColorMode === 'pencil') {
        pencil.classList.add('activateMode');
    } else if (newColorMode === 'rainbow') {
        rainbow.classList.add('activateMode');
    } else if (newColorMode === 'eraser') {
        eraser.classList.add('activateMode');
    }
    colorMode = newColorMode;
}

// Change color of div depending on the mode
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (colorMode === 'pencil') {
        e.target.style.backgroundColor = 'hsl(0, 0%, 20%)';
    } else if (colorMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (colorMode === 'color') {
        e.target.style.backgroundColor = chooseColor.value;
    } else if (colorMode === 'eraser') {
        e.target.style.backgroundColor = 'hsl(0, 0%, 100%)';
    }
}

// Remove the div inside container
function clearGrid() {
    container.innerHTML = '';
}

// Create grid when the slider value is changed
function reloadGrid() {
    sliderValue.innerHTML = `Gridsize: ${slider.value} x ${slider.value}`;
    clearGrid();
    createGrid(slider.value);
}

slider.onchange = (e) => reloadGrid();

let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;

createGrid(slider.value);

colorPicker.onclick = () => activateMode('color');
pencil.onclick = () => activateMode('pencil');
rainbow.onclick = () => activateMode('rainbow');
eraser.onclick = () => activateMode('eraser');
clear.onclick = () => reloadGrid();