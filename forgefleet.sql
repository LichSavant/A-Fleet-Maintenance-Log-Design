-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2026 at 04:42 PM
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
  `Phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`Drivers_ID`, `Employee_Number`, `License_Number`, `First_Name`, `Last_Name`, `Phone`) VALUES
(1, 'EMP-1001', 'DL-987654', 'Juan', 'Cruz', '09171234567'),
(2, 'EMP-1002', 'DL-987655', 'Maria', 'Santos', '09181234567'),
(3, 'EMP-1003', 'DL-987656', 'Carlos', 'Reyes', '09191234567'),
(4, 'EMP-1004', 'DL-987657', 'Angela', 'Garcia', '09201234567'),
(5, 'EMP-1005', 'DL-987658', 'Miguel', 'Torres', '09211234567');

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
(12, 2, '2026-07-17', 28410, 'Finished trip without issues.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`Drivers_ID`),
  ADD UNIQUE KEY `Employee_Number` (`Employee_Number`),
  ADD UNIQUE KEY `License_Number` (`License_Number`);

--
-- Indexes for table `mileage_logs`
--
ALTER TABLE `mileage_logs`
  ADD PRIMARY KEY (`Mileage_ID`),
  ADD KEY `Drivers_ID` (`Drivers_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mileage_logs`
--
ALTER TABLE `mileage_logs`
  MODIFY `Mileage_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mileage_logs`
--
ALTER TABLE `mileage_logs`
  ADD CONSTRAINT `mileage_logs_ibfk_1` FOREIGN KEY (`Drivers_ID`) REFERENCES `drivers` (`Drivers_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
