import express from 'express';
import axios, { AxiosResponse } from 'axios';
import { PhotosResponse, PhotosTrimmedResponse, TrimPhotos } from './photoTypes'
import { nasaAPIKey } from './key'

const router = express.Router();

const key = nasaAPIKey;

function GetRovers() : Promise<AxiosResponse> {
    const path = 'https://api.nasa.gov/mars-photos/api/v1/rovers' + '?api_key=' + key;

    return axios.get(path);
}

function GetCuriosityPhotos() : Promise<AxiosResponse> {
    const path = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000'
        + ' &camera=fhaz&api_key=' + key;

    return axios.get(path);
}

function GetRoverPhotos(roverName: string, cameraType: string, sol: number = 1000) : Promise<AxiosResponse> {
    const path = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + roverName +
        '/photos?sol=' + sol.toString() + '&camera=' + cameraType + '&api_key=' + key;

    return axios.get<PhotosResponse>(path);
}

router.get('/rovers', (req, res) => {
    GetRovers()
        .then(rovers => res.send(rovers.data))
        .catch(err => console.log(err));
});


router.get('/photos', (req, res) => {
    GetCuriosityPhotos()
        .then(photos => res.send(photos.data))
        .catch(err => console.log(err));
});

router.get('/rovers/:roverName/photos/:cameraType', (req, res) => {
    const roverName = req.params.roverName;
    const cameraType = req.params.cameraType;

    GetRoverPhotos(roverName, cameraType)
        .then(photos => {
            const trimmed: PhotosTrimmedResponse = TrimPhotos(photos.data);
            res.send(trimmed);
        })
        .catch(err => console.log(err));
});

router.get('/rovers/:roverName/photos/:cameraType/:sol', (req, res) => {
    const roverName = req.params.roverName;
    const cameraType = req.params.cameraType;
    const sol = parseInt(req.params.sol);


    GetRoverPhotos(roverName, cameraType, sol)
        .then(photos => {
            const trimmed: PhotosTrimmedResponse = TrimPhotos(photos.data);
            res.send(trimmed);
        })
        .catch(err => console.log(err));
});

export default router;
