<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppointmentController;

Route::get('/appointments', [AppointmentController::class, 'index']);
Route::post('/appointments', [AppointmentController::class, 'store']);
Route::patch('/appointments/{id}/status', [AppointmentController::class, 'updateStatus']); // 状态更新
// phpcs:ignore PSR2.Files.EndFileNewline.NoneFound
Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);