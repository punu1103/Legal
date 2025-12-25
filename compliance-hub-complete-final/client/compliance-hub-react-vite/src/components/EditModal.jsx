
import React, { useRef } from 'react'
import { Upload, FileText, X } from 'lucide-react'

export default function EditModal({ isOpen, formData, onClose, onChange, onSave }) {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const fileSize = file.size > 1024 * 1024
        ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
        : (file.size / 1024).toFixed(1) + ' KB'
      onChange({ ...formData, evidence: { name: file.name, size: fileSize } })
    }
  }

  const removeFile = () => {
    onChange({ ...formData, evidence: null })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{formData?.id ? 'Edit Requirement' : 'Add Requirement'}</h3>
            <p className="text-[10px] text-slate-400 font-bold">NEXT REVIEW CALCULATED AUTOMATICALLY</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-white border rounded-full text-slate-400 hover:text-slate-600 transition-all">&times;</button>
        </div>

        <form onSubmit={onSave} className="overflow-y-auto p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="col-span-full">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Act / Rule</label>
              <input type="text" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.actRule} onChange={(e) => onChange({ ...formData, actRule: e.target.value })} />
            </div>
            <div className="col-span-full">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Compliance Requirement</label>
              <textarea required rows="2" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.requirement} onChange={(e) => onChange({ ...formData, requirement: e.target.value })} />
            </div>

            <div className="col-span-full bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
              <label className="block text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Evidence / Record Selection</label>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

              {!formData.evidence ? (
                <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full py-6 border-2 border-dashed border-indigo-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 hover:border-indigo-400 transition-all group">
                  <Upload className="w-6 h-6 text-indigo-400 group-hover:text-indigo-600" />
                  <span className="text-sm font-bold text-indigo-600">Select File from Device</span>
                </button>
              ) : (
                <div className="flex items-center justify-between p-3 bg-white border border-indigo-200 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600"><FileText className="w-5 h-5" /></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800 truncate max-w-[200px]">{formData.evidence.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-black">{formData.evidence.size}</span>
                    </div>
                  </div>
                  <button type="button" onClick={removeFile} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"><X className="w-4 h-4" /></button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</label>
              <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={formData.status} onChange={(e) => onChange({ ...formData, status: e.target.value })}>
                <option value="Compliant">Compliant</option>
                <option value="Non-Compliant">Non-Compliant</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Due Date</label>
              <input type="date" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={formData.dueDate} onChange={(e) => onChange({ ...formData, dueDate: e.target.value })} />
            </div>
            <div className="col-span-full">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Action Plan</label>
              <textarea rows="2" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={formData.actionPlan} onChange={(e) => onChange({ ...formData, actionPlan: e.target.value })} />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Frequency</label>
              <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={formData.frequency} onChange={(e) => onChange({ ...formData, frequency: e.target.value })}>
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Bi-Annual">Bi-Annual</option>
                <option value="Annual">Annual</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Next Review (Auto)</label>
              <input type="date" readOnly className="w-full p-3 bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold rounded-xl outline-none cursor-not-allowed" value={formData.nextReview} />
            </div>
          </div>

          <div className="pt-8 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2 text-slate-400 font-bold uppercase text-[10px]">Discard</button>
            <button type="submit" className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold uppercase text-[10px] shadow-lg hover:shadow-indigo-200 transition-all">
              {formData?.id ? 'Update Record' : 'Add Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
