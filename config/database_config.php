<?php
// Include Composer's autoloader
require_once __DIR__ . '/../vendor/autoload.php';

// Load the .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Access environment variables
$host = $_ENV['DB_HOST'];
$port = $_ENV['DB_PORT']; // Default to 3306 if not specified
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASSWORD'];
$database = $_ENV['DB_NAME'];

// Create a new MySQLi connection with port
$conn = new mysqli($host, $username, $password, $database, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>