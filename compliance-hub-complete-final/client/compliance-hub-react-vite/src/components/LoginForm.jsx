
import React from 'react'
import { ShieldCheck, ChevronRight, User as UserIcon, Lock } from 'lucide-react'

export default function LoginForm({ authForm, onAuthChange, onLogin }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-indigo-600 p-8 text-white text-center">
          <ShieldCheck className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold tracking-tight">Compliance Portal</h1>
          <p className="text-indigo-100 mt-2">Upload and manage regulatory evidence</p>
        </div>
        <form onSubmit={onLogin} className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="admin or compliance_lead"
                  value={authForm.username}
                  onChange={(e) => onAuthChange({ ...authForm, username: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Any password"
                  value={authForm.password}
                  onChange={(e) => onAuthChange({ ...authForm, password: e.target.value })}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
            Sign In <ChevronRight className="w-4 h-4" />
          </button>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <p className="font-bold text-slate-500 uppercase">Demo Users:</p>
            <div className="flex justify-between font-mono font-bold">
              <span className="text-indigo-600">admin</span>
              <span className="text-indigo-600">compliance_lead</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
