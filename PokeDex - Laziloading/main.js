const backgroundColors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}
const typeColors = {
    fire: '#ff0000',
    grass: '#00ff00',
    electric: '#ffd500',
    water: '#00aeff',
    ground: '#ff8000',
    rock: '#424200',
    fairy: '#d900ff',
    poison: '#0d1d10',
    bug: '#ff9500',
    dragon: '#00215f',
    psychic: '#666900',
    flying: '#3b3939',
    fighting: '#94670c',
    normal: '#494949'
}

const stranform = [0, 0, 0, 0, 260, 360, 460]
const pokemon_count = 150;
const card_width = 180;
let pokemon_container = document.getElementsByClassName('container')[0];
let types_main = Object.keys(typeColors);

const effectCard = async (i) => {
    let cards = document.getElementsByClassName('pokemon');
    for(let index = 0; index < cards.length; index++){
        let card = cards[index];
        card.style.transform = 'translateX(0)';
    } 
}

const fetchPokemon = async (i, j) => {
    for (let index = i; i <= j; i++) {
       await getPokemon(i);
    }
    
}

const getPokemon = async (id) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let res = await fetch(url);
    let data = await res.json();
    
    await createPokemonCard(data);
}

const createPokemonCard = async (data) => {
    let name = data.name[0].toUpperCase() + data.name.slice(1);
    let img_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
    let id = data.id.toString().padStart(3, '0');
    let types = [];
    let bgColor = backgroundColors[data.types[0].type.name];
    let countCardInALine = Math.floor(pokemon_container.scrollWidth / card_width);
    data.types.forEach(element => {
        types = [...types, element.type.name]
    });
    let type_output = '';
    types.forEach((type) => {
        type_output+=`<span style="color: ${typeColors[type]}">${type} </span>`;
    })
    let output = 
    `<div class="pokemon" style="background: ${bgColor}; 
    transform: translateX(${check * (stranform[countCardInALine] - 180 * ((data.id - 1) % countCardInALine))}px);">
        <div class="image">
            <img src="${img_url}" alt="">
        </div>
        <div class="content">
            <div class="index">#${id}</div>
            <h2 class="name">${name} </h2>
            <div class="type">Type: ${type_output} </div>
        </div>
    </div>`
    pokemon_container.innerHTML += output;

}


fetchPokemon(1, 18);
let i = 19;
let x_last = 0;
let x = 0;
let check = 1;
window.addEventListener('scroll', () => { 
    if(i < pokemon_count) {
    x = window.scrollY;
    if (x - x_last > 260) {
        fetchPokemon(i, i+5);
        i+=6;
        x_last = x;
        }  
    }
    if(i >= 31){
        check = 0;
    } else {
        if(x - x_last < 100) effectCard(i);
    }
 
})

