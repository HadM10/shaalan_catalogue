//SHOW HIDE SECTIONS

// CONTENT SECTIONS
const productList = document.getElementById("productList");
const categoryList = document.getElementById("categoryList");
const adminWelcome = document.getElementById("admin-welcome");
const addProduct = document.getElementById("addProductFormContainer");
const addCategory = document.getElementById("addCategoryFormContainer");
const usersList = document.getElementById("usersList");
const dashboardSection = document.getElementById("dashboardSection");
const dashboardStats = document.getElementById("dashboardStats");
const archivedProductsList = document.getElementById("archivedProductList");

// CONTENT NAV-LINKS
const viewProductsBtn = document.getElementById("viewProductsBtn");
const viewCategoriesBtn = document.getElementById("viewCategoriesBtn");
const addProductsBtn = document.getElementById("addProductsBtn");
const addCategoriesBtn = document.getElementById("addCategoriesBtn");
const viewUsersBtn = document.getElementById("viewUsersBtn");
const dashboardBtn = document.getElementById("dashboardBtn");
const archivedProductsBtn = document.getElementById("archivedProductsBtn");

function hideAllSections() {
  productList.style.display = "none";
  categoryList.style.display = "none";
  adminWelcome.style.display = "none";
  addProduct.style.display = "none";
  addCategory.style.display = "none";
  usersList.style.display = "none";
  dashboardSection.style.display = "none";
  archivedProductsList.style.display = "none";
}

// LOGIN
if (window.location.pathname.includes("login.php")) {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Gather form data
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;

      // Debugging: Check if the username and password are being captured correctly
      console.log("Username:", username, "Password:", password);

      // Create XMLHttpRequest object
      var xhr = new XMLHttpRequest();

      // Configure the request
      xhr.open("POST", "/shaalan_catalogue/admin/php/login_admin.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      // Define the callback function
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          // Check if the request is complete
          try {
            console.log(xhr.responseText); // Debugging: Output the raw response

            var response = JSON.parse(xhr.responseText); // Parse the JSON response

            if (response.status === "success") {
              // Redirect to the admin panel on successful login
              window.location.href = "../../index.php";
            } else {
              // Show error message if login failed
              alert(response.message);
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      };

      // Send the request with form data
      xhr.send(
        "username=" +
          encodeURIComponent(username) +
          "&password=" +
          encodeURIComponent(password)
      );
    });
}

// LOGOUT

if (window.location.pathname.includes("index.php")) {
  // Hamburger menu

  document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const sidebar = document.getElementById("sidebar");

    hamburgerBtn.addEventListener("click", function () {
      sidebar.classList.toggle("open");
      hamburgerBtn.classList.toggle("open");
    });
  });

  // Add event listener to the logout button
  document.getElementById("logoutBtn").addEventListener("click", function () {
    // Create XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open("GET", "/shaalan_catalogue/admin/php/logout.php", true);

    // Define the callback function
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        try {
          console.log(xhr.responseText);
          var response = JSON.parse(xhr.responseText);

          if (response.success) {
            // Logout successful
            window.location.href = "/shaalan_catalogue/admin/php/login.php";
          } else {
            console.error("Logout failed:", response.error);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    // Send the request
    xhr.send();
  });

  // ARCHIVE PRODUCTS

  function archiveProduct(productId) {
    // Confirm if the user wants to archive the product
    var confirmArchive = confirm(
      "Are you sure you want to archive this product?"
    );

    if (confirmArchive) {
      // Make an AJAX request to update the product's archived status
      var xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "/shaalan_catalogue/admin/php/archive_product.php",
        true
      );
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Check if the archive operation was successful
          var response = JSON.parse(xhr.responseText);
          if (response.status === "success") {
            // Refresh the product list to reflect changes
            fetchAndDisplayProducts();
          } else {
            alert("Failed to archive product: " + response.message);
          }
        }
      };
      // Send the product ID in the request body
      xhr.send("product_id=" + productId);
    }
  }

  // VIEW ARCHIVED PRODUCTS

  // Function to fetch and display archived products using AJAX
  function fetchAndDisplayArchivedProducts() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          var productsData = JSON.parse(xhr.responseText);
          // Filter archived products
          var archivedProducts = productsData.filter(
            (product) => product.archived
          );
          displayArchivedproducts(archivedproducts);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    xhr.open("GET", "/shaalan_catalogue/admin/php/view_products.php", true);
    xhr.send();
  }

  // Function to display archived products
  function displayArchivedproducts(archivedproducts) {
    var archivedproductsList = document.getElementById("archivedproductList");

    // Clear existing content
    archivedproductsList.innerHTML = "";

    archivedproducts.forEach(function (product) {
      // Create a list item for each archived product
      var listItem = document.createElement("li");
      listItem.setAttribute("data-product-id", product.product_id); // Set a unique identifier

      listItem.innerHTML = `
      <div class="product-container">
          <img src="${product.images[0]}" alt="product Image" class="product-image">
          <h2 class="product-name">${product.product_name}</h2>
          <p class="product-description">${product.description}</p>
          <div class="product-actions">
              <button class="reproduct-btn" onclick="reproductproduct(${product.product_id})">Restore</button>
          </div>
      </div>
    `;

      // Append the list item to the archived products list
      archivedProductsList.appendChild(listItem);
    });
  }

  // Call the fetchAndDisplayArchivedProducts function when the archivedProductsBtn is clicked
  archivedProductsBtn.addEventListener("click", function () {
    hideAllSections(); // Hide other sections
    fetchAndDisplayArchivedProducts(); // Fetch and display archived products
    archivedProductsList.style.display = "flex"; // Display the archived products section
  });

  function restoreProduct(productId) {
    // Send an AJAX request to your server to restore the product
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // product restored successfully, you can update the UI or take further actions if needed
          alert("Product restored successfully!");
          // Refresh the archived products list
          fetchAndDisplayArchivedProducts();
        } else {
          // Error handling if the request fails
          alert("Error restoring product: " + xhr.statusText);
        }
      }
    };
    xhr.open("POST", "/shaalan_catalogue/admin/php/restore_product.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("product_id=" + productId);
  }

  // EDIT AND DELETE PRODUCTS

  // Function to delete product
  function deleteProduct(productId) {
    // Make an AJAX request to delete the product
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/shaalan_catalogue/admin/php/delete_product.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        try {
          var response = JSON.parse(xhr.responseText);
          if (response.status === "success") {
            alert(response.message);
            // Optionally, you may refresh the product list or update the UI
            fetchAndDisplayProducts();
          } else {
            alert(response.message);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    // Send the request with product ID
    xhr.send("product_id=" + productId);
  }

  // Function to confirm delete
  function confirmDelete(productId) {
    var confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      // Call a function to delete the product from the database
      deleteProduct(productId);
    }
  }

  // Function to edit product
  function editProduct(productId) {
    // Fetch product details using AJAX and create a dynamic form for editing
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "/shaalan_catalogue/admin/php/view_products.php?product_id=" + productId,
      true
    );
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          var productDetails = JSON.parse(xhr.responseText);

          // Fetch categories for the dropdown
          fetchCategories(productId);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };
    xhr.send();
  }

  // Function to fetch categories and then call createEditForm
  function fetchCategories(productId) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/shaalan_catalogue/admin/php/view_categories.php", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          var categories = JSON.parse(xhr.responseText);

          // Create a dynamic form with fields filled with product details
          createEditForm(productId, categories);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };
    xhr.send();
  }

  // Function to save changes
  function saveChanges(productId, updatedData) {
    // Create a FormData object and append the data
    var formData = new FormData();
    formData.append("product_id", productId);

    // Update these lines to match your PHP script expectations
    formData.append("new_product_name", updatedData.name);
    formData.append("new_category", updatedData.category);
    formData.append("new_description", updatedData.description);
    formData.append("new_phone_number", updatedData.phone);
    formData.append("new_instagram_url", updatedData.instagram_url);
    formData.append("new_facebook_url", updatedData.facebook_url);
    formData.append("new_tiktok_url", updatedData.tiktok_url);
    formData.append("new_whatsapp_number", updatedData.whatsapp_number);
    formData.append("new_location", updatedData.location);

    // Make an AJAX request to save the changes
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/shaalan_catalogue/admin/php/edit_product.php", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.responseText);
        try {
          var response = JSON.parse(xhr.responseText);
          if (response.status === "success") {
            alert(response.message);
            // Optionally, you may refresh the product list or update the UI
            fetchAndDisplayProducts();
          } else {
            alert(response.message);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    // Send the request with FormData
    xhr.send(formData);
  }

  // Function to create an edit form dynamically
  function createEditForm(productId, categories) {
    // Fetch product details using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "/shaalan_catalogue/admin/php/view_product_details.php?product_id=" +
        productId,
      true
    );
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          var productDetails = JSON.parse(xhr.responseText);
          console.log(productDetails);

          // Create the form container and populate it with product details
          var formContainer = document.createElement("div");
          formContainer.innerHTML = `
            <form id="editProductForm">
                <label for="editProductName">Product Name:</label>
                <input type="text" id="editProductName" value="${
                  productDetails.product_name
                }" required>

                <label for="editProductCategory">Category:</label>
                <select id="editProductCategory" required>
                    ${categories
                      .map(
                        (category) =>
                          `<option value="${category.category_id}">${category.category_name}</option>`
                      )
                      .join("")}
                </select>


                <button type="button" onclick="saveChanges(${productId}, getUpdatedData())">Save Changes</button>
            </form>
        `;

          // Set the selected category in the dropdown
          var editProductCategorySelect = formContainer.querySelector(
            "#editProductCategory"
          );
          editProductCategorySelect.value = productDetails.category_id;

          // Replace the existing product container with the edit form
          var existingProductContainer = document
            .getElementById("productList")
            .querySelector(`[data-product-id="${productId}"]`);
          existingProductContainer.innerHTML = "";
          existingProductContainer.appendChild(formContainer);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };
    xhr.send();
  }

  // Function to get updated data from the edit form
  function getUpdatedData() {
    var updatedData = {
      name: document.getElementById("editProductName").value,
      category: document.getElementById("editProductCategory").value,
      image: document.getElementById("editProductDescription").value,

      // Add more fields as needed
    };

    return updatedData;
  }
  function displayProducts(products) {
    var productList = document.getElementById("productList");

    // Clear existing content
    productList.innerHTML = "";

    // Filter out archived products
    var activeProducts = products.filter((product) => !product.archived);

    activeProducts.forEach(function (product) {
      // Create a list item for each product
      var listItem = document.createElement("li");
      listItem.setAttribute("data-product-id", product.product_id); // Set a unique identifier

      // Check if the product has images and display the first one
      var productImage = product.image_url || "default-image.jpg"; // Use a default image if no image URL is available

      listItem.innerHTML = `
        <div class="product-container">
          <div class="product-image">
            <img src="${productImage}" alt="Product Image">
          </div>
          <h2 class="product-name"><strong>Name: </strong>${product.product_name}</h2>
          <p class="product-category"><strong>Category: </strong>${product.category_name}</p>
          <div class="product-actions">
            <button class="edit-btn" onclick="editProduct(${product.product_id})">Edit</button>
            <button class="delete-btn" onclick="confirmDelete(${product.product_id})">Delete</button>
            <button class="archive-btn" onclick="archiveProduct(${product.product_id})">Archive</button>
          </div>
        </div>
      `;

      // Append the list item to the product list
      productList.appendChild(listItem);
    });
  }

  // VIEW PRODUCTS

  // Function to fetch and display products using AJAX
  function fetchAndDisplayProducts() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          var products = JSON.parse(xhr.responseText);
          displayProducts(products);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    xhr.open("GET", "/shaalan_catalogue/admin/php/view_products.php", true);
    xhr.send();
  }

  viewProductsBtn.addEventListener("click", function () {
    // Fetch and display products when the button is clicked
    hideAllSections();
    fetchAndDisplayProducts();
    productList.style.display = "flex";
  });

  // ADD PRODUCT

  // Add product Form Submission

  document
    .getElementById("addProductForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Gather form data
      var productName = document.getElementById("product_name").value;
      var category = document.getElementById("category_id").value;
      var productImage = document.getElementById("product_image").files[0];

      if (!productImage) {
        alert("Please select an image.");
        return;
      }

      // Create FormData object to handle file upload
      var formData = new FormData();
      formData.append("product_name", productName);
      formData.append("category_id", category);
      formData.append("product_image", productImage);

      // Create XMLHttpRequest object (or use fetch API)
      var xhr = new XMLHttpRequest();

      // Configure the request
      xhr.open("POST", "/shaalan_catalogue/admin/php/add_product.php", true);

      // Define the callback function
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log(xhr.responseText);
          try {
            var response = JSON.parse(xhr.responseText);
            if (response.status === "success") {
              alert(response.message);
              addProduct.style.display = "none";
              productList.style.display = "flex";
              fetchAndDisplayProducts();
            } else {
              alert(response.message);
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      };

      // Send the request with FormData object
      xhr.send(formData);
    });

  // Event listener for button click
  addProductsBtn.addEventListener("click", function () {
    // Fetch and display products when the page loads
    hideAllSections();

    // Fetch Categories
    fetch("/shaalan_catalogue/admin/php/view_categories.php")
      .then((response) => response.json())
      .then((categories) => {
        // Populate the select dropdown with categories
        const categoryDropdown = document.getElementById("category_id");
        categories.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.category_id;
          option.textContent = category.category_name;
          categoryDropdown.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));

    addProduct.style.display = "block";
  });

  // CATEGORIES

  // VIEW CATEGORIES

  // Function to fetch and display categories using AJAX
  function fetchAndDisplayCategories() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          var categoriesData = JSON.parse(xhr.responseText);
          displayCategories(categoriesData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    xhr.open("GET", "/shaalan_catalogue/admin/php/view_categories.php", true);
    xhr.send();
  }

  // Function to display categories
  function displayCategories(categoriesData) {
    var categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = ""; // Clear the previous content

    categoriesData.forEach(function (category) {
      var categoryItem = document.createElement("li");
      categoryItem.setAttribute("data-category-id", category.category_id);
      categoryItem.classList.add("category-item"); // Add class for styling
      categoryItem.innerHTML = ` 
          <img src="${category.category_image}" alt="${category.category_name} Image" class="category-image">
          <span><Strong> Category Name: </Strong> ${category.category_name}</span>
          <button class="edit-button" onclick="editCategory(${category.category_id})">Edit</button>
          <button class="edit-button" onclick="deleteCategory(${category.category_id})">Delete</button>
      `;
      categoryList.appendChild(categoryItem);
    });
  }

  viewCategoriesBtn.addEventListener("click", function () {
    // Fetch and display categories
    hideAllSections();
    fetchAndDisplayCategories();
    categoryList.style.display = "flex";
  });

  // Function to delete a category
  function deleteCategory(categoryId) {
    var confirmation = confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmation) {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "/shaalan_catalogue/admin/php/delete_category.php",
        true
      );
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log(xhr.responseText);
          try {
            var response = JSON.parse(xhr.responseText);
            if (response.status === "success") {
              alert(response.message);
              fetchAndDisplayCategories();
            } else {
              alert(response.message);
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      };

      // Send the request to delete the category
      xhr.send("category_id=" + categoryId);
    }
  }

  // Function to fetch category details and create/edit category form dynamically
  function editCategory(categoryId) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "/shaalan_catalogue/admin/php/view_categories_details.php?category_id=" +
        categoryId,
      true
    );
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          var categoryDetails = JSON.parse(xhr.responseText);

          if (categoryDetails) {
            // Create the form container and populate it with category details
            var formContainer = document.createElement("div");
            formContainer.innerHTML = `
              <form id="editCategoryForm">
                  <h2>Edit Category</h2>
                  <label for="editCategoryName">Category Name:</label>
                  <input type="text" id="editCategoryName" value="${categoryDetails.category_name}" required>
                  <button type="button" onclick="saveCategoryChanges(${categoryId}, getUpdatedCategoryData())">Save Changes</button>
              </form>
          `;

            // Replace the existing category container with the edit form
            var existingCategoryContainer = document
              .getElementById("categoryList")
              .querySelector(`[data-category-id="${categoryId}"]`);
            existingCategoryContainer.innerHTML = "";
            existingCategoryContainer.appendChild(formContainer);
          } else {
            console.error(
              "Category details not found for category ID:",
              categoryId
            );
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };
    xhr.send();
  }

  // Function to save category changes
  function saveCategoryChanges(categoryId, updatedData) {
    // Create a FormData object and append the data
    var formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("new_category_name", updatedData.category_name);

    // Make an AJAX request to save the changes
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/shaalan_catalogue/admin/php/edit_category.php", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        try {
          var response = JSON.parse(xhr.responseText);
          if (response.message) {
            alert(response.message);
            // Optionally, you may refresh the category list or update the UI
            fetchAndDisplayCategories();
          } else {
            alert(response.error);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    // Send the request with FormData
    xhr.send(formData);
  }

  // Function to get updated category data from the edit form
  function getUpdatedCategoryData() {
    var updatedData = {
      category_name: document.getElementById("editCategoryName").value,
      // Add more fields as needed
    };

    return updatedData;
  }

  // Add Category Form Submission
  document
    .getElementById("addCategoryForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Create FormData object to handle form data
      const formData = new FormData(this);

      // Make an AJAX request to send the form data to your PHP script
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/shaalan_catalogue/admin/php/add_category.php", true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log(xhr.responseText);
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.status === "success") {
              alert("Category added successfully.");
              // Hide Add Category section
              addCategory.style.display = "none";
              // Show View Categories section
              categoryList.style.display = "flex";
              // Fetch and display categories
              fetchAndDisplayCategories();
            } else {
              alert("Error: " + response.error);
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      };
      xhr.send(formData);
    });

  // Event listener for button click
  addCategoriesBtn.addEventListener("click", function () {
    // Fetch and display categories when the page loads
    hideAllSections();
    fetchAndDisplayCategories();
    addCategory.style.display = "block";
  });

  // DISPLAY USERS

  // Function to fetch and display users using AJAX
  function fetchAndDisplayUsers() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/shaalan_catalogue/admin/php/view_all_users.php", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          var usersData = JSON.parse(xhr.responseText);
          displayUsers(usersData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };
    xhr.send();
  }

  // Function to display users on the webpage
  function displayUsers(usersData) {
    usersList.innerHTML = ""; // Clear previous content

    usersData.forEach(function (user) {
      var userCard = document.createElement("div");
      userCard.classList.add("user-card");

      userCard.innerHTML = `
    <div class="user-info">
      <h3>User ID: <span class="highlight">${user.user_id}</span></h3>
      <p><span class="label">Username:</span> <span class="value">${
        user.username || "N/A"
      }</span></p>
      <p><span class="label">Email:</span> <span class="value">${
        user.email
      }</span></p>
      <p><span class="label">Google Id:</span> <span class="value">${
        user.google_id || "N/A"
      }</span></p>
      <p><span class="label">Created At:</span> <span class="value">${
        user.created_at
      }</span></p>
  </div>
  
    `;

      usersList.appendChild(userCard);
    });
  }

  // Call the fetchAndDisplayUsers
  viewUsersBtn.addEventListener("click", function () {
    // Fetch and display users
    hideAllSections();
    fetchAndDisplayUsers();
    usersList.style.display = "flex"; // Assuming you have an element with ID "uploadImagesForm"
  });

  // DASHBOARD

  // Function to fetch dashboard statistics from the server
  function fetchDashboardStats() {
    fetch("/shaalan_catalogue/admin/php/dashboard.php")
      .then((response) => response.json())
      .then((data) => {
        // Display the dashboard statistics on the page
        const dashboardStats = document.getElementById("dashboardStats");
        const totalAdmins = document.getElementById("total-admins");
        totalAdmins.innerHTML = ` 
          <p ><Strong>Total Admins:</Strong> ${data.total_admins}</p>
          `;
        dashboardStats.innerHTML = ` 
          <div class="dashboard-stat">
              <div class="stat-icon">
                  <i class="fas fa-users"></i>
              </div>
              <div class="stat-info">
                  <p class="stat-label">Total Users:</p>
                  <p class="stat-value">${data.total_users}</p>
              </div>
          </div>
          <div class="dashboard-stat">
              <div class="stat-icon">
                  <i class="fas fa-product"></i>
              </div>
              <div class="stat-info">
                  <p class="stat-label">Total Products:</p>
                  <p class="stat-value">${data.total_products}</p>
              </div>
          </div>
          <div class="dashboard-stat">
              <div class="stat-icon">
                  <i class="fas fa-tags"></i>
              </div>
              <div class="stat-info">
                  <p class="stat-label">Total Offers:</p>
                  <p class="stat-value">${data.total_offers}</p>
              </div>
          </div>
          <div class="dashboard-stat">
              <div class="stat-icon">
                  <i class="fas fa-newspaper"></i>
              </div>
              <div class="stat-info">
                  <p class="stat-label">Total News:</p>
                  <p class="stat-value">${data.total_news}</p>
              </div>
          </div>
          <div class="dashboard-stat">
              <div class="stat-icon">
                  <i class="fas fa-list"></i>
              </div>
              <div class="stat-info">
                  <p class="stat-label">Total Categories:</p>
                  <p class="stat-value">${data.total_categories}</p>
              </div>
          </div>
          <!-- Add more statistics as needed -->
      `;
      })
      .catch((error) => {
        console.error("Error fetching dashboard stats:", error);
      });
  }
  // Call the fetchAndDisplayUsers
  dashboardBtn.addEventListener("click", function () {
    // Fetch and display users
    hideAllSections();
    fetchDashboardStats();
    dashboardSection.style.display = "block"; // Assuming you have an element with ID "uploadImagesForm"
  });
}
