let sliderList = document.querySelectorAll('.slider__item');


sliderList.forEach((element, index) => {
    const active = () => {
        let h3 = element.querySelector('h3');
        sliderList.forEach((element) => {
            if (element.classList.contains('active')) {
                element.classList.remove('active');
                let h3 = element.querySelector('h3');
                h3.style.opacity = '0';
               
            }
        });
        element.classList.add('active');
        h3.style.opacity = '1';
    
    }

    element.addEventListener('click', active);
});

