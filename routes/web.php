<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/calendar', function () {
    return view('calendar');
// phpcs:ignore PSR2.Files.EndFileNewline.NoneFound
});