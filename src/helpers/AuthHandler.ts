import Cookies from 'js-cookie';

export const isLogged = () => {
    let token = Cookies.get('tokenOlx');
    return (token !== undefined);
}

export const doLogin = (token, rememberPassword = false) => {
    if(rememberPassword) {
        Cookies.set('tokenOlx', token, { expires:999 });
    } else {
        Cookies.set('tokenOlx', token);
    }
}

export const doLogout = () => {
    Cookies.remove('tokenOlx');
}