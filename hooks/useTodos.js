// src/hooks/useTodos.js
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export const useTodos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const createTodo = useCallback(async (title) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const updateTodo = useCallback(async (id, data) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const deleteTodo = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const toggleTodoStatus = useCallback(async (id, completed) => {
    await updateTodo(id, { completed });
  }, [updateTodo]);

  return {
    isLoading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodoStatus,
  };
};