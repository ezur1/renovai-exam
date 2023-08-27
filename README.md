# README for Dockerized NestJS & NextJS with MySQL

## Introduction
Hi!
This setup allows you to run a NestJS application, a NextJS application, and a MySQL database using Docker and Docker Compose.

## Prerequisites
1. [Docker](https://www.docker.com/get-started)
2. [Docker Compose](https://docs.docker.com/compose/install/)

## Structure
1. **nest-app**: NestJS Backend Server
    - Exposes port `8080`
    - Depends on the MySQL service (`renovai-mysql`)
    - Database host set to `renovai`

2. **renovai-mysql**: MySQL Database
    - Uses the official MySQL image version `5.7.42`
    - Exposes port `3306`
    - Root password set to `renovai`

3. **next-app**: NextJS Frontend Client
    - Exposes port `3000`

## Getting Started

1. **Navigate to the project directory**.

    cd renovai-exam


2. **Build and start the Docker containers**.

    docker-compose up --build

    If you want to run it in the background, use:
    docker-compose up -d --build

3. **Access the applications**:
    - NestJS App: [http://localhost:8080](http://localhost:8080)
    - NextJS App: [http://localhost:3000](http://localhost:3000)
    - MySQL Database: `localhost:3306` (Use any MySQL client or CLI to connect)

4. **To stop the services**:
    docker-compose down

## Persistent Data
The MySQL service uses a named volume (`mysql-data`) to store the database data, ensuring that the data persists even when the container is stopped or removed.

## Notes
- Make sure the directories `./server` and `./client` exist and contain the respective Dockerfile and source code for the NestJS and NextJS applications.
- Modify the environment variables and ports as required by your application.
- Always keep your database credentials secure and avoid hardcoding sensitive information in the `docker-compose.yml` file. Consider using Docker secrets or environment files.

## Contributions
Contributions are welcome. Please create an issue or pull request for any bugs or feature requests.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.