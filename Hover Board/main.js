let container = document.getElementsByClassName('container')[0];
let output = '';
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
let count = 20 * 25;
for(let i = 0; i < count; i++){
    let square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mouseover', () => getColor(square));
    square.addEventListener('mouseout', () => removeColor(square));
    container.appendChild(square);
}

const getColor = (elm) => {
    let color = getRandomColor();
    elm.style.background = `${color}`;
    elm.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

const removeColor = (elm) => {
    elm.style.background = '#1d1d1d';
    elm.style.boxShadow = '0 0 2px #000';
}

const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
}

