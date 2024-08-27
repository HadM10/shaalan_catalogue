// SHOW HIDE SECTIONS

const links = {
  dashboard: document.getElementById("dashboardBtn"),
  viewProducts: document.getElementById("viewProductsBtn"),
  addProducts: document.getElementById("addProductsBtn"),
  archivedProducts: document.getElementById("archivedProductsBtn"),
  viewCategories: document.getElementById("viewCategoriesBtn"),
  addCategories: document.getElementById("addCategoriesBtn"),
  viewUsers: document.getElementById("viewUsersBtn"),
  registerUser: document.getElementById("registerUserBtn"),
  newCollectionProducts: document.getElementById("newCollectionProductsBtn"), // Added link for new collection products
};

// Set active link and show the corresponding section
function setActiveLink(linkId) {
  // Remove 'active' class from all links
  Object.values(links).forEach((link) => link.classList.remove("active"));

  // Ensure the parent link is also inactive
  Object.values(links).forEach((link) => {
    const parentLink = link.closest("li")?.parentElement.closest("li");
    if (parentLink) {
      parentLink.querySelector("a")?.classList.remove("active");
    }
  });

  // Add 'active' class to the selected link
  if (links[linkId]) {
    links[linkId].classList.add("active");

    // Ensure the parent link is also active
    const parentLink = links[linkId].closest("li")?.parentElement.closest("li");
    if (parentLink) {
      parentLink.querySelector("a")?.classList.add("active");
    }
  }
}

// CONTENT SECTIONS
const productList = document.getElementById("productList");
const categoryList = document.getElementById("categoryList");
const addProduct = document.getElementById("addProductFormContainer");
const addCategory = document.getElementById("addCategoryFormContainer");
const usersList = document.getElementById("usersList");
const dashboardSection = document.getElementById("dashboardSection");
const dashboardStats = document.getElementById("dashboardStats");
const archivedProductsList = document.getElementById("archivedProductList");
const registerUsers = document.getElementById("registerUserFormContainer");
const newCollectionProductList = document.getElementById(
  "newCollectionProductList"
);

// CONTENT NAV-LINKS
const viewProductsBtn = document.getElementById("viewProductsBtn");
const viewCategoriesBtn = document.getElementById("viewCategoriesBtn");
const addProductsBtn = document.getElementById("addProductsBtn");
const addCategoriesBtn = document.getElementById("addCategoriesBtn");
const viewUsersBtn = document.getElementById("viewUsersBtn");
const dashboardBtn = document.getElementById("dashboardBtn");
const archivedProductsBtn = document.getElementById("archivedProductsBtn");
const registerUsersBtn = document.getElementById("registerUserBtn");
const newCollectionProductsBtn = document.getElementById(
  "newCollectionProductsBtn"
); // Added for new collection products

function hideAllSections() {
  productList.style.display = "none";
  categoryList.style.display = "none";
  addProduct.style.display = "none";
  addCategory.style.display = "none";
  usersList.style.display = "none";
  dashboardSection.style.display = "none";
  archivedProductsList.style.display = "none";
  registerUsers.style.display = "none";
  newCollectionProductList.style.display = "none"; // Hide new collection products section
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
      xhr.open(
        "POST",
        "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/login.php",
        true
      );
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
    xhr.open(
      "GET",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/logout.php",
      true
    );

    // Define the callback function
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        try {
          console.log(xhr.responseText);
          var response = JSON.parse(xhr.responseText);

          if (response.success) {
            // Logout successful
            window.location.href =
              "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/login.php";
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
        "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/archive_product.php",
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
          displayArchivedProducts(archivedProducts);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };
    xhr.open(
      "GET",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/view_products.php",
      true
    );
    xhr.send();
  }

  // Function to display archived products
  function displayArchivedProducts(archivedProducts) {
    var archivedProductsList = document.getElementById("archivedProductList");

    // Clear existing content
    archivedProductsList.innerHTML = "";

    // Filter only archived products
    var archivedProducts = archivedProducts.filter(
      (product) => product.archived
    );

    archivedProducts.forEach(function (product) {
      // Create a list item for each archived product
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
                    <button class="restore-btn" onclick="restoreProduct(${product.product_id})">Restore</button>
                </div>
            </div>
        `;

      // Append the list item to the archived products list
      archivedProductsList.appendChild(listItem);
    });
  }

  // Handle the display of archived products when the button is clicked
  archivedProductsBtn.addEventListener("click", function () {
    hideAllSections(); // Hide other sections
    fetchAndDisplayArchivedProducts(); // Fetch and display archived products
    setActiveLink("archivedProducts");
    archivedProductsList.style.display = "flex"; // Show archived products section
  });

  // RESTORE PRODUCTS
  function restoreProduct(productId) {
    // Send an AJAX request to your server to restore the product
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Product restored successfully
        alert("Product restored successfully!");
        // Refresh the archived products list
        fetchAndDisplayArchivedProducts();
      } else if (xhr.readyState === 4) {
        // Error handling if the request fails
        alert("Error restoring product: " + xhr.statusText);
      }
    };
    xhr.open(
      "POST",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/restore_product.php",
      true
    );
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("product_id=" + productId);
  }

  // EDIT AND DELETE PRODUCTS

  // Function to delete product
  function deleteProduct(productId) {
    // Make an AJAX request to delete the product
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/delete_product.php",
      true
    );
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
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/view_products_details.php?product_id=" +
        productId,
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
    xhr.open(
      "GET",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/view_categories.php",
      true
    );
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
  function saveChanges(productId) {
    // Create a FormData object and append the data
    var formData = new FormData();
    formData.append("product_id", productId);

    // Update these lines to match your PHP script expectations
    formData.append(
      "new_product_name",
      document.getElementById("editProductName").value
    );
    formData.append(
      "new_category_id",
      document.getElementById("editProductCategory").value
    );

    // Append the image file if it exists
    var productImage = document.getElementById("editProductImage").files[0];
    if (productImage) {
      formData.append("product_image", productImage);
    }

    // Make an AJAX request to save the changes
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/edit_product.php",
      true
    );
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
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/view_products_details.php?product_id=" +
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

                      <label for="editProductImage">Product Image:</label>
                      <input type="file" id="editProductImage" accept="image/*">

                      <button type="button" onclick="saveChanges(${productId})">Save Changes</button>
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

  //ADD OR REMOVE FROM NEW COLLECTION

  // ADD TO NEW COLLECTION
  function addToNewCollection(productId) {
    // Confirm if the user wants to add the product to the New Collection
    var confirmAdd = confirm(
      "Are you sure you want to add this product to the New Collection?"
    );
    if (confirmAdd) {
      // Make an AJAX request to update the product's collection status
      var xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/add_new_collection.php",
        true
      );
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Check if the add operation was successful
          var response = JSON.parse(xhr.responseText);
          if (response.status === "success") {
            // Refresh the product list to reflect changes
            alert(response.message);
            fetchAndDisplayProducts();
          } else {
            alert(
              "Failed to add product to New Collection: " + response.message
            );
          }
        }
      };
      // Send the product ID in the request body
      xhr.send("product_id=" + productId);
    }
  }

  // REMOVE FROM NEW COLLECTION
  function removeFromNewCollection(productId) {
    // Confirm if the user wants to remove the product from the New Collection
    var confirmRemove = confirm(
      "Are you sure you want to remove this product from the New Collection?"
    );
    if (confirmRemove) {
      // Make an AJAX request to update the product's collection status
      var xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/remove_new_collection.php",
        true
      );
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Check if the remove operation was successful
          var response = JSON.parse(xhr.responseText);
          if (response.status === "success") {
            // Refresh the product list to reflect changes
            alert(response.message);
            fetchAndDisplayProducts();
            fetchAndDisplayNewCollection();
          } else {
            alert(
              "Failed to remove product from New Collection: " +
                response.message
            );
          }
        }
      };
      // Send the product ID in the request body
      xhr.send("product_id=" + productId);
    }
  }

  // Function to display new collection products
  function displayNewCollectionProducts(products) {
    var newCollectionProductList = document.getElementById(
      "newCollectionProductList"
    );

    // Clear existing content
    newCollectionProductList.innerHTML = "";

    // Filter products to only include those in the new collection
    var newCollectionProducts = products.filter(
      (product) => product.new_collection
    );

    newCollectionProducts.forEach(function (product) {
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
        <div class="product-new-collection">
          <button class="remove-btn-collection" onclick="removeFromNewCollection(${product.product_id})">Remove from New Collection</button>
        </div>
      </div>
    `;

      // Append the list item to the new collection product list
      newCollectionProductList.appendChild(listItem);
    });
  }

  // Function to fetch and display new collection products using AJAX
  function fetchAndDisplayNewCollection() {
    var xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open(
      "GET",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/view_new_collection.php",
      true
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          // Parse the JSON response
          var products = JSON.parse(xhr.responseText);

          // Display products
          displayNewCollectionProducts(products);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    // Send the request
    xhr.send();
  }

  newCollectionProductsBtn.addEventListener("click", function () {
    // Fetch and display products when the button is clicked
    hideAllSections();
    fetchAndDisplayNewCollection();
    setActiveLink("newCollectionProducts");
    document.getElementById("newCollectionProductList").style.display = "flex";
  });

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
          <h2 class="product-name"><strong>Name: </strong>${
            product.product_name
          }</h2>
          <p class="product-category"><strong>Category: </strong>${
            product.category_name
          }</p>
          <div class="product-actions">
            <button class="edit-btn" onclick="editProduct(${
              product.product_id
            })">Edit</button>
            <button class="delete-btn" onclick="confirmDelete(${
              product.product_id
            })">Delete</button>
            <button class="archive-btn" onclick="archiveProduct(${
              product.product_id
            })">Archive</button>
            </div>
             <div class="product-new-collection">
             ${
               product.new_collection
                 ? `<button class="remove-btn-collection" onclick="removeFromNewCollection(${product.product_id})">Remove from New Collection</button>`
                 : `<button class="add-btn-collection" onclick="addToNewCollection(${product.product_id})">Add to New Collection</button>`
             }
          </div>
        </div>
      `;
      console.log(products);
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

    xhr.open(
      "GET",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/view_products.php",
      true
    );
    xhr.send();
  }

  viewProductsBtn.addEventListener("click", function () {
    // Fetch and display products when the button is clicked
    hideAllSections();
    fetchAndDisplayProducts();
    setActiveLink("viewProducts");
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
      var isNewCollection = document.getElementById("new_collection").checked
        ? 1
        : 0;

      if (!productImage) {
        alert("Please select an image.");
        return;
      }

      // Create FormData object to handle file upload
      var formData = new FormData();
      formData.append("product_name", productName);
      formData.append("category_id", category);
      formData.append("product_image", productImage);
      formData.append("new_collection", isNewCollection); // Include checkbox value

      // Log FormData to inspect its contents
      for (var [key, value] of formData.entries()) {
        console.log(key + ": " + value);
      }

      // Create XMLHttpRequest object (or use fetch API)
      var xhr = new XMLHttpRequest();

      // Configure the request
      xhr.open(
        "POST",
        "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/add_product.php",
        true
      );

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
              document.getElementById("addProductForm").reset();
              // fetchAndDisplayProducts();
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

    setActiveLink("addProducts");

    // Fetch Categories
    fetch(
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/view_categories.php"
    )
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

  // Function to display categories
  function displayCategories(categoriesData) {
    var categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = ""; // Clear the previous content

    categoriesData.forEach(function (category) {
      var categoryItem = document.createElement("li");
      categoryItem.setAttribute("data-category-id", category.category_id);
      categoryItem.classList.add("category-item");

      categoryItem.innerHTML = `
            <div class="category-content">
                <h3 class="category-name">${category.category_name}</h3>
                <div class="category-actions">
                    <button class="edit-button" onclick="editCategory(${category.category_id})">Edit</button>
                    <button class="delete-button" onclick="confirmDeleteCategory(${category.category_id})">Delete</button>
                </div>
            </div>
        `;
      categoryList.appendChild(categoryItem);
    });
  }

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

    xhr.open(
      "GET",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/view_categories.php",
      true
    );
    xhr.send();
  }

  viewCategoriesBtn.addEventListener("click", function () {
    // Fetch and display categories
    hideAllSections();
    fetchAndDisplayCategories();
    setActiveLink("viewCategories");
    categoryList.style.display = "flex";
  });

  // Function to delete a category
  function deleteCategory(categoryId) {
    // Make an AJAX request to delete the category
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/delete_category.php",
      true
    );
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        try {
          var response = JSON.parse(xhr.responseText);
          if (response.status === "success") {
            alert(response.message);
            // Optionally, refresh the category list or update the UI
            fetchAndDisplayCategories();
          } else {
            alert(response.message);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    // Send the request with category ID
    xhr.send("category_id=" + categoryId);
  }

  // Function to confirm delete for a category
  function confirmDeleteCategory(categoryId) {
    var confirmDelete = confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      // Call the function to delete the category from the database
      deleteCategory(categoryId);
    }
  }

  // Function to fetch category details and create/edit category form dynamically
  function editCategory(categoryId) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/view_categories_details.php?category_id=" +
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
    xhr.open(
      "POST",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/edit_category.php",
      true
    );
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
      xhr.open(
        "POST",
        "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/add_category.php",
        true
      );
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log(xhr.responseText);
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.status === "success") {
              alert("Category added successfully.");
              // Hide Add Category section
              document.getElementById("addCategoryForm").reset();
              // Fetch and display categories
              // fetchAndDisplayCategories();
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
    setActiveLink("addCategories");
    addCategory.style.display = "block";
  });

  // DISPLAY USERS

  // Function to fetch and display users
  function fetchAndDisplayUsers() {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/view_users.php",
      true
    );
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          var users = JSON.parse(xhr.responseText);
          displayUsers(users);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };
    xhr.send();
  }

  // Function to display users with block/unblock buttons
  function displayUsers(users) {
    usersList.innerHTML = ""; // Clear the previous content

    users.forEach(function (user) {
      var userItem = document.createElement("li");
      userItem.setAttribute("data-user-id", user.user_id);
      userItem.classList.add("user-item");

      // Determine the button text based on user status
      var buttonText = user.status === "blocked" ? "Unblock" : "Block";
      var buttonAction =
        user.status === "blocked" ? "unblockUser" : "blockUser";

      userItem.innerHTML = `
          <span><strong>Username:</strong> ${user.username}</span>
          <button class="block-button" onclick="${buttonAction}(${user.user_id}, this)">${buttonText}</button>
      `;
      usersList.appendChild(userItem);
    });
  }

  // Function to block a user
  function blockUser(userId, button) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/block_user.php",
      true
    );
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          var response = JSON.parse(xhr.responseText);
          if (response.status === "success") {
            button.textContent = "Unblock";
            button.setAttribute("onclick", `unblockUser(${userId}, this)`);
            alert(response.message);
          } else {
            alert(response.message);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };
    xhr.send("user_id=" + userId);
  }

  // Function to unblock a user
  function unblockUser(userId, button) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/unblock_user.php",
      true
    );
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          var response = JSON.parse(xhr.responseText);
          if (response.status === "success") {
            button.textContent = "Block";
            button.setAttribute("onclick", `blockUser(${userId}, this)`);
            alert(response.message);
          } else {
            alert(response.message);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };
    xhr.send("user_id=" + userId);
  }

  viewUsersBtn.addEventListener("click", function () {
    // Fetch and display categories
    hideAllSections();
    fetchAndDisplayUsers();
    setActiveLink("viewUsers");
    usersList.style.display = "flex";
  });

  //ADD USERS

  // Register User Form submission event listener
  document
    .getElementById("registerUserForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Gather form data
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;

      // Create FormData object
      var formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      // Create XMLHttpRequest object
      var xhr = new XMLHttpRequest();

      // Configure the request
      xhr.open(
        "POST",
        "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/register_users.php",
        true
      );

      // Define the callback function
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log(xhr.responseText);
          try {
            var response = JSON.parse(xhr.responseText);
            if (response.status === "success") {
              alert(response.message);
              // Reset the form
              document.getElementById("registerUserForm").reset();
              fetchAndDisplayUsers();
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

  // Event listener for Register User button click
  registerUsersBtn.addEventListener("click", function () {
    // Hide all other sections
    hideAllSections();
    setActiveLink("registerUser");

    // Show the register user form
    document.getElementById("registerUserFormContainer").style.display =
      "block";
  });

  // DASHBOARD

  // Function to fetch dashboard statistics from the server
  function fetchDashboardStats() {
    fetch(
      "https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/php/dashboard.php"
    )
      .then((response) => response.json())
      .then((data) => {
        // Display the dashboard statistics on the page
        const dashboardStats = document.getElementById("dashboardStats");

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
                <i class="fas fa-box"></i> <!-- Changed to a more suitable icon -->
            </div>
            <div class="stat-info">
                <p class="stat-label">Total Products:</p>
                <p class="stat-value">${data.total_products}</p>
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

  // Event listener for the dashboard button click
  dashboardBtn.addEventListener("click", function () {
    // Fetch and display dashboard statistics
    hideAllSections();
    fetchDashboardStats();
    setActiveLink("dashboard");
    dashboardSection.style.display = "block"; // Assuming you have an element with ID "dashboardSection"
  });

  fetchDashboardStats();
  setActiveLink("dashboard");
}
