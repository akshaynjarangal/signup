
    const form = document.getElementById("signupForm");

    function showValidationMessage(input, message, isValid) {
        const feedback = input.nextElementSibling;
        if (isValid) {
            input.classList.remove("invalid");
            input.classList.add("valid");
            feedback.style.display = "none";
        } else {
            input.classList.remove("valid");
            input.classList.add("invalid");
            feedback.style.display = "block";
            feedback.textContent = message;
        }
    }

    function validateUsername() {
        const username = document.getElementById("username");
        const isValid = /^[a-zA-Z0-9]{4,}$/.test(username.value);
        showValidationMessage(username, "Username must be at least 4 characters and alphanumeric.", isValid);
        return isValid;
    }

    function validateEmail() {
        const email = document.getElementById("email");
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
        showValidationMessage(email, "Enter a valid email address.", isValid);
        return isValid;
    }

    function validatePassword() {
        const password = document.getElementById("password");
        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.value);
        showValidationMessage(password, "Password must be at least 8 characters long, including an uppercase letter, lowercase letter, number, and special character.", isValid);
        return isValid;
    }

    function validateConfirmPassword() {
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword");
        const isValid = password === confirmPassword.value;
        showValidationMessage(confirmPassword, "Passwords do not match.", isValid);
        return isValid;
    }

    function validateDOB() {
        const dob = document.getElementById("dob");
        const birthDate = new Date(dob.value);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        const isValid = !isNaN(birthDate) && age >= 18;
        showValidationMessage(dob, "You must be at least 18 years old.", isValid);
        return isValid;
    }

    function validateGender() {
        const gender = document.querySelector("input[name='gender']:checked");
        const isValid = gender !== null;
        showValidationMessage(document.querySelector("input[name='gender']"), "Please select a gender.", isValid);
        return isValid;
    }

    function validateTerms() {
        const terms = document.getElementById("terms");
        const isValid = terms.checked;
        showValidationMessage(terms, "You must accept the terms and conditions.", isValid);
        return isValid;
    }

    function validateForm() {
        return (
            validateUsername() &&
            validateEmail() &&
            validatePassword() &&
            validateConfirmPassword() &&
            validateDOB() &&
            validateGender() &&
            validateTerms()
        );
    }

    form.addEventListener("input", function (event) {
        switch (event.target.id) {
            case "username": validateUsername(); break;
            case "email": validateEmail(); break;
            case "password": validatePassword(); validateConfirmPassword(); break;
            case "confirmPassword": validateConfirmPassword(); break;
            case "dob": validateDOB(); break;
            case "terms": validateTerms(); break;
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validateForm()) {
            const userData = {
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                dob: document.getElementById("dob").value,
                gender: document.querySelector("input[name='gender']:checked").value
            };
            localStorage.setItem("userData", JSON.stringify(userData));
            alert("Sign-up successful!");
            form.reset();
        }
    });
