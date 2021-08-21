/*
Treehouse Techdegree:
FSJS Project 5 - Public API Requests
*/

// ------------------------------------------
//  SELECTING THE DOM
// ------------------------------------------
const randomUsers = document.getElementById('gallery')


// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchUsers(url){
    return fetch(url)
                .then(response => response.json())
                .catch(error => console.log('There is a problem', error))
}


// ------------------------------------------
//  GALLARY MARKUP
// ------------------------------------------

fetchUsers('https://randomuser.me/api/?results=12')
    .then(data => {
        let users = data.results
        users.forEach(user => {
            console.log(user)
            randomUsers.insertAdjacentHTML('beforeend', `
                <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${user.picture.medium}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="card-text">${user.email}</p>
                        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                    </div>
                </div>
            `)
        })
    })
    