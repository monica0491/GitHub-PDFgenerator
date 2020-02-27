
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const generateHTML = require("./generateHTML");
const pdf = require('html-pdf');




const questions = [
   {
      type: "input",
      message: "What is your Github username?",
      name: "username",
      
   },
   {
      message: "What is your favorite color?",
      name: "color",
      type: "list",
      choices: ["green", "blue", "pink", "red"],
   }
]


function init() {
   inquirer
   .prompt(questions)
   .then(function (data) {
      
      const input = JSON.stringify(data);
      const queryUrl = "https://api.github.com/users/" + data.username;
      
      axios
      .get(queryUrl)
      .then(function (res) {
         
         
         const userData = {
            color: data.color,
            name: res.data.name,
            imageURL: res.data.avatar_url,
            location: res.data.location,
            profile: res.data.html_url,
            repositories: res.data.public_repos,
            followers: res.data.followers,
            following: res.data.following,
         }
         
         var filename = "./" + userData.name.toLowerCase().split(' ').join('')+".pdf";
         var resumeHTML = generateHTML(userData);
         
         // fs.writeFile(filename, resumeHTML, function(err){
         //    if (err) {
         //       return console.log(err);
         //    }
            
            
         // })
         
         pdf.create(resumeHTML).toFile(filename, function(err, res) {
          if (err) return console.log(err);
         });

      });
      
      
             
               
      })
   }
init();
