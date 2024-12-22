document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('review-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const reviewText = document.getElementById('recenzija').value.trim();

       
        if (reviewText === '') {
            toastr.error('Polje za recenziju ne može biti prazno!', 'Greška');
        } else {
            
            toastr.success('Vaša recenzija je uspješno poslana!', 'Hvala Vam' );
        }
    });
});



/* Recenzije poznatih ličnosti*/


var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    
    this.classList.toggle("active");

    
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}







document.addEventListener("DOMContentLoaded", function () {
  
  function loadReviews() {
      fetch("recenzije.json")
          .then(response => {
              if (!response.ok) {
                  throw new Error("Neuspešno učitavanje recenzija.");
              }
              return response.json();
          })
          .then(data => {
              
              const reviewsList = document.getElementById("reviews-list");
              reviewsList.innerHTML = "";

              
              data.forEach(review => {
                  const reviewItem = document.createElement("li");
                  reviewItem.innerHTML = `
                      <strong>${review.author}</strong> (${review.date}):
                      <p>${review.review}</p>
                  `;
                  reviewsList.appendChild(reviewItem);
              });
          })
          .catch(error => {
              console.error("Greška:", error.message);
          });
  }

  
  loadReviews();
});




async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fec9a8f0fe5063b6a2d274219aa6285b`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        
        
        document.getElementById('weather').innerHTML = `Temperatura u ${city} je ${data.main.temp}°C`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}


getWeather('Sarajevo');  



/* EDIT i DELETE */

document.addEventListener("DOMContentLoaded", function() {

    
    function loadReviews() {
        
        fetch("recenzije.json")
            .then(function(response) {
                if (!response.ok) {
                    alert("Neuspešno učitavanje recenzija.");
                    return;
                }
                return response.json();
            })
            .then(function(data) {
                var reviewsList = document.getElementById("reviews-list");
                reviewsList.innerHTML = ""; 

                
                data.forEach(function(review) {
                    var reviewItem = document.createElement("li");
                    reviewItem.classList.add("review-item");
                    reviewItem.innerHTML = "<strong>" + review.author + "</strong> (" + review.date + "):<p>" + review.review + "</p>" +
                        "<button class='edit-btn'>Uredi</button>" +
                        "<button class='delete-btn'>Obriši</button>";
                    reviewsList.appendChild(reviewItem);

                    
                    var editButton = reviewItem.querySelector(".edit-btn");
                    editButton.addEventListener("click", function() {
                        reviewItem.querySelector("p").contentEditable = true;
                        reviewItem.querySelector("p").focus();
                    });

                    
                    var saveButton = document.createElement("button");
                    saveButton.textContent = "Spremi";
                    reviewItem.appendChild(saveButton);
                    saveButton.addEventListener("click", function() {
                        reviewItem.querySelector("p").contentEditable = false;
                        alert("Recenzija uspješno uređena!");
                    });

                    
                    var deleteButton = reviewItem.querySelector(".delete-btn");
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

    
    loadReviews();
});




