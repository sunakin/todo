import { useState, type FormEvent, type KeyboardEvent } from 'react'
import type { Priority } from '../types/todo'

interface Props {
  onAdd: (text: string, priority: Priority) => void
}

const PRIORITY_CONFIG: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: '低', color: 'bg-emerald-100 text-emerald-700 border-emerald-300 data-[active=true]:bg-emerald-500 data-[active=true]:text-white data-[active=true]:border-emerald-500' },
  { value: 'medium', label: '中', color: 'bg-amber-100 text-amber-700 border-amber-300 data-[active=true]:bg-amber-500 data-[active=true]:text-white data-[active=true]:border-amber-500' },
  { value: 'high', label: '高', color: 'bg-red-100 text-red-700 border-red-300 data-[active=true]:bg-red-500 data-[active=true]:text-white data-[active=true]:border-red-500' },
]

export function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  function submit() {
    onAdd(text, priority)
    setText('')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    submit()
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="新しいタスクを入力..."
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          autoFocus
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-violet-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          追加
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500">優先度:</span>
        {PRIORITY_CONFIG.map(p => (
          <button
            key={p.value}
            type="button"
            data-active={priority === p.value}
            onClick={() => setPriority(p.value)}
            className={`rounded-lg border px-3 py-1 text-xs font-semibold transition ${p.color}`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  )
}
