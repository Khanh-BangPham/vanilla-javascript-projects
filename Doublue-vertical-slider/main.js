let buttonDown = document.querySelector('.down-button');
let buttonUp = document.querySelector('.up-button');
let rightSlide = document.querySelector('.right-slide');
let leftSlide = document.querySelector('.left-slide');
let data = 
[
    {
        title: 'Fyling eagle',
        content: 'in the sunset',
        color: '#FFB866',
        urlImage: 'https://images.unsplash.com/photo-1508768787810-6adc1f613514?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e27f6661df21ed17ab5355b28af8df4e&auto=format&fit=crop&w=1350&q=80'
    },
    {
        title: 'Lonely castle',
        content: 'in the wilderness',
        color: '#252E33',
        urlImage: 'https://images.unsplash.com/photo-1519981593452-666cf05569a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=90ed8055f06493290dad8da9584a13f7&auto=format&fit=crop&w=715&q=80'
    },
    {
        title: 'Bluuue Sky',
        content: 'with it\'s mountains',
        color: '#2A86BA',
        urlImage: 'https://images.unsplash.com/photo-1486899430790-61dbf6f6d98b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8ecdee5d1b3ed78ff16053b0227874a2&auto=format&fit=crop&w=1002&q=80'
    },
    {
        title: 'Nature flower',
        content: 'all in pink',
        color: '#FD3555',
        urlImage: 'https://images.unsplash.com/photo-1510942201312-84e7962f6dbb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=da4ca7a78004349f1b63f257e50e4360&auto=format&fit=crop&w=1050&q=80'
    }
]

for(let i = 0; i < data.length; i++){
    let rightItem = document.createElement('div');
    rightItem.style.backgroundImage = `url(${data[data.length - i - 1].urlImage})`;
    rightItem.style.transform = 'translateY(0%)';
    rightSlide.appendChild(rightItem);

    let leftItem = 
    `<div style="background-color: ${data[i].color}; transform: translateY(0%);">
    <h1>${data[i].title}</h1>
    <p>${data[i].content}</p>
    </div>`;
    leftSlide.innerHTML += leftItem;
}
let countR = 0;
let countL = -300;
buttonUp.addEventListener('click', () => {
    let slides = document.querySelectorAll('.right-slide div');
    let length = slides.length;
    if(countR == (length - 1) * -100){
        countR = 0;
    } else{
        countR-=100;
    }
    if(countL == 0){
        countL = (length - 1) * -100;
    } else{
        countL+=100;
    }
    rightSlide.style.transform = `translateY(${countR}%)`; 
    leftSlide.style.transform = `translateY(${countL}%)`; 
});

buttonDown.addEventListener('click', () => {
    let slides = document.querySelectorAll('.right-slide div');
    let length = slides.length;
    if(countR == 0){
        countR = (length - 1) * -100;
    } else{
        countR+=100;
    }
    if(countL == (length - 1) * -100){
        countL = 0;
    } else{
        countL-=100;
    }
    rightSlide.style.transform = `translateY(${countR}%)`;
    leftSlide.style.transform = `translateY(${countL}%)`;
});
