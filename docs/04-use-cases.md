# Purpose

Describes interactions between users and the system.

# Actor

User

# Use Case 1: Register
Precondition

User is not registered.

## Steps
User opens registration page.
User enters information.
User submits form.
System validates data.
System stores user in database.
System returns success message.
Postcondition

User account created.

# Use Case 2: Login
## Steps
User enters credentials.
System verifies credentials.
System generates JWT token.
User is logged in.

# Use Case 3: Create Note
## Steps
User enters note.
Frontend sends API request.
Backend validates JWT.
Backend stores note.
Database saves note.
Backend returns response.