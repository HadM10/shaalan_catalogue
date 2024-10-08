<?php
// admin/php/search_products.php
include('db_connection.php');
include('headers.php');

// Check if the search query parameter exists
if (isset($_GET['query'])) {
    $query = $_GET['query'];

    // Prepare the SQL query to search for products by name or category name
    $searchQuery = "
        SELECT p.product_id, p.product_name, p.category_id, p.image_url, p.archived, p.new_collection, c.category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.category_id
        WHERE p.archived = 0
        AND (
            p.product_name LIKE '%$query%' 
            OR c.category_name LIKE '%$query%' 
        )
        ORDER BY p.product_name ASC
    ";

    $result = $conn->query($searchQuery);

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
    echo "No search query provided.";
}

$conn->close();
?>