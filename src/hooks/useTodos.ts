import { useState, useEffect, useCallback } from 'react'
import type { Todo, Priority, FilterType } from '../types/todo'
import { loadTodos, saveTodos } from '../utils/storage'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos())
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = useCallback((text: string, priority: Priority) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev => [
      { id: generateId(), text: trimmed, completed: false, priority, createdAt: Date.now() },
      ...prev,
    ])
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }, [])

  const updateTodo = useCallback((id: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, text: trimmed } : t))
    )
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.completed))
  }, [])

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    activeCount,
    completedCount,
  }
}
