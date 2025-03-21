<h3>Instructions:</h3>


for this to work you need to 
1. insert right username and password from your mysql root to your <code>db.config.js</code> and <code>.env</code> files, 
2. run npm install inside the <code>"/backend"</code> folder
3. make <code>.env</code> file in <code>"/backend"</code> with <code>SQL_PWD="[your-password]"</code>
4. <span style="color: red">(DO IT JUST BC ITS BROKEN AT THE MOMENT)</span> make database exampleDb with table roles, that has id, name, createdAt, updatedAt values and table users that has id, email, username, password, createdAt, updatedAt
5. run


<h4>what do I need to do:</h4>

<!-- fix <code>sqlMessage: "Table 'exampleDb.roles' doesn't exist"</code> error after every odd attempt of running server.js -->
<!-- fix <code>sqlMessage: "Cannot drop table 'roles' referenced by a foreign key constraint 'user_roles_ibfk_1' on table 'user_roles'.",</code> -->

maybe db.js and migrations from /database are not used anymore and its better to delete them

on the frontend when i signup i get <code>Unable to validate Username</code> error, need to fix it