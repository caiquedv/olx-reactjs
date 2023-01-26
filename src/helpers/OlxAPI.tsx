import Cookies from 'js-cookie';
import qs from 'qs'

// const BASEAPI = 'https://lit-caverns-01904.herokuapp.com';
const BASEAPI = 'http://localhost/adianti/template';

const apiFetchFile = async (endpoint, body) => {
    if (!body.token) {
        let token = Cookies.get('tokenOlx');
        if (token) {
            body.append('token', token);
        }
    }
    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        headers: { 'Accept': '*/*',  'Authorization': 'Basic 123' },
        body
    });
    const json = await res.json();
    // console.log(body)

    if (json.notallowed) {
        window.location.href = '/olx-reactjs/signin';
        return;
    }

    return json;
}

const apiFetchPost = async (endpoint, body) => {

    // if (!body.token) {
    //     let token = Cookies.get('tokenOlx');
    //     if (token) {
    //         body.token = token;
    //         // console.log(token)

    //     }
    // }
    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic 123'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();

    if (json.notallowed) {
        window.location.href = '/olx-reactjs/signin';
        return;
    }

    return json;
};

async function apiFetchPut(endpoint, body) {
    if (!body.token) {
        let token = Cookies.get('tokenOlx');
        if (token) {
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`, {
        method: 'PUT',
        headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization': 'Basic 123' 
        },
    })
    const data = await res.json()

    if (data.notallowed) {
        window.location.href = '/olx-reactjs/signin';
        return;
    }
    return data;
}

// const apiFetchGet = async (endpoint, body: any = []) => {
//     if (!body.token) {
//         let token = Cookies.get('tokenOlx');
//         if (token) {
//             body.token = token;
//         }
//     }
//     const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);
//     const json = await res.json();

//     if (json.notallowed) {
//         window.location.href = '/olx-reactjs/signin';
//         return;
//     }

//     return json;
// };

const apiFetchGet = async (endpoint, body: any = []) => { // php
    if (!body.token) {
        let token = Cookies.get('tokenOlx');
        if (token) {
            body.token = token;
        }
    }
    const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`, {
        method: 'GET',
        headers: { 'Authorization': 'Basic 123' },
    });

    const json = await res.json();

    if (json.notallowed) {
        window.location.href = '/olx-reactjs/signin';
        return;
    }
    // console.log(`${BASEAPI + endpoint}?${qs.stringify(body)}`)
    return json;
};

export const OlxAPI = {
    login: async (email, password) => {
        const json = await apiFetchPost(
            '/user/signin',
            { email, password }
        );
        return json;
    },

    register: async (name, email, password, stateLoc) => {
        const json = await apiFetchPost(
            '/user/signup',
            { name, email, password, state: stateLoc }
        );
        return json;
    },

    getStates: async () => {
        const json = await apiFetchGet(
            '/states'
        );
        return json.data;
    },

    getCategories: async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.data;
    },

    getAds: async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        ); //console.log(json)
        return json;
    },

    getAd: async (id, other = false) => {
        const json = await apiFetchGet(
            `/ad/${id}`,
            // { id, other }
        );
        return json;
    },

    addAd: async (fData) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );
        return json;
    },

    getUserData: async (token) => {
        const json = await apiFetchGet(
            '/user/me',
            { token }
        );
        return json;
    },

    updateUser: async (data, key) => {
        const response = await apiFetchPut(
            '/user/me',
            {
                name: key === 'name' ? data : undefined,
                email: key === 'email' ? data : undefined,
                state: key === 'state' ? data : undefined,
                password: key === 'pass' ? data : undefined
            }
        );
        return response;
    },

    updateAds: async (fData, adId) => {
        const json = await apiFetchFile(
            `/ad/${adId}`,
            fData
        );
        return json;
    }
}
