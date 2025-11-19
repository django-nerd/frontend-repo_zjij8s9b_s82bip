import { useState } from 'react'
import Header from './components/Header'
import FruitForm from './components/FruitForm'
import FruitList from './components/FruitList'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(132,204,22,0.08),transparent_40%),_radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.08),transparent_40%)]" />

      <div className="relative max-w-4xl mx-auto p-6 md:p-10">
        <Header />

        <div className="space-y-6">
          <FruitForm onAdded={() => setRefreshKey((k) => k + 1)} />
          <FruitList refreshKey={refreshKey} />
        </div>

        <div className="mt-10 text-center">
          <a href="/test" className="text-sm text-lime-300/80 hover:text-lime-200 underline">Check backend connection</a>
        </div>
      </div>
    </div>
  )
}

export default App
