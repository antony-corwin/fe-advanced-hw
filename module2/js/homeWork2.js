let userInput;
const numbers = [];
let total = 0;

do {
    let userInput = prompt("Введите число");
    if (userInput === "" || userInput === null) break;
    else if (isNaN(userInput)) {
        alert('Было введено не число, попробуйте еще раз');
        continue
    }
    numbers.push(+userInput);
}
while (true);

for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
    if (i === numbers.length) break;
}

if (numbers.length != 0) {
    alert(`Общая сумма чисел равна ${total}`);
}