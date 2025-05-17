# Blog API

The Odin Project - NodeJS Course Project (5/8):

Repo (1/2) - A RESTful API backend for a full-stack blog platform built with Express, Prisma ORM, JWT and TypeScript. Deployed using Render and Supabase.

## Features

- User authenitcation with JWT (signup and login)
- CRUD operations for posts and comments
- Protected routes for admins

## Endpoints

| Endpoint                    | Method | Access | Description                   |
| --------------------------- | ------ | ------ | ----------------------------- |
| /auth/register              | POST   | Public | Create an account             |
| /auth/login                 | POST   | Public | Login and receive a JWT       |
| /users                      | GET    | Admin  | Fetch all users               |
| /users/:id                  | GET    | Admin  | Fetch users by id             |
| /posts                      | GET    | Public | Fetch published posts         |
| /posts/all                  | GET    | Admin  | Fetch all posts               |
| /posts                      | POST   | Admin  | Create a post                 |
| /posts/:id                  | GET    | Public | Fetch post by id              |
| /posts/:id                  | PUT    | Admin  | Update post details           |
| /posts/:id                  | DELETE | Admin  | Delete a post                 |
| /comments                   | GET    | Public | Fetch all comments            |
| /posts/:postId/comments     | GET    | Public | Fetch all comments for a post |
| /posts/:postId/comments     | POST   | User   | Add a comment to a post       |
| /posts/:postId/comments/:id | GET    | Public | Fetch comment by id           |
| /posts/:postId/comments/:id | DELETE | Admin  | Delete a specific comment     |
