import { getUser } from "./user.js";
import { getRepositories } from "./repositories.js";

import { user } from "./objects/object-user.js"
import { screen } from "./objects/screen.js"
import { getEvents } from "./events.js";

async function getUserData(userName) {
    const userResponse = await getUser(userName);
    console.log(userResponse);
    if (userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }
    const repositoriesResponse = await getRepositories(userName);
    const eventsResponse = await getEvents(userName);
    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);
    user.setEvents(eventsResponse);
    screen.renderUser(user);
}

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = document.querySelector('#input-search').value;
    if (userName === ''){
        validateEmptyInput(userName);
        return
    }
    getUserData(userName);

})

document.querySelector('#input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        if (validateEmptyInput(userName)) return
        getUserData(userName);
    }
})

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub.')
        return true
    }
}