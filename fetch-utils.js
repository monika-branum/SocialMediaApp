const SUPABASE_URL = 'https://mjwfhlyotmsokgnuhrbi.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qd2ZobHlvdG1zb2tnbnVocmJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMTA4NjQsImV4cCI6MTk4MzY4Njg2NH0.59u5grTqRbWsLqKJ26MiKt2xRJVQ5w3o-GhxYYUQvMA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// i'm sorry
import { renderMessage } from '/render-utils.js';

/* Auth related functions */

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

function checkError(response) {
    return response.error ? console.error(response.error) : response.data;
}

export async function getUserList() {
    const response = await client.from('profiles').select('*');
    return checkError(response);
}

export async function upsertProfile(profile) {
    const response = await client
        .from('profiles')
        .upsert(profile, { onConflict: 'user_id' })
        .single();

    return checkError(response);
}

export async function uploadImage(imagePath, imageFile) {
    const bucket = client.storage.from('avatars');

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });
    if (response.error) {
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}

export async function getUserDetails(id) {
    const response = await client.from('profiles').select().match({ id: id }).maybeSingle();
    return checkError(response);
}

export async function getProfileById(id) {
    const response = await client.from('profiles').select().match({ id: id }).single();

    return checkError(response);
}

export async function createMessage(message) {
    const response = await client.from('messages').insert(message).single();
    return checkError(response);
}
export async function getMessages() {
    const response = await client.from('messages').select('*');
    return checkError(response);
}
export function onMessage(profileId, container) {
    client
        .from(`messages:recipient_id=eq.${profileId}`)
        .on('INSERT', (payload) => {
            // like really, i'm sorry
            console.log(payload);
            container.append(renderMessage(payload.new));
        })
        .subscribe();
}

export async function incrementScore(id) {
    const profile = await getProfileById(id);

    const response = await client
        .from('profiles')
        .update({ score: profile.score + 1 })
        .match({ id });

    return checkError(response);
}
export async function decrementScore(id) {
    const profile = await getProfileById(id);

    const response = await client
        .from('profiles')
        .update({ score: profile.score - 1 })
        .match({ id });

    return checkError(response);
}
