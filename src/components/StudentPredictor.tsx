import React, { useState } from 'react'

export default function StudentPredictor() {
  const [hours, setHours] = useState(7)
  const [attendance, setAttendance] = useState(85)
  const [prevMarks, setPrevMarks] = useState(75)
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hours, attendance, previous_marks: prevMarks }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Prediction failed')
      setResult(data.predicted_marks)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full py-2.5 bg-transparent border-b border-(--border) focus:outline-none focus:border-(--accent) text-(--text-primary) transition-colors duration-300"

  return (
    <div>
      <h2 className="font-display text-3xl text-(--text-primary) mb-1">Try it live</h2>
      <p className="text-sm text-(--text-muted) mb-8">
        Enter student data to predict final exam marks.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-(--text-muted) mb-2">Hours Studied (per week)</label>
          <input type="number" value={hours} onChange={e => setHours(Number(e.target.value))} min={0} max={24} step={0.5} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-(--text-muted) mb-2">Attendance (%)</label>
          <input type="number" value={attendance} onChange={e => setAttendance(Number(e.target.value))} min={0} max={100} step={1} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-(--text-muted) mb-2">Previous Exam Marks</label>
          <input type="number" value={prevMarks} onChange={e => setPrevMarks(Number(e.target.value))} min={0} max={100} step={0.5} className={inputClass} />
        </div>

        <button type="submit" disabled={loading}
          className="px-8 py-3 bg-(--accent) text-(--surface) text-sm uppercase tracking-[0.2em] hover:bg-(--accent-hover) disabled:opacity-50 transition-colors duration-300">
          {loading ? 'Predicting...' : 'Predict Marks'}
        </button>
      </form>

      {result !== null && (
        <div className="mt-8 pt-8 border-t border-(--border) text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-(--text-muted) mb-2">Predicted Final Marks</p>
          <p className="font-display text-5xl text-(--accent)">
            {result}
          </p>
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}
