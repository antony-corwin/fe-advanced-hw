const adminLogin = 'admin';
const adminPassword = 'm4ngo1zh4ackz0r';
const accessGranted = 'Добро пожаловать!';
const accessDenied = 'Доступ запрещен!';
const canceledByUser = 'Отменено пользователем!';

let loginPrompt = prompt('login:')

if (loginPrompt === adminLogin) {
    let passwordPrompt = prompt('password:');
    if (passwordPrompt === adminPassword) {
        alert(accessGranted);
    } else if (passwordPrompt === null) {
        alert(canceledByUser);
    } else {
        alert(accessDenied);
    }
} else if (loginPrompt === null) {
    alert(canceledByUser);
} else {
    alert(accessDenied);
}