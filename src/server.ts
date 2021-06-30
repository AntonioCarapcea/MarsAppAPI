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
     * Returns the list of rovers in JSON format.
     * Sends a GET request to api.nasa.gov.
     * Requires an API key.
     */
    async GetRoverList(key: string) : Promise<string> {
        const roverPath = 'https://api.nasa.gov/mars-photos/api/v1/rovers' + '?api_key=' + key;
        let ret : string = "";

        try {
            const response = await axios.get(roverPath);
            ret = response.data;
        } catch (exception) {
            console.error(exception);
        }

        return ret;
    }

    /*
     * Setup /rovers path for the server.
     */
    SetupRoversPath(key: string) : void {
        this.router.get('/rovers', (req, res) => {
            this.GetRoverList(key)
                .then(rovers => res.send(rovers))
                .catch(err => console.log(err));
        });
    }

    constructor() {
        this.app.use(express.json());

        this.key = this.ReadAPIKey();
 
        this.SetupRoversPath(this.key);
    
        this.app.use('/', this.router);
         
        this.app.listen(this.port, () => {
            console.log(`Test backend is running on port ${this.port}`);
        });
    }
}


let  app : MarsApp = new MarsApp();
