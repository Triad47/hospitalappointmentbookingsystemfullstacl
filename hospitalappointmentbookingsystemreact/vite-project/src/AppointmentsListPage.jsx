import { useState, useEffect } from 'react'

const API = 'http://localhost:8080/api/appointments'

export default function AppointmentsListPage() {
  const [appointments, setAppointments] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(() => setError('Failed to load appointments. Make sure the backend is running.'))
  }, [])

  function handleCancel(id) {
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error()
        setAppointments(prev => prev.filter(a => a.id !== id))
      })
      .catch(() => setError('Failed to cancel appointment.'))
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">All Appointments</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">{error}</div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-purple-50 text-purple-800 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Patient Name</th>
              <th className="px-4 py-3 text-left font-semibold">Patient ID</th>
              <th className="px-4 py-3 text-left font-semibold">Doctor Name</th>
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-left font-semibold">Time</th>
              <th className="px-4 py-3 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {appointments.map((appt, idx) => (
              <tr key={appt.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{appt.patient ? `${appt.patient.firstName} ${appt.patient.lastName}` : ''}</td>
                <td className="px-4 py-3 text-slate-600">{appt.patient ? appt.patient.id : ''}</td>
                <td className="px-4 py-3 text-slate-700">{appt.doctor ? `${appt.doctor.firstName} ${appt.doctor.lastName}` : ''}</td>
                <td className="px-4 py-3 text-slate-600">{appt.appointmentDate}</td>
                <td className="px-4 py-3 text-slate-600">{appt.appointmentTime}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleCancel(appt.id)}
                    className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
