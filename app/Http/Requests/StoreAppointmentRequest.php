<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\AppointmentStatus;

class StoreAppointmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'email' => 'required|email',
            'scheduled_at' => 'required|date',
            'status' => 'required|in:' . implode(',', array_column(AppointmentStatus::cases(), 'value')),
        ];
    }
}
