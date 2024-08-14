<?php
include('headers.php');

// Include the database connection script
include('db_connection.php');

// Handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST["category_name"])) {
        $categoryName = $_POST['category_name'];

        // Insert the new category into the database
        $insertQuery = "INSERT INTO categories (category_name) VALUES (?)";
        if ($stmt = $conn->prepare($insertQuery)) {
            $stmt->bind_param("s", $categoryName);
            if ($stmt->execute()) {
                // Retrieve the newly inserted category ID
                $categoryId = $stmt->insert_id;
                echo json_encode([
                    "status" => "success",
                    "message" => "Category added successfully",
                    "category_id" => $categoryId
                ]);
            } else {
                echo json_encode([
                    "status" => "error",
                    "message" => $stmt->error
                ]);
            }
        } else {
            echo json_encode([
                "status" => "error",
                "message" => $conn->error
            ]);
        }
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Missing category_name"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method"
    ]);
}

// Close the database connection
$conn->close();
?>