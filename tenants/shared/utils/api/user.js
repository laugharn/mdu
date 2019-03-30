import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.BRANCH === 'master' ? 'https://prod--user.bhsvcs.com' : 'https://dev--user.bhsvcs.com'
});

export const update = async data => {
    let userObj = await instance.post('/signupWithPassword', data).then(response => response.data);

    return userObj;
}

export default {
    update
}