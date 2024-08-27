These files were exported from MongoDB using mongoexport (https://www.mongodb.com/docs/database-tools/mongoexport). 

Example command: 'mongoexport' --uri="mongodb+srv://user:password@cluster0.aaaaaaa.mongodb.net" --db="mta-website-db" --collection="users" --out="users.json"

Database name was mta-website-db. The json file names correspond to the name of the collection within the database (i.e. users.json => users collection)

The data should be imported back into mongodb using mongoimport (https://www.mongodb.com/docs/database-tools/mongoimport/).
 
