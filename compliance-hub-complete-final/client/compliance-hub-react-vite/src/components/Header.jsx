
import React from 'react'
import { ShieldCheck, LogOut } from 'lucide-react'

export default function Header({ currentUser, onLogout }) {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-indigo-600" />
          <span className="font-bold text-slate-800 text-xl tracking-tight">ComplianceHub</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">{currentUser}</span>
          <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><LogOut className="w-5 h-5" /></button>
        </div>
      </div>
    </nav>
  )
}
