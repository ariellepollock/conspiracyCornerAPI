# Conspiracy Corner API
Backend server for the [Conspiracy Corner App](https://github.com/ariellepollock/conspiracyCornerClient), with auth and mongoose relationships, etc.

## ERD
![alt text](<Screen Shot 2024-02-16 at 8.53.10 AM.png>)

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