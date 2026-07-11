/**
 * Centralized Google Authentication Utility
 * Uses Google Identity Services (OAuth 2.0 Implicit Flow)
 */

const GOOGLE_CLIENT_ID = '642751159474-7tisdqleh92nugqppephoah4si2hcc7c.apps.googleusercontent.com';
let tokenClient = null;

function initGoogleAuth() {
    if (typeof google === 'undefined' || !google.accounts) {
        console.error('Google Identity Services script not loaded');
        return;
    }
    
    // Initialize the token client
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'email profile',
        callback: (response) => {
            if (response.error !== undefined) {
                console.error('Google Auth Error:', response.error);
                return;
            }
            // Successfully authenticated
            localStorage.setItem('wealthory_auth_token', response.access_token);
            localStorage.setItem('wealthory_is_logged_in', 'true');
            
            // Execute the pending callback if one exists
            if (window.pendingDownloadCallback) {
                window.pendingDownloadCallback();
                window.pendingDownloadCallback = null;
            }
        },
    });
}

/**
 * Ensures the user is logged in before executing the given callback.
 * If not logged in, it triggers the Google Login popup.
 * @param {Function} callback - The function to execute after successful login (e.g., download file)
 */
function requireAuth(callback) {
    const isLoggedIn = localStorage.getItem('wealthory_is_logged_in') === 'true';
    
    if (isLoggedIn) {
        // Already logged in, execute immediately
        callback();
    } else {
        // Not logged in, trigger popup
        if (!tokenClient) {
            console.error('Token client not initialized yet.');
            alert('Authentication service is loading, please try again in a moment.');
            return;
        }
        window.pendingDownloadCallback = callback;
        tokenClient.requestAccessToken({prompt: 'consent'});
    }
}

// Call init when the window loads, assuming the GIS script is included synchronously or defer
window.onload = () => {
    // Check if the script is loaded, if not wait a bit
    if (typeof google !== 'undefined' && google.accounts) {
        initGoogleAuth();
    } else {
        // Fallback polling if script loads late
        const checkGoogle = setInterval(() => {
            if (typeof google !== 'undefined' && google.accounts) {
                clearInterval(checkGoogle);
                initGoogleAuth();
            }
        }, 100);
    }
};
