<?php
include('headers.php');
include('db_connection.php');

// Include Composer's autoloader
require_once __DIR__ . '../../../vendor/autoload.php';


// Retrieve environment variables for admin credentials
$adminUsername = getenv('ADMIN_USERNAME');
$adminPassword = getenv('ADMIN_PASSWORD');

// Default response for invalid request method
$response = array('status' => 'error', 'message' => 'Invalid request method');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    // Check if credentials are provided
    if (!empty($username) && !empty($password)) {
        // Check if the username matches and verify the password hash
        if ($username === $adminUsername && $password === $adminPassword) {
            // Authentication successful
            session_start();
            session_regenerate_id(true); // Regenerate session ID to prevent session fixation
            $_SESSION['user_id'] = 1; // Set a fixed user ID for the admin
            $_SESSION['login_time'] = time();  // Set login timestamp

            $response = array('status' => 'success', 'message' => 'Sign in successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Invalid credentials');
        }
    } else {
        $response = array('status' => 'error', 'message' => 'Missing credentials');
    }
}

// Send response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>