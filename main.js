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

const express = require("express");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const axios = require("axios");
const URLSearchParams = require("url").URLSearchParams; // For URL-encoded requests

const app = express();
app.use(cookieParser());

const CLIENT_ID = "5965494195376135434"; // Replace with your actual Roblox App ID
const CLIENT_SECRET = "RBX-fQg3rLWj8E6MsaB6m7-6FSWrkmdyuvb4fsev65BAsgmmyLQH_mI95NUc2JPYjOe9"; // Replace with your Roblox secret
const REDIRECT_URI = "https://akdevo.github.io/bsodscreations/main.html/auth/callback/redirect"; // Your callback URL

// Function to generate a random code_verifier
function generateCodeVerifier() {
    const buffer = crypto.randomBytes(32);
    return buffer.toString("base64url"); // Base64 URL-safe encoding
}

// Function to generate code_challenge from the code_verifier
function generateCodeChallenge(codeVerifier) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash("sha256").update(codeVerifier).digest();
        const base64Url = hash.toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
        resolve(base64Url);
    });
}

// Store the code_verifier temporarily in a session or variable for later use
let storedCodeVerifier = null;

// Redirect to Roblox authentication page
app.get("/auth/roblox", async (req, res) => {
    // Generate a code_verifier and code_challenge
    const codeVerifier = generateCodeVerifier();
    storedCodeVerifier = codeVerifier; // Store code_verifier for later use

    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Build the authentication URL
    const authUrl = `https://authorize.roblox.com/?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=openid+profile&state=abc123&code_challenge=${codeChallenge}&code_challenge_method=S256&step=accountConfirm`;

    // Redirect to Roblox authentication page
    res.redirect(authUrl);
});

// Handle callback after authentication
app.get("/auth/callback/redirect", async (req, res) => {
    const { code, state } = req.query;

    if (!code) {
        return res.status(400).send("Authentication failed.");
    }

    // Validate state parameter
    if (state !== "abc123") {
        return res.status(400).send("Invalid state parameter.");
    }

    try {
        // Make sure the code_verifier is available
        if (!storedCodeVerifier) {
            return res.status(500).send("Code verifier missing.");
        }

        // Send a POST request to exchange the authorization code for an access token
        const response = await axios.post("https://apis.roblox.com/oauth/v1/token", new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            grant_type: "authorization_code",
            redirect_uri: REDIRECT_URI,
            code_verifier: storedCodeVerifier, // Include the code_verifier
        }).toString(), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const accessToken = response.data.access_token;

        // Generate a session token
        const sessionToken = crypto.randomBytes(128).toString("hex");

        // Set the session cookie
        res.cookie("session", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set to true in production
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Respond with a success message
        res.send("Login successful! You can now access the site.");
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send("Authentication error.");
    }
});

// Profile page (for testing purposes)
app.get("/profile", (req, res) => {
    const session = req.cookies.session;
    if (!session) {
        return res.status(401).send("Not logged in.");
    }
    res.send(`Logged in with session: ${session}`);
});

// Start the Express server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
