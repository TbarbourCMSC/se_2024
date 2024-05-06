This is the codebase for the final project for Software engineering.

By: Torrence, Nick, Tim
For any questions, please contact our POC: nsubong1@umbc.edu. 
Any contact requiring a technical questions will be discussed with the team before response.
If there has been no response withing a week, please feel free to re-email - as sometimes 
emails will be lost.

Setup for babies (YOU) using xxamp

1) install SQL server (https://www.apachefriends.org/faq_linux.html)
chmod 755 xampp-linux-*-i nstaller.run
sudo ./xampp-linux-*-installer.run

2) how to start sql server 
sudo /opt/lampp/lampp start

2.5) how to end sql server 
sudo /opt/lampp/lampp stop

3) access sql database
- open a web browser 
https://localhost/phpmyadmin/

should take you to the main admin view 

- import the database file ive given you

4) Setup the user 
- go to the webapp databse 
- privleges->add user account, add your username (the one you use to get on your os) -> all priveliges 
do this again for "hostname: %" and "localhost" 

5) run server 
go to the server file and then:
nodemon app.js

6) run client 
open the file in a web browser
