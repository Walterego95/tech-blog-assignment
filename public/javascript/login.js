//login user
async function loginFormHandler(event) {
  event.preventDefault();
  //username...
  const username = document.querySelector('#username-login').value.trim();
  //password...
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    //if user/password input valid, redirect to dashboard...
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
}
//login button listener
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);


