'use strict';

const products = {
    bread: 10,
    milk: 15,
    apples: 20,
    chicken: 50,
    cheese: 40,
};

const order = {
    bread: 2,
    milk: 2,
    apples: 1,
    cheese: 1,
};

function Cashier(name, productDatabase) {
    this.name = name;

    this.productDatabase = productDatabase;

    this.customerMoney = 0;

    this.getCustomerMoney = function (value) {
        this.customerMoney = value;
    };

    this.countTotalPrice = function (order) {
        let totalPrice = 0;
        for (let orderKey in order) {
            for (let productKey in this.productDatabase) {
                let productPrice = 0;
                if (productKey === orderKey) {
                    productPrice = this.productDatabase[productKey] * order[orderKey];
                }
                totalPrice += productPrice;
            }
        }
        return totalPrice;
    };

    this.countChange = function (totalPrice) {
        let change = 0;
        totalPrice = this.countTotalPrice(order);
        if (this.customerMoney > totalPrice) {
            change = this.customerMoney - totalPrice;
        } else {
            change = null;
        }
        return change;
    };

    this.onSuccess = function (change) {
        if (change !== null) {
            alert(`Спасибо за покупку, ваша сдача ${change}!`);
        } else {
            this.onError();
        }
    };

    this.onError = function () {
        alert('Очень жаль, вам не хватает денег на покупки');
    };

    this.reset = function () {
        this.customerMoney = 0;
    };
};

/* Пример использования */
const mango = new Cashier('Mango', products);

// Проверяем исходные значения полей
console.log(mango.name, 'mango.name'); // Mango
console.log(mango.productDatabase, 'mango.productDatabase'); // ссылка на базу данных продуктов (объект products)
console.log(mango.customerMoney, 'mango.customerMoney at start'); // 0

// Вызываем метод countTotalPrice для подсчета общей суммы
// передавая order - список покупок пользователя
const totalPrice = mango.countTotalPrice(order);

// Проверям что посчитали
console.log(totalPrice, 'totalPrice'); // 110

// Вызываем getCustomerMoney для запроса денег покупателя
mango.getCustomerMoney(300);

// Проверяем что в поле с деньгами пользователя
console.log(mango.customerMoney, 'mango.customerMoney after input'); // 300

// Вызываем countChange для подсчета сдачи
const change = mango.countChange();

// Проверяем что нам вернул countChange
console.log(change, 'change'); // 190

// Проверяем результат подсчета денег
if (change !== null) {
    // При успешном обслуживании вызываем метод onSuccess
    mango.onSuccess(change); // Спасибо за покупку, ваша сдача 190
} else {
    // При неудачном обслуживании вызываем метод onError   
    mango.onError(); // Очень жаль, вам не хватает денег на покупки
}

// Вызываем reset при любом исходе обслуживания
mango.reset();

// Проверяем значения после reset
console.log(mango.customerMoney, 'mango.customerMoney at the end'); // 0