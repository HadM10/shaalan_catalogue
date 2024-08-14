<?php
include('headers.php');
// Include your database connection file
include_once "db_connection.php";

// Check if the product_id parameter is set
if (isset($_POST['product_id'])) {
    $productId = $_POST['product_id'];

    // Update the product's archived status to 0 (not archived)
    $updateQuery = "UPDATE products SET archived = 0 WHERE product_id = ?";

    // Prepare and execute the query
    $stmt = $conn->prepare($updateQuery);
    $stmt->bind_param("i", $productId);

    if ($stmt->execute()) {
        // Product restored successfully
        echo json_encode(["status" => "success", "message" => "Product restored successfully"]);
    } else {
        // Error restoring product
        echo json_encode(["status" => "error", "message" => "Error restoring product"]);
    }

    $stmt->close();
} else {
    // Error: product_id parameter not provided
    echo json_encode(["status" => "error", "message" => "product_id parameter not provided"]);
}

// Close the database connection
$conn->close();
?>