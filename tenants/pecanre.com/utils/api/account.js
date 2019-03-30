import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NOW_GITHUB_COMMIT_REF === 'master' ? 'https://prod--account.bhsvcs.com' : 'https://dev--account.bhsvcs.com'
});

export const login = async data => {
    let userObj = await instance.post('/loginWithPassword', data).then(response => response.data);

    return userObj;
}

export const signup = async data => {
    let userObj = await instance.post('/signupWithPassword', data).then(response => response.data);

    return userObj;
}

export default {
    login,
    signup
}