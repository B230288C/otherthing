<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Repositories\AppointmentRepository;
use App\Jobs\SendAppointmentConfirmation;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    protected AppointmentRepository $repo;

    public function __construct(AppointmentRepository $repo)
    {
        $this->repo = $repo;
    }

    public function index()
    {
        $appointments = $this->repo->all();
        return AppointmentResource::collection($appointments);
    }

    public function store(StoreAppointmentRequest $request)
    {
        $data = $request->validated();

        // 强制默认状态为 pending
        $data['status'] = \App\Enums\AppointmentStatus::PENDING->value;

        $appointment = $this->repo->create($data);

        SendAppointmentConfirmation::dispatch($appointment);

        return new AppointmentResource($appointment);
    }

    // 更新状态
    public function updateStatus(Request $request, $id)
    {
        $appointment = $this->repo->find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }

        $status = $request->input('status');

        // 验证 status 是否为 Enum
        if (!in_array($status, array_column(\App\Enums\AppointmentStatus::cases(), 'value'))) {
            return response()->json(['message' => 'Invalid status'], 422);
        }

        $appointment->status = $status;
        $appointment->save();

        return new AppointmentResource($appointment);
    }

    // 删除
    public function destroy($id)
    {

        $appointment = $this->repo->find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }

        $appointment->delete();

        return response()->json(['message' => 'Appointment deleted']);
    }
}
