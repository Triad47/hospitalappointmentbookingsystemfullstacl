import { useState } from 'react'
import DoctorsPage from './DoctorsPage'
import PatientsPage from './PatientsPage'
import AppointmentPage from './AppointmentPage'
import AppointmentsListPage from './AppointmentsListPage'
import './App.css'

export default function App() {
  const [page, setPage] = useState('doctors')

  const navBtn = (target, label) => (
    <button
      onClick={() => setPage(target)}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
        page === target
          ? 'bg-white text-blue-700 font-semibold'
          : 'text-blue-100 hover:bg-white/20 hover:text-white'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <header className="bg-blue-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-15 flex items-center justify-between">
          <span className="text-lg font-bold tracking-wide">Hospital Appointment System</span>
          <nav className="flex gap-2">
            {navBtn('doctors', 'Doctors')}
            {navBtn('patients', 'Patients')}
            {navBtn('book', 'Book Appointment')}
            {navBtn('appointments', 'Appointments')}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {page === 'doctors' && <DoctorsPage />}
        {page === 'patients' && <PatientsPage />}
        {page === 'book' && <AppointmentPage />}
        {page === 'appointments' && <AppointmentsListPage />}
      </main>
    </div>
  )
}
