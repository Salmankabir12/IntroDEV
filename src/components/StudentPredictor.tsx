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

  const inputClass = "w-full p-2.5 rounded-lg bg-(--surface-raised) border border-(--border) focus:outline-none focus:ring-2 focus:ring-indigo-500 text-(--text-primary)"

  return (
    <div class="border border-(--border) bg-(--surface-elevated) rounded-xl p-6">
      <h2 class="text-xl font-semibold mb-1">Try it live</h2>
      <p class="text-sm text-(--text-muted) mb-5">
        Enter student data to predict final exam marks.
      </p>

      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Hours Studied (per week)</label>
          <input type="number" value={hours} onChange={e => setHours(Number(e.target.value))} min={0} max={24} step={0.5} class={inputClass} />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Attendance (%)</label>
          <input type="number" value={attendance} onChange={e => setAttendance(Number(e.target.value))} min={0} max={100} step={1} class={inputClass} />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Previous Exam Marks</label>
          <input type="number" value={prevMarks} onChange={e => setPrevMarks(Number(e.target.value))} min={0} max={100} step={0.5} class={inputClass} />
        </div>

        <button type="submit" disabled={loading}
          class="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 font-medium disabled:opacity-50 transition">
          {loading ? 'Predicting...' : 'Predict Marks'}
        </button>
      </form>

      {result !== null && (
        <div class="mt-5 p-4 bg-(--surface-raised) rounded-lg text-center">
          <p class="text-sm text-(--text-muted) mb-1">Predicted Final Marks</p>
          <p class="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            {result}
          </p>
        </div>
      )}

      {error && (
        <p class="mt-3 text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}
