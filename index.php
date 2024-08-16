<?php
include "admin/php/headers.php";
// Start or resume the session
session_start();

// Check if the user is not authenticated (not logged in or session timeout)
if (!isset($_SESSION['user_id']) || (time() - $_SESSION['login_time'] > 1800)) {
    // Destroy the session
    session_destroy();

    // Redirect to the login page
    header("Location: admin/php/login.php");
    exit();
}

?>

<!-- Your HTML -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Shaalan Catalogue</title>
    <link rel="stylesheet" href="admin/css/admin_style.css">
</head>

<body>

    <!-- Hamburger Menu -->
    <button class="hamburger" id="hamburgerBtn">&#9776;</button>

    <aside class="sidebar" id="sidebar">
        <!-- Logo Section -->
        <div class="logo-container">
            <img src="assets/images/Shaalanlogo.png" alt="Admin Panel Logo" class="sidebar-logo">
        </div>

        <h1>Admin Panel</h1>
        <ul>

            <li><a href="#" id="dashboardBtn">Dashboard</a></li>

            <li><a href="#" id="productsLink">Products</a>
                <ul>
                    <li><a href="#" id="viewProductsBtn">View Products</a></li>
                    <li><a href="#" id="addProductsBtn">Add Products</a></li>
                    <li><a href="#" id="archivedProductsBtn">Archived Products</a></li>
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
                <p id='total-users'>
                </p>
            </div>
            <div id="dashboardStats"></div>
        </section>

        <!-- Add an empty list with id "productList" where the products will be displayed -->
        <ul id="productList"></ul>

        <!-- Add Product Form -->
        <div id="addProductFormContainer">
            <h2>Add Product</h2>
            <form id="addProductForm" action="#" method="post">
                <label for="product_name">Product Name:</label>
                <input type="text" id="product_name" name="product_name" required>

                <label for="category_id">Category:</label>
                <select id="category_id" name="category_id" required>
                </select>

                <label for="product_image">Image:</label>
                <input type="file" id="product_image" name="product_image" accept="image/*" required>

                <button type="submit">Add Product</button>
            </form>
        </div>

        <ul id="archivedProductList"></ul>

        <!-- Add an empty list with id "categoryList" where the categories will be displayed -->
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


        <!-- Add an empty list with id "usersList" where the users will be displayed -->
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


    </div>

    <!-- Your admin panel content goes here -->

    <script src="admin/js/admin_script.js"></script>
</body>

</html>