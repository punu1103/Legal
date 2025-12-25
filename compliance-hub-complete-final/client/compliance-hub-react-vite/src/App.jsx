
import React, { useState, useMemo, useEffect } from 'react'

// Components
import Header from './components/Header.jsx'
import LoginForm from './components/LoginForm.jsx'
import StatsBar from './components/StatsBar.jsx'
import Toolbar from './components/Toolbar.jsx'
import RecordsTable from './components/RecordsTable.jsx'
import EditModal from './components/EditModal.jsx'
import DeleteModal from './components/DeleteModal.jsx'
import { CheckCircle2 } from 'lucide-react'

function getEmptyForm() {
  return {
    actRule: '',
    requirement: '',
    status: 'Pending',
    evidence: null,
    dueDate: '',
    actionPlan: '',
    frequency: 'Monthly',
    nextReview: ''
  }
}

export default function App() {
  // Auth
  const [currentUser, setCurrentUser] = useState(null)
  const [authForm, setAuthForm] = useState({ username: '', password: '' })

  // Data (in-memory "DB")
  const [userRecords, setUserRecords] = useState({
    'admin': [
      {
        id: 1,
        actRule: 'ISO 27001:2022',
        requirement: 'A.5.15 - Access Control Policy must be reviewed annually.',
        status: 'Compliant',
        evidence: { name: 'audit_report_2024.pdf', size: '1.2 MB' },
        dueDate: '2024-12-31',
        actionPlan: 'Review all biometric logs and physical access tokens.',
        frequency: 'Quarterly',
        nextReview: '2025-03-31'
      }
    ],
    'compliance_lead': [
      {
        id: 101,
        actRule: 'GDPR / Data Privacy',
        requirement: 'Article 30 - Maintain records of processing activities (ROPA).',
        status: 'Non-Compliant',
        evidence: { name: 'ropa_gap_analysis.xlsx', size: '450 KB' },
        dueDate: '2024-10-15',
        actionPlan: 'Internal audit of marketing and HR data flows.',
        frequency: 'Bi-Annual',
        nextReview: '2025-04-15'
      }
    ]
  })

  // UI state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState(getEmptyForm())
  const [importStatus, setImportStatus] = useState(null)

  // Stats
  const stats = useMemo(() => {
    const records = userRecords[currentUser] || []
    return {
      compliant: records.filter(r => r.status === 'Compliant').length,
      nonCompliant: records.filter(r => r.status === 'Non-Compliant').length,
      overdue: records.filter(r => r.status === 'Overdue').length,
      pending: records.filter(r => r.status === 'Pending').length
    }
  }, [userRecords, currentUser])

  // Auto-calc Next Review
  useEffect(() => {
    if (formData.dueDate) {
      const date = new Date(formData.dueDate)
      if (!isNaN(date.getTime())) {
        switch (formData.frequency) {
          case 'Daily':
            date.setDate(date.getDate() + 1)
            break
          case 'Monthly':
            date.setMonth(date.getMonth() + 1)
            break
          case 'Quarterly':
            date.setMonth(date.getMonth() + 3)
            break
          case 'Bi-Annual':
            date.setMonth(date.getMonth() + 6)
            break
          case 'Annual':
            date.setFullYear(date.getFullYear() + 1)
            break
          default:
            break
        }
        const nextDateStr = date.toISOString().split('T')[0]
        if (nextDateStr !== formData.nextReview) {
          setFormData(prev => ({ ...prev, nextReview: nextDateStr }))
        }
      }
    }
  }, [formData.dueDate, formData.frequency])

  // Auth handlers
  const handleLogin = (e) => {
    e.preventDefault()
    const user = authForm.username.toLowerCase()
    if (user && authForm.password) {
      if (!userRecords[user]) {
        setUserRecords(prev => ({ ...prev, [user]: [] }))
      }
      setCurrentUser(user)
      setAuthForm({ username: '', password: '' })
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setSearchTerm('')
  }

  // Excel Import
  const handleExcelImport = (e) => {
    const file = e.target.files[0]
    if (!file || !window.XLSX) return

    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result
        const wb = window.XLSX.read(bstr, { type: 'binary' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = window.XLSX.utils.sheet_to_json(ws)

        const newRecords = data.map((row, index) => {
          const baseId = Date.now() + index
          const dueDate = row['Due Date'] || ''
          const frequency = row['Frequency'] || 'Monthly'
          let nextReview = row['Next Review'] || ''
          if (!nextReview && dueDate) {
            const d = new Date(dueDate)
            if (!isNaN(d.getTime())) {
              if (frequency === 'Daily') d.setDate(d.getDate() + 1)
              else if (frequency === 'Monthly') d.setMonth(d.getMonth() + 1)
              else if (frequency === 'Quarterly') d.setMonth(d.getMonth() + 3)
              else if (frequency === 'Bi-Annual') d.setMonth(d.getMonth() + 6)
              else if (frequency === 'Annual') d.setFullYear(d.getFullYear() + 1)
              nextReview = d.toISOString().split('T')[0]
            }
          }
          return {
            id: baseId,
            actRule: row['Act / Rule'] || row['Act'] || 'Imported',
            requirement: row['Requirement'] || row['Compliance Requirement'] || 'No details provided',
            status: row['Status'] || 'Pending',
            evidence: null,
            dueDate: dueDate,
            actionPlan: row['Action Plan'] || '',
            frequency: frequency,
            nextReview: nextReview
          }
        })

        setUserRecords(prev => ({
          ...prev,
          [currentUser]: [...(prev[currentUser] || []), ...newRecords]
        }))

        setImportStatus(`Successfully added ${newRecords.length} new records.`)
        setTimeout(() => setImportStatus(null), 4000)
      } catch (err) {
        console.error(err)
        setImportStatus('Error parsing file. Please check format.')
      }
    }
    reader.readAsBinaryString(file)
    e.target.value = null
  }

  // CRUD
  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item)
      setFormData(item)
    } else {
      setEditingItem(null)
      setFormData(getEmptyForm())
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
    setFormData(getEmptyForm())
  }

  const handleSave = (e) => {
    e.preventDefault()
    const records = userRecords[currentUser] || []
    if (editingItem) {
      const updated = records.map(item => item.id === editingItem.id ? { ...formData, id: item.id } : item)
      setUserRecords(prev => ({ ...prev, [currentUser]: updated }))
    } else {
      const newItem = { ...formData, id: Date.now() }
      setUserRecords(prev => ({ ...prev, [currentUser]: [...records, newItem] }))
    }
    closeModal()
  }

  const openDeleteModal = (item) => {
    setItemToDelete(item)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = () => {
    if (!itemToDelete) return
    const records = userRecords[currentUser] || []
    const updated = records.filter(item => item.id !== itemToDelete.id)
    setUserRecords(prev => ({ ...prev, [currentUser]: updated }))
    setIsDeleteModalOpen(false)
    setItemToDelete(null)
  }

  // Filtering
  const filteredData = useMemo(() => {
    const records = userRecords[currentUser] || []
    if (!searchTerm) return records
    return records.filter(r =>
      Object.values(r).some(val => {
        if (typeof val === 'object' && val !== null) return val.name?.toLowerCase().includes(searchTerm.toLowerCase())
        return val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      })
    )
  }, [userRecords, currentUser, searchTerm])

  // Render
  if (!currentUser) {
    return (
      <LoginForm authForm={authForm} onAuthChange={setAuthForm} onLogin={handleLogin} />
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header currentUser={currentUser} onLogout={handleLogout} />

      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {importStatus && (
          <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold text-sm">{importStatus}</span>
          </div>
        )}

        <StatsBar currentUser={currentUser} stats={stats} />
        <Toolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onImportExcel={handleExcelImport}
          onAdd={() => openModal()}
        />

        <RecordsTable
          data={filteredData}
          onEdit={(item) => openModal(item)}
          onDelete={(item) => openDeleteModal(item)}
        />
      </main>

      <EditModal
        isOpen={isModalOpen}
        formData={formData}
        onClose={closeModal}
        onChange={setFormData}
        onSave={handleSave}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        itemToDelete={itemToDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
