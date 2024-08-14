<?php
include('headers.php');

// Include the database connection script
include('db_connection.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if required POST parameters are set
    if (isset($_POST['category_id']) && isset($_POST['new_category_name'])) {
        $categoryId = $_POST['category_id'];
        $newCategoryName = $_POST['new_category_name'];

        // Prepare and execute the update query
        $updateQuery = "UPDATE categories SET category_name = ? WHERE category_id = ?";
        if ($stmt = $conn->prepare($updateQuery)) {
            $stmt->bind_param("si", $newCategoryName, $categoryId);

            if ($stmt->execute()) {
                echo json_encode(["message" => "Category updated successfully"]);
            } else {
                echo json_encode(["error" => "Update failed: " . $stmt->error]);
            }

            $stmt->close();
        } else {
            echo json_encode(["error" => "Prepare failed: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Missing category_id or new_category_name"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

// Close the database connection
$conn->close();
?>