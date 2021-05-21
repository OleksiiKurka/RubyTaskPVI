# README

* 1st commit: init and add gem for authorization
* 2nd commit: add User and Role. Add simple authorization with JWT. Add test controller to test it. 


# All commands
##### Commands to quickly rebuild the project if something went wrong. Hope everything will be fine))) 
#### count how many times it helped me: 2 

* 1st commit: 
   - rails new RailsProject --database=postgresql --api
* 2nd commit
    - rails g model Role role:string
    -  rails g model User first_name:string last_name:string password_digest:string email:string age:integer about:string role:references