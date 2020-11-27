import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IonicPage } from "ionic-angular/umd/navigation/ionic-page";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage_service";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService) {

    }

    findByEmail(email: string) : Observable<ClienteDTO> {

        //let token = this.storage.getLocalUser().token;
        //let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token})

        //return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
        //{'headers': authHeader});

        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string) : Observable<any> {
        return this.http.get(`${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`,
            {
                responseType : 'blob'
            });
    }
}