# Conspiracy Corner API
Backend server for the Conspiracy Corner app, with auth and mongoose relationships, etc.

## ERD
<img width="853" alt="Screen Shot 2024-02-08 at 5 09 59 PM" src="https://github.com/ariellepollock/project4-conspiracy/assets/149843908/3f3763e7-f75c-4169-b438-49953f884d46">


## Routes

### Auth Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |


### Story Template Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/stories`             | `stories#index`    |


### Conspiracy Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/conspiracies`             | `conspiracies#index`    |
| GET   | `/conspiracies/:id`             | `conspiracies#show`    |
| POST   | `/conspiracies`             | `conspiracies#create`    |
| PATCH  | `/conspiracies/:id/` | `conspiracies#update`  |
| DELETE | `/conspiracies/:id/`        | `conspiracies#delete`   |


### Element Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/elements/:conspiracyId`             | `elements#create`    |
| PATCH  | `/elements/:conspiracyId/elementId` | `elements#update`  |
| DELETE | `/elements/:conspiracyId/elementId`        | `elements#delete`   |