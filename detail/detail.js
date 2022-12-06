import { getUserDetails } from '../fetch-utils.js';
import { renderUserDetails } from '../render-utils.js';

const detailContainer = document.getElementById('detail-container');

self.addEventListener('load', async () => {
    // get the id from URL
    const filter = new URLSearchParams(window.location.search);
    const id = filter.get('id');
    // get data
    const user = await getUserDetails(id);
    // put in the dom
    const detailsDiv = renderUserDetails(user);
    detailContainer.append(detailsDiv);
});
