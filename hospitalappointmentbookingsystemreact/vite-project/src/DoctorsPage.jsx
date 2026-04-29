import { useState, useEffect } from 'react'

const API = 'http://localhost:8080/api/doctors'

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [available, setAvailable] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function fetchDoctors() {
    fetch(API)
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(() => setError('Failed to load doctors. Make sure the backend is running.'))
  }

  useEffect(() => { fetchDoctors() }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, specialization, email, phone, available }),
    })
      .then(async res => {
        if (!res.ok) throw new Error('Failed to add doctor.')
        return res.json().catch(() => ({}))
      })
      .then(() => {
        setFirstName(''); setLastName(''); setSpecialization(''); setEmail(''); setPhone(''); setAvailable(true)
        setSuccess('Doctor added successfully!')
        fetchDoctors()
        setTimeout(() => setSuccess(''), 3000)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  const inputCls = 'w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
  const labelCls = 'block text-sm font-medium text-slate-600 mb-1'

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Doctors</h2>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <h3 className="text-base font-semibold text-slate-700 mb-4">Add New Doctor</h3>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>First Name</label>
              <input value={firstName} onChange={e => setFirstName(e.target.value)} required className={inputCls} placeholder="John" />
            </div>
            <div>
              <label className={labelCls}>Last Name</label>
              <input value={lastName} onChange={e => setLastName(e.target.value)} required className={inputCls} placeholder="Doe" />
            </div>
            <div>
              <label className={labelCls}>Specialization</label>
              <input value={specialization} onChange={e => setSpecialization(e.target.value)} required className={inputCls} placeholder="Cardiology" />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputCls} placeholder="doctor@example.com" />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} required className={inputCls} placeholder="123-456-7890" />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" checked={available} onChange={e => setAvailable(e.target.checked)} className="w-4 h-4 accent-blue-600" />
                Available for appointments
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors cursor-pointer"
          >
            {loading ? 'Adding...' : 'Add Doctor'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 text-blue-800 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">ID</th>
              <th className="px-4 py-3 text-left font-semibold">Full Name</th>
              <th className="px-4 py-3 text-left font-semibold">Specialization</th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-left font-semibold">Phone</th>
              <th className="px-4 py-3 text-left font-semibold">Available</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {doctors.map(doc => (
              <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-slate-600">{doc.id}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{doc.firstName} {doc.lastName}</td>
                <td className="px-4 py-3 text-slate-600">{doc.specialization}</td>
                <td className="px-4 py-3 text-slate-600">{doc.email}</td>
                <td className="px-4 py-3 text-slate-600">{doc.phone}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${doc.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {doc.available ? 'Yes' : 'No'}
                  </span>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No doctors found. Add one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
