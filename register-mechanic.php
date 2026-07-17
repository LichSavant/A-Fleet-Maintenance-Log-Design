<?php

include "../db.php";

if(!isset($_SESSION['company'])){
    header("Location: ../index.php");
    exit();
}

$companyID=$_SESSION['company'];

$error="";
$success="";

$stmt=$conn->prepare("SELECT * FROM companies WHERE id=?");
$stmt->bind_param("i",$companyID);
$stmt->execute();

$company=$stmt->get_result()->fetch_assoc();

if(isset($_POST['register'])){

$firstname=$_POST['firstname'];
$lastname=$_POST['lastname'];
$email=$_POST['email'];
$phone=$_POST['phone'];

$employeeID=$_POST['employee_id'];
$specialization=$_POST['specialization'];
$experience=$_POST['experience'];
$branch=$_POST['branch'];

$password=$_POST['password'];
$confirm=$_POST['confirm_password'];

if($password!=$confirm){

$error="Passwords do not match.";

}else{

$check=$conn->prepare("
SELECT id
FROM registration_requests
WHERE email=?
");

$check->bind_param("s",$email);
$check->execute();

if($check->get_result()->num_rows>0){

$error="Email already has a pending application.";

}else{

$hash=password_hash($password,PASSWORD_DEFAULT);

$insert=$conn->prepare("

INSERT INTO registration_requests(

company_id,

role,

firstname,

lastname,

email,

password,

phone,

employee_id,

specialization,

years_experience,

branch,

status

)

VALUES(

?,

'mechanic',

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

"isssssssis",

$companyID,

$firstname,

$lastname,

$email,

$hash,

$phone,

$employeeID,

$specialization,

$experience,

$branch

);

if($insert->execute()){

$success="Application Submitted Successfully.";

}else{

$error="Database Error.";

}

}

}

}

?>
<!DOCTYPE html>

<html>

<head>

<title>

Mechanic Registration

</title>

<link
rel="stylesheet"
href="../assets/css/style.css">

</head>

<body>

<div class="login-wrapper">

<div class="left-panel">

<h1>

FORGEFLEET

</h1>

<h3>

Mechanic Application

</h3>

<p>

Apply as an authorized fleet mechanic.

</p>

</div>

<div class="right-panel">

<div class="login-box">

<h2>

Mechanic Registration

</h2>

<p>

<strong>

<?php echo $company['company_name']; ?>

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
placeholder="Email"
required>

<input
type="text"
name="phone"
placeholder="Phone"
required>

<h3 class="form-section">

Mechanic Information

</h3>

<input
type="text"
name="employee_id"
placeholder="Employee ID"
required>

<select
name="specialization"
required>

<option value="">

Choose Specialization

</option>

<option>

Engine

</option>

<option>

Electrical

</option>

<option>

Transmission

</option>

<option>

Body Repair

</option>

<option>

General Maintenance

</option>

</select>

<br><br>

<input
type="number"
name="experience"
placeholder="Years of Experience"
required>

<input
type="text"
name="branch"
placeholder="Workshop Branch"
required>

<h3 class="form-section">

Account

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
