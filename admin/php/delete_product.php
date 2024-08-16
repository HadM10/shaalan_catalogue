<?php
include('headers.php');

// Include the database connection script
include('db_connection.php');

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["product_id"])) {
        // Retrieve form data
        $productId = $_POST["product_id"];

        // Delete product from the 'products' table
        $deleteQuery = "DELETE FROM products WHERE product_id = ?";
        if ($stmt = $conn->prepare($deleteQuery)) {
            $stmt->bind_param("i", $productId);

            if ($stmt->execute()) {
                $response = array("status" => "success", "message" => "Product deleted successfully");
            } else {
                $response = array("status" => "error", "message" => "Error deleting product: " . $stmt->error);
            }

            $stmt->close();
        } else {
            $response = array("status" => "error", "message" => "Failed to prepare the delete statement: " . $conn->error);
        }

        header('Content-Type: application/json'); // Set JSON header
        echo json_encode($response);
        exit();
    }
}

// Close the database connection
$conn->close();
?>