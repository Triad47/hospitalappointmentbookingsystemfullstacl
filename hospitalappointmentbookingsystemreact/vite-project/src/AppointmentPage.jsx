import { useState, useEffect } from 'react'

const DOCTORS_API = 'http://localhost:8080/api/doctors'
const PATIENTS_API = 'http://localhost:8080/api/patients'
const APPOINTMENTS_API = 'http://localhost:8080/api/appointments'

export default function AppointmentPage() {
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
  const [patientId, setPatientId] = useState('')
  const [doctorId, setDoctorId] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('08:00')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(DOCTORS_API)
      .then(res => res.json())
      .then((data) => {
        const available = data.filter(d => d.available)
        setDoctors(available)
        if (available.length > 0) setDoctorId(available[0].id)
      })
      .catch(() => {
        setIsError(true)
        setMessage('Failed to load doctors. Make sure the backend is running.')
      })

    fetch(PATIENTS_API)
      .then(res => res.json())
      .then((data) => {
        setPatients(data)
        if (data.length > 0) setPatientId(data[0].id)
      })
      .catch(() => {
        setIsError(true)
        setMessage('Failed to load patients. Make sure the backend is running.')
      })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    setIsError(false)
    setLoading(true)

    try {
      const formattedTime = appointmentTime.length === 5 ? `${appointmentTime}:00` : appointmentTime

      const bookRes = await fetch(`${APPOINTMENTS_API}/book?patientId=${patientId}&doctorId=${doctorId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentDate, appointmentTime: formattedTime }),
      })
      
      if (!bookRes.ok) {
        throw new Error('Failed to book appointment.')
      }

      setMessage('Appointment booked successfully!')
      setAppointmentDate('')
      setAppointmentTime('08:00')
      if (doctors.length > 0) setDoctorId(doctors[0].id)
      if (patients.length > 0) setPatientId(patients[0].id)
      setTimeout(() => setMessage(''), 4000)
    } catch (err) {
      setIsError(true)
      setMessage(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white'
  const labelCls = 'block text-sm font-medium text-slate-600 mb-1'

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Book an Appointment</h2>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        {message && (
          <div className={`text-sm rounded-lg px-4 py-3 mb-6 ${isError ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'}`}>
            {message}
          </div>
        )}

        {doctors.length === 0 && !isError && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-lg px-4 py-3 mb-6">
            No available doctors found. Add doctors in the Doctors tab first.
          </div>
        )}

        {patients.length === 0 && !isError && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-lg px-4 py-3 mb-6">
            No patients found. Add patients in the Patients tab first.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className={labelCls}>Patient</label>
              <select value={patientId} onChange={e => setPatientId(e.target.value)} required className={inputCls}>
                {patients.map(pat => (
                  <option key={pat.id} value={pat.id}>
                    {pat.firstName} {pat.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Doctor</label>
              <select value={doctorId} onChange={e => setDoctorId(e.target.value)} required className={inputCls}>
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.id}>
                    {doc.firstName} {doc.lastName} — {doc.specialization}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className={labelCls}>Appointment Date</label>
              <input type="date" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} required min={new Date().toISOString().split('T')[0]} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Time</label>
              <input type="time" value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} required className={inputCls} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || doctors.length === 0 || patients.length === 0}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors cursor-pointer"
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  )
}
