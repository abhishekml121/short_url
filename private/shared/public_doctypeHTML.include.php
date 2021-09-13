<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Web font -->
    <link rel="stylesheet" href="<?php echo url_for('/style/main.css'); ?>">
    <link rel="shortcut icon" href="<?php echo url_for('/images/logo.ico'); ?>" />
    <title><?php if(isset($page_title)) { echo h($page_title); } ?></title>
    <!-- CSS animations with JS -->
    <script src="<?php echo url_for('/js/animation/anime.min.js'); ?>"></script>
    <!-- POPUP modals with JS-->
    <script src="<?php echo url_for('/js/sweet_alert.min.js'); ?>"></script>
</head>
<body>
