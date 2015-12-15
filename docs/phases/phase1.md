# Phase 1: Auth Cycle, Flux Pattern, and first screen

## Rails
### Models
* User

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)

### Views
* users/index.json.jbuilder
* user/show.json.jbuilder

## Flux
### Views (React Components)
* Sign_Up component
* Log_In component
* Nav_Bar component

### Stores
* RoommatesStore

### Actions
* recieveAllRoommates
* createRoommate

### ApiUtil
* fetchAllRoommates
* createRoommate

## Gems/Libraries
* BCrypt (Gem)
