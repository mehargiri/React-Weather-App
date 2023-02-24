# Weather-App-React

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Local Installation](#local-installation)

## Overview

### The challenge

This web app displays variety of weather details about a given city.

Some of its features are:
- Current weather data such as current temperature, feels like temperature, visibility, wind speed, and direction
- 10 day forecast data which can be selected to reveal hourly weather data for each day
- Weather Icons that change according to weather condition
- Toggle between SI and Imperial units easily
- Search suggestions based on a given city name
- Horizontal scroll and button scroll

Open Meteo API is used to retreive weather data as well as city names

### Links

- Live Site URL: [Add live site URL here]()

## My process

### Built with

- Semantic HTML5 markup
- React
- Tailwind CSS
- Mobile-first workflow
- Third Party API (Open Meteo)

### What I learned

I learned how to use React's useRef hook to detect the scrollWidth changes in a window. 

I learned how to use React's useEffect hook to perform side effects such as fetching third party data using the browser's built in fetch API.
I also learned about creating a debouncing function to reduce the total number of API calls.

I learned how to use Tailwind CSS to styles the various React Components easily. 

## Local Installation

First clone this repo using `git clone [repo]`

Next, run `npm install` or `yarn` or `pnpm install` to install all the required node packages
You may delete the pnpm-lock.yaml file if you are using yarn or npm

Next, run `npm run dev` or `pnpm run dev` or `yarn run dev` to create a local dev environment

