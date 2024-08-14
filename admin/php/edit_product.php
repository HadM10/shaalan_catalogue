<?php
include('headers.php');

// Include the database connection script
include('db_connection.php');

// Azure Blob Storage dependencies
require __DIR__ . '/../../vendor/autoload.php';

use MicrosoftAzure\Storage\Blob\BlobRestProxy;
use MicrosoftAzure\Storage\Common\Exceptions\ServiceException;
use MicrosoftAzure\Storage\Blob\Models\CreateBlockBlobOptions;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $productId = $_POST["product_id"];
    $newProductName = $_POST["new_product_name"];
    $newCategoryId = $_POST["new_category_id"];
    
    // Retrieve the Azure Storage account connection string from environment variables
    $connectionString = getenv('AZURE_STORAGE_CONNECTION_STRING');

    // Default image URL if no new image is provided
    $newImageUrl = null;

    // Check if a new image file is uploaded
    if (isset($_FILES['product_image']) && $_FILES['product_image']['error'] === UPLOAD_ERR_OK) {
        $productImage = $_FILES['product_image']['name'];
        $productImageTmpPath = $_FILES['product_image']['tmp_name'];

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
            $newImageUrl = "https://shaalancatalogue.blob.core.windows.net/$containerName/$blobName";
        } catch (ServiceException $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
            exit();
        }
    } else {
        // Retrieve current image URL if no new image is uploaded
        $currentImageQuery = "SELECT image_url FROM products WHERE product_id = ?";
        if ($stmt = $conn->prepare($currentImageQuery)) {
            $stmt->bind_param("i", $productId);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($row = $result->fetch_assoc()) {
                $newImageUrl = $row['image_url'];
            }
            $stmt->close();
        }
    }

    // Update product information in the 'products' table
    $updateQuery = "UPDATE products 
                    SET product_name = ?, 
                        category_id = ?, 
                        image_url = ? 
                    WHERE product_id = ?";

    // Prepare the update query
    $stmt = $conn->prepare($updateQuery);

    // Bind parameters
    $stmt->bind_param("sisi", $newProductName, $newCategoryId, $newImageUrl, $productId);

    // Execute the update query
    if ($stmt->execute()) {
        $response = array("status" => "success", "message" => "Product updated successfully");
    } else {
        $response = array("status" => "error", "message" => "Error updating product: " . $stmt->error);
    }

    // Close the prepared statement
    $stmt->close();

    // Close the database connection
    $conn->close();

    // Return the response as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}
?>