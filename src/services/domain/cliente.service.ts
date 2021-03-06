import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IonicPage } from "ionic-angular/umd/navigation/ionic-page";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { ImageUtilService } from "../image-util.service";
import { StorageService } from "../storage_service";

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public imageUtilService: ImageUtilService) {

    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findByEmail(email: string) {

        //let token = this.storage.getLocalUser().token;
        //let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token})

        //return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
        //{'headers': authHeader});

        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string) : Observable<any> {
        return this.http.get(`${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`,
            {
                responseType : 'blob'
            });
    }

    insert(obj) {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`, 
        obj,
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(`${API_CONFIG.baseUrl}/clientes/picture`, 
        formData,
        {
            observe: 'response',
            responseType: 'text'
        });
    }
}