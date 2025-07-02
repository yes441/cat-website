// This file manages the random cat selection process, including applying filters and displaying random cat pictures based on user preferences.

document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('filter-form');
    const catContainer = document.getElementById('cat-container');
    const randomCatButton = document.getElementById('random-cat-button');
    let cats = [];

    // Fetch the cat data from the JSON file
    fetch('../data/cats.json')
        .then(response => response.json())
        .then(data => {
            cats = data;
            displayRandomCat();
        })
        .catch(error => console.error('Error fetching cat data:', error));

    // Function to display a random cat
    function displayRandomCat() {
        const filteredCats = applyFilters(cats);
        const randomIndex = Math.floor(Math.random() * filteredCats.length);
        const randomCat = filteredCats[randomIndex];
        showCat(randomCat);
    }

    // Function to apply filters based on user input
    function applyFilters(cats) {
        const breedFilter = document.getElementById('breed-filter').value;
        const colorFilter = document.getElementById('color-filter').value;

        return cats.filter(cat => {
            return (breedFilter === 'all' || cat.breed === breedFilter) &&
                   (colorFilter === 'all' || cat.color === colorFilter);
        });
    }

    // Function to show the selected cat
    function showCat(cat) {
        catContainer.innerHTML = `
            <h2>${cat.name}</h2>
            <img src="${cat.image}" alt="${cat.name}" />
            <p>Breed: ${cat.breed}</p>
            <p>Color: ${cat.color}</p>
        `;
    }

    // Event listener for the random cat button
    randomCatButton.addEventListener('click', displayRandomCat);

    // Event listener for the filter form
    filterForm.addEventListener('change', displayRandomCat);
});