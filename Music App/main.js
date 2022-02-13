const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $id = document.getElementById.bind(document);


let filterInput = $id('filterInput');
let filterGroup = $('.filter-group');
let resultFilter = $('.result-filter');
let toolbarSong = $('.player .toolbar');
let current = 0;
let isPlaySong = true;
const fetchData = async () => {
    let url ='https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST?fbclid=IwAR2BYIrFx9g-Qk4NfahmXYYDKVrQxFEkiL3NsI6jvDXR19pPmuTzR7CYFX8';
    let res = await fetch(url);
    let data = await res.json();
    data = data.songs;
    createApp(data)
}

const createApp = async (data) => {
    let songs = getAllSongs(data);
    let kinds = getKindOfSongs(data);
    filterFunction(songs);
    songController(songs);
    slider(data);
    navbar();
}

const slider = (data) => {
    let songs = getAllSongs(data);
    let kinds = getKindOfSongs(data);
    let navbarBtn = $$('.navbar i');
    let sliderTop100Elm = $('.slider__top100');
    let sliderSongsElm = $('.slider__songs');
    sliderTop100(kinds);
    navbarBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            let top100 = $('.navbar .top100');
            let songList  = $('.navbar .songList');
            if(!top100.classList.contains('active')){
                sliderSongsElm.classList.remove('active');
                sliderTop100Elm.classList.add('active');
                top100.classList.add('active');
                songList.classList.remove('active');
            }
        })
    });
    let top100PlayBtns = $$('.slider__top100-item .image .fa-play');
    let sliderTop100Items = $$('.slider__top100-item');
    top100PlayBtns.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            let top100 = $('.navbar .top100');
            let songList  = $('.navbar .songList');
            if(sliderTop100Items[index].classList.contains('active')){
                sliderSongsElm.innerHTML = "";
                sliderTop100Elm.classList.remove('active');
                sliderSongs(songs, index*100);
                sliderSongsElm.classList.add('active');
                top100.classList.remove('active');
                songList.classList.add('active');
                let sliderSongsItem = $$('.slider__songs-item');
                let songBtn = $$('.slider__songs-item .container .fa-play');

                songBtn.forEach((btn, i) => {
                    btn.addEventListener('click', () => {
                        current = index*100 + i;
                        getASong(songs[index*100 + i]);
                        toolbarSong.style.transform = 'translateY(0)';
                        if(isPlaySong){  
                            $id('currentSong').pause();
                        } else{
                            $id('currentSong').play();
                        }
                    })
                })
            }
        })
    })

    // sliderTop100(kinds);
    // sliderSongs(songs);
    
}

const getAllSongs = (data) => {
    let result = [];
    for (const key in data) {
        if (data.hasOwnProperty.call(data, key)) {
            const element = data[key];
            element.forEach(kindsOfSong => {
                kindsOfSong.songs.forEach(song => {
                    result.push(song);
                })
            })
        }
    }
    return result;
}

const getKindOfSongs = (data) => {
    let result = [];
    for (const key in data) {
        if (data.hasOwnProperty.call(data, key)) {
            const element = data[key];
            element.forEach(kindOfSongs => {
                result.push({
                    name: kindOfSongs.name,
                    coverImage: kindOfSongs.songs[0].coverImage
                })
            }) 
        }
    }
    return result;
}

let filterFunction = (songs) => {

    filterInput.addEventListener('focus', () => {
        filterInput.style.background = '#432275';
        filterInput.style.borderBottomLeftRadius = '0';
        filterInput.style.borderBottomRightRadius = '0';
        filterGroup.style.background = '#432275';
        filterGroup.style.borderBottomLeftRadius = '0';
        filterGroup.style.borderBottomRightRadius = '0';
        showFilterItems(songs);
        chooseFilterItem(songs);
    });

    filterInput.addEventListener('keyup', () => {
        showFilterItems(songs);
        chooseFilterItem(songs);
    })

    
    
    resultFilter.addEventListener('click', () => {
        filterInput.style.background = 'linear-gradient(to right, #543abb, #88887c)';
        filterInput.style.borderBottomLeftRadius = '20px';
        filterInput.style.borderBottomRightRadius = '20px';
        filterGroup.style.background = 'linear-gradient(to right, #4e31c2, #88887c)';
        filterGroup.style.borderBottomLeftRadius = '20px';
        filterGroup.style.borderBottomRightRadius = '20px';
        toolbarSong.style.transform = 'translateY(0)';
        deleteFilterItem();
    });

    window.addEventListener('click', (e) => {
        if(!filterGroup.contains(e.target) && !resultFilter.contains(e.target)){
            filterInput.style.background = 'linear-gradient(to right, #543abb, #88887c)';
            filterInput.style.borderBottomLeftRadius = '20px';
            filterInput.style.borderBottomRightRadius = '20px';
            filterGroup.style.background = 'linear-gradient(to right, #4e31c2, #88887c)';
            filterGroup.style.borderBottomLeftRadius = '20px';
            filterGroup.style.borderBottomRightRadius = '20px';
            deleteFilterItem();
        }
    });
}

let showFilterItems = (songs) => {
    deleteFilterItem();
    let i = 0;
    let value = filterInput.value.toUpperCase();
    resultFilter.style.opacity = '1';
    songs.forEach(song => {
        if(song.title.toUpperCase().indexOf(value) > -1 && i < 5){
            createFilterItem(song);
            i++;
        }
    })
}

let deleteFilterItem = async () => {
    resultFilter.innerHTML = '';
    resultFilter.style.opacity = '0';
}

let createFilterItem = (song) => { 
    let output = 
    `<div class="result-filter__item">
        <div class="avatar">
            <img src=${song.avatar} alt="">
            <a class="fas fa-play"></a>
        </div>
        <div class="infomation">
            <div class="title">${song.title}</div>
            <p class="author">${song.creator}</p>
        </div>
    </div>`;
    resultFilter.innerHTML += output;
}

let chooseFilterItem = (songs) =>{
    let filterItem = $$('.result-filter .result-filter__item')
    filterItem.forEach(elm => {
        elm.addEventListener('click', () => {
            for(let index = 0; index < songs.length; index++){
                let song = songs[index];
                if(song.title === elm.querySelector('.title').outerHTML.slice(19, -6)){
                    current = index;
                    getASong(song);
                    if(isPlaySong){  
                        $id('currentSong').pause();
                    } else{
                        $id('currentSong').play();
                    }
                    return;
                }
            }
        })
    })
}

let songController = (songs) => {
    let circleControl = $('.circle-group');

    let nextBtn = $('.control .fa-step-forward');
    let prevBtn = $('.control .fa-step-backward');
    let randomBtn = $('.control .fa-random');
    let repeatBtn = $('.control .fa-retweet');
    let volumeBtn = $$('.fa-volume');
    let likeBtn = $('.fa-heart');
    let timerLine = $('.control-progresstion .timer-line');
    let timerLineCurrent = $('.control-progresstion .timer-line .timer-line-current');
    let volumeLine = $('.volume .volume-line');
    let volumeLineCurrent = $('.volume .volume-line span');
    let audio = $id('currentSong');
    let timer_current;
    let isRepeat = false;
    let isRandom = false;
    let length = Object.keys(songs).length;
   
    let startASong = (isKeep) => {
        let playBtn = $('.circle-group .fa-play-circle');;
        let pauseBtn = $('.circle-group .fa-pause-circle');
        let song = $id('currentSong');
        if(!isKeep){
            if(isPlaySong){  
                song.play();
                pauseBtn.style.opacity = '1';
                playBtn.style.opacity = '0';
                isPlaySong = false;
            } else{
                song.pause();
                pauseBtn.style.opacity = '0';
                playBtn.style.opacity = '1';
                isPlaySong = true;
            }
        } else {
            if(isPlaySong){  
                song.pause();
            } else{
                
                song.play();
            }
        }
    }
 
    circleControl.addEventListener('click', () => startASong(false));

    nextBtn.addEventListener('click', () => {
        if(!isRandom && !isRepeat){
            if(current == length - 1){
                current = 0;
            } else {
                current++;
            }
        } else{
            if(isRandom) {
                current = Math.floor(Math.random() * length);
            } else {
                current = current;
            }
        }
        
        getASong(songs[current]);
        startASong(true);
    })

    prevBtn.addEventListener('click', () => {
        if(!isRandom && !isRepeat){
            if(current == 0){
                current = length - 1;
            } else{
                current--;
            }
        } else{
            if(isRandom){
                current = Math.floor(Math.random() * length);   
            } else {
                current = current;
            }
            
        }
        getASong(songs[current]);
        startASong(true);
    })

    randomBtn.addEventListener('click', (e) => {
        e.target.classList.toggle('active');
        
        if(repeatBtn.classList.contains('active')){
            repeatBtn.classList.remove('active');
            isRepeat = false;
        }

        isRandom = isRandom ? false : true;
    })

    repeatBtn.addEventListener('click', (e) => {
        e.target.classList.toggle('active');
        
        if(randomBtn.classList.contains('active')){
            randomBtn.classList.remove('active');
            isRandom = false;
        }
        isRepeat = isRepeat ? false : true;
    })

    audio.addEventListener('playing', () => {  
        let myInterval = () => {
            let timer = $('.control-progresstion .timer');
            let audio = $id('currentSong');
            let duration = audio.duration;
            let currentTime = setTimeForm(audio.currentTime);
            let progress = (audio.currentTime / duration * 100);
            timer.innerHTML = currentTime;
            timerLineCurrent.style.width = `${progress}%`;
            if(progress >=100) {
                if(!isRandom && !isRepeat){
                    if(current == length - 1){
                        current = 0;
                    } else {
                        current++;
                    }
                } else{
                    if(isRandom) {
                        current = Math.floor(Math.random() * length);
                    } else {
                        current = current;
                    }
                }
                getASong(songs[current]);
                startASong(true);
            }
        }
        timer_current = setInterval(() => myInterval(), 500);
    })

    timerLine.addEventListener('click', (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let timerLineLength = timerLine.offsetWidth;
        let progress = (x / timerLineLength * 100).toFixed(0);
        let audio = $id('currentSong');
        let duration = audio.duration;
        timerLineCurrent.style.width = `${progress}%`;
        audio.currentTime = progress * duration / 100;
    })

    volumeLine.addEventListener('click', (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let volumeLineLength = volumeLine.offsetWidth;
        let progress = (x / volumeLineLength * 100).toFixed(0);
        let audio = $id('currentSong');
        let duration = audio.duration;
        volumeLineCurrent.style.width = `${progress}%`;
        audio.volume = progress / 100;
    })

    volumeBtn.forEach(element => {
        element.addEventListener('click', (e) => {
            let audio = $id('currentSong');
            let volumeUp = $('.fa-volume-up');
            let volumeMute = $('.fa-volume-mute');
            if(volumeUp.classList.contains('active')){
                volumeUp.classList.remove('active');
                volumeMute.classList.add('active');
                volumeLineCurrent.style.width = `0%`;
                audio.volume = 0;
            } else {
                volumeMute.classList.remove('active');
                volumeUp.classList.add('active');
                volumeLineCurrent.style.width = `100%`;
                audio.volume = 1;
            }
        })
    })

    likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('active');
    })
}

let getASong = async (song) => {
    let avt = $('.songInfos .avatar img');
    let title = $('.songInfos .infomation .title');
    let author = $('.songInfos .infomation .author');
    let timer = $('.control-progresstion .timer');
    let timeLine = $('.control-progresstion .timer-line .timer-line-current');
    let seekable = $('.control-progresstion .time-of-song');
    avt.setAttribute('src', song.avatar);
    title.innerHTML = song.title;
    author.innerHTML = song.creator;
    timer.innerHTML = '00:00';
    timeLine.style.width = '0';
    let updateAsync = async () => {
        let audio = $id('currentSong');
        await audio.setAttribute('src', song.music);
        await audio.addEventListener('loadedmetadata', () => {
            let duration = setTimeForm(audio.duration);
            seekable.innerHTML = duration;
        })
    }
    await updateAsync();
}

let setTimeForm = (dura) => {
    let minute = 0;
    let second = 0;
    minute = Math.floor(dura / 59);
    second = (dura - minute * 59).toFixed(0);
    return `${minute.toString().padStart(2,'0')}:${second.toString().padStart(2, '0')}`;            
}

let sliderTop100 = async (kinds) => {
    let sliderTop100 = $('.slider .slider__top100');
    let output = '';
    for(let i = 0; i < kinds.length; i++){
        output = 
        `<div class="slider__top100-item">
            <div class="image">
                <img src=${kinds[i].coverImage} alt="">
                <a class="fas fa-play"></a>
            </div>
        </div>`;
        sliderTop100.innerHTML+=output;
    }
    
    let sliderTop100Items = $$('.slider .slider__top100 .slider__top100-item');
    let length = sliderTop100Items.length;
    sliderTop100Items[0].classList.add('active');
    sliderTop100Items[1].classList.add('right');

    sliderTop100Items.forEach((sliderTop100Item, index) => {
        sliderTop100Item.addEventListener('click', (e) => {
            if(!e.target.classList.contains('active')){
                if(index > 0 && sliderTop100Items[index - 1].classList.contains('active')){
                    sliderTop100Items[index].classList.remove('right');
                    sliderTop100Items[index].classList.add('active');
                    sliderTop100Items[index - 1].classList.remove('active');
                    sliderTop100Items[index - 1].classList.add('left');
                    if(index > 1){
                        sliderTop100Items[index - 2].classList.remove('left');
                    };
                    if(index < length - 1){
                        sliderTop100Items[index + 1].classList.add('right');
                    }
                }
                if(index < length - 1 && sliderTop100Items[index + 1].classList.contains('active')){
                    sliderTop100Items[index].classList.remove('left');
                    sliderTop100Items[index].classList.add('active');
                    if(index > 0){
                        sliderTop100Items[index - 1].classList.add('left');
                    }
                    if(index < length - 1){
                        sliderTop100Items[index + 1].classList.add('right');
                        sliderTop100Items[index + 1].classList.remove('active');
                    }
                    if(index < length - 2){
                        sliderTop100Items[index + 2].classList.remove('right');
                    }
                }
             }
        })
    })
}

let sliderSongs = async (songs, index) => {
    let sliderSongs = $('.slider .slider__songs');
    let output = '';
    for(let i = index; i < index + 100; i++){
        output = 
        `<div class="slider__songs-item">
            <div class="container">
                <img src=${songs[i].avatar} alt="">
                <a class="fas fa-play"></a>
            </div>
        </div>`;
        sliderSongs.innerHTML+=output;
    }
    
    let sliderSongsItems = $$('.slider .slider__songs .slider__songs-item');
    sliderSongsItems[0].classList.add('left-1');
    sliderSongsItems[1].classList.add('left');
    sliderSongsItems[2].classList.add('active');
    sliderSongsItems[3].classList.add('right');
    sliderSongsItems[4].classList.add('right-1');

    sliderSongsItems.forEach((sliderSongsItem, index) => {
        sliderSongsItem.addEventListener('click', (e) => {
            if(!e.target.classList.contains('active')){
                if(index > 0){
                    if(sliderSongsItems[index - 1].classList.contains('active')){
                            sliderSongsItems[index].classList.remove('right');
                            sliderSongsItems[index].classList.add('active');
                            sliderSongsItems[index - 1].classList.remove('active');
                            sliderSongsItems[index - 1].classList.add('left');
                            if(index > 2) sliderSongsItems[index - 3].classList.remove('left-1');
                            if(index > 1) {
                                sliderSongsItems[index - 2].classList.add('left-1');
                                sliderSongsItems[index - 2].classList.remove('left');
                            }
                            if(index < 99) {
                                sliderSongsItems[index + 1].classList.remove('right-1');
                                sliderSongsItems[index + 1].classList.add('right');
                            }
                            if(index < 98){
                                sliderSongsItems[index + 2].classList.add('right-1');
                            }
                    }            
                }

                if(index < 99){
                    if(sliderSongsItems[index + 1].classList.contains('active')){
                        sliderSongsItems[index].classList.remove('left');
                        sliderSongsItems[index].classList.add('active');
                        if(index > 1){
                            sliderSongsItems[index - 2].classList.add('left-1');
                        }
                        if(index > 0){
                            sliderSongsItems[index - 1].classList.remove('left-1');
                            sliderSongsItems[index - 1].classList.add('left');
                        }

                        if(index < 99){
                            sliderSongsItems[index + 1].classList.remove('active');
                            sliderSongsItems[index + 1].classList.add('right');
                        }
                        if(index < 98){
                            sliderSongsItems[index + 2].classList.remove('right');
                            sliderSongsItems[index + 2].classList.add('right-1');
                        }
                        if(index < 97){
                            sliderSongsItems[index + 3].classList.remove('right-1');
                        }
                    }
                }
             }
        })
    })
}

let navbar = () => {
    let button = $$('.navbar i');
    let p = $$('.navbar p');
    button.forEach(btn => {
        btn.addEventListener('click', () => {
            p.forEach(pelm => {
                pelm.classList.toggle('active');
            })
        })
    })
}

fetchData();

