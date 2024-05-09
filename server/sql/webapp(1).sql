-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 09, 2024 at 07:44 PM
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
-- Database: `webapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `entry`
--

CREATE TABLE `entry` (
  `entry_id` int(11) NOT NULL,
  `entry_description` varchar(5000) NOT NULL,
  `entry_score` int(11) NOT NULL,
  `games_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `game` varchar(1000) NOT NULL,
  `picture` varchar(256) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `game`, `picture`, `description`, `score`) VALUES
(1, 'Operation Wolf', 'Operation Wolf (Japan).png', 'A good game about a wolf', 100),
(3, 'Psychic Storm (CD) (Japan)', 'Psychic Storm (CD) (Japan).png', 'This is about a psychic battling bad guys!', 99),
(4, 'Shinobi (Japan)', 'Shinobi (Japan).png', 'I like ninjas, so should you!', 82),
(43, 'Break In (Japan)', 'Break In (Japan).png', 'A game of Pool!', 55),
(49, 'Batman (Japan)', 'Batman (Japan).png', 'It\'s batman but in Japanese!', 100),
(90, 'Kore ga Pro Yakyuu _90 (Japan)', 'Kore ga Pro Yakyuu _90 (Japan).png', 'これがプロ野球！！！！！\r\n\r\nPro baseball gameplay.\r\n\r\nDo not recommend.', 25),
(321, 'Chibi Maruko-chan - Quiz de Piihyara (Japan)', 'Chibi Maruko-chan - Quiz de Piihyara (Japan).png', 'かわいいいいいいいいい', 100),
(331, 'Adventure Island (Dragon_s Curse) (Japan)', 'Adventure Island (Dragon_s Curse) (Japan).png', 'Good ol\' dragon ball', 84),
(456, 'Bomberman (Japan)', 'Bomberman (Japan).png', 'This game also comes on xbox360. I spent many an hour playing this', 87),
(900, 'Gunhed (Blazing Lazers) (Japan)', 'Gunhed (Blazing Lazers) (Japan).png', 'Fun mecha shooter.', 90),
(901, 'Ys IV - The Dawn of Ys (CD) (Japan)', 'Ys IV - The Dawn of Ys (CD) (Japan).png', 'A fun power fantasy', 73),
(902, 'Downtown Nekketsu Monagatari (CD) (Japan)', 'Downtown Nekketsu Monagatari (CD) (Japan).png', 'An incredibly buggy game, I couldn\'t even get it to load!', 0),
(903, 'Nectaris (Military Madness) (Japan)', 'Nectaris (Military Madness) (Japan).png', 'Basically tron, but worse.', 62),
(904, 'Necros no Yousai (Japan)', 'Necros no Yousai (Japan).png', 'A fantasy about killing the king of hell.\r\nIT was ok', 60),
(905, 'Nazo No Masquerade (Japan)', 'Nazo No Masquerade (Japan).png', 'Kind of reminded me of Lain. 0/100 would not play again.', 0),
(906, 'Naxat Stadium (Japan)', 'Naxat Stadium (Japan).png', 'Another Naxat game. Average', 50),
(907, 'Naxat Open (Japan)', 'Naxat Open (Japan).png', 'Its naxat baseball, but golf - Average\r\n', 50),
(908, 'Narazumono Sentou Butai (Bloody Wolf) (Japan)', 'Narazumono Sentou Butai (Bloody Wolf) (Japan).png', 'It\'s ranbo! Very patriotic', 100);

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `id` int(10) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `entry`
--
ALTER TABLE `entry`
  ADD PRIMARY KEY (`entry_id`),
  ADD KEY `for` (`games_id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `entry`
--
ALTER TABLE `entry`
  MODIFY `entry_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=916;

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `entry`
--
ALTER TABLE `entry`
  ADD CONSTRAINT `for` FOREIGN KEY (`games_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
