<?php
include('headers.php');
include('db_connection.php');

// Define SQL query to fetch products with category names
$selectQuery = "SELECT p.product_id, p.product_name, p.category_id, p.image_url, p.archived, c.category_name
                FROM products p
                JOIN categories c ON p.category_id = c.category_id";

// Prepare the SQL statement
if ($stmt = $conn->prepare($selectQuery)) {
    // Execute the prepared statement
    if ($stmt->execute()) {
        // Bind result variables
        $stmt->bind_result($product_id, $product_name, $category_id, $image_url, $archived, $category_name);

        // Fetch results and populate the response array
        $products = array();
        while ($stmt->fetch()) {
            $products[] = array(
                "product_id" => $product_id,
                "product_name" => $product_name,
                "category_id" => $category_id,
                "category_name" => $category_name, // Include category name
                "image_url" => $image_url,
                "archived" => $archived
            );
        }
    }
}

$conn->close();

// Output JSON response
header('Content-Type: application/json');
echo json_encode($products);
?>