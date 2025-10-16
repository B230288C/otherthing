<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\AppointmentStatus;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'scheduled_at',
        'status',
    ];

    // 使用 casts 直接将 status 映射为 Enum
    protected $casts = [
        'status' => AppointmentStatus::class,
        'scheduled_at' => 'datetime',
    ];
}
