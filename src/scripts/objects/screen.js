const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `
        <div class="info">
            <img src="${user.avatarUrl}" alt="user profile photo">
            <div>
                <h1>${user.name ?? "Não possui nome cadastrado 😥"}</h1>
                <p>👥 ${user.followers ?? "Não possui seguidores"} - 
                👤 ${user.following ?? "Não há seguindo"}</p>
                <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
            </div>
        </div>
        `;

        let repositoriesItens = ""
        user.repositories.forEach(repo => {
            repositoriesItens += `
            <li>
                <a href="${repo.html_url}" target="_blank"> 
                    ${repo.name} </br> 
                    🍴${repo.forks} 👀${repo.watchers} ⭐${repo.stargazers_count} 👨🏻‍💻${repo.language}
                </a>
            </li>
            `});

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `
            <div class="repositories section">
                <h2>Repositorios</h2>
                <ul>${repositoriesItens}</ul>
            </div>
            `
        }

        if (user.repositories.length === 0) {
            this.repositoriesNotFound();
        }

        let eventItens = user.events.filter(events =>
            events.type === 'PushEvent' || events.type === 'CreateEvent'
        )

        eventItens.forEach(eventItem => {
            const eventName = eventItem.repo.name;
            const commits = eventItem.payload.commits;

            commits.forEach(commits => {
                const messageCommit = commits.message;
                this.userProfile.innerHTML += `
                    <p>${eventName} - ${ messageCommit}</p>
                `;
            });
        });
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3> Usuário não encontrado </h3>"
    },
    repositoriesNotFound() {
        this.userProfile.innerHTML = "<h3> Não há repositórios </h3>"
    }
}

export { screen };