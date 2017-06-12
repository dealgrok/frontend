export default class Authentication {
  isLoggedIn() {
    return localStorage.getItem("id-token");
  }
  async login(username, password) {
    let reqBody = JSON.stringify({auth: {email: username, password: password}})
    let headers = {"Content-Type": "application/json"}
    return fetch('http://localhost:4000/user_token', 
      {method: 'POST', body: reqBody, headers: headers}
    ).then(response => response.json())
  }
  async loginAndSave(username, password) {
    var data = null
    try {
      data = await this.login(username, password)
    } catch(e) {
      return new Promise((res, rej) => rej(e))
    }
    console.log(data)
    localStorage.setItem("id-token", data.jwt)
    return new Promise((res, rej) => res(data.jwt))
  }
}
