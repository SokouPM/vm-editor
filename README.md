# Azure VM Creation Application 🕹️

This project was developed by Pierre Marquet ([GitHub link](https://github.com/SokouPM)) as part of an assignment.<br>
It is a web application that allows users to create Azure virtual machines using React and Node.js technologies.

## 1. Technologies Used ‍💻

**React** : A JavaScript library for building user interfaces.<br>
**Node.js**: A server-side JavaScript runtime environment.<br>
**Azure SDK**: A library that facilitates interaction with Azure services.

## 2. Requirement 🚨

[Node.js](https://nodejs.org/en/download) minimum v12<br>
NPM minimum v6 (will be installed with Node.js)

## 3. How to install and use the application 📇

### 3.1 Installing dependencies ⏬

When the application starts, type and run the `npm install` command in your terminal to install all project
dependencies (this may take a while).<br>
Ignore warning messages if there are any.

### 3.2. Env file 🌳

At the root of the project, create an .env file if it does not exist and put the following variables:

```
AZURE_TENANT_ID={your_tenant_id}
AZURE_CLIENT_ID={your_client_id}
AZURE_CLIENT_SECRET={your_client_secret}
AZURE_SUBSCRIPTION_ID={your_subscription_id}
```

### 3.3. Startup 🚙

To start the application, type and run the `npm start` command in your terminal.
Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.<br>
**⚠️IMPORTANT: DON'T USE INTERNET EXPLORER⚠️**.

### 3.4. App login credentials 👩‍💻

This application has 3 users with different access rights:

|   | Username | Password | description                                                                                            |
|:--|:---------|:---------|:-------------------------------------------------------------------------------------------------------|
| 1 | JohnDoe  | uiR4a@aQ | This user has no credit and therefore cannot create a VM.                                              |
| 2 | YvesR    | 9Cfd2#Bw | This user is limited, he can only create one type of VM (Ubuntu) and only if there is no other active. |
| 3 | PierreM  | #A6tfiWg | This has all access and can therefore create several VMs.                                              |

You can use these credentials to log in to the application, also you can modify them or create another one in
the `src/data/users.json` file.

Once logged in, you will be redirected to the VM list page.<br>
**⚠️IMPORTANT: If a virtual machine does not display its IP address, wait 1 minute and reload the page⚠️**<br>
You can create a VM by clicking on the "Create VM" button at the left on the side nav menu.<br>
**⚠️IMPORTANT: The VM creation process can take up to 5 minutes.⚠️**

## 4. Application structure 🗂️

The application is composed of the following files and folders:

### 4.1. Frontend 🖼️

#### 4.1.1 src folder 📂

- `src/App.js`: The main component of the application (Javascript starting code).
- `src/index.css` :A main CSS file of the application (created with React).
- `src/index.js`: The React starting code.

#### 4.1.2 public folder 📂

- `public/index.html`: The main file of the application (Static HTML page).
- `public/favicon.ico`: The favicon of the application.
- `public/logo192.png`: A logo for the application (created with React).
- `public/logo512.png`: Another logo of the application (created with React).
- `public/manifest.json`: A manifest file for the application (created with React).
- `public/robots.txt`: A robots file for the application (created with React).

#### 4.1.3 src/components folder 📂

- `src/components`: Contains all the components used in the application.
- `src/components/template`: Contains the component used in the application template.
- `src/components/pages`: Contains all the pages of the application.
- `src/components/pages/ShowVMs`: Contains the VM list page.
- `src/components/pages/CreateVMForm`: Contains the VM creation page.

#### 4.1.4 src/styles folder 📂

- `src/styles/index.css`: The main CSS file of the application.
- `src/styles/animation.css`: Contains the animation (CSS) used in the application.

#### 4.1.5 src/animation folder 📂

- `src/animation`: Contains the waves animation (structure) used in the application.

### 4.2. Backend 🗄️

- `src/backend/server.js`: The main file of the backend (Node.js starting code).
- `src/backend/vm.js`: Contains the code related to the VM creation.
- `src/data/users.json`: Contains all the users of the application (fake database).

### 4.3. Other

- `package.json`: Contains all the dependencies of the application.
- `.env`: Contains all the environment variables of the application.
- `.gitignore`: Contains all the files and folders to be ignored by Git.
- `README.md`: Contains the documentation of the application (you are there 😉).