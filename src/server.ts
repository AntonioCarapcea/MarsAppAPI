import express from 'express';
import { readFileSync } from 'fs';
import axios, {AxiosResponse} from 'axios';
import {nasaAPIKey} from './key'

class MarsApp {
    
    app = express();
    port = 8000;
    router = express.Router();

    key = nasaAPIKey;

    /*
     * Returns the list of rovers in JSON format.
     * Sends a GET request to api.nasa.gov.
     * Requires an API key.
     */
    GetRovers(key: string) {
        const path = 'https://api.nasa.gov/mars-photos/api/v1/rovers' + '?api_key=' + key;

        return axios.get(path);
    }

    /*
     * Setup /rovers endpoint for the server.
     */
    SetupRoversEndpoint(key: string) : void {
        this.router.get('/rovers', (req, res) => {
            this.GetRovers(key)
                .then(rovers => res.send(rovers.data))
                .catch(err => console.log(err));
        });
    }

    constructor() {
        this.app.use(express.json());
 
        this.SetupRoversEndpoint(this.key);
    
        this.app.use('/', this.router);
         
        this.app.listen(this.port, () => {
            console.log(`Test backend is running on port ${this.port}`);
        });
    }
}


let  app : MarsApp = new MarsApp();
