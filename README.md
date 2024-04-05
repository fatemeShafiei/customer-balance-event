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

To configure the application, create a `custom-environment-variables.json` file in the `config` directory and map environment variables to configuration keys. For example:

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
## Running tests
To run tests for this application, execute the following command:

```bash
npm test
```


The application will start and listen for incoming requests on the specified port (default is 3000).

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize the README according to your specific application requirements and additional features. This is just a basic template to get you started.