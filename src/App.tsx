import { useTodos } from './hooks/useTodos'
import { TodoInput } from './components/TodoInput'
import { TodoItem } from './components/TodoItem'
import type { FilterType } from './types/todo'

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了済み' },
]

function App() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos()

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <main className="mx-auto w-full max-w-lg">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-800">Todo</h1>
          <p className="mt-2 text-sm text-slate-400">
            {activeCount === 0
              ? 'すべてのタスクが完了しています'
              : `${activeCount}件のタスクが残っています`}
          </p>
        </header>

        <div className="mb-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <TodoInput onAdd={addTodo} />
        </div>

        <div className="mb-4 flex gap-1 rounded-xl bg-slate-100 p-1">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`flex-1 rounded-lg py-1.5 text-sm font-medium transition ${
                filter === f.value
                  ? 'bg-white text-violet-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {todos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center">
            <p className="text-sm text-slate-400">
              {filter === 'completed'
                ? '完了済みのタスクはありません'
                : filter === 'active'
                  ? '未完了のタスクはありません'
                  : '上のフォームからタスクを追加してください'}
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            ))}
          </ul>
        )}

        {completedCount > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearCompleted}
              className="text-sm text-slate-400 transition hover:text-red-500"
            >
              完了済みを削除（{completedCount}件）
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
