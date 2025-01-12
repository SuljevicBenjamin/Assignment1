function recenzije_js() {
    // Sve funkcije unutar DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {

        // Dodavanje recenzije
        const form = document.getElementById('review-form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const reviewText = document.getElementById('recenzija').value.trim();
        
            if (reviewText === '') {
                toastr.error('Polje za recenziju ne može biti prazno!', 'Greška');
            } else {
                toastr.success('Vaša recenzija je uspješno poslana!', 'Hvala Vam');
            }
        });

        // Akordion funkcionalnost
        const acc = document.getElementsByClassName("accordion");
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                const panel = this.nextElementSibling;
                panel.style.display = panel.style.display === "block" ? "none" : "block";
            });
        }

        // Učitavanje recenzija
        function loadReviews() {
            fetch("../JSON/recenzije.json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Neuspešno učitavanje recenzija.");
                    }
                    return response.json();
                })
                .then(data => {
                    const reviewsList = document.getElementById("reviews-list");
                    reviewsList.innerHTML = "";

                    //  Provjera da li DATA sadrži niz recenzija
                    if (Array.isArray(data)) {
                        data.forEach(review => {
                            const reviewItem = document.createElement("li");
                            reviewItem.innerHTML = `
                                <strong>${review.author}</strong> (${review.date}):
                                <p>${review.review}</p>
                            `;
                            reviewsList.appendChild(reviewItem);
                        });
                    } else {
                        console.error("Podaci nisu u ispravnom formatu.");
                    }
                })
                .catch(error => {
                    console.error("Greška:", error.message);
                });
        }
        loadReviews();

        // Funkcija za vremensku prognozu
        async function getWeather(city) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fec9a8f0fe5063b6a2d274219aa6285b`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                document.getElementById('weather').innerHTML = `Temperatura u ${city} je ${data.main.temp}°C`;
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }
        getWeather('Sarajevo');

        // Editovanje i brisanje recenzija
        function editAndDeleteReviews() {
            fetch("recenzije.json")
                .then(response => response.ok ? response.json() : Promise.reject('Greška prilikom učitavanja'))
                .then(data => {
                    const reviewsList = document.getElementById("reviews-list");
                    reviewsList.innerHTML = "";

                    data.forEach(function(review) {
                        const reviewItem = document.createElement("li");
                        reviewItem.classList.add("review-item");
                        reviewItem.innerHTML = `
                            <strong>${review.author}</strong> (${review.date}):
                            <p>${review.review}</p>
                            <button class="edit-btn">Uredi</button>
                            <button class="delete-btn">Obriši</button>
                        `;
                        reviewsList.appendChild(reviewItem);

                        // Edit recenzije
                        const editButton = reviewItem.querySelector(".edit-btn");
                        editButton.addEventListener("click", function() {
                            const reviewText = reviewItem.querySelector("p");
                            reviewText.contentEditable = true;
                            reviewText.focus();
                        });

                        // Spremanje editane recenzije
                        const saveButton = document.createElement("button");
                        saveButton.textContent = "Spremi";
                        reviewItem.appendChild(saveButton);
                        saveButton.addEventListener("click", function() {
                            const reviewText = reviewItem.querySelector("p");
                            reviewText.contentEditable = false;
                            alert("Recenzija uspješno uređena!");
                        });

                        // Brisanje recenzije
                        const deleteButton = reviewItem.querySelector(".delete-btn");
                        deleteButton.addEventListener("click", function() {
                            reviewItem.remove();
                            alert("Recenzija uspješno obrisana!");
                        });
                    });
                })
                .catch(function(error) {
                    console.error("Greška:", error);
                });
        }

        editAndDeleteReviews();

    });
}


recenzije_js();
