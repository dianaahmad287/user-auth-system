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

    // Check user permissions when page loads
    window.onload = function () {
        const cookiesAccepted = getCookie('cookiesAccepted');
        const userRoleFromCookie = getCookie("userRole");
        const userRoleFromStorage = localStorage.getItem("role");
        
        // Use cookies if user accepted them, otherwise use localStorage
        const userRole = cookiesAccepted ? userRoleFromCookie : userRoleFromStorage;
        
        // If user doesn't have admin role, send them back to login
        if (!userRole || userRole !== "admin") {
            window.location.href = "login.html";
            return;
        }
    };

    // Logout function - keeps cookies but clears session data
    function logout() {
        // We don't delete cookies so we remember user preferences
        // Only clear the session data from localStorage
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
        
        // Redirect to login page
        window.location.href = "login.html";
    }