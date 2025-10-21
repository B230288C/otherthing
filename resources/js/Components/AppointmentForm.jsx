import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AppointmentForm() {
  const [form, setForm] = useState({ name: '', email: '', scheduled_at: '', status: 'pending' });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('/api/appointments');
      setAppointments(res.data.data || []);
    } catch (err) {
      console.error('Fetch appointments error:', err);
      setAppointments([]);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // 强制 status = 'pending'
      const payload = { ...form, status: 'pending' };
      await axios.post('/api/appointments', payload, { headers: { 'Content-Type': 'application/json' } });
      setForm({ name: '', email: '', scheduled_at: '', status: 'pending' });
      fetchAppointments();
    } catch (err) {
      setError(err.response?.data?.message || '提交失败');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/appointments/${id}/status`, { status });
      fetchAppointments();
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`/api/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Create Appointment</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="datetime-local" value={form.scheduled_at} onChange={e => setForm({ ...form, scheduled_at: e.target.value })} required />
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Create'}</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2 style={{ marginTop: '30px' }}>Appointments List</h2>
      <table border="1" cellPadding="5" style={{ width: '100%', textAlign: 'left', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Scheduled At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{new Date(a.scheduled_at).toLocaleString()}</td>
              <td>
                <select value={a.status} onChange={e => updateStatus(a.id, e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button onClick={() => deleteAppointment(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
