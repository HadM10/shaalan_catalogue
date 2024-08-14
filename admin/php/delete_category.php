<?php
include('headers.php');

// Include the database connection script
include('db_connection.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if category_id is set in the POST request
    if (isset($_POST['category_id'])) {
        $categoryId = $_POST['category_id'];

        // Prepare and execute the delete query
        $deleteQuery = "DELETE FROM categories WHERE category_id = ?";
        if ($stmt = $conn->prepare($deleteQuery)) {
            $stmt->bind_param("i", $categoryId);

            if ($stmt->execute()) {
                echo json_encode(["message" => "Category deleted successfully"]);
            } else {
                echo json_encode(["error" => "Delete failed: " . $stmt->error]);
            }

            $stmt->close();
        } else {
            echo json_encode(["error" => "Prepare failed: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Missing category_id"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

// Close the database connection
$conn->close();
?>