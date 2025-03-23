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
    window.location.href = "http://localhost:3000/auth/roblox"; // Redirect to your authentication API
});

function exploreMore() {
    alert('Exploring more!');
    // You can change this to navigate to another page
}
