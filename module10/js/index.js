const apiUrl = "https://test-users-api.herokuapp.com/users/";

class UserApi {
    constructor(url) {
        this.url = url;
    }

    static createMarkdown() {
        // select element
        const body = document.querySelector('body');
        const container = document.querySelector('.container');
        // create element
        const menu = document.createElement('div');
        // add class
        menu.classList.add('menu');
        // add style
        body.style.backgroundColor = 'lightgray';
        body.style.display = 'flex';
        body.style.justifyContent = 'space-evenly';
        body.style.paddingTop = '20px';
        body.style.width = '100%';
        container.style.display = 'flex';
        container.style.justifyContent = 'space-evenly';
        menu.style.display = 'flex';
        menu.style.flexDirection = 'row';

        // paste element
        container.append(menu);
        // functions
        function createGetAllUserMenu() {
            // create element
            const menuBlock = document.createElement('div');
            const getAllUsrBtn = document.createElement('button');
            const listGroup = document.createElement('ul');
            // add class
            menuBlock.classList.add('menu-block');
            getAllUsrBtn.classList.add('btn', 'js-get-all-users');
            listGroup.classList.add('list-group','js-list');
            // set attribute
            getAllUsrBtn.setAttribute('type', 'button');
            // paste textContent
            getAllUsrBtn.textContent = 'Get all users';
            // add style
            menuBlock.style.display = 'flex';
            menuBlock.style.flexDirection = 'column';
            menuBlock.style.padding = '0 10px';
            listGroup.style.maxHeight= '85vh';
            listGroup.style.overflowY= 'auto';
            listGroup.style.marginTop= '10px';
            // paste element
            menu.append(menuBlock);
            menuBlock.append(getAllUsrBtn);
            menuBlock.append(listGroup);
        }

        // create all markdown
        createGetAllUserMenu();

    }
}

UserApi.createMarkdown();

document.addEventListener("DOMContentLoaded", () => {
    let user = new UserApi(apiUrl);
});

