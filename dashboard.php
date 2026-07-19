<?php

$conn = mysqli_connect(
    "localhost",
    "root",
    "",
    "forgefleet"
);

if (!$conn){
    die("Connection failed.");
}

$driverID = 1;

$driverQuery = "
SELECT
    First_Name,
    Last_Name,
    Employee_Number
FROM Drivers
WHERE Drivers_ID = $driverID;
";

$driverResult = mysqli_query($conn, $driverQuery);
$driver = mysqli_fetch_assoc($driverResult);

/* vehicle query */

$vehicleQuery = "
SELECT
    v.Vehicle_ID,
    v.Model,
    v.License_Plate
FROM Drivers d
JOIN Vehicles v
ON d.Vehicle_ID = v.Vehicle_ID
WHERE d.Drivers_ID = $driverID;
";

$vehicleResult = mysqli_query($conn, $vehicleQuery);
$vehicle = mysqli_fetch_assoc($vehicleResult);

/* odometer reading */

$currentMileageQuery = "
SELECT
    Odometer_Reading
FROM Mileage_Logs
WHERE Drivers_ID = $driverID
ORDER BY Log_Date DESC, Mileage_ID DESC
LIMIT 1;
";

$currentMileageResult = mysqli_query($conn, $currentMileageQuery);
$currentMileage = mysqli_fetch_assoc($currentMileageResult);

$currentOdometer = $currentMileage['Odometer_Reading'];

/* service types */

$serviceQuery = "
SELECT
    Service_ID,
    Recom_Int_Miles
FROM Service_Type;
";

$serviceResult = mysqli_query($conn, $serviceQuery);

/* count maintenance alerts */

$alerts = 0;

while ($service = mysqli_fetch_assoc($serviceResult)) {

    $lastServiceQuery = "
    SELECT
        mh.Odometer_Reading
    FROM Service_Maintenance sm
    JOIN Maintenance_History mh
    ON sm.Main_History_ID = mh.Main_History_ID
    WHERE sm.Service_ID = " . $service['Service_ID'] . "
    AND mh.Vehicles_ID = " . $vehicle['Vehicle_ID'] . "
    ORDER BY mh.Service_Date DESC
    LIMIT 1;
    ";

    $lastServiceResult = mysqli_query($conn, $lastServiceQuery);

    $lastService = mysqli_fetch_assoc($lastServiceResult);

    if ($lastService) {

        $lastMileage = $lastService['Odometer_Reading'];

    }
    else {

        $lastMileage = 0;

    }

    $nextMileage = $lastMileage + $service['Recom_Int_Miles'];

    $kmLeft = $nextMileage - $currentOdometer;

    if ($kmLeft <= 5000) {

        $alerts++;

    }

}


/* overall vehicle status */

if ($alerts == 0) {

    $overallTitle = "Vehicle Normal";
    $overallDescription = "No critical vehicle safety issues or overdue checks logged.";
    $statusClass = "status-green";
    $statusIcon = "ph-check-circle";

}
elseif ($alerts <= 2) {

    $overallTitle = "Maintenance Due";
    $overallDescription = "One or two maintenance services require attention soon.";
    $statusClass = "status-yellow";
    $statusIcon = "ph-warning-circle";

}
else {

    $overallTitle = "Maintenance Required";
    $overallDescription = "Multiple maintenance services require immediate attention.";
    $statusClass = "status-red";
    $statusIcon = "ph-warning-octagon";

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Driver Dashboard</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://unpkg.com/@phosphor-icons/web"></script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

</head>
<body>
  <aside class="sidebar">
    <div class="logo-group">
      <!-- <i class="ph ph-steering-wheel logo-icon"></i> -->
      <span class="logo-text">FORGEFLEET</span>
    </div>
    <nav class="sidebar-nav">
      <a href="dashboard.php" class="active">
        <i class="ph ph-house"></i> Dashboard
      </a>
      <a href="assigned_vehicle.php">
        <i class="ph ph-truck"></i> Your Vehicle
      </a>
      <a href="mileage.php">
        <i class="ph ph-speedometer"></i> Mileage
      </a>
      <a href="maintenance_reminders.php">
        <i class="ph ph-bell"></i> Reminders
      </a>
    </nav>
  </aside>

  <div class="main-content">
    <header class="app-header">
      <div class="header-user">
        <div class="user-info">
          <span class="driver-name"><?php echo $driver['First_Name'] . ' ' . $driver['Last_Name']; ?></span>
          <span class="employee-id"><?php echo $driver['Employee_Number']; ?></span>
        </div>
        <button class="notification-btn">
          <i class="ph ph-bell"></i>
        </button>
      </div>
    </header>
    <main class="web-container">
      <div class="card status-card">
        <div class="status-content">
          <i class="ph <?php echo $statusIcon; ?> status-logo <?php echo $statusClass; ?>"></i>
          <div>
            <h3 class="status-overall <?php echo $statusClass; ?>">
              <?php echo $overallTitle; ?>
            </h3>
            <p class="status-description"><?php echo $overallDescription; ?></p>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div>
          <div class="card">
            <h2 class="title">Assigned Operator</h2>
            <div class="driver-details">
              <div class="driver-image">
                <i class="ph ph-user driver-image-size"></i>
              </div>
              <div>
                <p class="driver-name"><?php echo $driver['First_Name'] . " " . $driver['Last_Name']; ?></p>
                <p class="driver-rank"><?php echo $driver['Employee_Number']; ?></p>
              </div>
            </div>

            <h2 class="title-below">Active Vehicle</h2> 
            
            <div class="vehicle-details">
              <span class="name">Model:</span>
              <span class="value"><?php echo $vehicle['Model']; ?></span>
            </div>
            <div class="vehicle-details">
              <span class="name">Plate:</span>
              <span class="value-number"><?php echo $vehicle['License_Plate']; ?></span>
            </div>
          </div>
        </div>

        <div>
          <div class="card">
            <h2 class="title">Telemetry Overview</h2>
            <div class="card-right-upper">
              <div class="inner-card">
                <p class="inner-card-name">Odometer</p>
                <p class="inner-card-values"><?php echo number_format($currentOdometer); ?> km</p>
              </div>
              <div class="inner-card">
                <p class="inner-card-name">Active Alerts</p>
                <p class="inner-card-values-issues <?php echo $statusClass; ?>">
                  <?php echo $alerts; ?> Issues
                </p>
              </div>
            </div>
            <div class="card-right-lower">
              <a href="mileage.php" class="btn btn-primary"><i class="ph ph-plus-circle"></i> Log Shift Odometer</a>
              <a href="assigned_vehicle.php" class="btn btn-secondary"><i class="ph ph-warning-octagon"></i> View Maintenance Schedule</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <nav class="mobile-nav">
    <a href="dashboard.php" class="nav-item active"><i class="ph ph-house mobile-nav-labels"></i>Home</a>
    <a href="assigned_vehicle.php" class="nav-item"><i class="ph ph-truck mobile-nav-labels"></i>Specs</a>
    <a href="mileage.php" class="nav-item"><i class="ph ph-speedometer mobile-nav-labels"></i>Odo</a>
    <a href="maintenance_reminders.php" class="nav-item"><i class="ph ph-bell mobile-nav-labels"></i>Alerts</a>
  </nav>

</body>
</html>