"use strict";

const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];

const isLoginValid = function(login) {
  if (login === null) {
    alert("Отменено пользователем.");
  } else {
    return (
      (login.length >= 4 && login.length <= 16) ||
      alert("Ошибка! Логин должен быть от 4 до 16 символов")
    );
  }
};

const isLoginUnique = function(allLogins, login) {
  if (allLogins.includes(login) === true) {
    return false;
  } else {
    return true;
  }
};

const addLogin = function(login) {
  if (isLoginUnique(logins, login) && isLoginValid(login)) {
    logins.push(login);
    alert("Логин успешно добавлен!");
  } else if (isLoginUnique(logins, login) === false) {
    alert("Такой логин уже используется!");
  }
};

addLogin(prompt("Введите логин"));