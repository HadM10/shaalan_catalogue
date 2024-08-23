<?php

require_once 'db_connection.php'; // Include your database connection

include('headers.php'); // Include any necessary headers for CORS or other configurations

session_start(); // Start the session

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username']; // Get the username from the request
    $password = $_POST['password']; // Get the password from the request

    // Prepare and execute SQL statement to fetch user from the database using prepared statement
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Check if the user is active
            if ($user['status'] == 'active') {
                // Sign in successful, respond with the user ID
                http_response_code(200);
                echo $user['user_id'];
            } else {
                // Account is blocked
                http_response_code(403);
                echo 'Account is blocked';
            }
        } else {
            // Incorrect password
            http_response_code(400);
            echo 'Incorrect password';
        }
    } else {
        // User not found
        http_response_code(404);
        echo 'User not found';
    }

    // Close statement
    $stmt->close();
} else {
    http_response_code(405); // Method Not Allowed
}

?>