# Professor Reviews Mock API

This is a simple mock API for the Open Students application, intended only for development and testing purposes. It provides a set of endpoints to manage professors and reviews.


## Running the mock API

### Dependencies

Before running the mock API, make sure you have the following dependencies installed:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) (included in the Node.js installation above)

1. Install TypeScript globally:
    ```
    npm install -g typescript
    ```

2. Install the project dependencies:
    ```
    npm install
    ```

### Running the API

1. Compile the TypeScript files:
    ```
    tsc index.ts
    ```

2. Run the application:
    ```
    npm start
    ```

The mock API will be available at `http://localhost:3000`.

## Available Endpoints

| Endpoint                        | Description                                               | Response                                                                                                       |
|---------------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `GET /professors `                | Returns a list of all professors.                         | List of professors                                                                                             |
| `GET /periods`                    | Returns a list of all periods.                            | List of periods                                                                                                |
| `GET /professors/{id}`            | Returns information about a specific professor.           | Information about the professor identified by {id}                                                             |
| `GET /professors/{id}/reviews`    | Returns a list of reviews for a specific professor.       | List of reviews for the professor identified by {id}                                                           |
| `GET /professors/{id}/courses`    | Returns a list of courses taught by a specific professor. | List of courses taught by the professor identified by {id}                                                     |
| `POST /reviews`                   | Creates a new review.                                     | 204 No Content (Successful creation; no content returned)                                                       |

