// This file handles the logic for the search functionality, including capturing user input, fetching data from cats.json, and displaying the search results.

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results');

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            const cats = await fetchCats();
            const filteredCats = cats.filter(cat => cat.name.toLowerCase().includes(query));
            displayResults(filteredCats);
        }
    });

    async function fetchCats() {
        const response = await fetch('data/cats.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    function displayResults(cats) {
        resultsContainer.innerHTML = '';
        if (cats.length > 0) {
            cats.forEach(cat => {
                const catElement = document.createElement('div');
                catElement.classList.add('cat-result');
                catElement.innerHTML = `
                    <h3>${cat.name}</h3>
                    <p>Breed: ${cat.breed}</p>
                    <p>Color: ${cat.color}</p>
                    <img src="${cat.image}" alt="${cat.name}" />
                `;
                resultsContainer.appendChild(catElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    }
});