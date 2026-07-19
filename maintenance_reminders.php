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
    v.Vehicle_ID
FROM Drivers d
JOIN Vehicles v
ON d.Vehicle_ID = v.Vehicle_ID
WHERE d.Drivers_ID = $driverID;
";

$vehicleResult = mysqli_query($conn, $vehicleQuery);

$vehicle = mysqli_fetch_assoc($vehicleResult);

/* for schedule timeline */

$serviceQuery = "
SELECT
    Service_ID,
    Service_Name,
    Description,
    Recom_Int_Miles
FROM Service_Type;
";

$serviceResult = mysqli_query($conn, $serviceQuery);

/* current mileage */

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

/* for maintenance history */

$historyQuery = "
SELECT
    mh.Service_Date,
    st.Service_Name,
    mh.Odometer_Reading,
    sm.Specific_Service_Cost

FROM Maintenance_History mh

JOIN Service_Maintenance sm
ON mh.Main_History_ID = sm.Main_History_ID

JOIN Service_Type st
ON sm.Service_ID = st.Service_ID

WHERE mh.Vehicles_ID = " . $vehicle['Vehicle_ID'] . "

ORDER BY mh.Service_Date DESC;
";

$historyResult = mysqli_query($conn, $historyQuery);

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Maintenance Reminders</title>
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
      <a href="assigned_vehicle.php">
        <i class="ph ph-truck"></i> Your Vehicle
      </a>
      <a href="mileage.php">
        <i class="ph ph-speedometer"></i> Mileage
      </a>
      <a href="maintenance_reminders.php" class="active">
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
        <h2 class="title">
          Preventive Maintenance Timeline
        </h2>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Routine Scheduled Service</th>
                <th>Recommended Schedule</th>
                <th>Status Remaining</th>
                <th>Notify Mechanic</th>
              </tr>
            </thead>
            <tbody>
              <?php 
              $hasReminder = false;

              while ($service = mysqli_fetch_assoc($serviceResult)) { ?>

                <?php 
                  $lastServiceQuery = "
                  SELECT mh.Odometer_Reading
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
                  
                  /* */

                  if ($lastService) {
                    $lastMileage = $lastService['Odometer_Reading'];
                  }
                  else {
                    $lastMileage = 0;
                  }

                  $nextMileage = $lastMileage + $service['Recom_Int_Miles'];
                  $kmLeft = $nextMileage - $currentOdometer;
                  
                  if ($kmLeft > 5000) {
                    continue;
                  }
                  $hasReminder = true;
                ?>
                <tr>
                  <td>
                    <?php echo $service['Service_Name']; ?>
                  </td>
                  <td>
                    Every <?php echo number_format($service['Recom_Int_Miles']); ?> km
                  </td>
                  <td>
                    <?php
                      if ($kmLeft < 0) {
                        echo '<span class="badge badge-danger">Overdue by '
                        . abs($kmLeft) .
                        ' km</span>';
                      }
                      else {
                        echo '<span class="badge badge-warning">'
                        . $kmLeft .
                        ' km Left</span>';
                      }
                    ?>    
                  </td>
                  <td>
                    <button class="btn btn-secondary-flag"> Notify </button>
                  </td>
                </tr>
              <?php } ?>
              <?php
                if (!$hasReminder) {
                  echo "
                  <tr>
                    <td colspan='4' style='text-align:center;'>
                      No upcoming maintenance reminders.
                    </td>
                  </tr>";
                }
              ?>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h2 class="title">Complete Service Records Archive</h2>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Service Date</th>
                <th>Service</th>
                <th>Odometer</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <?php while ($history = mysqli_fetch_assoc($historyResult)) { ?>
                <tr>
                  <td>
                    <?php echo $history['Service_Date']; ?>
                  </td>
                  <td>
                    <?php echo $history['Service_Name']; ?>
                  </td>
                  <td>
                    <?php echo number_format($history['Odometer_Reading']); ?> km
                  </td>
                  <td>
                    ₱<?php echo number_format($history['Specific_Service_Cost'], 2); ?>
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
    <a href="assigned_vehicle.php" class="nav-item"><i class="ph ph-truck mobile-nav-labels"></i>Specs</a>
    <a href="mileage.php" class="nav-item"><i class="ph ph-speedometer mobile-nav-labels"></i>Odo</a>
    <a href="maintenance_reminders.php" class="nav-item active"><i class="ph ph-bell mobile-nav-labels"></i>Alerts</a>
  </nav>

</body>
</html>