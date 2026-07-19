-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2026 at 08:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `forgefleet`
--

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `Drivers_ID` int(11) NOT NULL,
  `Employee_Number` varchar(50) DEFAULT NULL,
  `License_Number` varchar(50) DEFAULT NULL,
  `First_Name` varchar(50) NOT NULL,
  `Last_Name` varchar(50) NOT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Vehicle_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`Drivers_ID`, `Employee_Number`, `License_Number`, `First_Name`, `Last_Name`, `Phone`, `Vehicle_ID`) VALUES
(1, 'EMP-1001', 'DL-987654', 'Juan', 'Cruz', '09171234567', 1),
(2, 'EMP-1002', 'DL-987655', 'Maria', 'Santos', '09181234567', 3),
(3, 'EMP-1003', 'DL-987656', 'Carlos', 'Reyes', '09191234567', 4),
(4, 'EMP-1004', 'DL-987657', 'Angela', 'Garcia', '09201234567', 6),
(5, 'EMP-1005', 'DL-987658', 'Miguel', 'Torres', '09211234567', 7);

-- --------------------------------------------------------

--
-- Table structure for table `maintenance_history`
--

CREATE TABLE `maintenance_history` (
  `Main_History_ID` int(11) NOT NULL,
  `Vehicles_ID` int(11) NOT NULL,
  `Service_Date` date NOT NULL,
  `Total_Cost` decimal(10,2) DEFAULT NULL,
  `Odometer_Reading` int(11) DEFAULT NULL,
  `Maintenance_Notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `maintenance_history`
--

INSERT INTO `maintenance_history` (`Main_History_ID`, `Vehicles_ID`, `Service_Date`, `Total_Cost`, `Odometer_Reading`, `Maintenance_Notes`) VALUES
(1, 1, '2026-01-10', 3500.00, 10000, 'Scheduled preventive maintenance.'),
(2, 2, '2026-01-18', 1800.00, 15200, 'Brake inspection completed.'),
(3, 3, '2026-02-05', 2500.00, 8100, 'Tires rotated and balanced.'),
(4, 4, '2026-02-25', 4200.00, 12250, 'Air filter replaced and engine checked.'),
(5, 5, '2026-03-12', 6000.00, 40100, 'Coolant flushed and radiator inspected.'),
(6, 6, '2026-04-01', 7800.00, 30100, 'Transmission fluid replaced.'),
(7, 7, '2026-04-20', 1200.00, 16000, 'Battery health inspection completed.'),
(8, 8, '2026-05-08', 2800.00, 30500, 'Spark plugs replaced.'),
(9, 1, '2026-06-15', 3700.00, 15100, 'Routine oil change and inspection.'),
(10, 4, '2026-07-05', 2200.00, 18100, 'Brake pads adjusted and cleaned.'),
(11, 1, '2026-08-10', 1900.00, 20000, 'Brake inspection during scheduled maintenance.'),
(12, 1, '2026-09-15', 2300.00, 28000, 'Tire rotation performed.'),
(13, 1, '2026-10-20', 1600.00, 36000, 'Engine air filter replaced.'),
(14, 1, '2026-11-18', 4800.00, 44000, 'Coolant flushed and radiator inspected.'),
(15, 1, '2027-01-05', 7200.00, 52000, 'Transmission fluid replaced.'),
(16, 1, '2027-02-12', 900.00, 60000, 'Battery inspection and terminal cleaning.'),
(17, 1, '2027-03-25', 2600.00, 68000, 'Spark plugs replaced.');

-- --------------------------------------------------------

--
-- Table structure for table `mileage_logs`
--

CREATE TABLE `mileage_logs` (
  `Mileage_ID` int(11) NOT NULL,
  `Drivers_ID` int(11) NOT NULL,
  `Log_Date` date NOT NULL,
  `Odometer_Reading` int(11) NOT NULL,
  `Mileage_Notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mileage_logs`
--

INSERT INTO `mileage_logs` (`Mileage_ID`, `Drivers_ID`, `Log_Date`, `Odometer_Reading`, `Mileage_Notes`) VALUES
(1, 1, '2026-07-10', 15230, 'Daily route completed without issues.'),
(2, 1, '2026-07-11', 15310, 'Refueled after shift.'),
(3, 2, '2026-07-10', 28150, 'Transported supplies to warehouse.'),
(4, 2, '2026-07-12', 28340, 'Heavy traffic caused slight delay.'),
(5, 3, '2026-07-11', 41200, 'Completed assigned deliveries.'),
(6, 4, '2026-07-09', 18970, 'Routine inspection completed before trip.'),
(7, 4, '2026-07-12', 19110, 'No issues reported.'),
(8, 5, '2026-07-10', 9875, 'Short-distance city route.'),
(9, 5, '2026-07-11', 9955, 'Vehicle cleaned after shift.'),
(10, 5, '2026-07-13', 10080, 'Weekend delivery schedule completed.'),
(11, 1, '2026-07-17', 15420, 'Completed daily route without issues.'),
(12, 2, '2026-07-17', 28410, 'Finished trip without issues.'),
(13, 1, '2027-03-30', 70000, 'Latest recorded mileage.');

-- --------------------------------------------------------

--
-- Table structure for table `service_maintenance`
--

CREATE TABLE `service_maintenance` (
  `Service_Main_ID` int(11) NOT NULL,
  `Service_ID` int(11) DEFAULT NULL,
  `Main_History_ID` int(11) DEFAULT NULL,
  `Specific_Service_Cost` decimal(10,2) DEFAULT NULL,
  `Service_Status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_maintenance`
--

INSERT INTO `service_maintenance` (`Service_Main_ID`, `Service_ID`, `Main_History_ID`, `Specific_Service_Cost`, `Service_Status`) VALUES
(1, 1, 1, 3500.00, 'Completed'),
(2, 2, 2, 1800.00, 'Completed'),
(3, 3, 3, 2500.00, 'Completed'),
(4, 4, 4, 4200.00, 'Completed'),
(5, 5, 5, 6000.00, 'Completed'),
(6, 6, 6, 7800.00, 'Completed'),
(7, 7, 7, 1200.00, 'Completed'),
(8, 8, 8, 2800.00, 'Completed'),
(9, 1, 9, 3700.00, 'Completed'),
(10, 2, 10, 2200.00, 'Completed'),
(11, 2, 11, 1900.00, 'Completed'),
(12, 3, 12, 2300.00, 'Completed'),
(13, 4, 13, 1600.00, 'Completed'),
(14, 5, 14, 4800.00, 'Completed'),
(15, 6, 15, 7200.00, 'Completed'),
(16, 7, 16, 900.00, 'Completed'),
(17, 8, 17, 2600.00, 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `service_type`
--

CREATE TABLE `service_type` (
  `Service_ID` int(11) NOT NULL,
  `Service_Name` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `Recom_Int_Miles` int(11) DEFAULT NULL,
  `Recom_Int_Days` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_type`
--

INSERT INTO `service_type` (`Service_ID`, `Service_Name`, `Description`, `Recom_Int_Miles`, `Recom_Int_Days`) VALUES
(1, 'Engine Oil & Filter Change', 'Replace oil and filter for peak engine performance.', 5000, 180),
(2, 'Brake Inspection', 'Check pads, rotors, and components for safety and wear.', 10000, 365),
(3, 'Tire Rotation', 'Rotate tires to ensure even wear and extend lifespan.', 8000, 180),
(4, 'Air Filter Replacement', 'Replace the engine filter to maximize airflow and efficiency.', 12000, 365),
(5, 'Coolant Flush', 'Renew engine coolant to prevent overheating and corrosion.', 40000, 730),
(6, 'Transmission Fluid Change', 'Change fluid to ensure smooth shifting and gear protection.', 30000, 730),
(7, 'Battery Inspection', 'Test battery, terminals, and charging system health.', 15000, 365),
(8, 'Spark Plug Replacement', 'Install new plugs to maintain fuel economy and power.', 30000, 1095);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `Vehicle_ID` int(11) NOT NULL,
  `License_Plate` varchar(20) DEFAULT NULL,
  `VIN` varchar(50) DEFAULT NULL,
  `Model` varchar(50) NOT NULL,
  `Vehicle_Year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`Vehicle_ID`, `License_Plate`, `VIN`, `Model`, `Vehicle_Year`) VALUES
(1, 'ABC-1234', '1HGCM82633A100001', 'Toyota HiAce', 2021),
(2, 'DEF-5678', '1HGCM82633A100002', 'Mitsubishi L300', 2020),
(3, 'GHI-9012', '1HGCM82633A100003', 'Isuzu Traviz', 2022),
(4, 'JKL-3456', '1HGCM82633A100004', 'Toyota Hilux', 2023),
(5, 'MNO-7890', '1HGCM82633A100005', 'Nissan Urvan', 2021),
(6, 'PQR-2345', '1HGCM82633A100006', 'Ford Ranger', 2022),
(7, 'STU-6789', '1HGCM82633A100007', 'Hyundai H-100', 2020),
(8, 'VWX-1122', '1HGCM82633A100008', 'Suzuki Carry', 2024);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`Drivers_ID`),
  ADD UNIQUE KEY `Employee_Number` (`Employee_Number`),
  ADD UNIQUE KEY `License_Number` (`License_Number`),
  ADD KEY `fk_drivers_vehicles` (`Vehicle_ID`);

--
-- Indexes for table `maintenance_history`
--
ALTER TABLE `maintenance_history`
  ADD PRIMARY KEY (`Main_History_ID`),
  ADD KEY `Vehicles_ID` (`Vehicles_ID`);

--
-- Indexes for table `mileage_logs`
--
ALTER TABLE `mileage_logs`
  ADD PRIMARY KEY (`Mileage_ID`),
  ADD KEY `Drivers_ID` (`Drivers_ID`);

--
-- Indexes for table `service_maintenance`
--
ALTER TABLE `service_maintenance`
  ADD PRIMARY KEY (`Service_Main_ID`),
  ADD KEY `Service_ID` (`Service_ID`),
  ADD KEY `Main_History_ID` (`Main_History_ID`);

--
-- Indexes for table `service_type`
--
ALTER TABLE `service_type`
  ADD PRIMARY KEY (`Service_ID`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`Vehicle_ID`),
  ADD UNIQUE KEY `License_Plate` (`License_Plate`),
  ADD UNIQUE KEY `VIN` (`VIN`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `Drivers_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `maintenance_history`
--
ALTER TABLE `maintenance_history`
  MODIFY `Main_History_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `mileage_logs`
--
ALTER TABLE `mileage_logs`
  MODIFY `Mileage_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `service_maintenance`
--
ALTER TABLE `service_maintenance`
  MODIFY `Service_Main_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `service_type`
--
ALTER TABLE `service_type`
  MODIFY `Service_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `drivers`
--
ALTER TABLE `drivers`
  ADD CONSTRAINT `fk_drivers_vehicles` FOREIGN KEY (`Vehicle_ID`) REFERENCES `vehicles` (`Vehicle_ID`);

--
-- Constraints for table `maintenance_history`
--
ALTER TABLE `maintenance_history`
  ADD CONSTRAINT `maintenance_history_ibfk_1` FOREIGN KEY (`Vehicles_ID`) REFERENCES `vehicles` (`Vehicle_ID`);

--
-- Constraints for table `mileage_logs`
--
ALTER TABLE `mileage_logs`
  ADD CONSTRAINT `mileage_logs_ibfk_1` FOREIGN KEY (`Drivers_ID`) REFERENCES `drivers` (`Drivers_ID`);

--
-- Constraints for table `service_maintenance`
--
ALTER TABLE `service_maintenance`
  ADD CONSTRAINT `service_maintenance_ibfk_1` FOREIGN KEY (`Service_ID`) REFERENCES `service_type` (`Service_ID`),
  ADD CONSTRAINT `service_maintenance_ibfk_2` FOREIGN KEY (`Main_History_ID`) REFERENCES `maintenance_history` (`Main_History_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
