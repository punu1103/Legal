
import React, { useRef } from 'react'
import { Search, FileSpreadsheet, Plus } from 'lucide-react'

export default function Toolbar({ searchTerm, onSearchChange, onImportExcel, onAdd }) {
  const excelInputRef = useRef(null)

  return (
    <div className="flex flex-wrap items-center gap-3 xl:mt-2 mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg bg-white w-full sm:w-80 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <input type="file" ref={excelInputRef} className="hidden" accept=".xlsx, .xls, .csv" onChange={onImportExcel} />
      <button
        onClick={() => excelInputRef.current?.click()}
        className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-5 py-2 rounded-lg font-bold shadow-sm transition-all"
      >
        <FileSpreadsheet className="w-5 h-5 text-emerald-600" /> Import Excel
      </button>

      <button onClick={onAdd} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-bold shadow-sm transition-all">
        <Plus className="w-5 h-5" /> Add Row
      </button>
    </div>
  )
}
