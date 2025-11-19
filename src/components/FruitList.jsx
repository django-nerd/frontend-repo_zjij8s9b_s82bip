import { useEffect, useState } from 'react'
import { Leaf } from 'lucide-react'

export default function FruitList({ refreshKey }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${baseUrl}/api/fruits`)
        if (!res.ok) throw new Error('Failed to load fruits')
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [refreshKey])

  if (loading) return <p className="text-lime-200">Loading...</p>
  if (error) return <p className="text-red-400">{error}</p>

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((f) => (
        <div key={f.id} className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 flex gap-4">
          <div className="w-16 h-16 rounded-lg bg-slate-800 grid place-items-center overflow-hidden">
            {f.image_url ? (
              <img src={f.image_url} alt={f.name} className="w-full h-full object-cover" />
            ) : (
              <Leaf className="w-7 h-7 text-lime-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-semibold text-lg">{f.name}</h3>
              {f.color && <span className="text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-lime-200">{f.color}</span>}
            </div>
            <div className="text-slate-300 text-sm mt-1">
              {f.origin && <span>Origin: {f.origin} • </span>}
              {f.sweetness ? <span>Sweetness: {f.sweetness}/10</span> : null}
              {typeof f.price === 'number' && <span> • ${f.price}</span>}
            </div>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-slate-300">No fruits yet. Add one above to get started!</p>
      )}
    </div>
  )
}
