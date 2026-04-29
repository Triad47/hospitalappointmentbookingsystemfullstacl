import { useState, useEffect } from 'react'

const API = 'http://localhost:8080/api/patients'

export default function PatientsPage() {
  const [patients, setPatients] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function fetchPatients() {
    fetch(API)
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(() => setError('Failed to load patients. Make sure the backend is running.'))
  }

  useEffect(() => { fetchPatients() }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, phone, dateOfBirth: dateOfBirth || null, address }),
    })
      .then(async res => {
        if (!res.ok) throw new Error('Failed to add patient.')
        return res.json().catch(() => ({}))
      })
      .then(() => {
        setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setDateOfBirth(''); setAddress('')
        setSuccess('Patient added successfully!')
        fetchPatients()
        setTimeout(() => setSuccess(''), 3000)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  const inputCls = 'w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
  const labelCls = 'block text-sm font-medium text-slate-600 mb-1'

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Patients</h2>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <h3 className="text-base font-semibold text-slate-700 mb-4">Add New Patient</h3>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className={labelCls}>First Name</label>
              <input value={firstName} onChange={e => setFirstName(e.target.value)} required className={inputCls} placeholder="John" />
            </div>
            <div>
              <label className={labelCls}>Last Name</label>
              <input value={lastName} onChange={e => setLastName(e.target.value)} required className={inputCls} placeholder="Doe" />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" required className={inputCls} placeholder="patient@example.com" />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} placeholder="123-456-7890" />
            </div>
            <div>
              <label className={labelCls}>Date of Birth</label>
              <input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Address</label>
              <input value={address} onChange={e => setAddress(e.target.value)} className={inputCls} placeholder="123 Main St" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors cursor-pointer"
          >
            {loading ? 'Adding...' : 'Add Patient'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 text-blue-800 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">ID</th>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-left font-semibold">Phone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {patients.map(patient => (
              <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-slate-600">{patient.id}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{patient.firstName} {patient.lastName}</td>
                <td className="px-4 py-3 text-slate-600">{patient.email}</td>
                <td className="px-4 py-3 text-slate-600">{patient.phone}</td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  No patients found. Add one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
