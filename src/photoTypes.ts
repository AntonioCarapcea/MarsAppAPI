/*
 * This file contains the interfaces for the objects returned in a photo query to the NASA server.
 * It also has interfaces for the trimmed versions served by this server.
 */

export interface Camera {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
}

export interface Rover {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
}

export interface Photo {
    id: number;
    sol: number;
    camera: Camera;
    img_src: string;
    earth_date: string;
    rover: Rover;
}

export interface PhotosResponse {
    photos: Photo[];
}

export interface PhotoTrimmed {
    id: number,
    img_src: string,
    earth_date: string
}

export interface PhotosTrimmedResponse {
    photos: PhotoTrimmed[]
}

export function TrimPhotos(response : PhotosResponse) : PhotosTrimmedResponse {
    let res : PhotosTrimmedResponse = {
        photos : []
    };

    for (let p of response.photos) {
        let p_trimmed : PhotoTrimmed = {
            id: p.id,
            img_src: p.img_src,
            earth_date: p.earth_date
        };

        res.photos.push(p_trimmed);
    }

    return res;
}