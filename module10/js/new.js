const apiUrl = "https://test-users-api.herokuapp.com/users/";

const getAllUsersButton = document.querySelector('.js-get-all-users');
getAllUsersButton.addEventListener('click', getAllUsers);
const getUserByIdButton = document.querySelector('.js-get-user-by-id');
getUserByIdButton.addEventListener('click', getUserById);

const allUsersArray = [];
let userInfo ;

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

    byId(id) {
        fetch(`${apiUrl}${id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`ERROR: ${response.statusText}`);
                }
            })
            .then(elem =>{
                return userInfo = elem;
            })
    }
}

const users = new FetchApi();


// function fetchApi() {
//     fetch(apiUrl)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//
//             } else {
//                 throw new Error(`ERROR: ${response.statusText}`);
//             }
//         })
//         .then(data => {
//             return allUsersArray.push(...data.data);
//         });
// }

function createUserInfo(elem, parentNode) {
    const userInfoLi = document.createElement('li');
    const userId = document.createElement('p');
    const userName = document.createElement('p');
    const userAge = document.createElement('p');
    const separator = document.createElement('p');
    userId.textContent = `UID: ${elem.id}`;
    userName.textContent = `User name: ${elem.name}`;
    userAge.textContent = `User age: ${elem.age}`;
    separator.textContent = '____________________________';
    userInfoLi.append(separator, userId, userName, userAge);
    let list = document.querySelector(`.${parentNode}`);
    list.append(userInfoLi);
}

function clearMarkdown() {

}

function getAllUsers() {
    users.preload();
    allUsersArray.forEach(elem => {
        return createUserInfo(elem, 'js-all-users-group');
    });
}

function getUserById() {
    debugger;
    let userId = document.querySelector(".js-get-by-id").value;
    users.byId(userId);
    createUserInfo(userInfo, 'js-get-by-id');
}
