<?php

include "db.php";

if(isset($_POST['continue'])){

$_SESSION['company']=$_POST['company'];

header("Location:login.php");

exit();

}

?>

<!DOCTYPE html>

<html>

<head>

<title>ForgeFleet</title>

<link
rel="stylesheet"
href="assets/css/style.css">

</head>

<body>

<div class="landing-container">

<div class="company-card">

<h1>FORGEFLEET</h1>

<h3>Fleet Maintenance System</h3>

<p>

Select your company.

</p>

<form method="POST">

<input

type="text"

id="search"

placeholder="Search Company..."

onkeyup="filterCompany()">

<select

name="company"

id="company"

required>

<?php

$result=$conn->query("SELECT * FROM companies");

while($row=$result->fetch_assoc()){

?>

<option
value="<?php echo $row['id']; ?>">

<?php echo $row['company_name']; ?>

</option>

<?php

}

?>

</select>

<br><br>

<button
type="submit"
name="continue">

Continue

</button>

</form>

</div>

</div>

<script>

function filterCompany(){

let input=document.getElementById("search");

let filter=input.value.toUpperCase();

let select=document.getElementById("company");

let option=select.options;

for(let i=0;i<option.length;i++){

let txt=option[i].text;

if(txt.toUpperCase().indexOf(filter)>-1){

option[i].style.display="";

}else{

option[i].style.display="none";

}

}

}

</script>

</body>

</html>
