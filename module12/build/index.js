import './sass/style.sass';
import headerTpl from "./html/header.hbs";

const url = document.querySelector('.form-input');
const form = document.querySelector('.form');
const cards = document.querySelector('.js-cards');
const clear = document.querySelector('.button-clear-storage');

const LOCALSTORAGE = (w => {
    if (!w) return;

    const isActive = "localStorage" in w;

    return {
        isActive
    };
})(window);

(function () {
    if (LOCALSTORAGE.isActive && localStorage.getItem("urls") !== null && localStorage.getItem("urls").length > 1) {
        const arr = (localStorage.getItem("urls").split('!-!'));
        arr.forEach((item) => addingMarkup(headerTpl(JSON.parse(item))))
    }
}());

form.addEventListener('click', adding);
cards.addEventListener('click', deleting);
clear.addEventListener('click', clearStorage);

function adding(e) {
    const target = e.target;
    if (target.nodeName === 'BUTTON') add(e);
}

function add(e) {
    e.preventDefault();
    if (link(url) && !alreadyIn(url)) {
        const data = {
            key: '5bf980a1b03e32db2a8235e4512a7fa7aa9a192c6b13a',
            q: url.value
        };
        fetch('https://api.linkpreview.net', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
        })
            .then(res => {
                if (res.status === 200) {
                    clearForm();
                    return res.json();
                }
                throw new Error(`Error while fetching: ${res.statusText}`);
            })
            .then(response => {
                if (LOCALSTORAGE.isActive) {
                    setLocalStorage(response);
                }
                addingMarkup(buildDOM(response))
            })
            .catch(err => console.log(err))
    } else {
        clearForm();
        return;
    }
}

function buildDOM(response) {
    return headerTpl(response);
}

function addingMarkup(markUp) {
    cards.insertAdjacentHTML('afterbegin', markUp);
}

function alreadyIn(url) {
    const allURLs = Array.from(document.querySelectorAll('.card-url')).reduce((acc, el) => acc.concat(el.href), []);
    if (allURLs.includes(url.value)) {
        alert('Такая закладка уже есть в списке');
    }

    return allURLs.includes(url.value);
}

function link(url) {
    const expr = /^(?:([a-z]+):(?:([a-z]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z0-9_-]+\.)+[a-z]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^:\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i;
    if (!expr.test(url.value)) {
        clearForm();
        alert('Вы ввели невалидный URL');
    }
    return expr.test(url.value);
}

function deleting(e) {
    const target = e.target;
    if (target.nodeName === 'BUTTON') {
        e.preventDefault();
        if (LOCALSTORAGE.isActive) {
            const reg = /!-!/;
            const arr = localStorage.getItem("urls").split(reg);
            const arrJSON = arr.map(el => JSON.parse(el));
            const newArrJSON = arrJSON.filter(elem => elem.url !== target.parentNode.children[3].href);
            const newArr = newArrJSON.map(el => JSON.stringify(el));
            localStorage.setItem('urls', `${(newArr.join('!-!')).trim()}`);
        }
        target.parentNode.remove();
    }
}

function setLocalStorage(response) {
    if (localStorage.getItem("urls") == null || localStorage.getItem("urls") === '')
        localStorage.setItem('urls', `${JSON.stringify(response)}`);
    if (!localStorage.getItem('urls').includes(JSON.stringify(response)))
        localStorage.setItem('urls', `${localStorage.getItem("urls")}!-!${JSON.stringify(response)}`);
}

function clearStorage(e) {
    e.preventDefault();
    clearForm();
    cards.innerHTML = '';
    localStorage.clear();
}


function clearForm() {
    url.value = '';
}