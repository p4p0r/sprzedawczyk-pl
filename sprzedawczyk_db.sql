-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 05 Lis 2024, 21:39
-- Wersja serwera: 10.4.17-MariaDB
-- Wersja PHP: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `sprzedawczyk_db`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `phone` int(9) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `phone`, `admin`) VALUES
(1, 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin@sprzedawczyk.pl', NULL, 1),
(2, 'jankowalski', 'a15f8ae07675bfb96e084bfb4f52fb2c22091061aae86e0eb76a55f4e52dd74e', '', 121314151, 0),
(3, 'pogromcasumuw', 'b261075ce18ed79d978406c2f0c8bd1bdd7719a4c643d6a28deac3214cf3a7c9', 'email@example.com', 999999999, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(30) NOT NULL,
  `location` varchar(20) NOT NULL,
  `category` enum('automotive','electronics','clothing','home','children','activity','other') NOT NULL,
  `description` varchar(512) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `title`, `location`, `category`, `description`, `price`, `image`) VALUES
(1, 2, 'Polonez', 'Kraków', 'automotive', 'Samochód jest po lekkich modyfikacjach, jak widać na zdjęciu. Na hamowni pokazał zaledwie 750KM. Oddam w dobre ręce.', 48500, 'uploads/1730838581792_poldon.jpg'),
(2, 2, 'Hamaki na zamówienie', 'Kraków', 'home', '', 1, 'null'),
(3, 1, 'szybkie laczki', 'Łomża', 'clothing', 'sprzedam takie szybkie laczki eleganckie sportowe rozmiar 52.5', 4, 'uploads/1730838713171_laczki.jpg'),
(4, 3, 'spszedam gruz 1 tona', 'Gruzownia', 'other', '', 15, 'uploads/1730838856135_gruz.jpg'),
(5, 3, 'bmw e46 coupe stan igła', 'Gruzownia', 'automotive', 'sprzedam bmw e46 w coupe, stan igła jak na załączonym obrazku, prosto od niemca(płakał jak sprzedawał), niejeżdżone, sprzedaje bo wolę jednak sejczento', 6000, 'uploads/1730838980310_bmw.jpg');

-- --------------------------------------------------------


--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
