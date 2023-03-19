document.getElementById('login-btn').addEventListener('click', () => {
    // You can add authentication logic here
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.add-recipe-form').style.display = 'block';
});

document.getElementById('add-recipe-btn').addEventListener('click', () => {
    const recipeName = prompt('Enter the name of the recipe:');
    const ingredients = prompt('Enter the ingredients, separated by commas:');
    const tags = prompt('Enter any tags, separated by commas:');

    // Save the recipe to the user's profile (you will implement this functionality in the backend)
    console.log({ recipeName, ingredients, tags });
});

document.getElementById('register-btn').addEventListener('click', async () => {
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
        alert('Error: Unable to create account.');
    }
});
