<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit;
}

// Validate required fields
$required = ['name', 'email', 'phone', 'message'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

$conn = getDBConnection();

// Sanitize inputs
$name = $conn->real_escape_string(trim($input['name']));
$email = $conn->real_escape_string(trim($input['email']));
$phone = $conn->real_escape_string(trim($input['phone']));
$company = $conn->real_escape_string(trim($input['company'] ?? ''));
$service = $conn->real_escape_string(trim($input['service'] ?? 'General Inquiry'));
$message = $conn->real_escape_string(trim($input['message']));

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit;
}

// Insert into database
$query = "INSERT INTO contact_submissions (name, email, phone, company, service, message, created_at, ip_address, status) 
          VALUES ('$name', '$email', '$phone', '$company', '$service', '$message', NOW(), '{$_SERVER['REMOTE_ADDR']}', 'new')";

if ($conn->query($query)) {
    $id = $conn->insert_id;
    
    // Send email to admin
    $to = ADMIN_EMAIL;
    $subject = "New Contact Request from $name";
    $body = "
    New Contact Submission ID: #$id
    
    Name: $name
    Email: $email
    Phone: $phone
    Company: $company
    Service: $service
    
    Message:
    $message
    
    Time: " . date('Y-m-d H:i:s') . "
    IP: {$_SERVER['REMOTE_ADDR']}
    ";
    
    $headers = "From: " . NOREPLY_EMAIL . "\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    mail($to, $subject, $body, $headers);
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Your inquiry has been submitted successfully. We will contact you soon.',
        'id' => $id
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to submit contact form']);
}

$conn->close();
?>
