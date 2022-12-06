// import
import { getUser, uploadImage, upsertProfile } from '../fetch-utils.js';
// DOM

const form = document.getElementById('profile-form');
const avatarPreview = document.getElementById('avatar-preview');
const updateButton = document.querySelector('[name=submit]');
const errorDisplay = document.getElementById('error-display');
const avatarInput = document.querySelector('[name=avatar-input]');
// State

let profile = null;

const user = getUser();

// Events

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const profileObject = {
        username: data.get('username'),
        bio: data.get('bio')
    };
    const imageFile = data.get('avatar-input');

    if (imageFile.size) {
        const imagePath = `${user.id}/${imageFile.name}`;

        const url = await uploadImage(imagePath, imageFile);

        profileObject.avatar_url = url;
    }

    const response = await upsertProfile(profileObject);

    const error = response.error;

    if (error) {
        errorDisplay.textContent = error.message;
        updateButton.disabled = false;
        updateButton.textContent = 'Update Profile';
    } else {
        location.assign('/');
    }

});

avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];

    if (file) {
        avatarPreview.src = URL.createObjectURL(file);
    } else {
        avatarPreview.src = '/assets/avatar.png';
    }
});

// Display



// Debug Console Logs


