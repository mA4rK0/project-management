const SESSION_KEY = 'my-session';

const session = {
  setSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },
  getSession() {
    const user = JSON.parse(localStorage.getItem(SESSION_KEY));
    return user;
  },
  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  },
  isAuthenticated() {
    return !!this.getSession();
  },
  getToken() {
    const session = this.getSession();
    return session?.access_token ?? null;
  },
};

export default session;
