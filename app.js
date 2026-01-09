const modal = document.getElementById("registerModal");
const modalTitle = document.getElementById("modalTitle");
const form = document.getElementById("studentForm");
const successMessage = document.getElementById("successMessage");
const closeBtn = document.getElementById("closeModal");

let currentType = "student";

// OPEN MODAL (Student / Event)
document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-type]");
    if (!btn) return;

    currentType = btn.dataset.type;

    modalTitle.innerText =
        currentType === "student"
            ? "Register Student"
            : "Register for Event";

    successMessage.innerText = "";
    successMessage.style.display = "none";

    form.reset();
    clearErrors();
    modal.style.display = "flex";
});

// CLOSE MODAL
closeBtn.onclick = () => (modal.style.display = "none");

// VALIDATION
form.addEventListener("submit", (e) => {
    e.preventDefault();

    clearErrors();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const mobile = document.getElementById("mobile");

    let isValid = true;

    if (name.value.trim().length < 3) {
        showError(name, "Enter valid name");
        isValid = false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        showError(email, "Enter valid email");
        isValid = false;
    }

    if (!/^\d{10}$/.test(mobile.value)) {
        showError(mobile, "Enter 10 digit number");
        isValid = false;
    }

    if (!isValid) return;

    // SUCCESS
    form.style.display = "none";
    successMessage.style.display = "block";
    successMessage.innerText =
        currentType === "student"
            ? "Student registered successfully!"
            : "Event registered successfully!";

    setTimeout(() => {
        modal.style.display = "none";
        form.style.display = "block";
        form.reset();
    }, 2000);
});

function showError(input, msg) {
    input.nextElementSibling.innerText = msg;
}

function clearErrors() {
    document.querySelectorAll(".error").forEach((e) => (e.innerText = ""));
}

