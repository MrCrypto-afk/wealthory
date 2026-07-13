/**
 * Google Analytics Tracking Utility
 * Auto-binds to all inputs and tracks them using a debounce to prevent GA rate limits.
 */

let gaTrackingTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    // Find all number and range inputs on the page
    const inputs = document.querySelectorAll('input[type="number"], input[type="range"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (gaTrackingTimeout) {
                clearTimeout(gaTrackingTimeout);
            }

            // Set a new timeout to trigger after 2 seconds of inactivity
            gaTrackingTimeout = setTimeout(() => {
                let eventParams = {};
                
                // Collect the current values of all inputs on the page
                inputs.forEach(i => {
                    if (i.id && i.type === 'number') {
                        // Clean up IDs for better GA reporting (e.g. "monthly-inv-input" -> "monthly_inv")
                        const cleanName = i.id.replace('-input', '').replace(/-/g, '_');
                        eventParams[cleanName] = parseFloat(i.value) || 0;
                    }
                });

                // Determine the calculator name from the URL path
                let calcName = window.location.pathname.replace(/\//g, '');
                if (!calcName || calcName === 'index.html') {
                    calcName = 'global_calculator';
                }
                const eventName = calcName + '_usage';

                // Send to Google Analytics securely (Anonymous data only)
                if (typeof gtag === 'function') {
                    gtag('event', eventName, eventParams);
                    console.debug('GA Event Sent:', eventName, eventParams);
                }
            }, 2000);
        });
    });
});
