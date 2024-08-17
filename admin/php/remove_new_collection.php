<?php
include('headers.php');
include('db_connection.php');

// Check if the product_id parameter is set
if (isset($_POST['product_id'])) {
    $productId = $_POST['product_id'];

    // Update the product to remove it from the New Collection
    $updateQuery = "UPDATE products SET new_collection = 0 WHERE product_id = ?";

    // Prepare and execute the query
    $stmt = $conn->prepare($updateQuery);
    $stmt->bind_param("i", $productId);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Product removed from New Collection successfully"]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" =>
                $stmt->error
        ]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "product_id parameter not provided"]);
}

// Close the database connection
$conn->close();
?>