# My Blog Website

[![uses](https://img.shields.io/badge/Uses-HTML%20CSS%20Javascript-brightgreen.svg)](https://github.com/afakhry01/my-blog)

A blog website to share my vibes (as well as others) using Node.js, Mongodb, Express and bootstraps and following RESTfull routes. 

## Development Environment
This project was fully written using Visual Studio Code Editor on Cloud9. The version control was maintained using git.

## Compiler
Install Node.js first and then use npm.

## RESTful Routes

 Name     url             Method  Description
==================================================================
 Index    /blog           GET     Display all blog posts
 New      /blog/new       GET     Display a page to add new post
 Create   /blog           POST    Add a new post to database
 Show     /blog/:id       GET     Show a post
 Update   /blog/:id       PUT     Update a post
 Delete   /blog/:id       DELETE  Remove a post
 Edit     /blog/:id/edit  GET     Edit a post

## License
MIT License
