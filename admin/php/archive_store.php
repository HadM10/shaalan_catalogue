<?php
include('headers.php');

// admin/php/archive_product.php
include('db_connection.php');

// Check if the product_id parameter is provided
if (isset($_POST['product_id'])) {
    $productId = $_POST['product_id'];

    // Update the product's archived status in the database
    $updateQuery = "UPDATE products SET archived = 1 WHERE product_id = ?";

    // Prepare and execute the query
    $stmt = $conn->prepare($updateQuery);
    $stmt->bind_param("i", $productId);
    if ($stmt->execute()) {
        $response = array("status" => "success", "message" => "Product archived successfully");
    } else {
        $response = array("status" => "error", "message" => "Failed to archive product");
    }

    // Close the prepared statement
    $stmt->close();
} else {
    // Error: product_id parameter not provided
    $response = array("status" => "error", "message" => "product_id parameter not provided");
}

// Close the database connection
$conn->close();

// Return the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>