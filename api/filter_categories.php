<?php
// admin/php/filter_by_category.php
include('db_connection.php');
include('headers.php');

// Check if the category_id parameter exists
if (isset($_GET['category_id'])) {
    $category_id = $_GET['category_id'];

    // Prepare the SQL query to get all products by category_id
    $categoryQuery = "
        SELECT p.product_id, p.product_name, p.category_id, p.image_url, p.archived, p.new_collection, c.category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.category_id
        WHERE p.archived = 0
        AND p.category_id = $category_id
        ORDER BY p.product_name ASC
    ";

    $result = $conn->query($categoryQuery);

    $products = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $products[] = array(
                "product_id" => $row["product_id"],
                "product_name" => $row["product_name"],
                "category_id" => $row["category_id"],
                "category_name" => $row["category_name"],
                "image_url" => $row["image_url"],
                "new_collection" => $row["new_collection"] == 1 ? true : false
            );
        }
    }

    // Return JSON response with search results
    header('Content-Type: application/json');
    echo json_encode($products);
} else {
    echo "No category_id provided.";
}

$conn->close();
?>