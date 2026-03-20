
  /*// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCRt_nj4Svk4yfZBeQ8jcSr_VQXWrhTqkY",
    authDomain: "smartconsult-employee.firebaseapp.com",
    projectId: "smartconsult-employee",
    storageBucket: "smartconsult-employee.firebasestorage.app",
    messagingSenderId: "595014566518",
    appId: "1:595014566518:web:e3ed37368e5026fd75d557",
    measurementId: "G-B82NX4VPZR"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
*/
function goToApply() {
  window.location.href = "/career";
}

function goToLogin() {
  window.location.href = "/login";
}
// Set deadline (change date as needed)
const deadline = new Date("2026-04-05T23:59:59").getTime();

function updateTimer() {
  const now = new Date().getTime();
  const distance = deadline - now;

  if (distance < 0) {
    document.getElementById("timer").innerHTML = "Applications Closed ❌";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

updateTimer();
setInterval(updateTimer, 1000);