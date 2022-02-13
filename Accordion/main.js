let inputRadio = document.querySelectorAll(".radio-group input");
let accordionHeaderItems = document.querySelectorAll(".accordions-header span");
let questionElm = document.querySelector(".accordions-content h5");
let answerElm = document.querySelector(".accordions-content p");
inputRadio[0].checked = true;

let fetchApi = async () => {
    try {
        let res = await fetch('api.JSON');
        return await res.json();
    } catch(err) {
        console.log(err);
    }
}

let handleFunction = async () => {
    let data = await fetchApi();
console.log(data)
    for(let i = 0; i < inputRadio.length; i++){
        inputRadio[i].addEventListener("change", () => {
            accordionHeaderItems.forEach((item, index) => {
                if(item.classList.contains('active')) {
                    item.classList.remove('active');
                }
                if(index == i) {
                    item.classList.add('active')
                    questionElm.innerHTML = data[i].question;
                    answerElm.innerHTML = data[i].answer;
                };
            })
        })
    }
}

handleFunction();
