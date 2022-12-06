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
