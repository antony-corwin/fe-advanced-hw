"use strict";
/*
  /*
  Реализуйте форму фильтра товаров в каталоге и список отфильтрованных товаров.
  Используйте шаблонизацию для создания карточек товаров.
  
  Есть массив объектов (дальше в задании), каждый из которых описывает 
  ноутбук с определенными характеристиками.
  
  Поля объекта по которым необходимо производить фильтрацию: size, color, release_date.
  Поля объекта для отображения в карточке: name, img, descr, color, price, release_date.
    
  Изначально есть форма с 3-мя секциями, состоящими из заголовка и группы 
  чекбоксов (разметка дальше в задании). После того как пользователь выбрал 
  какие либо чекбоксы и нажал кнопку Filter, необходимо собрать значения чекбоксов по группам. 
  
  🔔 Подсказка: составьте объект формата
      const filter = { size: [], color: [], release_date: [] }
    
  После чего выберите из массива только те объекты, которые подходят 
  под выбраные пользователем критерии и отрендерите список карточек товаров.
  
  🔔 Каждый раз когда пользователь фильтрует товары, список карточек товаров очищается, 
      после чего в нем рендерятся новые карточки товаров, соответствующих текущим критериям фильтра.
*/

const laptops = [{
    size: 13,
    color: 'white',
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
},
    {
        size: 13,
        color: 'gray',
        price: 32000,
        release_date: 2016,
        name: 'Macbook Air Gray 13"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 13,
        color: 'black',
        price: 35000,
        release_date: 2017,
        name: 'Macbook Air Black 13"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'white',
        price: 45000,
        release_date: 2015,
        name: 'Macbook Air White 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'gray',
        price: 55000,
        release_date: 2016,
        name: 'Macbook Pro Gray 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'black',
        price: 45000,
        release_date: 2017,
        name: 'Macbook Pro Black 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'white',
        price: 65000,
        release_date: 2015,
        name: 'Macbook Air White 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'gray',
        price: 75000,
        release_date: 2016,
        name: 'Macbook Pro Gray 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'black',
        price: 80000,
        release_date: 2017,
        name: 'Macbook Pro Black 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
];

const form = document.querySelector('.js-form');
const inputs = form.querySelectorAll('input');
//Константы для рендера разметки
const list = document.querySelector('.js-list');
const source = document.querySelector('#product-card').innerHTML.trim();
const tpl = Handlebars.compile(source);

const filter = {
    size: [],
    color: [],
    release_date: [],
};

const resetFilter = () => {
    filter.size = [];
    filter.color = [];
    filter.release_date = [];
};

const clearFilter = () => {
    filter.size = [];
    filter.color = [];
    filter.release_date = [];
    marcupHTML(laptops);
};

const getChecked = function (e) {
    e.preventDefault();

    const arrInputs = Array.from(inputs);
    arrInputs.filter(input => input.checked).map(item => {
        if (item.name === 'size') {
            filter.size.push(item.value)
        }
        ;
        if (item.name === 'color') {
            filter.color.push(item.value)
        }
        ;
        if (item.name === 'release_date') {
            filter.release_date.push(item.value)
        }
    });

    const newArray = filterItems(laptops, filter);
    // Разметка выборки
    marcupHTML(newArray);
    //  Очистка объекта фильтр
    resetFilter();
};

const marcupHTML = (arr) => {
    const marcup = arr
        .reduce((acc, laptop) => acc + tpl(laptop), '');
    list.innerHTML = marcup;
};

const getLaptopBySize = (arr, sizes) =>
    arr.filter(product => sizes.length ?
        sizes.some((size) => product.size == size) :
        true);

const getLaptopByColor = (arr, colors) =>
    arr.filter(product => colors.length ?
        colors.some((color) => product.color == color) :
        true);

const getLaptopByRelease = (arr, dates) =>
    arr.filter(product => dates.length ?
        dates.some((item) => product.release_date == item) :
        true);

const filterItems = (arr, options) => {
    const filteredBySize = getLaptopBySize(arr, options.size)
    const filteredByColor = getLaptopByColor(filteredBySize, options.color)
    const filteredByRelease = getLaptopByRelease(filteredByColor, options.release_date)
    return filteredByRelease
};

//Первоначальная разметка
marcupHTML(laptops);

//по нажатию на кнопк 2 события: формирование объекта ФИЛЬТР и Выборка нужных карточек из Списка товаров
form.addEventListener("submit", getChecked);
form.addEventListener("reset", clearFilter);