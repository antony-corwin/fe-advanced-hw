const apiUrl = "https://test-users-api.herokuapp.com/users/";
const container = document.querySelector(".container");

class UserApi {
    constructor(url) {
        this.url = url;
    }

    static createMarkdown() {
        // select element
        const body = document.querySelector("body");
        // create element
        const menu = document.createElement("div");
        // add class
        menu.classList.add("menu");
        // add style
        body.style.backgroundColor = "lightgray";
        body.style.display = "flex";
        body.style.justifyContent = "space-evenly";
        body.style.paddingTop = "20px";
        body.style.width = "100%";
        container.style.display = "flex";
        container.style.justifyContent = "space-evenly";
        menu.style.display = "flex";
        menu.style.flexDirection = "row";
        // paste element
        container.append(menu);

        // functions
        function blockGetAllUser() {
            // create element
            const menuBlock = document.createElement("div");
            const getAllUsrBtn = document.createElement("button");
            const listGroup = document.createElement("ul");
            // add class
            menuBlock.classList.add("menu-block");
            getAllUsrBtn.classList.add("btn", "js-get-all-users");
            listGroup.classList.add("list-group", "js-list");
            // set attribute
            getAllUsrBtn.setAttribute("type", "button");
            // paste textContent
            getAllUsrBtn.textContent = "Get all users";
            // add style
            menuBlock.style.display = "flex";
            menuBlock.style.flexDirection = "column";
            menuBlock.style.padding = "0 10px";
            listGroup.style.maxHeight = "85vh";
            listGroup.style.overflowY = "auto";
            listGroup.style.marginTop = "10px";
            // paste element
            menu.append(menuBlock);
            menuBlock.append(getAllUsrBtn);
            menuBlock.append(listGroup);
        }

        function blockGetOneUser() {
            // create element
            const menuBlock = document.createElement('div');
            const getOneUsrBtn = document.createElement('button');
            const inputGroup = document.createElement('div');
            const inputLabel = document.createElement('span');
            const inputUsrId = document.createElement('input');
            const listGroup = document.createElement('ul');
            // add class
            menuBlock.classList.add('menu-block');
            getOneUsrBtn.classList.add('btn', 'js-get-user');
            inputGroup.classList.add('input-group');
            inputUsrId.classList.add('form-control', 'js-get-id');
            listGroup.classList.add('list-group', 'js-list');
            // set attribute
            getOneUsrBtn.setAttribute('type', 'button');
            inputUsrId.setAttribute('type', 'text');
            inputUsrId.setAttribute('placeholder', ` Enter user's ID`);
            // paste textContent
            getOneUsrBtn.textContent = 'Get user';
            inputLabel.textContent = 'UID';
            // add style
            menuBlock.style.display = 'flex';
            menuBlock.style.flexDirection = 'column';
            menuBlock.style.padding = '0 10px';
            listGroup.style.maxHeight = '85vh';
            listGroup.style.overflowY = 'auto';
            listGroup.style.marginTop = '10px';
            // paste element
            menu.append(menuBlock);
            menuBlock.append(getOneUsrBtn);
            menuBlock.append(inputGroup);
            inputGroup.append(inputLabel);
            inputGroup.append(inputUsrId);
            menuBlock.append(listGroup);
        }

        // function blockNewUser() {
        //     // create element
        //     const menuBlock = document.createElement('div');
        //     const getOneUsrBtn = document.createElement('button');
        //     const inputGroup = document.createElement('div');
        //     const inputLabel = document.createElement('span');
        //     const inputUsrName = document.createElement('input');
        //     const inputLabel = document.createElement('span');
        //     const inputUsrAge = document.createElement('input');
        //     const listGroup = document.createElement('ul');
        //     // add class
        //     menuBlock.classList.add('menu-block');
        //     getOneUsrBtn.classList.add('btn', 'js-get-user');
        //     inputGroup.classList.add('input-group');
        //     inputUsrId.classList.add('form-control', 'js-get-id');
        //     listGroup.classList.add('list-group', 'js-list');
        //     // set attribute
        //     getOneUsrBtn.setAttribute('type', 'button');
        //     inputUsrId.setAttribute('type', 'text');
        //     inputUsrId.setAttribute('placeholder', ` Enter user's ID`);
        //     // paste textContent
        //     getOneUsrBtn.textContent = 'Get user';
        //     inputLabel.textContent = 'UID';
        //     // add style
        //     menuBlock.style.display = 'flex';
        //     menuBlock.style.flexDirection = 'column';
        //     menuBlock.style.padding = '0 10px';
        //     listGroup.style.maxHeight = '85vh';
        //     listGroup.style.overflowY = 'auto';
        //     listGroup.style.marginTop = '10px';
        //     // paste element
        //     menu.append(menuBlock);
        //     menuBlock.append(getOneUsrBtn);
        //     menuBlock.append(inputGroup);
        //     inputGroup.append(inputLabel);
        //     inputGroup.append(inputUsrId);
        //     menuBlock.append(listGroup);
        // }

        function addBtn(btnName, className, parentNode) {


            btnName = document.createElement("button");

            btnName.classList.add("btn", className);

            btnName.setAttribute("type", "button");
            btnName.textContent = 'btnName';

            let j= document.querySelector(`.${parentNode}`);

            debugger
            j.append(btnName);

        }

        // create all markdown
        blockGetAllUser();
        blockGetOneUser();
        // blockNewUser();
        addBtn('test', 'js-test-btn', 'container');
    }
}

UserApi.createMarkdown();

document.addEventListener("DOMContentLoaded", () => {
    let user = new UserApi(apiUrl);
});
