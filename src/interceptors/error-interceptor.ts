import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage_service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService){
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
        .catch((error, caught) => {

            //Váriável criada recebe o completo da requisição
            let errorObj = error;
            //Se o erro atribuído tiver o campo "error", ou seja, ele será o objeto de erro tratato no Spring
            if(errorObj.error) {
                //Variável criada receberá somente o campo error, ao invés do erro completo da requisição
                //Campo error refere-se ao erro tratato no Spring Boot
                errorObj = errorObj.error;
            }

            //Se o objeto de erro não tiver o campo status, significa que está no formato de texto
            //Que não está em formato JSON
            if(!errorObj.status){
                //Converte o objeto de erro para o formato JSON
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor")
            console.log(errorObj);

            switch(errorObj.status) {
                case 403:
                    this.handle403();
                    break;
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};