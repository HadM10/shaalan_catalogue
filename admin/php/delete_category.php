<?php
include('headers.php');

// Include the database connection script
include('db_connection.php');

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["category_id"])) {
        // Retrieve form data
        $categoryId = $_POST["category_id"];

        // Delete category from the 'categories' table
        $deleteQuery = "DELETE FROM categories WHERE category_id = ?";
        if ($stmt = $conn->prepare($deleteQuery)) {
            $stmt->bind_param("i", $categoryId);

            if ($stmt->execute()) {
                $response = array("status" => "success", "message" => "Category deleted successfully");
            } else {
                $response = array("status" => "error", "message" => "Error deleting category: " . $stmt->error);
            }

            $stmt->close();
        } else {
            $response = array("status" => "error", "message" => "Failed to prepare the delete statement: " . $conn->error);
        }

        header('Content-Type: application/json'); // Set JSON header
        echo json_encode($response);
        exit();
    } else {
        $response = array("status" => "error", "message" => "Missing category_id");
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }
}

// Close the database connection
$conn->close();
?>