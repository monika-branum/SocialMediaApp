/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { getUserList } from './fetch-utils.js';
import { renderUserList } from './render-utils.js';

/* Get DOM Elements */
const userList = document.getElementById('profile-container');

/* State */

/* Events */
self.addEventListener('load', async () => {
    const users = await getUserList();
    displayUsers(users);
});

/* Display Functions */
function displayUsers(data) {
    userList.textContent = '';
    for (const item of data) {
        const target = renderUserList(item);
        userList.append(target);
    }
}
