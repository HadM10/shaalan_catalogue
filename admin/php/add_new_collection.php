<?php
include('headers.php');
include('db_connection.php');

// Check if the product_id parameter is set
if (isset($_POST['product_id'])) {
    $productId = $_POST['product_id'];

    // Update the product to mark it as part of the New Collection
    $updateQuery = "UPDATE products SET new_collection = 1 WHERE product_id = ?";

    // Prepare and execute the query
    $stmt = $conn->prepare($updateQuery);
    $stmt->bind_param("i", $productId);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Product added to New Collection successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "product_id parameter not provided"]);
}

// Close the database connection
$conn->close();
?>