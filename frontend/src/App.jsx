import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:9198/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async () => {
    if (!title.trim()) return alert("Enter title");
    await axios.post(API_URL, { title, description, completed: false });
    setTitle(""); setDescription("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  const toggleComplete = async (todo) => {
    await axios.put(`${API_URL}/${todo.id}`, { ...todo, completed: !todo.completed });
    fetchTodos();
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: 20, fontFamily: "Segoe UI, sans-serif" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", background: "white", borderRadius: 16, padding: 30, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        
        <h1 style={{ textAlign: "center", margin: "0 0 5px 0", color: "#333", fontSize: 32 }}>📝 Full Stack Todo</h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 25 }}>Spring Boot + Oracle 11g + React | by Ravi Teja</p>

        <div style={{ display: "flex", gap: 10, marginBottom: 30, background: "#f8f9fa", padding: 15, borderRadius: 12 }}>
          <input 
            placeholder="What to do? (e.g. Learn Java)" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            style={{ flex: 2, padding: "12px 15px", borderRadius: 8, border: "1px solid #ddd", outline: "none", fontSize: 14 }}
          />
          <input 
            placeholder="Description" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            style={{ flex: 2, padding: "12px 15px", borderRadius: 8, border: "1px solid #ddd", outline: "none", fontSize: 14 }}
          />
          <button onClick={addTodo} style={{ flex: 0.7, padding: "12px 20px", background: "#667eea", color: "white", border: "none", borderRadius: 8, fontWeight: "bold", cursor: "pointer" }}>+ Add</button>
        </div>

        <div>
          <h3 style={{ color: "#333" }}>Your Todos ({todos.length})</h3>
          {todos.length === 0 && <p style={{ textAlign: "center", color: "#999", padding: 20 }}>No todos yet. Add one above! 👆</p>}
          
          {todos.map(todo => (
            <div key={todo.id} style={{ 
              border: "1px solid #eee", 
              padding: "15px 18px", 
              marginBottom: 12, 
              borderRadius: 10, 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              background: todo.completed ? "#e8f5e9" : "white",
              transition: "0.2s"
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", fontSize: 16, textDecoration: todo.completed ? "line-through" : "none", color: todo.completed ? "#888" : "#333" }}>
                  {todo.completed ? "✅ " : "📌 "}{todo.title}
                </div>
                <div style={{ color: "#666", fontSize: 13, marginTop: 4 }}>{todo.description}</div>
                <div style={{ color: "#aaa", fontSize: 11, marginTop: 4 }}>ID: {todo.id}</div>
              </div>
              <div style={{ display: "flex", gap: 8, marginLeft: 15 }}>
                <button onClick={() => toggleComplete(todo)} style={{ padding: "7px 14px", background: todo.completed ? "#ff9800" : "#4caf50", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>
                  {todo.completed ? "Undo" : "Done"}
                </button>
                <button onClick={() => deleteTodo(todo.id)} style={{ padding: "7px 14px", background: "#f44336", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 30, color: "#aaa", fontSize: 12 }}>
          Backend: http://localhost:9198/api/todos | Frontend: http://localhost:5173
        </div>
      </div>
    </div>
  );
}

export default App;