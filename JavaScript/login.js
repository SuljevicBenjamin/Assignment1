document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();  

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("../JSON/users.json");  
        const users = await response.json();

        const userFound = users.some(user => user.username === username && user.password === password);

        if (userFound) {
            alert("Login successful!");
            localStorage.setItem("isLoggedIn", "true"); 
            localStorage.setItem("user", username);
            window.location.href = "../index.html"; 
        } else {
            alert("Invalid username or password. Please try again.");
        }
    } catch (error) {
        console.error("Error loading user data:", error);
        alert("An error occurred. Please try again later.");
    }
});
