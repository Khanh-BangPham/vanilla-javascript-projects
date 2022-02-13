let submit = document.getElementById('buttonSubmit');
let form = document.getElementById('quiz-form');
let answers = document.querySelectorAll('.answer');
let question = document.querySelector('.question');
let a_text = document.getElementById('answer-a');
let b_text = document.getElementById('answer-b');
let c_text = document.getElementById('answer-c');
let d_text = document.getElementById('answer-d');
let scoreElm = document.getElementsByClassName('score');
let reloadButton = document.getElementById('buttonReload');
let score = 0;
let index = 0;

let getSelected = () => {
    let result = false;
    answers.forEach((answer) => {
        if(answer.checked){
            result = answer.id;
        }
    })
    return result;
}
let getQuestion = (ques) => {
    question.innerHTML = ques.question;
    a_text.innerHTML = ques.a;
    b_text.innerHTML = ques.b;
    c_text.innerHTML = ques.c;
    d_text.innerHTML = ques.d;
}

let deleteSelected = () =>{
    answers.forEach(answer => answer.checked = false);
}

let showScore = (data) => {
    let h2 = scoreElm[0].querySelector('h2');
    h2.innerHTML = `You answered ${score}/${data.length} questions correctly`
    document.getElementsByClassName('container')[0].style.height = '160px';
    form.style.display = 'none';
    scoreElm[0].style.display = 'block';
}

let reload = (data) => {
        index = 0;
        score = 0;
        deleteSelected();
        getQuestion(data[index]);
        document.getElementsByClassName('container')[0].style.height = '60%';
        form.style.display = 'flex';
        scoreElm[0].style.display = 'none';
}

let handleData = (data) => {
    getQuestion(data[index]);
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        let idChecked = getSelected();
        if(idChecked != false){
            if(idChecked == data[index].correct){
                score++;
            }
            if(index == data.length - 1){
                showScore(data);
                return;
            }
            index++;
            deleteSelected();
            getQuestion(data[index]);
        }
    })

    reloadButton.addEventListener('click', (e) => {
        e.preventDefault();
        reload(data);
    });
}



let loadQuizs = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'question.json', true);
    xhr.onload = () => {
        if(xhr.status == 200){
        let data = JSON.parse(xhr.response);
        console.log(data)
        handleData(data);
        } else {
            if(xhr.status == 404) console.log('Not Found.');
        }
    }
    xhr.send();
}
loadQuizs();






