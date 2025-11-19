import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function FruitForm({ onAdded }) {
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [sweetness, setSweetness] = useState(5)
  const [origin, setOrigin] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = {
        name,
        color: color || null,
        sweetness: Number(sweetness) || 5,
        origin: origin || null,
        price: price ? Number(price) : null,
        image_url: imageUrl || null,
        description: null,
      }
      const res = await fetch(`${baseUrl}/api/fruits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to add fruit')
      const data = await res.json()
      onAdded?.(data.id)
      setName(''); setColor(''); setSweetness(5); setOrigin(''); setPrice(''); setImageUrl('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-lime-500/20 rounded-xl p-4 backdrop-blur">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" required className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
        <input value={color} onChange={(e)=>setColor(e.target.value)} placeholder="Color" className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
        <input type="number" min="1" max="10" value={sweetness} onChange={(e)=>setSweetness(e.target.value)} placeholder="Sweetness (1-10)" className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
        <input value={origin} onChange={(e)=>setOrigin(e.target.value)} placeholder="Origin" className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
        <input type="number" step="0.01" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price" className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
        <input value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} placeholder="Image URL" className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button disabled={loading} className="inline-flex items-center gap-2 bg-lime-500 text-slate-900 font-semibold px-3 py-2 rounded hover:bg-lime-400 transition">
          <Plus className="w-4 h-4" /> Add Fruit
        </button>
        {error && <span className="text-red-400 text-sm">{error}</span>}
      </div>
    </form>
  )
}
