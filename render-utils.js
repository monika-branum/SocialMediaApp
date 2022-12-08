import { decrementScore, incrementScore } from './fetch-utils.js';

export function renderUserList(data) {
    // create
    const div = document.createElement('div');
    const imgDiv = document.createElement('div');
    const a = document.createElement('a');
    const p = document.createElement('p');
    // populate
    imgDiv.style.backgroundImage = `url('${data.avatar_url}')`;
    a.textContent = data.username;
    a.href = `./detail/?id=${data.id}`;
    p.textContent = '⭐' + data.score;
    // style
    imgDiv.classList.add('img-div');
    a.classList.add('username-link');
    // consolidate
    div.append(imgDiv, a, p);
    return div;
}

export function renderUserDetails(data) {
    // create
    const div = document.createElement('div');
    const imgDiv = document.createElement('div');
    const h = document.createElement('h2');
    const bioP = document.createElement('p');
    const scoreP = document.createElement('p');
    // populate
    imgDiv.style.backgroundImage = `url('${data.avatar_url}')`;
    h.textContent = data.username;
    bioP.textContent = data.bio;
    scoreP.textContent = '⭐: ' + data.score;
    // style
    imgDiv.classList.add('img');
    // consolidate
    div.append(imgDiv, h, bioP, scoreP);
    return div;
}

export function renderMessage(data) {
    // create
    const messageDiv = document.createElement('div');
    const fromH = document.createElement('h3');
    const timeH = document.createElement('h6');
    const bodyP = document.createElement('p');
    // populate
    fromH.textContent = data.from_email || 'something has gone terribly wrong: sender not found';
    timeH.textContent = new Date(data.created_at).toLocaleString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
    bodyP.textContent = data.text;
    // consolidate
    messageDiv.append(fromH, timeH, bodyP);
    return messageDiv;
}

// data is an array of message objects
export function renderMessages(data, container) {
    const headerH = document.createElement('h3');
    // header.textContent = `Message feed for ${data.user_email}`;
    for (const item of data) {
        container.append(renderMessage(item));
    }
}
