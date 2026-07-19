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

/* for vehicle information */

$vehicleQuery = "
SELECT
    v.Vehicle_ID,
    v.License_Plate,
    v.VIN,
    v.Model,
    v.Vehicle_Year
FROM Drivers d 
JOIN Vehicles v ON d.Vehicle_ID = v.Vehicle_ID
WHERE Drivers_ID = $driverID;
";

$vehicleResult = mysqli_query($conn, $vehicleQuery);
$vehicle = mysqli_fetch_assoc($vehicleResult);

/* for service types */

$serviceQuery = "
SELECT
    Service_ID,
    Service_Name,
    Description,
    Recom_Int_Miles
FROM Service_Type;
";

$serviceResult = mysqli_query($conn, $serviceQuery);

/* for km left */

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

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vehicle Health</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://unpkg.com/@phosphor-icons/web"></script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

</head>
<body>
  <aside class="sidebar">
    <div class="logo-group">
      <span class="logo-text">FORGEFLEET</span>

    </div>
    <nav class="sidebar-nav">
      <a href="dashboard.php">
        <i class="ph ph-house"></i> Dashboard
      </a>
      <a href="assigned_vehicle.php" class="active">
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
          <span class="driver-name"><?php echo $driver['First_Name'] . " " . $driver['Last_Name']; ?></span>
          <span class="employee-id"><?php echo $driver['Employee_Number']; ?></span>
        </div>
        <button class="notification-btn">
          <i class="ph ph-bell"></i>
        </button>
      </div>
    </header>
    <main class="web-container">
      <div class="card">
        <h2 class="title">Vehicle Specifications</h2>
        <div class="vehicle-specs">
          <div>
            <p class="vehicle-attribute">PLATE NUMBER</p>
            <p class="attribute-value-number"><?php echo $vehicle['License_Plate']; ?></p>
          </div>
          <div>
            <p class="vehicle-attribute">VEHICLE ID NUMBER (VIN)</p>
            <p class="attribute-value-number"><?php echo $vehicle['VIN']; ?></p>
          </div>
          <div>
            <p class="vehicle-attribute">MODEL</p>
            <p class="attribute-value"><?php echo $vehicle['Model']; ?></p>
          </div>
          <div>
            <p class="vehicle-attribute">YEAR</p>
            <p class="attribute-value"><?php echo $vehicle['Vehicle_Year']; ?></p>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="title">Scheduled Maintenance Checklist</h2>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>System Component</th>
                <th>Status</th>
                <th style="text-align: right;">KM Left</th>
              </tr>
            </thead>
            <tbody>
              <?php while ($service = mysqli_fetch_assoc($serviceResult)) { ?>
                
                <?php $historyQuery = "
                  SELECT mh.Odometer_Reading
                  FROM Service_Maintenance sm
                  JOIN Maintenance_History mh
                  ON sm.Main_History_ID = mh.Main_History_ID
                  WHERE sm.Service_ID = " . $service['Service_ID'] . "
                  AND mh.Vehicles_ID = " . $vehicle['Vehicle_ID'] . "
                  ORDER BY mh.Service_Date DESC
                  LIMIT 1;
                  ";

                  $historyResult = mysqli_query($conn, $historyQuery);
                  $history = mysqli_fetch_assoc($historyResult);

                  if ($history) {
                    $lastMileage = $history['Odometer_Reading'];
                    $nextServiceMileage = $lastMileage + $service['Recom_Int_Miles'];
                    $kmLeft = $nextServiceMileage - $currentOdometer;

                    if ($kmLeft <= 0) {
                      $status = "Overdue";
                    }
                    elseif ($kmLeft <= 5000) {
                      $status = "Due Soon";
                    }
                    else {
                      $status = "Healthy";
                    }
                  }
                  else {
                    $kmLeft = "No Record";
                    $status = "Unknown";
                  }
                ?> 
                <tr>
                  <td>
                    <strong class="component">
                      <?php echo $service['Service_Name']; ?>
                    </strong>
                    <span class="component-desc">
                      <?php echo $service['Description']; ?>
                    </span>
                  </td>
                  <td>
                    <?php
                      if ($status == "Healthy") {
                        echo '<span class="badge badge-success">Healthy</span>';
                      }
                      elseif ($status == "Due Soon") {
                        echo '<span class="badge badge-warning">Due Soon</span>';
                      }
                      else {
                        echo '<span class="badge badge-danger">Overdue</span>';
                      } 
                    ?>
                  </td>
                  <td style="text-align: right; font-size: 0.8rem;">
                    <?php
                      if ($kmLeft === "No Record") {
                        echo '<span>No Record</span>';
                      }
                      elseif ($kmLeft < 0) {
                        echo '<span style="color:#ef4444;font-weight:600;">' . $kmLeft . ' km</span>';
                      }
                      elseif ($kmLeft <= 5000) {
                        echo '<span style="color:#f59e0b;font-weight:600;">' . $kmLeft . ' km</span>';
                      }
                      else {
                        echo '<span style="color:#22c55e;font-weight:600;">' . $kmLeft . ' km</span>';
                      }
                    ?>
                  </td>
                </tr>
              <?php } ?>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>

  <nav class="mobile-nav">
    <a href="dashboard.php" class="nav-item"><i class="ph ph-house mobile-nav-labels"></i>Home</a>
    <a href="assigned_vehicle.php" class="nav-item active"><i class="ph ph-truck mobile-nav-labels"></i>Specs</a>
    <a href="mileage.php" class="nav-item"><i class="ph ph-speedometer mobile-nav-labels"></i>Odo</a>
    <a href="maintenance_reminders.php" class="nav-item"><i class="ph ph-bell mobile-nav-labels"></i>Alerts</a>
  </nav>

</body>
</html>