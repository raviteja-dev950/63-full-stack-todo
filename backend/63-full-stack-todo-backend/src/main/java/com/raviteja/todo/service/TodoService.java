package com.raviteja.todo.service;

import com.raviteja.todo.entity.Todo;
import com.raviteja.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TodoService {
    private final TodoRepository todoRepository;
    
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos() { return todoRepository.findAll(); }
    public Todo getTodoById(Long id) { return todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found")); }
    public Todo createTodo(Todo todo) { return todoRepository.save(todo); }
    public Todo updateTodo(Long id, Todo todoDetails) {
        Todo todo = getTodoById(id);
        todo.setTitle(todoDetails.getTitle());
        todo.setDescription(todoDetails.getDescription());
        todo.setCompleted(todoDetails.isCompleted());
        return todoRepository.save(todo);
    }
    public void deleteTodo(Long id) { todoRepository.deleteById(id); }
}