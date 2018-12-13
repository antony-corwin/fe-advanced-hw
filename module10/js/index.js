const apiUrl = "https://test-users-api.herokuapp.com/users/";
const container = document.querySelector(".container");

class UserApi {
    constructor(url) {
        this.url = url;
        this.usersInfo = document.querySelector('.js-list');
        this.trygetAllUsersButton = document.querySelector('js-get-all-users');
        this.trygetAllUsersButton = addEventListener('click', this.getAllUsers.bind(this));
        this.getOneUserButton = document.querySelector(".js-get-by-id");
        this.getOneUserButton = addEventListener("click", this.getOneUser.bind(this));
    }

    createMarkdown() {
        const body = document.querySelector("body");
        body.style.backgroundColor = "lightgray";
        body.style.display = "flex";
        body.style.justifyContent = "space-evenly";
        body.style.paddingTop = "20px";
        body.style.width = "100%";
        container.style.display = "flex";
        container.style.justifyContent = "space-evenly";

        function addMenu(parentNode) {
            const menu = document.createElement("div");
            menu.classList.add("menu");
            let pNode = document.querySelector(`.${parentNode}`);
            menu.style.display = "flex";
            menu.style.flexDirection = "row";
            pNode.append(menu);
        }

        function addMenuBlock(blockName, className, parentNode) {
            blockName = document.createElement('div');
            blockName.classList.add(className);
            blockName.style.display = 'flex';
            blockName.style.flexDirection = 'column';
            blockName.style.padding = '0 10px';
            let pNode = document.querySelector(`.${parentNode}`);
            pNode.append(blockName);
        }

        function addButton(buttonName, label, className, parentNode) {
            buttonName = document.createElement("button");
            buttonName.classList.add("btn", className);
            buttonName.setAttribute("type", "button");
            buttonName.textContent = label;
            let pNode = document.querySelector(`.${parentNode}`);
            pNode.append(buttonName);
        }

        function addInput(className, labelText, placeholderText, parentNode) {
            const inputGroup = document.createElement('div');
            const inputLabel = document.createElement('div');
            const labelSpan = document.createElement('span');
            const inputField = document.createElement('input');
            inputGroup.classList.add('input-group');
            inputLabel.classList.add('input-label');
            inputField.classList.add(className);
            labelSpan.textContent = labelText;
            inputField.setAttribute('type', 'text');
            inputField.setAttribute('placeholder', placeholderText);
            let pNode = document.querySelector(`.${parentNode}`);
            pNode.append(inputGroup);
            inputGroup.append(inputLabel);
            inputGroup.append(inputField);
            inputLabel.append(labelSpan);
        }

        function addUserInfoGroup(parentNode) {
            const listGroup = document.createElement("ul");
            listGroup.classList.add('list-group', 'js-list');
            listGroup.style.maxHeight = '85vh';
            listGroup.style.overflowY = 'auto';
            listGroup.style.marginTop = '10px';
            let pNode = document.querySelector(`.${parentNode}`);
            pNode.append(listGroup);
        }

        function addUserInfoItem(parentNode) {
            const listInfoItem = document.createElement("li");
            listInfoItem.classList.add('list-info-item', 'js-user');
            listInfoItem.style.maxHeight = '85vh';
            listInfoItem.style.overflowY = 'auto';
            listInfoItem.style.marginTop = '10px';
            let pNode = document.querySelector(`.${parentNode}`);
            pNode.append(listInfoItem);
        }

        function blockGetAllUsers() {

            addMenuBlock('menuGetAllUsers', 'menu-get-all-users', 'menu');
            addButton('getAllUsersButton', 'Get all users', 'js-get-all-users', 'menu-get-all-users');
            addUserInfoGroup('menu-get-all-users');
        }

        function blockGetOneUser() {
            addMenuBlock('menuGetOneUser', 'menu-get-one-user', 'menu');
            addButton('getOneUsersButton', 'Get user by ID', 'js-get-one-user', 'menu-get-one-user');
            addInput('js-get-by-id', 'UID', ` Enter user's ID`, 'menu-get-one-user');
            addUserInfoGroup('menu-get-one-user');
            addUserInfoItem('menu-get-one-user');
        }

        function blockCreateUser() {
            addMenuBlock('menuCreateUser', 'menu-create-user', 'menu');
            addButton('createUserButton', 'Create new user', 'js-create-user', 'menu-create-user');
            addInput('js-name-value', 'Name', ` Enter user's name`, 'menu-create-user');
            addInput('js-age-value', 'Age', ` Enter user's age`, 'menu-create-user');
            addUserInfoGroup('menu-create-user');
        }

        function blockRemoveOneUser() {
            addMenuBlock('menuRemoveOneUser', 'menu-remove-one-user', 'menu');
            addButton('removeOneUserButton', 'Remove user by ID', 'js-remove-user', 'menu-remove-one-user');
            addInput('js-remove-by-id', 'UID', ` Enter user's ID`, 'menu-remove-one-user');
            addUserInfoGroup('menu-remove-one-user');
        }

        function blockUpdateUser() {
            addMenuBlock('menuUpdateUser', 'menu-update-user', 'menu');
            addButton('updateUserButton', 'Update user by ID', 'js-update-user', 'menu-update-user');
            addInput('js-name-value', 'Name', ` Enter user's name`, 'menu-update-user');
            addInput('js-age-value', 'Age', ` Enter user's age`, 'menu-update-user');
            addUserInfoGroup('menu-update-user');
        }

        // create all markdown
        addMenu('container');
        blockGetAllUsers();
        blockGetOneUser();
        blockCreateUser();
        blockRemoveOneUser();
        blockUpdateUser();
    }

    fetchApi(id) {

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
                    this.createUserInfo(elem, 'list-info-item');
                } else {
                    document.querySelector(".js-get-by-id").value = "";
                }
            })
            .catch(err => console.log(err));
    }

    createUserInfo(elem, parentNode) {
        const userInfo = document.querySelector(`.${parentNode}`);
        const userId = document.createElement("p");
        const userName = document.createElement("p");
        const userAge = document.createElement("p");
        userId.textContent = `UID: ${elem.data.id}`;
        userName.textContent = `User name: ${elem.data.name}`;
        userAge.textContent = `User age: ${elem.data.age}`;
        userInfo.append(userId, userName, userAge);
        document.querySelector(".list-info-item").value = "";
    }

    getOneUser() {
        const userId = document.querySelector(".js-get-by-id").value;
        this.fetchApi(userId);

    }

    getAllUsers() {
        event.stopPropagation();
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
                    const userInfoLi = document.createElement("li");
                    const userId = document.createElement("p");
                    const userName = document.createElement("p");
                    const userAge = document.createElement("p");
                    userId.textContent = `UID: ${elem.id}`;
                    userName.textContent = `User name: ${elem.name}`;
                    userAge.textContent = `User age: ${elem.age}`;
                    userInfoLi.append(userId, userName, userAge);
                    document.querySelector(".js-get-all-users").value = "";
                    return userInfoLi;
                });
                this.usersInfo.append(...liArray);
            })
            .catch(err => console.log(err));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let user = new UserApi(apiUrl);
    user.createMarkdown();
});
