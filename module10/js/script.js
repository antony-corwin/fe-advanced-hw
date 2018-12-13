"use strict";
/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const apiUrl = "https://test-users-api.herokuapp.com/users/";

class UserApi {
  constructor(url) {
    this.url = url;
    this.list = document.querySelector(".js-list");
    this.getAllUsersBtn = document.querySelector(".js-get-all-users");
    this.getUserByIdBtn = document.querySelector(".js-get-user");
    this.addPerson = document.querySelector(".js-add-user");
    this.removePerson = document.querySelector(".js-remove-user");
    this.updatePerson = document.querySelector(".js-update");
    this.getAllUsersBtn.addEventListener("click", this.getAllUsers.bind(this));
    this.getUserByIdBtn.addEventListener("click", this.getUserById.bind(this));
    this.addPerson.addEventListener("click", this.addUser.bind(this));
    this.removePerson.addEventListener("click", this.removeUser.bind(this));
    this.updatePerson.addEventListener("click", this.updateUser.bind(this));
  }


  getAllUsers() {
    document.querySelector("#js-update-info").textContent = "";
    document.querySelector("#js-delete-info").textContent = "";
    fetch(this.url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`ERROR: ${response.statusText}`);
        }
      })
      .then(data => {
        let arr = data.data;
        return arr;
      })
      .then(arr => {
        let liArray = arr.map(elem => {
          const liNode = document.createElement("li");
          const pID = document.createElement("p");
          const pName = document.createElement("p");
          const pAge = document.createElement("p");
          liNode.classList.add("list-group-item");
          pID.textContent = `UID: ${elem.id}`;
          pName.textContent = `User name: ${elem.name}`;
          pAge.textContent = `User age: ${elem.age}`;
          liNode.append(pID, pName, pAge);
          return liNode;
        });
        this.list.append(...liArray);
      })
      .catch(err => console.log(err));
  }

  getUserById() {
    // document.querySelector("#js-update-info").textContent = "";
    // document.querySelector("#js-delete-info").textContent = "";
    let id = document.querySelector(".js-getid").value;
    fetch(`${this.url}${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`ERROR: ${response.statusText}`);
        }
      })
      .then(elem => {
        if (elem.status === 200) {
          let li = document.querySelector(".js-user");
          li.textContent = "";
          let pID = document.createElement("p");
          let pName = document.createElement("p");
          let pAge = document.createElement("p");
          pID.textContent = `UID: ${elem.data.id}`;
          pName.textContent = `User name: ${elem.data.name}`;
          pAge.textContent = `User age: ${elem.data.age}`;
          li.append(pID, pName, pAge);
          document.querySelector(".js-getid").value = "";
        } else {
          document.querySelector(".js-getid").value = "";
        }
      })
      .catch(err => console.log(err));
  }

  addUser() {
    document.querySelector("#js-update-info").textContent = "";
    document.querySelector("#js-delete-info").textContent = "";
    let name = document.querySelector(".js-name-value");
    let age = document.querySelector(".js-age-value");
    let user = {};
    user.name = name.value;
    user.age = +age.value;
    fetch("https://test-users-api.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`ERROR: ${response.statusText}`);
        }
      })
      .then(obj => {
        name.value = "";
        age.value = "";
        this.list.textContent = "";
        document.querySelector(".js-user").textContent = "";
        if (obj.status !== 500) {
          let user = obj.data;
          if (obj.status === 201) {
            let li = document.querySelector(".js-new-user");
            li.textContent = "";
            let pID = document.createElement("p");
            let pName = document.createElement("p");
            let pAge = document.createElement("p");
            pID.textContent = `UID: ${user._id}`;
            pName.textContent = `User name: ${user.name}`;
            pAge.textContent = `User age: ${user.age}`;
            li.append(pID, pName, pAge);
            swal("User added", `UID: ${user._id}`, "success");
          } else {
            swal("Try again", "Something gonna wrong", "error");
          }
        }
      })
      .catch(err => console.log(err));
  }

  removeUser() {
    let userId = document.querySelector(".js-remove-value").value;

    fetch(`https://test-users-api.herokuapp.com/users/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`ERROR: ${response.statusText}`);
        }
      })
      .then(obj => {
        document.querySelector(".js-remove-value").value = "";
        document.querySelector(".js-new-user").textContent = "";
        this.list.textContent = "";
        document.querySelector(".js-user").textContent = "";
        document.querySelector("#js-update-info").textContent = "";
        if (obj.status === 200) {
          document.querySelector(
            "#js-delete-info"
          ).textContent = `User ID: ${userId} has been removed`;
        }
      })
      .catch(err => console.log(err));
  }

  updateUser() {
    this.list.textContent = "";
    let userId = document.querySelector(".js-update-id").value;
    let userName = document.querySelector(".js-update-name").value;
    let userAge = document.querySelector(".js-update-age").value;
    let user = {};
    user.name = userName;
    user.age = +userAge;
    fetch(`https://test-users-api.herokuapp.com/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`ERROR: ${response.statusText}`);
        }
      })
      .then(data => {
        document.querySelector(".js-user").textContent = "";

        if (data.status === 200) {
          document.querySelector("#js-delete-info").textContent = "";
          document.querySelector("#js-update-info").textContent = `User ID: ${
            data.data.id
          } has been updated`;
          document.querySelector(".js-new-user").textContent = "";
          document.querySelector(".js-update-id").value = "";
          document.querySelector(".js-update-name").value = "";
          document.querySelector(".js-update-age").value = "";
        } else {
          document.querySelector(
            "#js-update-info"
          ).textContent = `There is on user with this ID: ${data.data.id}!`;
        }
      })
      .catch(err => console.log(err));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let user = new UserApi(apiUrl);
});
