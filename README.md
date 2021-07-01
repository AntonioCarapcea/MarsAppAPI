# MarsAppAPI

## Exposed endpoints

This application exposes the following endpoints:

/rovers -> returns a list of rovers

/rovers/photos -> returns some photos taken by the Curiosity rover

/rovers/{rover-name}/photos/{camera-type} -> returns all photos taken by the rover with the specified camera (on sol 1000)

/rovers/{rover-name}/photos/{camera-type}/{sol} -> similar, but the sol is specified

## API Key

In order for the application to work, you need to get an API key from NASA:

https://api.nasa.gov/

Put the API key in ./src/key.ts in a variable called nasaAPIKey, like this:

export const nasaAPIKey = 'MY_KEY';

## How to run

To run:

npm run start





