// src/utils/setupAxiom.js
import AxiomRequestInterceptor from './axiomIntercepter';

// Initialize the interceptor with configuration
const interceptor = new AxiomRequestInterceptor({
    // Axiom configuration
    dataset: 'yooweb-logs', // Your Axiom dataset name

    // Feature toggles
    enabled: true || import.meta.env.MODE !== 'test', // Disable in test mode
    logHeaders: true,    // Log request/response headers
    logBody: true,       // Log request bodies
    logResponseBody: true, // Log response bodies

    // URLs to exclude from logging
    excludeUrls: [
        // Health checks and monitoring
        '/health',
        '/ping',
        '/status',

        // Static assets (using regex)
        /\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/i,

        // Analytics and tracking
        'analytics',
        'tracking',
        'gtag',

        // Add your own patterns here
        // '/api/internal',
        // /^\/admin\/logs/,
    ]
});

// Start intercepting fetch requests
interceptor.init();

// Export the interceptor instance in case you need to access it later
export default interceptor;