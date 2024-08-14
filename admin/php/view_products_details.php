<?php
// Include headers and any necessary initializations
include('headers.php');

// Include database connection
include('db_connection.php');

// Check if product_id is provided
if (isset($_GET['product_id'])) {
    $product_id = $_GET['product_id'];

    // Query to fetch product details based on product_id
    $query = "SELECT product_id, product_name, category_id, image_url FROM products WHERE product_id = ?";

    // Prepare and bind parameters
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $product_id);

    // Execute query
    $stmt->execute();

    // Get result
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Fetch product details as an associative array
        $productDetails = $result->fetch_assoc();

        // Close the prepared statement
        $stmt->close();

        // Close the database connection
        $conn->close();

        // Output JSON response
        header('Content-Type: application/json');
        echo json_encode($productDetails);
    } else {
        // Product not found
        echo json_encode(array('status' => 'error', 'message' => 'Product not found'));
    }
} else {
    // product_id parameter not provided
    echo json_encode(array('status' => 'error', 'message' => 'Product ID not provided'));
}
?>