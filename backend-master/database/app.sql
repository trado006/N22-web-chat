-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 26, 2021 lúc 11:02 AM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 7.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `app`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `content` text CHARACTER SET utf8 NOT NULL,
  `image_url` text CHARACTER SET utf8 DEFAULT NULL,
  `post_id` int(1) UNSIGNED NOT NULL,
  `user_id` int(1) UNSIGNED NOT NULL,
  `relate_comment_id` int(1) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`id`, `content`, `image_url`, `post_id`, `user_id`, `relate_comment_id`, `created_at`, `updated_at`) VALUES
(1, 'comment post 1 of user1', NULL, 1, 1, NULL, '2021-12-25 08:49:41', '2021-12-25 08:49:41'),
(2, 'comment post 1 of user2', NULL, 1, 2, NULL, '2021-12-25 08:50:06', '2021-12-25 08:50:06'),
(3, 'comment post 2 of user2', NULL, 2, 2, NULL, '2021-12-25 08:52:43', '2021-12-25 08:52:43'),
(4, 'comment post 4 of user2', NULL, 4, 2, NULL, '2021-12-25 08:54:33', '2021-12-25 08:54:33'),
(5, 'comment post 4 of user1', NULL, 4, 1, NULL, '2021-12-25 08:54:43', '2021-12-25 08:54:43'),
(6, 'coog than', NULL, 3, 8, NULL, '2021-12-25 20:21:22', '2021-12-25 20:21:22'),
(7, 'do kim tra da tung binh luan', NULL, 5, 8, NULL, '2021-12-25 20:21:50', '2021-12-25 20:21:50'),
(8, 'công tam', NULL, 14, 8, NULL, '2021-12-25 20:52:53', '2021-12-25 20:52:53'),
(9, 'nghệ thuật đàm phán', NULL, 6, 8, NULL, '2021-12-25 21:00:11', '2021-12-25 21:00:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `friend_requests`
--

CREATE TABLE `friend_requests` (
  `id` int(10) UNSIGNED NOT NULL,
  `status` tinyint(1) UNSIGNED NOT NULL,
  `sender_id` int(1) UNSIGNED NOT NULL,
  `receiver_id` int(1) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `friend_requests`
--

INSERT INTO `friend_requests` (`id`, `status`, `sender_id`, `receiver_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 2, '2021-12-25 12:04:45', '2021-12-25 12:04:45'),
(20, 1, 8, 3, '2021-12-25 21:25:51', '2021-12-25 21:25:51'),
(21, 1, 8, 1, '2021-12-25 21:52:13', '2021-12-25 21:52:13'),
(22, 1, 3, 1, '2021-12-25 22:03:41', '2021-12-25 22:03:41'),
(23, 1, 5, 1, '2021-12-25 22:04:56', '2021-12-25 22:04:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `like_post`
--

CREATE TABLE `like_post` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` tinyint(1) UNSIGNED NOT NULL,
  `post_id` int(1) UNSIGNED NOT NULL,
  `user_id` int(1) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `like_post`
--

INSERT INTO `like_post` (`id`, `type`, `post_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 1, '2021-12-25 08:29:38', '2021-12-25 08:29:38'),
(3, 2, 4, 1, '2021-12-25 08:30:16', '2021-12-25 08:30:16'),
(5, 4, 1, 2, '2021-12-25 08:48:21', '2021-12-25 08:48:21'),
(6, 1, 1, 8, '2021-12-25 20:14:50', '2021-12-25 20:14:50'),
(7, 2, 14, 8, '2021-12-25 21:00:58', '2021-12-25 21:00:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messages`
--

CREATE TABLE `messages` (
  `id` int(10) UNSIGNED NOT NULL,
  `content` text CHARACTER SET utf8 NOT NULL,
  `attach_name` text CHARACTER SET utf8 DEFAULT NULL,
  `sender_id` int(1) UNSIGNED NOT NULL,
  `receiver_id` int(1) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `messages`
--

INSERT INTO `messages` (`id`, `content`, `attach_name`, `sender_id`, `receiver_id`, `created_at`, `updated_at`) VALUES
(1, 'hello', NULL, 8, 3, '2021-12-25 22:23:05', '2021-12-25 22:23:05'),
(2, 'where are you now', NULL, 8, 3, '2021-12-25 22:23:33', '2021-12-25 22:23:33'),
(3, 'c ho', NULL, 3, 8, '2021-12-25 22:23:57', '2021-12-25 22:23:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(23, '20181209132910_create_users_table.js', 1, '2021-12-24 16:56:28'),
(24, '20210112132915_create_posts_table.js', 1, '2021-12-24 16:56:29'),
(25, '20210112132918_create_share_table.js', 1, '2021-12-24 16:56:29'),
(26, '20210112132920_create_like_post_table.js', 1, '2021-12-24 16:56:29'),
(27, '20210112132923_create_comment_post_table.js', 1, '2021-12-24 16:56:29'),
(28, '20210112132925_create_friend_requests_table.js', 1, '2021-12-24 16:56:29'),
(29, '20210112132927_create_chats_table.js', 1, '2021-12-24 16:56:29'),
(30, '20210112132929_create_notifications_table.js', 1, '2021-12-24 16:56:29'),
(31, '20210112132932_add_typle_column_into_posts_table.js', 1, '2021-12-24 16:56:29'),
(32, '20210112132935_add_cover_link_column_into_users_table.js', 2, '2021-12-24 16:57:39'),
(33, '20210112132938_add_unique_like_post_table.js', 2, '2021-12-24 16:57:39');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations_lock`
--

CREATE TABLE `migrations_lock` (
  `index` int(10) UNSIGNED NOT NULL,
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations_lock`
--

INSERT INTO `migrations_lock` (`index`, `is_locked`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `content` text CHARACTER SET utf8 NOT NULL,
  `image_url` text CHARACTER SET utf8 DEFAULT NULL,
  `status` tinyint(1) UNSIGNED NOT NULL,
  `user_id` int(1) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `id` int(10) UNSIGNED NOT NULL,
  `content` text CHARACTER SET utf8 DEFAULT NULL,
  `type` tinyint(1) UNSIGNED NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `user_id` int(1) UNSIGNED NOT NULL,
  `status` tinyint(1) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`id`, `content`, `type`, `image_url`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'comment 1', 2, NULL, 1, 1, '2021-12-25 08:25:19', '2021-12-25 08:25:19'),
(2, 'comment 2', 2, NULL, 1, 1, '2021-12-25 08:25:39', '2021-12-25 08:25:39'),
(3, 'comment 1', 2, NULL, 2, 1, '2021-12-25 08:26:52', '2021-12-25 08:26:52'),
(4, 'comment 2 of user 2', 2, NULL, 2, 1, '2021-12-25 08:27:06', '2021-12-25 08:27:06'),
(5, 'comment 3 of user 2', 2, NULL, 2, 1, '2021-12-25 08:27:11', '2021-12-25 08:27:11'),
(6, 'có công chuyện', 2, NULL, 8, 1, '2021-12-25 20:33:30', '2021-12-25 20:33:30'),
(7, 'có công chuyện', 2, NULL, 8, 1, '2021-12-25 20:33:30', '2021-12-25 20:33:30'),
(8, 'có công chuyện', 2, NULL, 8, 1, '2021-12-25 20:34:03', '2021-12-25 20:34:03'),
(9, 'có công chuyện', 2, NULL, 8, 1, '2021-12-25 20:34:03', '2021-12-25 20:34:03'),
(10, 'có công chuyện', 2, NULL, 8, 1, '2021-12-25 20:45:47', '2021-12-25 20:45:47'),
(11, 'có công chuyện', 2, NULL, 8, 1, '2021-12-25 20:47:38', '2021-12-25 20:47:38'),
(12, 'có công chuyện', 2, NULL, 8, 1, '2021-12-25 20:48:41', '2021-12-25 20:48:41'),
(13, 'có công chuyện', 2, NULL, 8, 1, '2021-12-25 20:50:45', '2021-12-25 20:50:45'),
(14, 'có công chuyện', 2, 'images/post_14.jpg', 8, 1, '2021-12-25 20:51:16', '2021-12-25 20:51:16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `share`
--

CREATE TABLE `share` (
  `id` int(10) UNSIGNED NOT NULL,
  `post_id` int(1) UNSIGNED NOT NULL,
  `user_id` int(1) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(127) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `full_name` varchar(127) CHARACTER SET utf8 NOT NULL,
  `mssv` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(127) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `gender` tinyint(1) UNSIGNED NOT NULL,
  `birthday` date DEFAULT NULL,
  `province` varchar(63) CHARACTER SET utf8 DEFAULT NULL,
  `district` varchar(63) CHARACTER SET utf8 DEFAULT NULL,
  `status` tinyint(1) UNSIGNED NOT NULL,
  `avatar_url` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `cover_url` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `slogan` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `email`, `full_name`, `mssv`, `password`, `gender`, `birthday`, `province`, `district`, `status`, `avatar_url`, `cover_url`, `slogan`, `location`, `created_at`, `updated_at`) VALUES
(1, 'user1@gmail.com', 'bot 1', '20180001', '$2a$10$X.uLxMQeDOpWxoxUpMKIzeKMPCh.HK4CbweRGkveqgst04SQ9rYTO', 1, '2000-03-02', 'Thành phố  Hà Nội', 'Đông Anh', 1, '', NULL, 'Trói em bằng cà vạt', '....', '2021-12-24 16:58:46', '2021-12-24 16:58:46'),
(2, 'user2@gmail.com', 'bot 2', '20180002', '$2a$10$X.uLxMQeDOpWxoxUpMKIzeKMPCh.HK4CbweRGkveqgst04SQ9rYTO', 1, '2000-03-02', 'Thành phố  Hà Nội', 'Đông Anh', 1, '', NULL, 'Trói em bằng cà vạt', '....', '2021-12-24 16:58:46', '2021-12-24 16:58:46'),
(3, 'user3@gmail.com', 'bot 3', '20180003', '$2a$10$X.uLxMQeDOpWxoxUpMKIzeKMPCh.HK4CbweRGkveqgst04SQ9rYTO', 1, '2000-03-02', 'Thành phố  Hà Nội', 'Đông Anh', 1, '', NULL, 'Trói em bằng cà vạt', '....', '2021-12-24 16:58:46', '2021-12-24 16:58:46'),
(4, 'user4@gmail.com', 'bot 4', '20180004', '$2a$10$X.uLxMQeDOpWxoxUpMKIzeKMPCh.HK4CbweRGkveqgst04SQ9rYTO', 1, '2000-03-02', 'Thành phố  Hà Nội', 'Đông Anh', 1, '', NULL, 'Trói em bằng cà vạt', '....', '2021-12-24 16:58:46', '2021-12-24 16:58:46'),
(5, 'user5@gmail.com', 'bot 5', '20180005', '$2a$10$X.uLxMQeDOpWxoxUpMKIzeKMPCh.HK4CbweRGkveqgst04SQ9rYTO', 1, '2000-03-02', 'Thành phố  Hà Nội', 'Đông Anh', 1, '', NULL, 'Trói em bằng cà vạt', '....', '2021-12-24 16:58:46', '2021-12-24 16:58:46'),
(6, 'user6@gmail.com', 'bot 6', '20180006', '$2a$10$X.uLxMQeDOpWxoxUpMKIzeKMPCh.HK4CbweRGkveqgst04SQ9rYTO', 1, '2000-03-02', 'Thành phố  Hà Nội', 'Đông Anh', 1, '', NULL, 'Trói em bằng cà vạt', '....', '2021-12-24 16:58:46', '2021-12-24 16:58:46'),
(7, 'user7@gmail.com', 'bot 1', '20180007', '$2a$10$X.uLxMQeDOpWxoxUpMKIzeKMPCh.HK4CbweRGkveqgst04SQ9rYTO', 1, '2000-03-02', 'Thành phố  Hà Nội', 'Đông Anh', 1, '', NULL, 'Trói em bằng cà vạt', '....', '2021-12-24 16:58:46', '2021-12-24 16:58:46'),
(8, 'tra.dk183999@sis.hust.edu.vn', 'tieu tam 1', '20183999', '$2b$10$IkmQ5SJJ2SJJdcR4fyudqOghnf9C4jhI6WuMu3XZRqp8I23b7mj3e', 0, NULL, 'Ho noi', 'thụy khuê', 1, 'images/avatar_8.jpg', NULL, 'Trói em bằng cà phạm', NULL, '2021-12-25 17:28:50', '2021-12-25 17:28:50');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_relate_comment_id_foreign` (`relate_comment_id`),
  ADD KEY `comments_user_id_index` (`user_id`),
  ADD KEY `comments_post_id_index` (`post_id`);

--
-- Chỉ mục cho bảng `friend_requests`
--
ALTER TABLE `friend_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `friend_requests_sender_id_receiver_id_unique` (`sender_id`,`receiver_id`),
  ADD KEY `friend_requests_sender_id_index` (`sender_id`),
  ADD KEY `friend_requests_receiver_id_index` (`receiver_id`);

--
-- Chỉ mục cho bảng `like_post`
--
ALTER TABLE `like_post`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `like_post_post_id_user_id_unique` (`post_id`,`user_id`),
  ADD KEY `like_post_user_id_index` (`user_id`),
  ADD KEY `like_post_post_id_index` (`post_id`);

--
-- Chỉ mục cho bảng `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_sender_id_index` (`sender_id`),
  ADD KEY `messages_receiver_id_index` (`receiver_id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations_lock`
--
ALTER TABLE `migrations_lock`
  ADD PRIMARY KEY (`index`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_index` (`user_id`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_user_id_index` (`user_id`);

--
-- Chỉ mục cho bảng `share`
--
ALTER TABLE `share`
  ADD PRIMARY KEY (`id`),
  ADD KEY `share_user_id_index` (`user_id`),
  ADD KEY `share_post_id_index` (`post_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `mssv` (`mssv`),
  ADD KEY `users_email_index` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `friend_requests`
--
ALTER TABLE `friend_requests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `like_post`
--
ALTER TABLE `like_post`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT cho bảng `migrations_lock`
--
ALTER TABLE `migrations_lock`
  MODIFY `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `share`
--
ALTER TABLE `share`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `comments_relate_comment_id_foreign` FOREIGN KEY (`relate_comment_id`) REFERENCES `comments` (`id`),
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `friend_requests`
--
ALTER TABLE `friend_requests`
  ADD CONSTRAINT `friend_requests_receiver_id_foreign` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `friend_requests_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `like_post`
--
ALTER TABLE `like_post`
  ADD CONSTRAINT `like_post_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `like_post_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_receiver_id_foreign` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `share`
--
ALTER TABLE `share`
  ADD CONSTRAINT `share_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `share_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
