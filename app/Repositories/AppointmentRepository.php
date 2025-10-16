<?php

namespace App\Repositories;

use App\Models\Appointment;

class AppointmentRepository
{
    public function all()
    {
        return Appointment::all();
    }

    public function create(array $data)
    {
        return Appointment::create($data);
    }

    public function find(int $id)
    {
        return Appointment::find($id); // 返回 Appointment 或 null
    }

    public function delete(int $id)
    {
        $appointment = $this->find($id);
        if ($appointment) {
            $appointment->delete();
        }
    }
}