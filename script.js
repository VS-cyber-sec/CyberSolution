document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    
    // Criteria elements
    const lowerCaseCheck = document.getElementById('lowercase');
    const upperCaseCheck = document.getElementById('uppercase');
    const numberCheck = document.getElementById('numbers');
    const specialCharCheck = document.getElementById('special');
    const lengthCheck = document.getElementById('length');

    const strengthBar = document.getElementById('strength-bar');
    const remarksText = document.getElementById('remarks');

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
    });

    // Listen for input in the password field
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        checkPasswordStrength(password);
    });

    function checkPasswordStrength(password) {
        let strength = 0;
        let remarks = '';

        // Regular expressions to check for character types
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasMinLength = password.length >= 8;

        // Update UI for each criterion
        updateCriterion(lowerCaseCheck, hasLowerCase);
        updateCriterion(upperCaseCheck, hasUpperCase);
        updateCriterion(numberCheck, hasNumbers);
        updateCriterion(specialCharCheck, hasSpecialChars);
        updateCriterion(lengthCheck, hasMinLength);

        // Calculate strength score (out of 5)
        if (hasLowerCase) strength++;
        if (hasUpperCase) strength++;
        if (hasNumbers) strength++;
        if (hasSpecialChars) strength++;
        if (hasMinLength) strength++;

        // Determine remarks and progress bar color based on strength
        let barColor = '';
        switch (strength) {
            case 0:
            case 1:
                remarks = "Very Weak Password 😱";
                barColor = '#dc3545'; // Red
                break;
            case 2:
                remarks = "Weak Password 😟";
                barColor = '#ffc107'; // Yellow
                break;
            case 3:
                remarks = "Okay Password 🤔";
                barColor = '#fd7e14'; // Orange
                break;
            case 4:
                remarks = "Strong Password 👍";
                barColor = '#17a2b8'; // Teal
                break;
            case 5:
                remarks = "Excellent Password! 💪";
                barColor = '#28a745'; // Green
                break;
        }

        if (password.length === 0) {
            remarks = "Enter a password to see analysis.";
            strength = 0;
        }
        
        // Update the DOM
        const strengthPercentage = (strength / 5) * 100;
        strengthBar.style.width = `${strengthPercentage}%`;
        strengthBar.style.backgroundColor = barColor;
        remarksText.textContent = remarks;
        remarksText.style.color = barColor;
    }

    function updateCriterion(element, isValid) {
        if (isValid) {
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
        }
    }
});