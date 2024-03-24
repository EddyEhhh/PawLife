# PawLife🐾

CS206 Software Product Management - Year 2 Computer Science students from Singapore Management University 
and we are currently working on a project which aims to improve accessibility to veterinary services 
for pet owners, especially in the case of emergencies through the use of our application.
 
## Tech Stack (MERN)

**Back-End:** [Node](https://nodejs.org/en), [Express](https://expressjs.com/)

**Front-End:** [React-Native](https://reactnative.dev/)

**DataBase:** [MongoDB](https://www.mongodb.com/)


## Prerequisites

Dependencies to be installed:
* [Node](https://nodejs.org/en/download) 
* [GoogleMapAPIKey](https://developers.google.com/maps)
* [MongoDBAPIKey](https://www.mongodb.com/docs/atlas/app-services/authentication/api-key/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/EddyEhhh/PawLife.git
```

Go to the project directory

```bash
  cd PawLife
```

Install dependencies in the different folder(frontend & backend)

```bash
  cd frontend
  npm install
  cd ../backend
  npm install
  cd ..
```

Ensure that Both Google API Key and MongoDB API Key are in their respective configuration file 
```bash
  cd backend/app/config
  cat api.config.env
  GOOGLE_API_KEY=GoogleMapAPIKey
  cat db.config.env
  MONGODBURL=MongoDBAPIKey
```

Run the local server on backend
```bash
  cd backend
  npm run start
```
Acesses with Moblie Device(IOS/Andriod) with Expo
```bash
  cd frontend
  npm run start
```