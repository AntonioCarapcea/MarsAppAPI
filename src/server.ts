import express from 'express';
import { readFileSync } from 'fs';
import axios, {AxiosResponse} from 'axios';

class MarsApp {
    
    app = express();
    port = 8000;
    router = express.Router();

    // path to the NASA API key
    KEY_PATH = 'res/key';

    key : string = "";
    
    ReadAPIKey(): string {
        let ret : string = readFileSync(this.KEY_PATH).toString();
        return ret;
    }

    /*
     * Returns a promise to the data of the response to a GET request on the given path.
     */
    async GetDataFromGet(path : string) {
        let ret : string = "";

        try {
            const response = await axios.get(path);
            ret = response.data;
        } catch (exception) {
            console.error(exception);
        }

        return ret;
    }

    /*
     * Returns the list of rovers in JSON format.
     * Sends a GET request to api.nasa.gov.
     * Requires an API key.
     */
    GetRoverList(key: string) : Promise<string> {
        const roverPath = 'https://api.nasa.gov/mars-photos/api/v1/rovers' + '?api_key=' + key;

        return this.GetDataFromGet(roverPath);
    }

    /*
     * Get photos for the curiosity rover.
     * sol is hardcoded to 1000
     * The camera is hardcoded to FHAZ.
     */
    GetCuriosityPhotos(key: string) : Promise<string> {
        const path = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=' + key;
        
        return this.GetDataFromGet(path);
    }

    /*
     * Setup /rovers endpoint for the server.
     */
    SetupRoversEndpoint(key: string) : void {
        this.router.get('/rovers', (req, res) => {
            this.GetRoverList(key)
                .then(rovers => res.send(rovers))
                .catch(err => console.log(err));
        });
    }

    SetupPhotosEndpoint(key: string) : void {
        this.router.get('/photos', (req, res) => {
            this.GetCuriosityPhotos(key)
                .then(photos => res.send(photos))
                .catch(err => console.log(err));
        });
    }

    constructor() {
        this.app.use(express.json());

        this.key = this.ReadAPIKey();
 
        this.SetupRoversEndpoint(this.key);

        this.SetupPhotosEndpoint(this.key);
    
        this.app.use('/', this.router);
         
        this.app.listen(this.port, () => {
            console.log(`Test backend is running on port ${this.port}`);
        });
    }
}


let app : MarsApp = new MarsApp();
