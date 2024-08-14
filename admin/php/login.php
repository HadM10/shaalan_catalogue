<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In</title>
    <link rel="stylesheet" href="admin/css/admin_style.css">
</head>

<body class="sign-in-body">
    <div class="container">
        <form id="loginForm" action="path/to/your/php/login_script.php" method="post">
            <h2>Sign In</h2>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Sign In</button>
        </form>
    </div>
    <script src="../js/admin_script.js"></script>
</body>

</html>