import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'

const app = express()
const db = new Database('users.db')

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`)

app.post('/api/users', (req, res) => {
  const { email, password } = req.body
  try {
    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)')
    const result = stmt.run(email, password)
    res.json({ id: result.lastInsertRowid, email })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.get('/api/users', (req, res) => {
  const users = db.prepare('SELECT id, email FROM users').all()
  res.json(users)
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})

app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  const user = db.prepare('SELECT id, email FROM users WHERE email = ? AND password = ?').get(email, password)
  
  if (!user) {
    return res.status(401).json({ error: 'Неверный email или пароль' })
  }

  res.json(user)
})