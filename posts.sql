-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 03 Lis 2024, 18:24
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
(2, 1, 'Sraka', 'zbąsznek', 'children', 'siema morda slucha mnie wolka i slucha pucha leci kolejna zwrotka klasycznie od serducha zpeirdole bucha rzezucha zajebista rudowlosa koza jasnozielonoe srebrzysta zajebista piyszna trawka narkotyczna potem dunkelek z grodzkiej jestem smakoszem piwka stoimy pod blokiem za rogiem lypie dziwka jest wena jest nagrywka sa psy to swzybka zrywka blsczec jak kryzsztal lepiej swiecic przykladem malolat nie dygaj lipa jest damy rade pomagac se trzeba w ogien isc za bratem zjebal sie pedal jedziemy calym skladem nawi', 69420, 'undefined'),
(3, 1, 'Sraka', 'zbąsznek', 'children', 'siema morda slucha mnie wolka i slucha pucha leci kolejna zwrotka klasycznie od serducha zpeirdole bucha rzezucha zajebista rudowlosa koza jasnozielonoe srebrzysta zajebista piyszna trawka narkotyczna potem dunkelek z grodzkiej jestem smakoszem piwka stoimy pod blokiem za rogiem lypie dziwka jest wena jest nagrywka sa psy to swzybka zrywka blsczec jak kryzsztal lepiej swiecic przykladem malolat nie dygaj lipa jest damy rade pomagac se trzeba w ogien isc za bratem zjebal sie pedal jedziemy calym skladem nawi', 69420, 'undefined'),
(4, 1, 'Sraka', 'zbąsznek', 'children', 'siema morda slucha mnie wolka i slucha pucha leci kolejna zwrotka klasycznie od serducha zpeirdole bucha rzezucha zajebista rudowlosa koza jasnozielonoe srebrzysta zajebista piyszna trawka narkotyczna potem dunkelek z grodzkiej jestem smakoszem piwka stoimy pod blokiem za rogiem lypie dziwka jest wena jest nagrywka sa psy to swzybka zrywka blsczec jak kryzsztal lepiej swiecic przykladem malolat nie dygaj lipa jest damy rade pomagac se trzeba w ogien isc za bratem zjebal sie pedal jedziemy calym skladem nawi', 69420, 'undefined'),
(5, 1, 'Sraka', 'zbąsznek', 'children', 'siema morda slucha mnie wolka i slucha pucha leci kolejna zwrotka klasycznie od serducha zpeirdole bucha rzezucha zajebista rudowlosa koza jasnozielonoe srebrzysta zajebista piyszna trawka narkotyczna potem dunkelek z grodzkiej jestem smakoszem piwka stoimy pod blokiem za rogiem lypie dziwka jest wena jest nagrywka sa psy to swzybka zrywka blsczec jak kryzsztal lepiej swiecic przykladem malolat nie dygaj lipa jest damy rade pomagac se trzeba w ogien isc za bratem zjebal sie pedal jedziemy calym skladem nawi', 69420, '/uploads/1730634316677_xdddddddddddddddddd.png'),
(6, 3, 'Opel calibra 6.0', 'mymon', 'automotive', '', 9, 'null'),
(7, 3, 'cosik', 'miasto', 'other', '', 450, '/uploads/1730653794014_1900x1900-000000-80-0-0.jpg'),
(8, 3, 'asdsada', 'asdada', 'other', '', 3223, '/uploads/1730653950257_1900x1900-000000-80-0-0.jpg'),
(9, 3, 'asdad', 'asdad', 'other', 'asdsad', 21313, '/uploads/1730654018680_logo.png'),
(10, 3, 'zxcxzc', 'zxcxzczc', 'other', '', 321, 'uploads/1730654209959_1900x1900-000000-80-0-0.jpg');

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
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
