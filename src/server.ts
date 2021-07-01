import express from 'express';
import axios, { AxiosResponse } from 'axios';
import { Camera, Rover, Photo, PhotosResponse, PhotoTrimmed, PhotosTrimmedResponse, TrimPhotos} from './photoTypes'
import { nasaAPIKey } from './key'
import { SetupRouter } from './router'

class MarsApp {    
    app = express();
    port = 8000; 
    router = express.Router();

    key = nasaAPIKey;    
    
    constructor() {
        this.app.use(express.json());

        SetupRouter(this.router, this.key);

        this.app.use('/', this.router);
         
        this.app.listen(this.port, () => {
            console.log(`Test backend is running on port ${this.port}`);
        });
    }
}


let app : MarsApp = new MarsApp();
