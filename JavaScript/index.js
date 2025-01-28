if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "../HTML/login1.html"; 
}

var app =$.spapp({
    defaultView:"#page1",
    templateDir:"./HTML/"
});

app.run();


document.getElementById("darkModeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});


app.route({
    view: "../HTML/main.html",
    onCreate: function() {main_js()},
    onReady: function() {nav("pg1");}
});

app.route({
    view: "../HTML/usluge.html",
    
    onReady: function() {nav("pg2");}
})

app.route({
    view: "../HTML/onama.html",
    onReady: function() {nav("pg3");}
});

app.route({
    view: "../HTML/galerija.html",
    onCreate: function() {galerija_js()},
    onReady: function() {nav("pg4");}
})

app.route({
    view: "../HTML/recenzije.html",
    onCreate: function() {recenzije_js()},
    onReady: function() {nav("pg5");}
})


const pg=["pg1","pg2","page3","page4","page5"];

$(document).ready(function() {
    
    var currentPage = window.location.hash || "#page1"; 
    $("#" + currentPage.substring(1)).addClass("active"); 

    
    $(".nav_links a").on("click", function(e) {
        e.preventDefault(); 

        
        $(".nav_links a").removeClass("active");

        
        $(this).addClass("active");

        
        window.location.hash = $(this).attr("href");
    });
});




    