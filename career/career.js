function goToLogin() {
  window.location.href = "/login/index.html";
}

document.getElementById("jobForm").addEventListener("submit", function(e){
  e.preventDefault();
  const loader = document.getElementById("loader");
  loader.classList.add("show");
  const nameVal = document.getElementById("name").value;
  const emailVal = document.getElementById("email").value;
  const collegeVal = document.getElementById("college").value;
  const cpiVal = document.getElementById("cpi").value;
  const phoneVal = document.getElementById("phone").value;

  fetch("https://script.google.com/macros/s/AKfycbygedLkIw1WGOqSiNtp7enAXAzvOV51pdJUZkweKElDhhfEu9A49sOFlRxGUjdCyF7OCg/exec", {
    method: "POST",
    body: JSON.stringify({
      name: nameVal,
      email: emailVal,
      cpi: cpiVal,
      college: collegeVal,
      phone: phoneVal
    })
  })
  .then(res => res.text())
.then((response) => {
  loader.classList.remove("show");

  const errorBox = document.getElementById("errorBox");

  if (response.trim() === "EXISTS") {
    // ❌ Show error box
    errorBox.classList.add("show");

    // 🧹 Form reset
    document.getElementById("jobForm").reset();

  } else {
    window.location.href = "/applied/index.html";
  }
})
});

