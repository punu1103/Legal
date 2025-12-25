
import React from 'react'
import StatusBadge from './StatusBadge.jsx'
import { FileText, Paperclip, Edit2, Trash2, AlertTriangle } from 'lucide-react'

export default function RecordsTable({ data, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1500px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Act / Rule</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/4">Requirement</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Evidence / Record</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action Plan</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Frequency</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Next Review</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right sticky right-0 bg-slate-50">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 align-top font-bold text-slate-800 text-sm">{item.actRule}</td>
                <td className="px-6 py-4 align-top text-sm text-slate-600 italic line-clamp-2">{item.requirement}</td>
                <td className="px-6 py-4 align-top"><StatusBadge status={item.status} /></td>
                <td className="px-6 py-4 align-top">
                  {item.evidence ? (
                    <div className="flex flex-col gap-0.5 max-w-[180px]">
                      <div className="flex items-center gap-1.5 text-indigo-600 font-semibold text-xs truncate">
                        <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{item.evidence.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 pl-5 uppercase font-bold tracking-tighter">{item.evidence.size}</span>
                    </div>
                  ) : (
                    <span className="text-slate-300 text-xs italic flex items-center gap-1">
                      <Paperclip className="w-3 h-3" /> No file
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 align-top text-sm font-mono text-slate-700">{item.dueDate}</td>
                <td className="px-6 py-4 align-top text-sm text-slate-500 truncate max-w-[150px]">{item.actionPlan || '—'}</td>
                <td className="px-6 py-4 align-top">
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-black uppercase border border-slate-200">
                    {item.frequency}
                  </span>
                </td>
                <td className="px-6 py-4 align-top text-sm font-mono text-slate-800 font-bold">{item.nextReview}</td>
                <td className="px-6 py-4 align-top text-right sticky right-0 bg-white group-hover:bg-slate-50 shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onEdit(item)} className="p-2 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg transition-all font-bold text-xs uppercase inline-flex items-center gap-1">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => onDelete(item)} className="p-2 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg transition-all font-bold text-xs uppercase inline-flex items-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="px-6 py-12 text-center text-slate-400 italic">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
