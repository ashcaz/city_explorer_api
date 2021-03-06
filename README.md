# city_explorer_api

**Author**: Ashley Casimir
**Version**: 1.0.0 - basic setup of file structure for app
2.0.0 - Get location data to appear from static json file
3.0.0 - Get weather data to appear using a static json file
4.0.0

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->

1. **Repository Set Up**

2. **Errors**: As a user, I want clear messages if something goes wrong so I know if I need to make any changes or try again in a different manner.

3. **Locations**: As a user of City Explorer, I want to enter the name of a location so that I can see data about the area of interest to me.

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

- Node.js
- express
- dotenv
- cors
- jquery
- APIs
  - LocationIQ
  - Weatherbit
  - Hiking Project Data API

## Change Log
<!-- <!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples: -->

18-06-2020 19:20 - Application now has a fully-functional express server, with a GET route for the location resource.

18-06-2020 19:56 - Application will now give back 404 and 500 errors.

20-06-2020 16:49 - Application will now display Location using static json files

20-06-2020 20:40 - Application will now display weather data using static json files!

20-06-2020 21:10 - Application uses .map() instead of forEach to return weater array of objects

21-06-2020 17:39 - Now Search any location you want using LocationIQ API

21-06-2020 18:47 - When you search a city it now gives you a 16 day weather forecast thanks to Weatherbit.io API

21-06-2020 22:41 - With the newly added Hiking Project Data API - you can see popular trails while searching cities!

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
-->



Number and name of feature: Feature #1 Repository Set Up

Estimate of time needed to complete: 1 hour

Start time: 18:11 Thursday 18June

Finish time: 19:20 Thursday 18June

Actual time needed to complete: 1 hr 9 min



Number and name of feature: Feature #2 Errors

Estimate of time needed to complete: 45 min

Start time: 19:20 Thursday 18June

Finish time: 19:56 Thursday 18June

Actual time needed to complete: 36 min


Number and name of feature: Feature #3 Locations

Estimate of time needed to complete: 1.5 hours

Start time: 20:02 Thursday 18June

Finish time: 16:49  Saturday 20June

Actual time needed to complete: 4 hours and 45 min



Number and name of feature: Feature #4 Weather

Estimate of time needed to complete: 1 hour

Start time: 18:30 Saturday 20June

Finish time: 20:40  Saturday 20June

Actual time needed to complete: 2 hours and 10 min


Number and name of feature: Feature #5 .map()

Estimate of time needed to complete: 30 min

Start time: 20:40 Saturday 20June

Finish time: 21:10 Saturday 20June

Actual time needed to complete: 30 min


Number and name of feature: Feature #6 Geocode API

Estimate of time needed to complete: 1.5 hours

Start time: 16:40 Sunday 21June

Finish time: 17:39 Sunday 21June

Actual time needed to complete: 59 min


Number and name of feature: Feature #7 Weatherbit API

Estimate of time needed to complete: 1 hour and 20 min

Start time: 17:45 Sunday 21June

Finish time:  18:47 Sunday 21June

Actual time needed to complete: 1 hour 2 min


Number and name of feature: Feature #8 Trails API

Estimate of time needed to complete: 2 hours

Start time: 19:30 Sunday 21June

Finish time:  22:41 Sunday 21June

Actual time needed to complete: 3 hours 11 mins