const TOKEN_KEY = 'token';

const session = {
  setSession(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  getSession() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token;
  },
  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
  },
  isAuthenticated() {
    return !!this.getSession();
  },
};

export default session;
