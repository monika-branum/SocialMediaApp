import { decrementScore, incrementScore } from './fetch-utils.js';

export function renderUserList(data) {
    // create
    const div = document.createElement('div');
    const img = document.createElement('img');
    const a = document.createElement('a');
    const p = document.createElement('p');
    // populate
    img.src = data.avatar_url;
    a.textContent = data.username;
    a.href = `./detail/?id=${data.id}`;
    p.textContent = '⭐' + data.score;

    // consolidate
    div.append(img, a, p);
    return div;
}

export function renderUserDetails(data) {
    // create
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h = document.createElement('h2');
    const bioP = document.createElement('p');
    const scoreP = document.createElement('p');
    // populate
    img.src = data.avatar_url;
    h.textContent = data.username;
    bioP.textContent = data.bio;
    scoreP.textContent = '⭐: ' + data.score;
    // consolidate
    div.append(img, h, bioP, scoreP);
    return div;
}

export function renderMessage(data) {
    // create
    const messageDiv = document.createElement('div');
    const fromH = document.createElement('h3');
    const bodyP = document.createElement('p');
    // populate
    fromH.textContent = data.from_email || 'something has gone terribly wrong: sender not found';
    bodyP.textContent = data.text;
    // consolidate
    messageDiv.append(fromH, bodyP);
    return messageDiv;
}

// data is an array of message objects
export function renderMessages(data) {
    const headerH = document.createElement('h3');
    const contentSection = document.createElement('section');
    // header.textContent = `Message feed for ${data.user_email}`;
    for (const item of data) {
        contentSection.append(renderMessage(item));
    }
    return contentSection;
}
