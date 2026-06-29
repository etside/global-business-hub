<?php
/**
 * Trust Formation - Main Entry Point
 * This file serves the React Single Page Application
 */

// Set headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

// Get the requested path
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = __DIR__ . '/client' . $path;

// If the file exists (like favicon.png, CSS, JS, etc), serve it
if (file_exists($file) && is_file($file)) {
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file);
    finfo_close($finfo);
    header("Content-Type: $mime");
    
    // Cache static assets
    if (preg_match('/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/', $file)) {
        header('Cache-Control: public, max-age=31536000');
    }
    
    readfile($file);
    exit;
}

// For all other routes, serve the index.html (React Router handles routing)
if (file_exists(__DIR__ . '/client/index.html')) {
    header('Content-Type: text/html; charset=utf-8');
    readfile(__DIR__ . '/client/index.html');
    exit;
}

// Fallback error
http_response_code(404);
echo "<!DOCTYPE html><html><head><title>404 - Not Found</title></head><body><h1>404 - Page Not Found</h1><p>The page you requested could not be found.</p><p><a href='https://" . $_SERVER['HTTP_HOST'] . "'>Return to home</a></p></body></html>";
?>
