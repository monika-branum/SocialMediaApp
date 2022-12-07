import {
    createMessage,
    decrementScore,
    getProfileById,
    getUser,
    getUserDetails,
    incrementScore,
} from '../fetch-utils.js';
import { renderUserDetails } from '../render-utils.js';

const detailContainer = document.getElementById('detail-container');
const imgEl = document.getElementById('avatar-img');
const usernameHeaderEl = document.querySelector('.username');
const messageForm = document.querySelector('.message-form');

const params = new URLSearchParams(location.search);
const id = params.get('id');

self.addEventListener('load', async () => {
    //Error Handling!!
    if (!id) {
        //  No id found, redirect back to room list
        location.assign('/');
        // don't run the rest of the code in the function
        return;
    }
    fetchAndDisplayProfile();
    // onMessage(id, (payload = console.log('payload')));
});

async function fetchAndDisplayProfile() {
    detailContainer.textContent = '';

    const profile = await getProfileById(id);
    console.log('profile', profile);
    imgEl.src = profile.avatar_url;
    usernameHeaderEl.textContent = profile.username;

    const profileScore = renderScore(profile);

    detailContainer.append(profileScore);
}

function renderScore({ score, username, id }) {
    const p = document.createElement('p');
    const downButton = document.createElement('button');
    const upButton = document.createElement('button');

    const profileScore = document.createElement('div');

    profileScore.classList.add('profile-score');
    profileScore.append(p, upButton, downButton);

    downButton.textContent = 'down vote';
    upButton.textContent = 'up vote';
    p.classList.add('profile-name');

    p.textContent = `${username} has a score of ${score}`;

    downButton.addEventListener('click', async () => {
        await decrementScore(id);
        await fetchAndDisplayProfile();
    });
    upButton.addEventListener('click', async () => {
        await incrementScore(id);
        await fetchAndDisplayProfile();
    });

    return profileScore;
}

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(messageForm);
    const user = getUser();
    if (!user) {
        alert('Make a profile to access messaging capabilities');
        location.assign('/');
    } else {
        await createMessage({
            text: data.get('message'),
            sender: user.username,
            recipient_id: id,
            user_id: user.id,
        });

        messageForm.reset();
        await fetchAndDisplayProfile();
    }
});
