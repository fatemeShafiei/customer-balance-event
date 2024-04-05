# customer-balance-event

## Overview
This is a Node.js application that uses PostgreSQL as its database backend. The application is configured using the `config` library, allowing easy management of environment-specific configurations.

## Prerequisites
Before running this application, ensure you have the following installed:

- Node.js and npm: [Node.js Official Website](https://nodejs.org/)
- PostgreSQL: [PostgreSQL Downloads](https://www.postgresql.org/download/)

## Installation
1. Clone this repository to your local machine:

    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:

    ```bash
    cd <project_directory>
    ```

3. Install dependencies using npm:

    ```bash
    npm install
    ```

## Configuration
This application uses the `config` library to manage configuration settings. Configuration files are stored in the `config` directory. Default configuration settings are defined in `default.json`, and environment-specific settings can be defined in separate files (e.g., `development.json`, `production.json`).

To configure the application, create a `default.json` file in the `config` directory and map environment variables to configuration keys. For example:

```json
{
  "host": "DB_HOST",
  "user": "DB_USERNAME",
  "password": "DB_PASSWORD",
  "dbName": "DB_NAME",
  "dialect": "postgres"
}
```

Replace `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, and `DB_NAME` with your PostgreSQL database credentials.

## Database Setup
Before running the application, ensure that your PostgreSQL database is set up and accessible. You can use tools like `psql` or graphical database clients to create the necessary database and tables.

## Running the Application
Once the dependencies are installed and the configuration is set up, you can run the application using the following command:

```bash
node index.js
```





## APIs

### Create Record (POST)
Endpoint: `http://localhost:3000/api/events/:market/:customerId`

#### Description
This API allows creating a new record in the database.

#### Request
- Method: `POST`
- URL: `http://localhost:3000/api/events/:market/:customerId`
- Body: 
```json
  {
  "reason": String,
  "reasonTime": Number,
  "businessUnit": String,
  "type": String,
  "value": Number
  }
```

#### Response
- Status: `200 Created` on success
- Body: JSON object containing the created record.

#### Example
```http
POST http://localhost:3000/api/events/FI/fi.customer-03
Content-Type: application/json

{
  "reason": "ATTEND_EVENT",
  "reasonTime": 17844646535,
  "businessUnit": "BU03",
  "type": "INCREASED",
  "value": 78
}
```

### Retrieve Records (GET)
Endpoint: `http://localhost:3000/api/events/:market/:customerId/:reason/:year`

#### Description
This API allows retrieving records from the database based on the parameters.

#### Request
- Method: `GET`
- URL: ` http://localhost:3000/api/events/:market/:customerId/:reason/:year`

#### Response
- Status: `200 OK` on success
```json
  {
   "customerId": String,
   "market": String,
   "activity": String,
   "year": String,
   "openingBalance": Number,
   "closingBalance": Number
}
```

#### Example
```http
GET http://localhost:3000/api/events/FI/fi.customer-03/PURCHASE/2023
```
#### Response
```json
  {
   "customerId": "fi.customer-03",
   "market": "FI",
   "activity": "PURCHASE",
   "year": "2023",
   "openingBalance": 0,
   "closingBalance": 5256
}
```
## Running Tests
To run tests for this application, first add test.json file to the config director. execute the following commands:
- In Linux and Mac run:
```bash
export NODE_ENV=test
```
- In windows run:
```bash
set NODE_ENV=test
```
- and finally run:
```bash
npm test
```

This command will run the test suite and provide feedback on the test results.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).
```
