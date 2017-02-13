# GEAR2-NodeJS

## For Developers

### Getting started using a Bash shell (Git Bash, Terminal, etc.)

Prerequisites:

Assumes you have NodeJS (with NPM) installed and connection information for MSSQL.

Start by cloning this repository into a preferred location on your computer.

`git clone git@github.com:GSA/GEAR2-NodeJS.git`

Once finished, move into the new working directory.

`cd GEAR2-NodeJS`

Install Node dependencies

`npm install`

The next step will be to configure the database connection. Before we do, we need to add a folder named `.securables` to the working directory.

`mkdir .securables`

Our Git repository is already configured to ignore anything in that folder. This gives us a safe place to keep sensitive information such as passwords, tokens, etc. without having to worry about anything accidentally being published to Github.

Now, we can add our configuration file and set up the database connection. Inside `.securables/`, add a new file named, `gear-config.js`.

`touch .securables/gear-config.js`

Then, open it in your preferred code editor and paste the following code into it...
```javascript
/* jshint node:true */

"use strict";

module.exports = {
    databaseSettings: {
        connection: {
            userName: '',
            password: '',
            server: '',
            options: {
                database: ''
            }
        }
    }
};
```

Once that's in place, add the appropriate values for `userName`, `password`, `server`, and `database`. More information on the available configuration options can be found in the [TediousJS documentation](http://tediousjs.github.io/tedious/api-connection.html#function_newConnection).

Finally, now that our database connection is configured, we can test the server.

`npm start`

If the server starts up without error, you can try opening the following URL to test the database connection.

http://localhost:3000/api/v0/applications
