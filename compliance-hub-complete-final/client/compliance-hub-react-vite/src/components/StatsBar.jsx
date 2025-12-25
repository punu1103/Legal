
import React from 'react'
import { CheckCircle2, AlertCircle, AlertTriangle, Clock } from 'lucide-react'

export default function StatsBar({ currentUser, stats }) {
  return (
    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 mb-8">
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Master Compliance Records</h2>
          <p className="text-slate-500 text-sm">Review and track audit timelines for <strong className="text-slate-700 uppercase tracking-wide">{currentUser}</strong></p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-black uppercase opacity-60">Compliant</span>
              <span className="text-sm font-bold">{stats.compliant}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-rose-50 text-rose-700 px-3 py-1.5 rounded-lg border border-rose-100 shadow-sm">
            <AlertCircle className="w-4 h-4" />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-black uppercase opacity-60">Non-Compliant</span>
              <span className="text-sm font-bold">{stats.nonCompliant}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 text-slate-100 px-3 py-1.5 rounded-lg border border-slate-800 shadow-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-black uppercase opacity-40">Overdue</span>
              <span className="text-sm font-bold">{stats.overdue}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-100 shadow-sm">
            <Clock className="w-4 h-4" />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-black uppercase opacity-60">Pending</span>
              <span className="text-sm font-bold">{stats.pending}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
