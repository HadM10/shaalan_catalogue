<?php
include('headers.php');
include('db_connection.php');

// Query to retrieve counts from the database
$query = "SELECT 
            (SELECT COUNT(*) FROM users) AS total_users,
            (SELECT COUNT(*) FROM products) AS total_products,
            (SELECT COUNT(*) FROM categories) AS total_categories";
$result = $conn->query($query);

// Fetch the results
$row = $result->fetch_assoc();

// Close the database connection
$conn->close();

// Output JSON response
header('Content-Type: application/json');
echo json_encode($row);
?>