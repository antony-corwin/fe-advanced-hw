const apiUrl = "https://test-users-api.herokuapp.com/users/";

const getAllUsersButton = document.querySelector('.js-get-all-users');
getAllUsersButton.addEventListener('click', getAllUsers);
const getUserByIdButton = document.querySelector('.js-get-user-by-id');
getUserByIdButton.addEventListener('click', getUserById);
const addNewUserButton = document.querySelector('.js-create-user');
addNewUserButton.addEventListener('click', addNewUser);
const removeUserByIdButton = document.querySelector('.js-remove-user');
removeUserByIdButton.addEventListener('click', removeUserById);
const updateUserButton = document.querySelector('.js-update-user');
updateUserButton.addEventListener('click', updateUser);

const allUsersArray = [];


class FetchApi {
    async preload() {
        fetch(apiUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();

                } else {
                    throw new Error(`ERROR: ${response.statusText}`);
                }
            })
            .then(data => {
                return allUsersArray.push(...data.data);
            });
    }

    byId(userId) {
        fetch(`${apiUrl}${userId}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`ERROR: ${response.statusText}`);
                }
            })
            .then(elem => {
                clearMarkdown('js-one-user-group', 'js-get-by-id');
                createUserInfo(elem.data, 'js-one-user-group');
            })
    }

    addUser(user) {
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
                createUserInfo(obj.data, 'js-create-user-group');
            })
    }

    removeUser(userId) {
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
    }

    updateUser(userId, user) {
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
    }
}

const users = new FetchApi();

function createUserInfo(elem, parentNode) {
    const list = document.querySelector(`.${parentNode}`);
    const userInfoLi = document.createElement('li');
    const userId = document.createElement('p');
    const userName = document.createElement('p');
    const userAge = document.createElement('p');
    const separator = document.createElement('br');
    userInfoLi.classList.add("user-item");
    userId.textContent = `UID: ${elem.id}`;
    userName.textContent = `User name: ${elem.name}`;
    userAge.textContent = `User age: ${elem.age}`;
    userInfoLi.append(userId, userName, userAge);
    list.append(userInfoLi);
    list.append(separator);
}

function clearMarkdown(node, input) {
    const clearInput = document.querySelector(`.${input}`);
    const clearNode = document.querySelector(`.${node}`);
    clearNode.textContent = '';
    clearInput.value = '';

}

function getAllUsers() {
    users.preload();
    allUsersArray.forEach(elem => {
        return createUserInfo(elem, 'js-all-users-group');
    });
}

function getUserById() {
    const userId = document.querySelector(".js-get-by-id").value;
    users.byId(userId);
}

function addNewUser() {
    const name = document.querySelector(".js-name-value");
    const age = document.querySelector(".js-age-value");
    const user = {};
    user.name = name.value;
    user.age = +age.value;
    name.value = '';
    age.value = '';
    users.addUser(user);
}

function removeUserById() {
    const userId = document.querySelector(".js-remove-by-id").value;
    users.removeUser(userId);
    const li = document.createElement('li');
    const ul = document.querySelector('.js-remove-user-group');
    li.textContent = `User ID: ${userId} has been removed`;
    ul.append(li);
    const input = document.querySelector(".js-remove-by-id");
    input.value = '';
}

function updateUser() {
    const userId = document.querySelector(".js-update-id").value;
    const userName = document.querySelector(".js-update-name").value;
    const userAge = document.querySelector(".js-update-age").value;
    const user = {};
    user.name = userName;
    user.age = +userAge;
    users.updateUser(userId, user);
    const li = document.createElement('li');
    const ul = document.querySelector('.js-update-user-group');
    li.textContent = `User ID: ${userId} has been updated`;
    ul.append(li);
    document.querySelector(".js-update-id").value = "";
    document.querySelector(".js-update-name").value = "";
    document.querySelector(".js-update-age").value = "";
}