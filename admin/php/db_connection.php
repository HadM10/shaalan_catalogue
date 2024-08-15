<?php
include('headers.php');

// admin/php/db_connection.php
include('../../config/database_config.php');  // Adjust the path based on your project structure

$conn = new mysqli($host, $username, $password, $database, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>