import express from 'express';
import { nasaAPIKey } from './key'
import router from './router'
import cors from 'cors'

class MarsApp {    
    app = express();
    port = 8000; 
    
    key = nasaAPIKey;    
    
    constructor() {
        this.app.use(cors({
            origin: 'http://localhost:3000'
        }));
        
        this.app.use(express.json());

        this.app.use('/', router);

        
         
        this.app.listen(this.port, () => {
            console.log(`Test backend is running on port ${this.port}`);
        });
    }
}


let app : MarsApp = new MarsApp();
