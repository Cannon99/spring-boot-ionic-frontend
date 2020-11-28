import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {
    }

    findByCategoria(categoria_id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    }

    getSmallImageFromBuket(id: string) : Observable<any> {
        return this.http.get(`${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`,
            {
                responseType: 'blob'
            });
    }
}