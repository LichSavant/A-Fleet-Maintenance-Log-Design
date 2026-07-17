<?php

include "../db.php";

// User must select a company first
if(!isset($_SESSION['company'])){
    header("Location: ../index.php");
    exit();
}

$companyID = $_SESSION['company'];

$error = "";
$success = "";

// Get selected company
$stmt = $conn->prepare("SELECT * FROM companies WHERE id=?");
$stmt->bind_param("i",$companyID);
$stmt->execute();

$company =
$stmt->get_result()->fetch_assoc();

if(isset($_POST['register'])){

    $firstname = trim($_POST['firstname']);
    $lastname = trim($_POST['lastname']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);

    $license_number = trim($_POST['license_number']);
    $license_class = $_POST['license_class'];
    $license_expiry = $_POST['license_expiry'];

    $experience = $_POST['experience'];

    $emergency_name = trim($_POST['emergency_name']);
    $emergency_phone = trim($_POST['emergency_phone']);

    $password = $_POST['password'];
    $confirm = $_POST['confirm_password'];

    // Basic validation
    if($password != $confirm){

        $error = "Passwords do not match.";

    }else{

        // Check duplicate email
        $check = $conn->prepare("
        SELECT id
        FROM registration_requests
        WHERE email=?
        ");

        $check->bind_param("s",$email);
        $check->execute();

        if($check->get_result()->num_rows > 0){

            $error = "This email already has a pending application.";

        }else{

            $hashedPassword =
            password_hash(
            $password,
            PASSWORD_DEFAULT
            );

            $insert = $conn->prepare("
            INSERT INTO registration_requests
            (

            company_id,

            role,

            firstname,

            lastname,

            email,

            password,

            phone,

            license_number,

            license_class,

            license_expiry,

            years_experience,

            emergency_name,

            emergency_phone,

            status

            )

            VALUES

            (

            ?,

            'driver',

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            'Pending'

            )

            ");

            $insert->bind_param(

            "issssssssiss",

            $companyID,

            $firstname,

            $lastname,

            $email,

            $hashedPassword,

            $phone,

            $license_number,

            $license_class,

            $license_expiry,

            $experience,

            $emergency_name,

            $emergency_phone

            );

            if($insert->execute()){

                $success =
                "Application submitted successfully! Please wait for administrator approval.";

            }else{

                $error =
                "Something went wrong while submitting your application.";

            }

        }

    }

}

?>
<!DOCTYPE html>
<html>

<head>

<title>Driver Registration</title>

<link
rel="stylesheet"
href="../assets/css/style.css">

</head>

<body>

<div class="login-wrapper">

<div class="left-panel">

<h1>FORGEFLEET</h1>

<h3>Driver Application</h3>

<p>

Apply to become an authorized fleet driver.

Your application will be reviewed
by your company's administrator.

</p>

</div>

<div class="right-panel">

<div class="login-box">

<h2>

Driver Registration

</h2>

<p>

Company

<br>

<strong>

<?php echo htmlspecialchars($company['company_name']); ?>

</strong>

</p>

<?php
if($error!=""){
?>

<div class="error-box">

<?php echo $error; ?>

</div>

<?php
}
?>

<?php
if($success!=""){
?>

<div class="success-box">

<?php echo $success; ?>

</div>

<?php
}
?>

<form method="POST">

<h3 class="form-section">

Personal Information

</h3>

<input
type="text"
name="firstname"
placeholder="First Name"
required>

<input
type="text"
name="lastname"
placeholder="Last Name"
required>

<input
type="email"
name="email"
placeholder="Email Address"
required>

<input
type="text"
name="phone"
placeholder="Phone Number"
required>

<h3 class="form-section">

Driver Information

</h3>

<input
type="text"
name="license_number"
placeholder="Driver License Number"
required>

<select
name="license_class"
required>

<option value="">

Select License Class

</option>

<option>A</option>

<option>B</option>

<option>C</option>

<option>D</option>

<option>Professional</option>

</select>

<br><br>

<label>

License Expiry

</label>

<input
type="date"
name="license_expiry"
required>

<input
type="number"
name="experience"
placeholder="Years of Driving Experience"
required>

<input
type="text"
name="emergency_name"
placeholder="Emergency Contact Name"
required>

<input
type="text"
name="emergency_phone"
placeholder="Emergency Contact Number"
required>

<h3 class="form-section">

Account Security

</h3>

<input
type="password"
name="password"
placeholder="Password"
required>

<input
type="password"
name="confirm_password"
placeholder="Confirm Password"
required>

<button
type="submit"
name="register">

Submit Application

</button>

</form>

<br>

<a href="register.php">

← Back

</a>

</div>

</div>

</div>

</body>

</html>