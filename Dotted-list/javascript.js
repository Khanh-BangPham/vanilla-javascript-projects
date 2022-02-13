let prevButton = document.querySelector(".buttons__item.--left");
let nextButton = document.querySelector(".buttons__item.--right");
let dottedList = document.querySelectorAll(".dottedList__item");
let activeLine = document.getElementById("active-line");

let setActive = (elm, index, isAdd) => {
    if (isAdd) elm.classList.add("active"); else elm.classList.remove("active");
    let width = (index) / (dottedList.length - 1) * 100;
    activeLine.style.width = `${width}%`;
}

let clickButton = (param) => {
    if (param === 'prev') {
        for (let index = dottedList.length - 1; index >= 1; index--) {
            const element = dottedList[index];
            //Set color buttons
            document.getElementById("nextButton").style.background = '#3498db';
            if (index == 1) {
                document.getElementById("prevButton").style.background = 'none';
            }

            //Check active
            if (element.classList.contains("active")) {
                setActive(element, index - 1, false);
                return;
            }
        }
    } else {
        for (let index = 0; index < dottedList.length; index++) {
            const element = dottedList[index];
            //Set color button
            document.getElementById("prevButton").style.background = '#3498db';
            if (index == dottedList.length - 1) {
                document.getElementById("nextButton").style.background = 'none';
            }

            //Check active
            if (!element.classList.contains("active")) {
                setActive(element, index, true);
                return;
            }
        }
    }
}