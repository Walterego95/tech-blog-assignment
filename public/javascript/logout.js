//logout async function...
async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
//return to homepage after successful logout...
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}
//listener to connect the function above...
document.querySelector('#logout').addEventListener('click', logout);
