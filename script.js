document.addEventListener('DOMContentLoaded', async () => {
    const loggedIn = document.getElementById('loggedIn');
    const notLoggedIn = document.getElementById('notLoggedIn');
    const response = await fetch('/is-logged-in');

    if (response.ok) {
        loggedIn.style.display = 'block';
        notLoggedIn.style.display = 'none';
    } else {
        loggedIn.style.display = 'none';
        notLoggedIn.style.display = 'block';
    }
});

// ... (rest of the script.js code)
document.addEventListener('DOMContentLoaded', async () => {
    const loggedIn = document.getElementById('loggedIn');
    const notLoggedIn = document.getElementById('notLoggedIn');
    const response = await fetch('/is-logged-in');

    if (response.ok) {
        loggedIn.style.display = 'block';
        notLoggedIn.style.display = 'none';
    } else {
        loggedIn.style.display = 'none';
        notLoggedIn.style.display = 'block';
    }
});

async function handleLoginClick() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        alert('Logged in successfully!');
        location.reload(); // Reload the page to update the UI
    } else {
        alert('Error: Invalid username or password.');
    }
}

document.getElementById('login-btn').addEventListener('click', handleLoginClick);

async function handleLogoutClick() {
    const response = await fetch('/logout', {
        method: 'POST',
    });

    if (response.ok) {
        alert('Logged out successfully!');
        location.reload(); // Reload the page to update the UI
    } else {
        alert('Error: Unable to log out.');
    }
}

document.getElementById('logout-btn').addEventListener('click', handleLogoutClick);

async function handleRegisterClick() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        alert('Account created successfully! You can now log in.');
    } else {
        alert('Error: Unable to create an account.');
    }
}

document.getElementById('register-btn').addEventListener('click', handleRegisterClick);
