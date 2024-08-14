<?php
include('headers.php');

// Include the database connection script
include('db_connection.php');

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $productId = $_POST["product_id"];

    // Delete product from the 'products' table
    $deleteQuery = "DELETE FROM products WHERE product_id = ?";
    if ($stmt = $conn->prepare($deleteQuery)) {
        $stmt->bind_param("i", $productId);
        
        if ($stmt->execute()) {
            // Also delete associated images
            $deleteImagesQuery = "DELETE FROM product_images WHERE product_id = ?";
            if ($stmtImages = $conn->prepare($deleteImagesQuery)) {
                $stmtImages->bind_param("i", $productId);
                $stmtImages->execute();
                $stmtImages->close();
            }

            $response = array("status" => "success", "message" => "Product and associated images deleted successfully");
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

// Close the database connection
$conn->close();
?>