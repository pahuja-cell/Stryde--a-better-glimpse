const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 3);
targetDate.setHours(targetDate.getHours() + 12);
targetDate.setMinutes(targetDate.getMinutes() + 45);

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");

function updateCountdown() {
  const now = new Date();
  const distance = targetDate - now;

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    return;
  }

  const totalSeconds = Math.floor(distance / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 60000);

const sizeButtons = document.querySelectorAll(".size-btn");
sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest(".size-row");
    group.querySelectorAll(".size-btn").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

const styleForm = document.getElementById("styleForm");
const styleStatus = document.querySelector(".form-status");

styleForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(styleForm);
  const name = formData.get("fullName");
  const style = formData.get("styleType");

  styleStatus.textContent = `Thanks, ${name}! Your ${style.toLowerCase()} fit request has been received.`;
  styleForm.reset();
});

const newsletterForm = document.getElementById("newsletterForm");
const newsletterStatus = document.querySelector(".newsletter-status");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(newsletterForm).get("newsletterEmail");
  newsletterStatus.textContent = `You’re on the list, ${email}. New drops are headed your way.`;
  newsletterForm.reset();
});
