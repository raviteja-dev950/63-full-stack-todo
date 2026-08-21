package com.raviteja.todo.controller;

import com.raviteja.todo.entity.Todo;
import com.raviteja.todo.service.TodoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "*")
public class TodoController {
    private final TodoService todoService;
    
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getAllTodos() { return todoService.getAllTodos(); }
    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id) { return todoService.getTodoById(id); }
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) { return todoService.createTodo(todo); }
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todo) { return todoService.updateTodo(id, todo); }
    @DeleteMapping("/{id}")
    public String deleteTodo(@PathVariable Long id) { todoService.deleteTodo(id); return "Todo deleted"; }
}