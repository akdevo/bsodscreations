const frame = document.getElementById("frame");
const frame1 = document.getElementById("frame1");

if (frame) {
    frame.addEventListener("mousemove", (event) => {
        const { width, height, left, top } = frame.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;

        const rotateX = ((y / height) - 0.5) * 30;
        const rotateY = ((x / width) - 0.5) * -30;

        frame.style.transition = "transform 0.1s ease-out";
        frame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    frame.addEventListener("mouseleave", () => {
        frame.style.transition = "transform 0.5s ease";
        frame.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
}

if (frame1) {
    frame1.addEventListener("mousemove", (event) => {
        const { width, height, left, top } = frame1.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;

        const rotateX = ((y / height) - 0.5) * 30;
        const rotateY = ((x / width) - 0.5) * -30;

        frame1.style.transition = "transform 0.1s ease-out";
        frame1.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    frame1.addEventListener("mouseleave", () => {
        frame1.style.transition = "transform 0.5s ease";
        frame1.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
}

const loginButton = document.getElementById("login-button");
if (loginButton) {
    loginButton.addEventListener("click", () => {
        window.location.href = "https://bsodscreationsapis.onrender.com/auth/roblox";
    });
}

function exploreMore() {
    window.location.href = "vectorsDetails.html";
}

// 🚀 Method 1: Rate Limiting API Calls
const requestLimit = 5; // Max requests allowed
const timeFrame = 10 * 1000; // 10 seconds
let requestTimestamps = [];

async function rateLimitedFetch(url, options) {
    const now = Date.now();

    // Remove old timestamps
    requestTimestamps = requestTimestamps.filter((t) => now - t < timeFrame);

    if (requestTimestamps.length >= requestLimit) {
        console.warn("⚠️ Too many requests! Try again later.");
        return Promise.reject("Rate limit exceeded");
    }

    // Add current timestamp
    requestTimestamps.push(now);

    return fetch(url, options);
}

document.addEventListener("DOMContentLoaded", async () => {
    const loginButton = document.getElementById("login-button");
    const userIcon = document.querySelector(".user-icon");

    if (!loginButton || !userIcon) return;

    try {
        const response = await rateLimitedFetch("https://bsodscreationsapis.onrender.com/profile", {
            credentials: "include",
        });

        const data = await response.json();

        if (data.authenticated) {
            loginButton.textContent = "Logged In XD: " + data.username;
            loginButton.removeAttribute("href");
            loginButton.style.cursor = "default";

            // Fetch user's avatar URL with rate limiting
            const avatarResponse = await rateLimitedFetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${data.userId}&size=150x150&format=Png`);
            const avatarData = await avatarResponse.json();

            if (avatarData.data && avatarData.data.length > 0) {
                const avatarUrl = avatarData.data[0].imageUrl;
                userIcon.style.backgroundImage = `url(${avatarUrl})`;
                userIcon.style.backgroundSize = "cover";
                userIcon.style.backgroundPosition = "center";
                userIcon.style.borderRadius = "50%";
            }
        } else {
            loginButton.addEventListener("click", () => {
                window.location.href = "https://bsodscreationsapis.onrender.com/auth/roblox";
            });
        }
    } catch (error) {
        console.error("Error checking authentication:", error);
    }
});
