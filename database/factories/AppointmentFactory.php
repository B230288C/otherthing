<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Appointment;
use App\Enums\AppointmentStatus;

class AppointmentFactory extends Factory
{
    protected $model = Appointment::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->safeEmail(),
            'scheduled_at' => $this->faker->dateTimeBetween('+1 days', '+1 month'),
            'status' => AppointmentStatus::PENDING->value,
        ];
    }
}
