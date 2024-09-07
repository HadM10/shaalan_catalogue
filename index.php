<?php
include "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/headers.php";
// Start or resume the session
session_start();

// Check if the user is not authenticated (not logged in or session timeout)
if (!isset($_SESSION['user_id']) || (time() - $_SESSION['login_time'] > 3600)) {
    // Destroy the session
    session_destroy();

    // Redirect to the login page
    header("Location: https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Shaalan Catalogue</title>
    <link rel="stylesheet" href="https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/css/admin_style.css">
</head>

<body>

    <!-- Hamburger Menu -->
    <button class="hamburger" id="hamburgerBtn">&#9776;</button>

    <aside class="sidebar" id="sidebar">
        <!-- Logo Section -->
        <div class="logo-container">
            <img src="https://shaalanforhardware-f7728d963cd9.herokuapp.com/assets/images/shaalanlogo.png"
                alt="Admin Panel Logo" class="sidebar-logo">
        </div>

        <h1>Admin Panel</h1>
        <ul>
            <li><a href="#" id="dashboardBtn">Dashboard</a></li>

            <li><a href="#" id="productsLink">Products</a>
                <ul>
                    <li><a href="#" id="viewProductsBtn">View Products</a></li>
                    <li><a href="#" id="addProductsBtn">Add Products</a></li>
                    <li><a href="#" id="archivedProductsBtn">Archived Products</a></li>
                    <li><a href="#" id="newCollectionProductsBtn">New Collection Products</a></li> <!-- New Link -->
                </ul>
            </li>
            <li><a href="#" id="categoriesLink">Categories</a>
                <ul>
                    <li><a href="#" id="viewCategoriesBtn">View Categories</a></li>
                    <li><a href="#" id="addCategoriesBtn">Add Category</a></li>
                </ul>
            </li>

            <li><a href="#" id="usersLink">Users</a>
                <ul>
                    <li><a href="#" id="viewUsersBtn">View Users</a></li>
                    <li><a href="#" id="registerUserBtn">Create Users</a></li>
                </ul>
            </li>

            <li><a href="#" id="logoutBtn">Logout</a></li>
        </ul>
    </aside>

    <div class="content">
        <!-- Dashboard Section -->
        <section id="dashboardSection">
            <div class="dashboard-title">
                <h2>Dashboard</h2>
                <p id="total-users"></p>
            </div>
            <div id="dashboardStats"></div>
        </section>

        <!-- Product List -->
        <ul id="productList"></ul>

        <!-- Add Product Form -->
        <div id="addProductFormContainer">
            <h2>Add Product</h2>
            <form id="addProductForm" action="#" method="post">
                <label for="product_name">Product Name:</label>
                <textarea id="product_name" name="product_name" required></textarea>

                <label for="category_id">Category:</label>
                <select id="category_id" name="category_id" required>
                </select>

                <label for="product_image">Image:</label>
                <input type="file" id="product_image" name="product_image" accept="image/*" required>

                <!-- New Collection Checkbox -->
                <label for="new_collection">Add to New Collection:</label>
                <input type="checkbox" id="new_collection" name="new_collection">

                <button type="submit">Add Product</button>
            </form>
        </div>

        <!-- Archived Products List -->
        <ul id="archivedProductList"></ul>

        <!-- Category List -->
        <ul id="categoryList"></ul>

        <!-- Add Category Form -->
        <div id="addCategoryFormContainer">
            <h2>Add Category</h2>
            <form id="addCategoryForm" action="#" method="post" enctype="multipart/form-data">
                <label for="category_name">Category Name:</label>
                <input type="text" id="category_name" name="category_name" required>

                <button type="submit">Add Category</button>
            </form>
        </div>

        <!-- Users List -->
        <ul id="usersList"></ul>

        <!-- Register User Form -->
        <div id="registerUserFormContainer">
            <h2>Register User</h2>
            <form id="registerUserForm" action="#" method="post">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>

                <button type="submit">Register User</button>
            </form>
        </div>


        <ul id="newCollectionProductList"></ul>

    </div>

    <script src="https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/js/admin_script.js"></script>
</body>

</html>