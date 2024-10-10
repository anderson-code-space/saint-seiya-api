Here's a detailed documentation for the API routes defined in your Express application:

## API Documentation

### Base URL
The base URL for all endpoints is assumed to be:
```
http://<your-domain>/
```

### Pagination Middleware
- **Middleware**: `paginationMiddleware`
- **Description**: This middleware is applied to endpoints that return a list of items. It handles pagination by adding query parameters for page number and page size.

### Endpoints

#### 1. Get All Artists
- **Endpoint**: `GET /artists`
- **Middleware**: `paginationMiddleware`
- **Description**: Retrieves a paginated list of all artists.
- **Query Parameters**:
  - `page`: (optional) The page number to retrieve.
  - `size`: (optional) The number of items per page.
- **Response**: JSON array of artist objects.

> GET Artist
```sh
curl -X GET http://127.0.0.1:3000/artists

```

> POST Artist : 
```sh
curl -X POST http://127.0.0.1:3000/artist/create \
-H "Content-Type: application/json" \
-d '{"name": "Jane Doe", "site": "https://www.example.com/users/jane/"}'
```

> DELETE Artist : 
```sh
curl -X DELETE http://127.0.0.1:3000/artist/<number>
```

> PUT Artist : 
```sh
curl -X PUT http://127.0.0.1:3000/artist/<number> \
-H "Content-Type: application/json" \
-d '{"name": "Update Doe", "site": "https://www.update.com/users/update/"}'
```




#### 2. Get Artist by ID
- **Endpoint**: `GET /artist/:id`
- **Description**: Retrieves details of a specific artist by their ID.
- **Path Parameters**:
  - `id`: The unique identifier of the artist.
- **Response**: JSON object representing the artist.

#### 3. Get All Debuts
- **Endpoint**: `GET /debuts`
- **Middleware**: `paginationMiddleware`
- **Description**: Retrieves a paginated list of all debuts.
- **Query Parameters**:
  - `page`: (optional) The page number to retrieve.
  - `size`: (optional) The number of items per page.
- **Response**: JSON array of debut objects.

#### 4. Get Debut by ID
- **Endpoint**: `GET /debut/:id`
- **Description**: Retrieves details of a specific debut by its ID.
- **Path Parameters**:
  - `id`: The unique identifier of the debut.
- **Response**: JSON object representing the debut.

#### 5. Get All Characters
- **Endpoint**: `GET /characters`
- **Middleware**: `paginationMiddleware`
- **Description**: Retrieves a paginated list of all characters.
- **Query Parameters**:
  - `page`: (optional) The page number to retrieve.
  - `size`: (optional) The number of items per page.
- **Response**: JSON array of character objects.

#### 6. Get Character by ID
- **Endpoint**: `GET /character/:id`
- **Description**: Retrieves details of a specific character by their ID.
- **Path Parameters**:
  - `id`: The unique identifier of the character.
- **Response**: JSON object representing the character.

#### 7. Get All Curiosities
- **Endpoint**: `GET /curiosities`
- **Middleware**: `paginationMiddleware`
- **Description**: Retrieves a paginated list of all curiosities.
- **Query Parameters**:
  - `page`: (optional) The page number to retrieve.
  - `size`: (optional) The number of items per page.
- **Response**: JSON array of curiosities objects.

#### 8. Get All Classes
- **Endpoint**: `GET /all-classes`
- **Description**: Retrieves a list of all classes.
- **Response**: JSON array of class objects.

#### 9. Get Saints by Class
- **Endpoint**: `GET /:class`
- **Description**: Retrieves a list of saints within a specific class.
- **Path Parameters**:
  - `class`: The name of the class.
- **Response**: JSON array of saint objects belonging to the specified class.

#### 10. Get Saint by Class and ID
- **Endpoint**: `GET /:class/:id`
- **Description**: Retrieves details of a specific saint by their class and ID.
- **Path Parameters**:
  - `class`: The name of the class.
  - `id`: The unique identifier of the saint within the specified class.
- **Response**: JSON object representing the saint.

#### 11. Get Classes by Debut ID
- **Endpoint**: `GET /classes/debut/:id`
- **Description**: Retrieves a list of classes associated with a specific debut ID.
- **Path Parameters**:
  - `id`: The unique identifier of the debut.
- **Response**: JSON array of class objects associated with the specified debut.

#### 12. Get Classes by Artist ID
- **Endpoint**: `GET /classes/artist/:id`
- **Description**: Retrieves a list of classes associated with a specific artist ID.
- **Path Parameters**:
  - `id`: The unique identifier of the artist.
- **Response**: JSON array of class objects associated with the specified artist.
