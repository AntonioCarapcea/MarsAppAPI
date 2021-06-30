# MarsAppAPI

## Exposed endpoints

This application exposes the following endpoints:

/rovers -> returns a list of rovers

## API Key

In order for the application to work, you need to get an API key from NASA:

https://api.nasa.gov/

Put the API key in ./src/key.ts in a variable called nasaAPIKey, like this:

export const nasaAPIKey = 'MY_KEY';

## How to run

To run:

npm run start

