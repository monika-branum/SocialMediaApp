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
