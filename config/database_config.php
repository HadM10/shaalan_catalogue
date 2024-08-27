<?php

// Access environment variables
$host = getenv('DB_HOST');
$port = getenv('DB_PORT'); // Default to 3306 if not specified
$username = getenv('DB_USER');
$password = getenv('DB_PASSWORD');
$database = getenv('DB_NAME');

// Create a new MySQLi connection with port
$conn = new mysqli($host, $username, $password, $database, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>