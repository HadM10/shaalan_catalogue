<?php
include('headers.php');
include('db_connection.php');

// Define SQL query to fetch users
$selectQuery = "SELECT user_id, username, password, status FROM users";

// Prepare the SQL statement
if ($stmt = $conn->prepare($selectQuery)) {
    // Execute the prepared statement
    if ($stmt->execute()) {
        // Bind result variables
        $stmt->bind_result($user_id, $username, $password, $status);

        // Fetch results and populate the response array
        $users = array();
        while ($stmt->fetch()) {
            $users[] = array(
                "user_id" => $user_id,
                "username" => $username,
                "password" => $password,
                "status" => $status
            );
        }
    }
}

$conn->close();

// Output JSON response
header('Content-Type: application/json');
echo json_encode($users);
?>