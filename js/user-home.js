    // Function to read cookies
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

    // Check permissions and load user data when page opens
    window.onload = function () {
        const cookiesAccepted = getCookie('cookiesAccepted');
        const userRoleFromCookie = getCookie("userRole");
        const userRoleFromStorage = localStorage.getItem("role");
        
        // Prefer cookies if user accepted them
        const userRole = cookiesAccepted ? userRoleFromCookie : userRoleFromStorage;
        
        // If user doesn't have proper role, redirect to login
        if (!userRole || userRole !== "user") {
            window.location.href = "index.html";
            return;
        }
        
        // Show username if available
        const username = getCookie("username") || localStorage.getItem("username");
        if (username) {
            document.getElementById("userName").textContent = username;
        }
    };

    // Add click effect to all cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            // Temporary color change when clicked
            this.style.background = '#c8d9ff';
            setTimeout(() => {
                this.style.background = '';
            }, 300);
        });
    });

    // Logout function
    function logout() {
        // Keep cookies for remembering preferences
        // Only remove session data from localStorage
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
        
        // Go back to login page
        window.location.href = "index.html";
    }