const view = new View();
const model = new Model();
console.log(model);
console.log(view);

const cont = new Controller(model, view);
console.log(cont);

import EventEmitter from './event-emitter';

export default class View extends EventEmitter {
  constructor() {
    super();

    this.form = document.querySelector('.form');
    this.input = this.form.querySelector('.input');
    this.notesGrid = document.querySelector('.notes-grid');

    this.form.addEventListener('submit', this.handleAdd.bind(this));
  }

  handleAdd(evt) {
    evt.preventDefault();

    const { value } = this.input;

    if (value === '') return;

    this.emit('add', value);
  }

  createNote(note) {
    const item = document.createElement('div');
    item.dataset.id = note.id;
    item.classList.add('item');

    const text = document.createElement('p');
    text.textContent = note.text;
    text.classList.add('text');

    const actions = document.createElement('div');
    actions.classList.add('actions');

    const buttonRemove = document.createElement('button');
    buttonRemove.textContent = 'Удалить';
    buttonRemove.dataset.action = 'remove';
    buttonRemove.classList.add('button');


    actions.append(buttonRemove);

    item.append(text, actions);

    this.appendEventListners(item);

    return item;
  }

  addNote(note) {
    const item = this.createNote(note);

    this.form.reset();

    this.notesGrid.appendChild(item);
  }

  appendEventListners(item) {
    const removeBtn = item.querySelector('[data-action="remove"]');
    removeBtn.addEventListener('click', this.handleRemove.bind(this));
  }

  handleRemove({ target }) {
    const parent = target.closest('.item');

    this.emit('remove', parent.dataset.id);
  }

  removeNote(id) {
    const item = this.notesGrid.querySelector(`[data-id="${id}"]`);
    this.notesGrid.removeChild(item);
  }
}

import v4 from 'uuid/v4';

export default class Model {
  constructor(items = []) {
    this.items = items;
  }

  addItem(text) {
    const item = {
      id: v4(),
      text,
    };

    this.items.push(item);

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(item);
      }, 200);
    });
  }

  updateItem(id, props) {
    const item = this.items.find(item => item.id === id);

    const keys = Object.keys(props);

    keys.forEach(key => (item[key] = props[key]));
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
  }
}

export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, callback) {
    this.events[type] = this.events[type] || [];

    this.events[type].push(callback);
    console.log(this.events[type]);
  }

  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(callback => callback(...args));
    }
  }
}

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('add', this.addNote.bind(this));
    view.on('remove', this.removeNote.bind(this));
  }

  addNote(text) {
    this.model.addItem(text).then(item => this.view.addNote(item));

    console.log(this.model);
  }

  removeNote(id) {
    this.model.removeItem(id);
    this.view.removeNote(id);
  } 
}
