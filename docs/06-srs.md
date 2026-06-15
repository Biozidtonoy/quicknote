# SRS Structure
## 1. Introduction
## Purpose
Develop a secure web application for personal note management.

## Scope

The system allows users to:

Register
Login
Upload profile image
Create notes
Update notes
Delete notes


## 2. System Overview

Architecture:

React
   ↓
FastAPI
   ↓
PostgreSQL

## 3. User Roles
### Regular User

Can:

Manage profile
Manage notes

# Functional Requirements
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


# Database design 
## Users Table
id
name
email
password_hash
profile_image
created_at
## Notes Table
id
title
content
owner_id
created_at

Relationship:

User 1 ---- * Notes

# API Design
## Authentication
POST /auth/register
POST /auth/login
## Users
GET /users/me
POST /users/upload-image
## Notes
GET /notes
POST /notes
PUT /notes/{id}
DELETE /notes/{id}