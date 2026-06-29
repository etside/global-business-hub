<?php
// Trust Formation API Backend
// Database Configuration

define('DB_HOST', 'localhost');
define('DB_USER', 'trustfo1_web');
define('DB_PASS', 'Pjokjict4@#$%');
define('DB_NAME', 'trustfo1_web');

// API Settings
define('API_URL', 'https://trustformation.net/api/');
define('SITE_URL', 'https://trustformation.net/');
define('ALLOWED_ORIGINS', array(
    'https://trustformation.net',
    'http://localhost:8080',
    'http://localhost:3000'
));

// WhatsApp Configuration
define('WHATSAPP_NUMBER', '8801343118676');
define('WHATSAPP_API_URL', 'https://api.whatsapp.com/send');

// Email Configuration
define('ADMIN_EMAIL', 'hello@trustformation.net');
define('NOREPLY_EMAIL', 'noreply@trustformation.net');

// Enable Error Reporting (Development)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/logs/error.log');

// Create logs directory if not exists
if (!is_dir(__DIR__ . '/logs')) {
    mkdir(__DIR__ . '/logs', 0755, true);
}

// Database Connection Function
function getDBConnection() {
    try {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        
        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }
        
        $conn->set_charset("utf8");
        return $conn;
    } catch (Exception $e) {
        error_log("Database Error: " . $e->getMessage());
        die(json_encode(['error' => 'Database connection failed']));
    }
}

// CORS Headers
function setCORSHeaders() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array($origin, ALLOWED_ORIGINS)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
    }
    
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json');
}

// Handle OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    setCORSHeaders();
    http_response_code(200);
    exit;
}

setCORSHeaders();
?>
