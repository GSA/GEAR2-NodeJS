# GEAR2-NodeJS

## Installation

### Prerequisites

Requires NodeJS (with NPM) and MySQL Server to be installed prior to setup

### Overview

1. [Clone the repository](#1-clone-the-repository)
2. [Install Node dependencies](#2-install-node-dependencies)
3. [Configure dotenv environment variables](#3-configure-dotenv)
4. [Sync Databases](#4-sync-sequelize)
5. [Start Server](#5-start-server)


### Steps

#### 1. Clone the Repository
Start by cloning this repository into a preferred location on your computer.

`git clone git@github.com:GSA/GEAR2-NodeJS.git`

Once Git is finished, move into the new working directory.

`cd GEAR2-NodeJS`

#### 2. Install Node Dependencies

From your working directory, run the npm install command. This will install all the dependencies listed in package.json.

`npm install`


#### 3. Configure the Database Connection
The next step will be to configure the database connection. Before we can do that, we need to add a folder named `.securables` to the working directory. This will hold our config file.

`mkdir .securables`

Our Git repository is already configured to ignore that folder. This gives us a safe place to keep sensitive information such as passwords, tokens, etc.

Now that we have our `.securables` folder, we can add our configuration file and set up the database connection. Inside `.securables/`, create a new file named, `gear-config.js`.

`touch .securables/gear-config.js`

Then, open `gear-config.js` in your preferred code editor and paste the following JavaScript into it...
```javascript
/* jshint node:true */

'use strict';

module.exports = {
   connection: {
            user: '',
            password: '',
            host: '',
            database: ''
        }
};
```

After the JavaScript is pasted, add the appropriate values for `userName`, `password`, `server`, and `database`. You will need to get these from the project admin.

That _should_ be all the information we need to connect to MS SQL, but if needed, other options and more detail can be found in the [TediousJS documentation](http://tediousjs.github.io/tedious/api-connection.html#function_newConnection).

#### 4. Start the Server

Finally, now that our database connection is configured, we can test the server.

`npm start`

### Testing

If the server starts up without error, you can try opening the following URL to test the database connection.

http://localhost:3000/api/v0/applications

That URL should respond with a JSON file whose first property is `"status":200`
