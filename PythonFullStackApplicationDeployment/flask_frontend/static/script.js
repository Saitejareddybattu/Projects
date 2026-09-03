document.addEventListener("DOMContentLoaded", () => {


    const form = document.getElementById("feedbackForm");

    const nameInput = document.getElementById("name");

    const emailInput = document.getElementById("email");

    const messageInput = document.getElementById("message");

    const charCount = document.getElementById("charCount");

    const submitBtn = document.getElementById("submitBtn");

    const themeToggle = document.getElementById("themeToggle");

    const toast = document.getElementById("toast");

    const closeToast = document.getElementById("closeToast");



    /* =========================
       CHARACTER COUNTER
    ========================= */

    messageInput.addEventListener("input", () => {

        const length = messageInput.value.length;

        charCount.textContent = `${length} / 500`;

        if (length >= 450) {

            charCount.style.color = "#ffbd5c";

        } else {

            charCount.style.color = "#9faed4";

        }

    });



    /* =========================
       EMAIL VALIDATION
    ========================= */

    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }



    /* =========================
       FIELD VALIDATION
    ========================= */

    function validateField(input, errorElement, message) {

        const wrapper = input.closest(".input-wrapper");

        if (!input.value.trim()) {

            errorElement.textContent = message;

            if (wrapper) {
                wrapper.classList.remove("valid");
            }

            return false;

        }


        if (input.type === "email" && !validateEmail(input.value)) {

            errorElement.textContent =
                "Please enter a valid email address.";

            if (wrapper) {
                wrapper.classList.remove("valid");
            }

            return false;

        }


        errorElement.textContent = "";

        if (wrapper) {
            wrapper.classList.add("valid");
        }

        return true;

    }



    /* =========================
       REAL-TIME VALIDATION
    ========================= */

    nameInput.addEventListener("input", () => {

        validateField(
            nameInput,
            document.getElementById("nameError"),
            "Please enter your name."
        );

    });


    emailInput.addEventListener("input", () => {

        validateField(
            emailInput,
            document.getElementById("emailError"),
            "Please enter your email."
        );

    });


    messageInput.addEventListener("input", () => {

        const error =
            document.getElementById("messageError");

        if (messageInput.value.trim().length < 10) {

            error.textContent =
                "Feedback should contain at least 10 characters.";

        } else {

            error.textContent = "";

        }

    });



    /* =========================
       FORM SUBMISSION
    ========================= */

    form.addEventListener("submit", (event) => {

        const validName = validateField(
            nameInput,
            document.getElementById("nameError"),
            "Please enter your name."
        );


        const validEmail = validateField(
            emailInput,
            document.getElementById("emailError"),
            "Please enter your email."
        );


        const messageError =
            document.getElementById("messageError");


        const validMessage =
            messageInput.value.trim().length >= 10;


        if (!validMessage) {

            messageError.textContent =
                "Feedback should contain at least 10 characters.";

        } else {

            messageError.textContent = "";

        }


        if (!validName || !validEmail || !validMessage) {

            event.preventDefault();

            showToast(
                "Validation Error",
                "Please check the highlighted fields.",
                false
            );

            return;

        }


        /*
         * Do NOT preventDefault here.
         *
         * The browser will submit the form
         * to your Flask backend.
         */

        submitBtn.classList.add("loading");

        submitBtn.disabled = true;

    });



    /* =========================
       TOAST
    ========================= */

    function showToast(title, message, success = true) {

        document.getElementById("toastTitle")
            .textContent = title;

        document.getElementById("toastMessage")
            .textContent = message;


        const icon =
            document.querySelector(".toast-icon i");


        if (success) {

            icon.className =
                "fa-solid fa-check";

            document.querySelector(".toast-icon")
                .style.background = "#00c98b";

        } else {

            icon.className =
                "fa-solid fa-triangle-exclamation";

            document.querySelector(".toast-icon")
                .style.background = "#ff6b81";

        }


        toast.classList.add("show");


        setTimeout(() => {

            toast.classList.remove("show");

        }, 4000);

    }



    closeToast.addEventListener("click", () => {

        toast.classList.remove("show");

    });



    /* =========================
       THEME TOGGLE
    ========================= */

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");


        const icon =
            themeToggle.querySelector("i");


        if (
            document.body.classList.contains("light-theme")
        ) {

            icon.className =
                "fa-solid fa-sun";

        } else {

            icon.className =
                "fa-solid fa-moon";

        }

    });



    /* =========================
       SIDE MENU ANIMATION
    ========================= */

    document.querySelectorAll(".side-item")
        .forEach(item => {

            item.addEventListener("click", () => {

                document.querySelectorAll(".side-item")
                    .forEach(i =>
                        i.classList.remove("active")
                    );

                item.classList.add("active");

            });

        });



    /* =========================
       INPUT FOCUS EFFECT
    ========================= */

    document.querySelectorAll("input, textarea")
        .forEach(input => {

            input.addEventListener("focus", () => {

                input.parentElement
                    .classList.add("focused");

            });


            input.addEventListener("blur", () => {

                input.parentElement
                    .classList.remove("focused");

            });

        });



});