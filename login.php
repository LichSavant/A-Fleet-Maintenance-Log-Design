<?php

include "db.php";

if(!isset($_SESSION['company'])){
    header("Location:index.php");
    exit();
}

$companyID = $_SESSION['company'];

$stmt = $conn->prepare("
SELECT *
FROM companies
WHERE id=?
");

$stmt->bind_param("i",$companyID);
$stmt->execute();

$company =
$stmt->get_result()->fetch_assoc();

?>

<!DOCTYPE html>
<html>

<head>

<title>Login</title>

<link
rel="stylesheet"
href="assets/css/style.css">

</head>

<body>

<div class="login-wrapper">

<div class="left-panel">

<h1>FORGEFLEET</h1>

<h3>Fleet Maintenance System</h3>

<p>

Manage vehicles, maintenance,
drivers and reports
all in one place.

</p>

</div>

<div class="right-panel">

<div class="login-box">

<h2>Employee Login</h2>

<p>

Company

<br>

<strong>

<?php
echo $company['company_name'];
?>

</strong>

</p>

<form>

<input

type="email"

placeholder="Email Address"

required>

<input

type="password"

placeholder="Password"

required>

<button>

Login

</button>

</form>

<br>

<a href="forgot-password.php">

Forgot Password?

</a>

<br><br>

<p>

No account yet?

</p>

<a

class="register-btn"

href="register/register.php">

Register Here

</a>

<br><br>

<a href="index.php">

← Change Company

</a>

</div>

</div>

</div>

</body>

</html>
