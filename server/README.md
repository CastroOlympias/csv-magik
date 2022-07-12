# Hybrid
Experimenting with a hybrid GraphQl REST API backend and a React Vanillia Javascript front end on single database 

I want to see if I can turn this app, from boot camp into a hybrid full stack application. It starts out as a REST API server using Mongoose and MongoDb with REST API Controllers and and vanilla html files.

What I would like to do is replace the vanillia html files with react and still consume REST API data
Then I'd like to change the server to an Apollo Express server and still consume those REST API data in react
Then I'd like to add GrapQl to the server against the same database. Note: since by now I have become a lot more familiar with GraphQl it this whole project might be easier working with an already working REST API server.
Then I'd like have react be able to use both REST API calls and GraphQl calls against the same database
Then I'd like to use vanllia javasript to mount Node compatable components that can use the REST API and the require fs feature of Node. It seems react cannot use require but vanilla javascript can if directly loaded into the DOM. Using vanllia javascript to mount and umount dynamic DOM elemnts is easy.



Why would I like to do this? Because I want to expeirment using fs to read and write csv files where I can convert the long string seperated by commas into objects for data manipulation and interpritation with the ability to send to database and also create csv files afther the object data is manipulated. cvs is a great offline capable database, I love excel and the use of formulas. If I can do then I can create a web app to better work out data at the company I work with, export a new csv file then script update the server SQL data. It is offline capable and redundt incase of cyber attacks too.