<?php

require_once 'db_connection.php'; // Include your database connection

include('headers.php'); // Include headers if needed

// Query to fetch users who are not blocked
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

$users = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($users);

$conn->close();
?>