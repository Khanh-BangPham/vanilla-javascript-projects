async function getNames() {
    try {
        let res = await fetch('myApi.json');
        return await res.json();
    } catch (err){
        console.log(err);
    }
}

async function renderNames() {
    let data = await getNames();
    let output = '';
    data.forEach(elm => {
        output += 
        `<li class="collection-header"><h5>${elm.collectionHeader}</h5></li>`;
        let obj = elm.collectionItem;
        for (const key in obj) {
            if (obj.hasOwnProperty.call(obj, key)) {
                const name = obj[key];
                output += 
                `<li class="collection-item"><a href="#">${name}</a></li>`;
            }
        }
    });
    document.getElementById('names').innerHTML = output;
}

renderNames();

let filerInput = document.getElementById('filterInput');   
let ul = document.getElementById('names');
filerInput.addEventListener('keyup', filterName);
function filterName(params) {
    let li = document.querySelectorAll('li.collection-item');
    let filterValue = filerInput.value.toUpperCase();
    for(let i = 0; i < li.length; i++){
        let a = li[i].getElementsByTagName('a')[0];
        if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}   

