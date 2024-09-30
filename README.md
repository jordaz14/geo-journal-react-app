# Near Here 📍
<a href='http://www.recurse.com' title='Made with love at the Recurse Center'><img src='https://cloud.githubusercontent.com/assets/2883345/11325206/336ea5f4-9150-11e5-9e90-d86ad31993d8.png' height='20px'/></a>
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)

Near Here is a geo-based web app where you can create and share QR code-powered locations, join and chat in unique lobbies, and track your entries with personalized accounts. 

<hr>

## Table of Contents
- [Introduction](#near-here-)
- [Core Technologies](#core-technologies)
- [Installation](#installation)
- [How to Use](#how-to-use)
- [Codebase Overview](#codebase-overview)
- [Technical Features](#technical-features)
- [Future Improvements](#future-improvements)
- [License](#license)

## Core Technologies

- **Frontend**
  - TypeScript
  - React
  - Tailwind CSS
- **Backend**
  - Node.js
  - Express.js
- **Database**
  - Supabase
  - PostgreSQL
  - SQL
- **Deployment**
  - Render

## Installation

## How to Use

## Codebase Overview

- **CLIENT**
  - **src/components**
    - [content.ts](./client/src/content.ts) - dynamically change body content for different segments of request-response cycle
  - **src/context**
  - **src/pages**
  - **src/pages** 
- **SERVER**
  - **src**
    - [app.ts](./server/src/app.ts) - measures network times (e.g. DNS, TCP, and TLS), response times, and database execution time
  - **types**
    - [express.d.ts](./server/types/express.d.ts) - modifies type of express request to include props appended via middleware

## Technical Features

## Future Improvements
- [ ] Verify user's email on account registration
- [ ] Add account settings to update email and password
- [ ] Allow user to delete messages and locations
- [ ] Incorporate refresh token to keep users logged in
- [ ] Improve form input validation to filter inappropriate content or introduce content moderation
- [ ] Render default content if user accesses `search` page with no created locations


## License
This project is licensed under the GNU General Public License (GPL) - see the [LICENSE](./LICENSE) file for details.
