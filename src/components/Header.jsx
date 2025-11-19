import { Apple } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-center mb-10">
      <div className="inline-flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-lime-500 grid place-items-center shadow-lg shadow-lime-500/30">
          <Apple className="w-9 h-9 text-white" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-white tracking-tight">Fruit Garden</h1>
      <p className="text-lime-200/90 mt-2">Browse and add your favorite fruits</p>
    </header>
  )
}
