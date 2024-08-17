<?php
include('headers.php');

// Include the database connection script
include('db_connection.php');

// Include Composer's autoloader
require_once __DIR__ . '../../../vendor/autoload.php';

// Load the .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '../../../');
$dotenv->load();

use MicrosoftAzure\Storage\Blob\BlobRestProxy;
use MicrosoftAzure\Storage\Common\Exceptions\ServiceException;
use MicrosoftAzure\Storage\Blob\Models\CreateBlockBlobOptions;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the required fields are set
    if (isset($_POST['product_name'], $_POST['category_id'], $_POST['new_collection']) && isset($_FILES['product_image'])) {
        $productName = $_POST['product_name'];
        $categoryId = $_POST['category_id'];
        $productImage = $_FILES['product_image']['name'];
        $productImageTmpPath = $_FILES['product_image']['tmp_name'];
        $isNewCollection = isset($_POST['new_collection']) ? (int) $_POST['new_collection'] : 0;

        // Debug: Log values to verify
        error_log('Product Name: ' . $productName);
        error_log('Category ID: ' . $categoryId);
        error_log('Is New Collection: ' . $isNewCollection);

        // Retrieve the Azure Storage account connection string from environment variables
        $connectionString = $_ENV['AZURE_STORAGE_CONNECTION_STRING'];

        if (!$connectionString) {
            echo json_encode(["status" => "error", "message" => "Azure Storage connection string is not set."]);
            exit;
        }

        // Create blob client
        $blobClient = BlobRestProxy::createBlobService($connectionString);

        // Set the container name
        $containerName = "images"; // Make sure this container exists in your Azure storage

        // Set the blob name
        $blobName = "products/" . basename($productImage);

        // Upload file as a block blob
        try {
            $content = fopen($productImageTmpPath, "r");
            $options = new CreateBlockBlobOptions();
            $options->setContentType($_FILES['product_image']['type']);

            $blobClient->createBlockBlob($containerName, $blobName, $content, $options);

            // Construct the URL for the uploaded image
            $imageUrl = "https://shaalancatalogue.blob.core.windows.net/$containerName/$blobName";

            // Insert the new product into the database
            $insertQuery = "INSERT INTO products (product_name, category_id, image_url, new_collection) VALUES (?, ?, ?, ?)";
            if ($stmt = $conn->prepare($insertQuery)) {
                // Use the 'i' type for integer values
                $stmt->bind_param("sisi", $productName, $categoryId, $imageUrl, $isNewCollection);

                if ($stmt->execute()) {
                    echo json_encode(["status" => "success", "message" => "Product added successfully"]);
                } else {
                    echo json_encode(["status" => "error", "message" => $stmt->error]);
                }

                $stmt->close();
            } else {
                echo json_encode(["status" => "error", "message" => $conn->error]);
            }
        } catch (ServiceException $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

// Close the database connection
$conn->close();
?>