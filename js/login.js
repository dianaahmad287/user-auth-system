 // Function to set a cookie with expiration days
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Function to get cookie value by name
    function getCookie(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }

    // Check if user already accepted cookies
    function checkCookiesConsent() {
        return getCookie('cookiesAccepted') === 'true';
    }

    // When page loads, check if we should redirect
    window.onload = function () {
        const cookiesAccepted = checkCookiesConsent();
        const role = getCookie("userRole");
        
        // If user already accepted cookies and has a role, redirect directly
        if (cookiesAccepted && role) {
            if (role === "admin") {
                window.location.href = "admin-home.html";
            } else if (role === "user") {
                window.location.href = "user-home.html";
            }
        }
    };

    // Handle cookie acceptance
    function acceptCookies() {
        document.getElementById('cookiePopup').style.display = 'none';
        
        const role = document.getElementById("roleSelect").value;
        const username = document.getElementById("username").value;
        
        // Store user consent
        setCookie('cookiesAccepted', 'true', 3);
        
        // Store user role for 3 days
        setCookie("userRole", role, 3);
        
        // Store username too
        setCookie("username", username, 3);
        
        // Continue with login process
        completeLogin(role);
    }

    // Handle cookie rejection
    function rejectCookies() {
        document.getElementById('cookiePopup').style.display = 'none';
        
        const role = document.getElementById("roleSelect").value;
        const username = document.getElementById("username").value;
        
        // Use localStorage instead of cookies
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        localStorage.setItem("isLoggedIn", "true");
        
        // Continue with login process
        completeLogin(role);
    }

    // Complete the login process and redirect
    function completeLogin(role) {
        if (role === "admin") {
            window.location.href = "admin-home.html";
        } else {
            window.location.href = "user-home.html";
        }
    }

    // Handle login form submission
    document.getElementById("loginForm").onsubmit = function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("roleSelect").value;

        // validation check
        if (username === "" || password === "") {
            alert("Please fill in all fields");
            return;
        }
        
        // Show cookie consent popup
        document.getElementById('cookiePopup').style.display = 'flex';
    };