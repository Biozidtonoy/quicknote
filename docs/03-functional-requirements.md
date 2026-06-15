# Authentication
## FR-1 Register User

The system shall allow users to register using:

Name
Email
Password

## FR-2 Login User

The system shall authenticate users and return a JWT token.

## FR-3 Password Hashing

The system shall hash passwords before storing them.

## FR-4 Protected Routes

The system shall restrict unauthorized access to protected APIs.

## FR-5 Create Note

The system shall allow authenticated users to create notes.

## FR-6 View Notes

The system shall display notes belonging only to the logged-in user.

## FR-7 Update Note

The system shall allow users to edit their own notes.

## FR-8 Delete Note

The system shall allow users to delete their own notes.

## FR-9 Search Notes

The system shall allow searching notes using query parameters.

Example:

GET /notes?search=python

## FR-10 Upload Profile Image

The system shall allow users to upload profile images.