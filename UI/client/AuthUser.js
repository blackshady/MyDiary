class AuthUser {
  constructor(email, password, username = '') {
    this.userData = {
      email,
      password,
      username,
    };
    this.fetchData = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(this.userData),
    };
    this.baseUrl = 'http://localhost:9000/api/v1';
    this.message;
  }


  async signUp() {
    const res = await fetch(`${this.baseUrl}/auth/signup`, this.fetchData);
    const data = await res.json();
    if (data.status === 'success') {
      window.location.href = '../pages/dashboard.html';
    }
    console.log(data.message)
  }
}