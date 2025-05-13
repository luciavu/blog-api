# Blog API

The Odin Project - NodeJS Course Project (5/8):

Repo (1/3) - A RESTful API backend for a full-stack blog platform built with Express + Prisma ORM, JWT and TypeScript.

## Features

## Endpoints

| Endpoint                    | Method | Access | Description                   |
| --------------------------- | ------ | ------ | ----------------------------- |
| /auth/signup                | POST   | Public | Create an account             |
| /auth/login                 | POST   | Public | Login                         |
| /users                      | GET    | Public | Fetch all users               |
| /users/:id                  | GET    | Public | Fetch users by id             |
| /posts                      | GET    | Public | Fetch all posts               |
| /posts                      | POST   | Admin  | Create a post                 |
| /posts/:id                  | GET    | Public | Fetch post by id              |
| /posts/:id                  | PUT    | Admin  | Update post details           |
| /posts/:id                  | DELETE | Admin  | Delete a post                 |
| /posts/:postId/comments     | GET    | Public | Fetch all comments for a post |
| /posts/:postId/comments     | POST   | User   | Create a comment              |
| /posts/:postId/comments/:id | GET    | Public | Fetch comment by id           |
| /posts/:postId/comments/:id | DELETE | Admin  | Delete a comment              |
