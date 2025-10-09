import { ROLE_ADMIN, SESSION_KEY } from './constants';

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
    const session = localStorage.getItem(SESSION_KEY);
    return !!session;
  },
  getToken() {
    const session = this.getSession();
    return session?.access_token ?? null;
  },
  isAdmin() {
    const session = this.getSession();
    return session?.user?.role === ROLE_ADMIN;
  },
};

export default session;
