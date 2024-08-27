<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In</title>
    <link rel="stylesheet" href="https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/css/admin_style.css">
</head>

<body class="sign-in-body">
    <div class="container">
        <form id="loginForm" action="login_admin.php" method="post">
            <h2>Sign In</h2>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Sign In</button>
        </form>
    </div>
    <script src="https://shaalanforhardware-f7728d963cd9.herokuapp.com/admin/js/admin_script.js"></script>
</body>

</html>