const frame = document.getElementById("frame");
const frame1 = document.getElementById("frame1")

frame.addEventListener("mousemove", (event) => {
    const { width, height, left, top } = frame.getBoundingClientRect();
    const x = event.clientX - left; // Mouse X relative to frame
    const y = event.clientY - top; // Mouse Y relative to frame

    const rotateX = ((y / height) - 0.5) * 30; // Rotate based on Y position
    const rotateY = ((x / width) - 0.5) * -30; // Rotate based on X position

    frame.style.transition = "transform 0.1s ease-out"; // Ensure smoothness on movement
    frame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

frame.addEventListener("mouseleave", () => {
    frame.style.transition = "transform 0.5s ease"; // Smooth return
    frame.style.transform = "rotateX(0deg) rotateY(0deg)";
});

frame1.addEventListener("mousemove", (event) => {
    const { width, height, left, top } = frame1.getBoundingClientRect();
    const x = event.clientX - left; // Mouse X relative to frame
    const y = event.clientY - top; // Mouse Y relative to frame

    const rotateX = ((y / height) - 0.5) * 30; // Rotate based on Y position
    const rotateY = ((x / width) - 0.5) * -30; // Rotate based on X position

    frame1.style.transition = "transform 0.1s ease-out"; // Ensure smoothness on movement
    frame1.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

frame1.addEventListener("mouseleave", () => {
    frame1.style.transition = "transform 0.5s ease"; // Smooth return
    frame1.style.transform = "rotateX(0deg) rotateY(0deg)";
});

document.getElementById("login-button").addEventListener("click", () => {
    window.location.href = "https://akdevo.github.io/bsodscreations/main.html/auth/roblox"; // Redirect to your authentication API
});

function exploreMore() {
    alert('Exploring more!');
    // You can change this to navigate to another page
}

document.addEventListener("DOMContentLoaded", async () => {
    const loginButton = document.getElementById("login-button");

    try {
        const response = await fetch("https://bsodscreationsapis.onrender.com/profile", {
            credentials: "include", // Ensures cookies are sent with the request
        });

        const data = await response.json();

        if (data.authenticated) {
            loginButton.textContent = data.username;
            loginButton.removeAttribute("href");
            loginButton.style.cursor = "default";
        } else {
            loginButton.addEventListener("click", () => {
                window.location.href = "https://bsodscreationsapis.onrender.com/auth/roblox";
            });
        }
    } catch (error) {
        console.error("Error checking authentication:", error);
    }
});
