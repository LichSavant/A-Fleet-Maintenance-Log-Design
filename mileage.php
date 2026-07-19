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

/* for inserting */

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $odo = $_POST['odoValue'];
    $notes = $_POST['odoNotes'];
    $sql = "INSERT INTO Mileage_Logs
            (Drivers_ID, Log_Date, Odometer_Reading, Mileage_Notes)
            VALUES
            ($driverID, CURDATE(), $odo, '$notes')";

    mysqli_query($conn, $sql);
    header("Location: mileage.php");
    exit;
}

/* for log constraint */

$sql = "
SELECT Odometer_Reading
FROM Mileage_Logs
WHERE Drivers_ID = $driverID
ORDER BY Log_Date DESC
LIMIT 1
";

$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$currentMileage = $row['Odometer_Reading'];

/* for mileage_log history */

$logsQuery = "
SELECT
    Log_Date,
    Odometer_Reading,
    Mileage_Notes
FROM Mileage_Logs
WHERE Drivers_ID = $driverID
ORDER BY Log_Date DESC;
";

$logsResult = mysqli_query($conn, $logsQuery);

/* for driver information */

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

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Odometer Mileage</title>
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
      <a href="mileage.php" class="active">
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
      <div class="grid-2"> 
        <div class="card">
          <h2 class="title">Odometer Entry Log</h2>
          <p class="log-desc">Input current mileage at the end of your shift.</p>
        
          <div id="validationError" class="card error-card">
            <div class="error">
              <i class="ph ph-x-circle error-symbol"></i>
              <span class="error-desc">Odometer value must be higher than <?php echo number_format($currentMileage); ?> km.</span>
            </div>
          </div>

          <form id="mileageForm" method="POST">
            <div class="form-group">
              <label class="form-label">Reference Mileage Reading</label>
              <input type="text" value="<?php echo number_format($currentMileage); ?> km (Last Logged)" class="form-control" disabled style="opacity: 0.6;">
            </div>
            <div class="form-group">
              <label class="form-label">New Odometer Value (km)</label>
              <input type="number" id="odoValue" name="odoValue" class="form-control" placeholder="Enter current dashboard read..." required>
            </div>
            <div class="form-group">
              <label class="form-label">General Log Notes</label>
              <textarea id="odoNotes" name="odoNotes" class="form-control" rows="3" placeholder="Enter trip remarks..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Save Odometer Logs</button>
          </form>
        </div>

        <div class="card">
          <h2 class="title">Recent Logs Submitted</h2>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Odometer</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <?php while($log = mysqli_fetch_assoc($logsResult)) { ?>
                  <tr>
                    <td><?php echo date("M d, Y", strtotime($log['Log_Date'])); ?></td>
                    <td><?php echo number_format($log['Odometer_Reading']); ?> km</td>
                    <td><?php echo $log['Mileage_Notes']; ?></td>
                  </tr>
                <?php } ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>

  <nav class="mobile-nav">
    <a href="dashboard.php" class="nav-item"><i class="ph ph-house mobile-nav-labels"></i>Home</a>
    <a href="assigned_vehicle.php" class="nav-item"><i class="ph ph-truck mobile-nav-labels"></i>Specs</a>
    <a href="mileage.php" class="nav-item active"><i class="ph ph-speedometer mobile-nav-labels"></i>Odo</a>
    <a href="maintenance_reminders.php" class="nav-item"><i class="ph ph-bell mobile-nav-labels"></i>Alerts</a>
  </nav>

  <script>
    document.getElementById('mileageForm').addEventListener('submit', function(e) {
  
      const currentOdo = <?php echo $currentMileage; ?>;
      const inputOdo = parseInt(document.getElementById('odoValue').value);
      const alertBox = document.getElementById('validationError');
      
      if (inputOdo <= currentOdo) {
        e.preventDefault();
        alertBox.style.display = 'block';
      } else {
        alertBox.style.display = 'none';
      }
    });
  </script>

</body>
</html>