import type { Todo } from '../types/todo'

const KEY = 'todos-v1'

export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Todo[]) : []
  } catch {
    return []
  }
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(KEY, JSON.stringify(todos))
}
