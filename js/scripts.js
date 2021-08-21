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
        const galleryMarkup = data.results
            .map(user => {
                return `
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
            `
            }).join('')
            randomUsers.insertAdjacentHTML('beforeend', galleryMarkup)

            //Modal Markup
            const userCard = document.querySelectorAll('.card')
            for(let i = 0; i < userCard.length; i++){
                userCard[i].addEventListener('click',(e) => {
                    const selectedUser = data.results[i]
                    modalMarkup(selectedUser)
                    const modalContainer = document.querySelector('.modal-container')
                    const closeBtn = document.getElementById('modal-close-btn')
                    closeBtn.addEventListener('click', () => modalContainer.remove())
                })
            }
    })
    

// ------------------------------------------
//  MODAL MARKUP FUNCTION
// ------------------------------------------

function modalMarkup(user){

    // formatting Birthday MM/DD/YYYY
    const dateFormat = new Date(user.dob.date).toLocaleDateString("en-US",{day: '2-digit',month: '2-digit',year: 'numeric'})

    randomUsers.insertAdjacentHTML('beforeend', `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${user.phone}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${dateFormat}</p>
            </div>
        </div>
    </div>
`)
}