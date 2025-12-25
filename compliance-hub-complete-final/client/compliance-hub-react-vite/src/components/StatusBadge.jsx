
import React from 'react'
import { CheckCircle2, AlertCircle, Clock, AlertTriangle } from 'lucide-react'

export default function StatusBadge({ status }) {
  const configs = {
    'Compliant': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <CheckCircle2 className="w-3 h-3" /> },
    'Non-Compliant': { bg: 'bg-rose-50 text-rose-700 border-rose-200', icon: <AlertCircle className="w-3 h-3" /> },
    'Pending': { bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Clock className="w-3 h-3" /> },
    'Overdue': { bg: 'bg-slate-900 text-white border-slate-900', icon: <AlertTriangle className="w-3 h-3 text-amber-400" /> },
  }
  const config = configs[status] || configs.Pending
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-tighter ${config.bg}`}>
      {config.icon} {status}
    </span>
  )
}
