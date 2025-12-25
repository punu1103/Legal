
import React from 'react'
import { AlertTriangle } from 'lucide-react'

export default function DeleteModal({ isOpen, itemToDelete, onCancel, onConfirm }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onCancel}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Record?</h3>
        <p className="text-slate-500 text-sm mb-8">
          This action cannot be undone. This will permanently remove the compliance record for <span className="font-bold text-slate-700">"{itemToDelete?.actRule}"</span>.
        </p>
        <div className="flex gap-3 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-rose-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
