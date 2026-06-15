Level 0 DFD
User
  ↓
React Frontend
  ↓ HTTP Request
FastAPI Backend
  ↓ SQL Query
PostgreSQL
Register Flow
User
  ↓
Register Form
  ↓
POST /register
  ↓
FastAPI
  ↓
Hash Password
  ↓
PostgreSQL
Login Flow
User
  ↓
POST /login
  ↓
Verify Password
  ↓
Generate JWT
  ↓
Return Token
Create Note Flow
User
  ↓
React
  ↓
POST /notes
  ↓
JWT Validation
  ↓
Database Save
  ↓
Response