# ICT-Project-Front-end
**This repository is the frontend part of our [ICT Project](https://github.com/A-d-f/ICT-Project) made for Häme University of Applied Sciences and Cinia Oy.**  
**The project goal was to create a proof of concept - how could speech recognition be utilized in emergency call processes.**

Team:  [Anna-Maria Palm](https://github.com/A-d-f), [Jenna Hakkarainen](https://github.com/jenhakk), [Amanda Karjalainen](https://github.com/amakarj), [Waltteri Grek](https://github.com/GreWalw)

## Summary

The frontend is made with React and its structure is simple being just a demonstration of how our program works.
It consists of App.js and two form pages. It uses fetch, useEffect, React Hook Form and it connects with the backend via REST. It receives suggestions from backend every 0,5 seconds and posts the chosen incident to backend.

Initially the plan was to make the frontend dynamic (getting the form structure and data from the json file in the backend), but we couldn't make it work due to time limitations in the project. This could be a further development task in the future.
