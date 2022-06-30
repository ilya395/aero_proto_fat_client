import { AUTH_DATA } from "../../constants/variables.constant";

class LocalAuthData {

  // eslint-disable-next-line class-methods-use-this
  setAuthData(arg: string) {
    localStorage.setItem(AUTH_DATA, JSON.stringify(arg));
  }

  // eslint-disable-next-line class-methods-use-this
  getAuthData() {
    const data = localStorage.getItem(AUTH_DATA);
    return data && JSON.parse(data);
  }

  // eslint-disable-next-line class-methods-use-this
  removeAuthData() {
    return localStorage.removeItem(AUTH_DATA);
  }

  // eslint-disable-next-line class-methods-use-this
  getUId() {
    const data = this.getAuthData();
    return data ? JSON.parse(data).uid : null;
  }
}

export default new LocalAuthData();