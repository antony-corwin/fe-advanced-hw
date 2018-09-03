const passwords = ["qwerty", "111qwe", "123123", "r4nd0mp4zzw0rd"];
let attempts = 3;

let userInput = prompt("Введите ваш пароль");

for (let i = 0; i < passwords.length; i++) {
  do {
    if (userInput !== passwords[i]) {
      attempts -= 1;
      alert(`Неверный пароль, у вас осталось ${attempts} попыток`);
      continue;
    } else {
      alert("Добро пожаловать!");
    }
    break;
  } while (attempts >= 1 && passwords[i] !== userInput);
}
