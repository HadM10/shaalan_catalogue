<?php
include('headers.php');
include('db_connection.php');

// Default response for invalid request method
$response = array('status' => 'error', 'message' => 'Invalid request method');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (!empty($username) && !empty($password)) {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Prepare the SQL statement to insert the new user
        $stmt = $conn->prepare("INSERT INTO admin_users (username, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $hashedPassword);

        if ($stmt->execute()) {
            $response = array('status' => 'success', 'message' => 'User registered successfully');
        } else {
            $response = array('status' => 'error', 'message' => $stmt->error);
        }

        $stmt->close();
    } else {
        $response = array('status' => 'error', 'message' => 'Missing required fields');
    }
}

// Send response as JSON
header('Content-Type: application/json');
echo json_encode($response);

// Close the database connection
$conn->close();
?>