// authService.js

const authService = {
    setToken: (token) => {
        localStorage.setItem('token', token);
    },
    getToken: () => {
        return localStorage.getItem('token');
    },
    clearToken: () => {
        localStorage.removeItem('token');
    },
    setUserId: (userId) => {
        localStorage.setItem('userId', userId);
    },
    getUserId: () => {
        return localStorage.getItem('userId');
    }
};

export default authService;
