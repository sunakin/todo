import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import type { Todo } from '../types/todo'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, text: string) => void
}

const PRIORITY_DOT: Record<string, string> = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-red-500',
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  function commitEdit() {
    if (draft.trim()) {
      onUpdate(todo.id, draft)
    } else {
      setDraft(todo.text)
    }
    setEditing(false)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      commitEdit()
    }
    if (e.key === 'Escape') {
      setDraft(todo.text)
      setEditing(false)
    }
  }

  return (
    <li
      className={`group flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm transition ${
        todo.completed ? 'border-slate-100 opacity-60' : 'border-slate-200 hover:border-violet-200 hover:shadow-md'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? '未完了に戻す' : '完了にする'}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
          todo.completed
            ? 'border-violet-500 bg-violet-500'
            : 'border-slate-300 hover:border-violet-400'
        }`}
      >
        {todo.completed && (
          <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Priority dot */}
      <span className={`h-2 w-2 shrink-0 rounded-full ${PRIORITY_DOT[todo.priority]}`} />

      {/* Text / Edit */}
      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded border border-violet-300 bg-violet-50 px-2 py-0.5 text-slate-800 outline-none focus:ring-2 focus:ring-violet-200"
        />
      ) : (
        <span
          onDoubleClick={() => { setDraft(todo.text); setEditing(true) }}
          className={`flex-1 cursor-pointer select-none text-slate-800 ${todo.completed ? 'line-through text-slate-400' : ''}`}
        >
          {todo.text}
        </span>
      )}

      {/* Actions */}
      {!editing && (
        <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
          <button
            onClick={() => { setDraft(todo.text); setEditing(true) }}
            aria-label="編集"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-violet-600"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path d="M11.5 2.5l2 2-9 9H2.5v-2l9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            aria-label="削除"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M6 4V2h4v2M7 7v5M9 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </li>
  )
}
