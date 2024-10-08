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
  - TypeScript - _add static typing to JavaScript, define types for network requests/responses_
  - React - _create UI components and simplify complexity via frontend framework_
  - Tailwind CSS - _write CSS in-line of React Components with utility classes_
- **Backend**
  - Node.js - _runtime environment which enables JavaScript on server side_
  - Express.js - _create endpoints to handle location creation, user authentication, and recording entries_
- **Database**
  - Supabase - _host PostgreSQL database on Supabase's free plan_
  - PostgreSQL - _RDBMS which supports SQL for querying data_
  - SQL - _query location, entry, and user data_
- **Deployment**
  - Render - _deploy frontend and backen, backend hosted with Render's starter plan_
  - Cloudflare Registrar - _register [nearhere.me](https://nearhere.me/) domain name_

## Installation

As a reminder, this app is available to use at [nearhere.me](https://nearhere.me/).

Before installing, you will need to create an account with Supabase and deploy your own DB [here](https://supabase.com/dashboard/projects). Copy the connection details provided in the dashboard section of Supabase DB to your clipboard, as these will be used to establish your own DB for the project.

Below are the steps to install and build upon this app:

**1. Clone the respository to your IDE:**
```
git clone https://github.com/jordaz14/geo-journal-react-app.git
```
**2. Navigate to the project directory:**
```
cd geo-journal-react-app.git
```
**3. Install npm in both the `./client` and `./server` directories to get dependencies:**
```
cd ./client && npm install && cd ../server && npm install
```
**4. Create a `.env` file in the `./server` directory in the following format to configure your project:**
```
SUPABASE_URL="<supabase_url>"
SUPABASE_ANON_KEY="<supabase_anon_key>"
JWT_SECRET = "<your_jwt_secret_key>"
NODE_ENV = 'development'
```
**5. In Supabase, copy the database schema below to create your own tables:**

<img src="https://github.com/user-attachments/assets/e7ae0e86-72dc-400a-aac5-e9efbe1654ea" alt="Image description" width="600" height="400">

**6. Additonally, go to Supabase's query editor and create the custom query below:**
```
DROP FUNCTION IF EXISTS get_user_location_entries(p_user_id BIGINT);

CREATE OR REPLACE FUNCTION get_user_location_entries(p_user_id BIGINT)
RETURNS TABLE (
  user_id BIGINT,             
  location_id BIGINT,          
  location_param TEXT,         
  location_lat REAL,         
  location_lng REAL,        
  owner_id INT,             
  fe_entry_id BIGINT,       
  ne_entry_id BIGINT,          
  fe_message TEXT,    
  fe_message_date TIMESTAMPTZ,         
  ne_message TEXT,             
  total_entry_count BIGINT      
) AS $$
BEGIN
  RETURN QUERY 
    SELECT 
      DISTINCT ON (e.location_id) 
      e.user_id, 
      e.location_id, 
      l.location_id::TEXT AS location_param,
      l.location_lat, 
      l.location_lng, 
      l.owner_id, 
      l.first_entry_id AS fe_entry_id, 
      l.new_entry_id AS ne_entry_id, 
      fe.message AS fe_message, 
      fe.created_at AS fe_message_date,
      ne.message AS ne_message,
      (SELECT COUNT(*) 
       FROM entries e2 
       WHERE e2.location_id = e.location_id) AS total_entry_count
    FROM 
      entries e
    JOIN 
      location_ids l ON e.location_id = l.id
    JOIN 
      entries fe ON l.first_entry_id = fe.entry_id
    JOIN 
      entries ne ON l.new_entry_id = ne.entry_id
    WHERE 
      e.user_id = p_user_id
    ORDER BY 
      e.location_id, e.created_at ASC;
END;
$$ LANGUAGE plpgsql;

```
**7. Open separate terminals for your `./client` and `./server` directories and run the follow command in each:**
```
npm run dev
```

**8. Ready to Use!**

## How to Use

**Create a Location**

https://github.com/user-attachments/assets/da59d82e-9c70-4098-9ee5-5fd3187dc913

**Visit a Location**

https://github.com/user-attachments/assets/55c6e6d9-9ef3-4f7c-81a4-4f448d12712d

**Create an Entry**

https://github.com/user-attachments/assets/fc78b6fc-7391-4b81-8942-fff364724462

**Register an Account**

https://github.com/user-attachments/assets/bf79110b-8150-4b12-a5fc-de481d768b66

**Log in to Account**

https://github.com/user-attachments/assets/3ab5b3e1-7294-4045-97fa-848b8f48badf

**Search Locations**

https://github.com/user-attachments/assets/9a3b301e-c741-4366-a422-f09de429a43a

## Codebase Overview

- **CLIENT**
  - [main.tsx](./client/main.tsx) - app.tsx wrapped in AuthProvider and Router
  - [App.tsx](./client/App.tsx) - define routes and only render app on auth validation
  - **src/components**
    - [LoginForm.tsx](./client/src/components/LogInForm.tsx) - log in an existing user
    - [MainContainer.tsx](./client/src/components/MainContainer.tsx) - animate slow fade-in of body content 
    - [VerticalContainer.tsx](./client/src/components/VerticalContainer.tsx) - fit content to vertical column
    - [MapComponent.tsx](./client/src/components/MapComponent.tsx) - update map view on coordinate change
    - [NavBar.tsx](./client/src/components/NavBar.tsx) - navigate user through home, locations, log in
    - [RegisterForm.tsx](./client/src/components/RegisterForm.tsx) - register a new user
  - **src/context**
    - [AuthContext.tsx](./client/src/context/AuthContext.tsx) - creates react context with auth status and login/logout functionality
  - **src/types**
    - [types.ts](./client/src/types/types.ts) - define types of server responses
  - **src/utils**
    - [fetch.ts](./client/src/utils/fetch.ts) - declare client and server urls, abstract post and get functions
- **SERVER**
  - **src**
    - [server.ts](./server/src/server.ts) - handle user registration/login, location creation, and entry fetching
    - **middleware**
      - [authMiddleware.ts](./server/src/middleware/authMiddleware.ts) - get token from http cookie and validate
    - **utils**
      - [jwt.ts](./server/src/utils/jwt.ts) - generate jwt token with user email
      - [supabase.ts](./server/src/utils/supabase.ts) - create supabase client, abstract queries into functions

## Technical Features

- **React Functional Component Architecture**
- **JWT-based Authentication Transmitted via HTTP Cookies**
- **Global State Management of Auth Status with React's Context API**
- **Dynamic Routing of Locations with React Router**
- **Light UI Animations with React Framer**
- **Client and Server-side Form Validation**

## Future Improvements
- [ ] Verify user's email on account registration
- [ ] Add account settings to update email and password
- [ ] Allow user to delete messages and locations
- [ ] Incorporate refresh token to keep users logged in
- [ ] Improve form input validation to filter inappropriate content or introduce content moderation
- [ ] Render default content if user accesses `search` page with no created locations


## License
This project is licensed under the GNU General Public License (GPL) - see the [LICENSE](./LICENSE) file for details.
