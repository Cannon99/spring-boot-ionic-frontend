import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {
    }

    findById(id: string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${id}`);
    }

    findByCategoria(categoria_id: string, page: number=0, linesPerPage: number=24) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    getSmallImageFromBuket(id: string) : Observable<any> {
        return this.http.get(`${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`,
            {
                responseType: 'blob'
            });
    }

    getImageFromBuket(id: string) : Observable<any> {
        return this.http.get(`${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`,
            {
                responseType: 'blob'
            });
    }
}