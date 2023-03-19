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
