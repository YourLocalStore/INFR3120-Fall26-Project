# INFR3120 Fall 2026 Project

## Campus Event System

For our project, we made a website where students can find out about events happening on campus. Students can also add their own events and edit or delete them if they need to make changes. All the events are saved in a MongoDB database.

## Tools Used

We used Node.js, Express.js, EJS, and Bootstrap to make the website. MongoDB and Mongoose were used for the database. We used GitHub to keep our project files together and Render to put the website online.

## How to Run

To run the website, download the project from GitHub and open the Fall26Project folder. Run npm install to install the packages. You will also need a .env file with the DB_KEY MongoDB connection string. After that, run npm start and open http://localhost:3000 in your browser. 

Make sure the .env file is not uploaded to GitHub since it contains the database password.

###### * Note that this can be optional. The MongoDB connection string is pre-applied to the deployment on Render. See ([Deployment](#Deployment) below).

## Deployment

We used Render to get our website running online. We added the MongoDB connection string in the environment variables so the website could connect to the database. The build command is npm install and the start command is npm start.

Website: https://infr3120-campus-events.onrender.com/

## Testing

We tested the website by adding an event and checking if it showed up in the event list. We also tested editing and deleting events. The edit function wasn't working at first because it was trying to change the MongoDB _id field. We fixed the code and tested it again after deploying the changes. All the event functions worked after that.

## Group Contributions

Joshua worked on the backend, database, and event functions. Devin worked on the homepage and styling. Zohaib worked on deploying the website using Render, testing the event functions, fixing the edit error, and updating the README.
