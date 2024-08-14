<?php
include('headers.php');
include('db_connection.php');

// Check if the user_id parameter is set
if (isset($_POST['user_id'])) {
    $userId = $_POST['user_id'];

    // Update the user's status to 'blocked'
    $updateQuery = "UPDATE users SET status = 'blocked' WHERE user_id = ?";

    // Prepare and execute the query
    $stmt = $conn->prepare($updateQuery);
    $stmt->bind_param("i", $userId);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "User blocked successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "user_id parameter not provided"]);
}

// Close the database connection
$conn->close();
?>