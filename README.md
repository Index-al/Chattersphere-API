# ChatterSphere API 🌐✨

Welcome to the ChatterSphere API — the beating heart of your next-generation social media platform, where users can freely share their thoughts, react to friends' thoughts, and build their networks, all powered by the robustness of a NoSQL database.

## Features 🎉

- 👤 Unique User Profiles: Sign up with a custom username and email
- 💭 Share Thoughts: Post your thoughts and broadcast them to the world
- 👍 Reactions: Engage with the community by reacting to posts
- 🤝 Friend Lists: Connect and grow your network with a personal friend list

## Getting Started 🚀

Begin your journey with ChatterSphere API by following these simple setup instructions.

### Prerequisites

Make sure you have installed:

- Node.js
- MongoDB

### Installation

Clone the repo:

    git clone https://github.com/Index-al/Chattersphere-API.git

Navigate to the project directory:

    cd chattersphere-api

Install the required packages:

    npm install

Start the server to bring the API to life:

    npm start

## Usage

With the server up and running, you're all set to make API calls. Here’s a quick guide on how you can interact with the API using Thunder Client or Postman.

### Example: Add a New User

    URL: http://localhost:3000/api/users
    Method: POST
    Body:
    {
      "username": "galacticpioneer",
      "email": "startraveller@example.com"
    }

## API Endpoints 🛣

Here’s a list of endpoints that you can explore:

- GET /api/users: Retrieves all users.
- POST /api/users: Registers a new user.
- GET /api/users/:userId: Fetches a single user by ID.
- And many more...

## How It Works

Watch a basic walkthrough of the ChatterSphere API in action here: [API Preview Video](https://www.youtube.com/watch?v=ZdMJJ_UhWoY).

## Contribute

Contributions make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

## License

This project is licensed under the MIT License - see the LICENSE file for details.