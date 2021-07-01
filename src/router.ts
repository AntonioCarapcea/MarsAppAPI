import express from 'express';
import axios, { AxiosResponse } from 'axios';
import { Camera, Rover, Photo, PhotosResponse, PhotoTrimmed, PhotosTrimmedResponse, TrimPhotos} from './photoTypes'

/*
     * Returns the list of rovers in JSON format.
     * Sends a GET request to api.nasa.gov.
     * Requires an API key.
     */
function GetRovers(key: string) {
    const path = 'https://api.nasa.gov/mars-photos/api/v1/rovers' + '?api_key=' + key;

    return axios.get(path);
}

/*
 * Get photos for the curiosity rover.
 * sol is hardcoded to 1000
 * The camera is hardcoded to FHAZ.
 */
function GetCuriosityPhotos(key: string) {
    const path = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000'
        + ' &camera=fhaz&api_key=' + key;
    
    return axios.get(path);
}


/*
 * Return a PhotoResponse object.
 * Contains photo information for a specific rover, camera and sol.
 */
function GetRoverPhotos(key: string, roverName: string, cameraType: string, sol: number = 1000) {
    const path = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + roverName +
        '/photos?sol=' + sol.toString() + '&camera=' + cameraType + '&api_key=' + key;

    return axios.get<PhotosResponse>(path);
}

/*
 * Setup /rovers endpoint for the server.
 */
function SetupRoversEndpoint(router : express.Router, key: string) : void {
    router.get('/rovers', (req, res) => {
        GetRovers(key)
            .then(rovers => res.send(rovers.data))
            .catch(err => console.log(err));
    });
}

/*
 * Setup photos endpoint /photos for the server.
 * The endpoint returns a list of photos taken by the curiosity rover on sol=1000 with camera=fhaz.
 */
function SetupPhotosEndpoint(router : express.Router, key: string) : void {
    router.get('/photos', (req, res) => {
        GetCuriosityPhotos(key)
            .then(photos => res.send(photos.data))
            .catch(err => console.log(err));
    });
}

/*
 * Setup endpoint of the type /rovers/rovername/photos/cameratype.
 * The query uses the default sol of 1000.
 */
function SetupRoverPhotosEndpointDefaultSol(router : express.Router, key: string) : void {
    router.get('/rovers/:roverName/photos/:cameraType', (req, res) => {
        const roverName = req.params.roverName;
        const cameraType = req.params.cameraType;

        GetRoverPhotos(key, roverName, cameraType)
            .then(photos => {
                const trimmed : PhotosTrimmedResponse = TrimPhotos(photos.data);
                res.send(trimmed);
            })
            .catch(err => console.log(err));
    });
}

/*
 * Setup an endpoint of the type /rovers/rovername/photos/cameratype/sol.
 */
function SetupRoverPhotosEndpoint(router : express.Router, key: string) : void {
    router.get('/rovers/:roverName/photos/:cameraType/:sol', (req, res) => {
        const roverName = req.params.roverName;
        const cameraType = req.params.cameraType;
        const sol = parseInt(req.params.sol);


        GetRoverPhotos(key, roverName, cameraType, sol)
            .then(photos => {
                const trimmed : PhotosTrimmedResponse = TrimPhotos(photos.data);
                res.send(trimmed);
            })
            .catch(err => console.log(err));
    });
}

/*
 * Setup router endpoints.
 * Modifies the router given as parameter (adds new endpoints).
 */
export function SetupRouter(router : express.Router, key : string) : void {
    SetupRoversEndpoint(router, key);

    SetupPhotosEndpoint(router, key);

    SetupRoverPhotosEndpointDefaultSol(router, key);

    SetupRoverPhotosEndpoint(router, key);
}