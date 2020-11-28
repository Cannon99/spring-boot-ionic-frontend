import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import { FieldMessage } from "../models/fieldmessage";
import { StorageService } from "../services/storage_service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService, public alertCrl : AlertController){
        
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
                case 401:
                    this.handle401();
                    break;
                case 403:
                    this.handle403();
                    break;
                case 422:
                    this.handle422(errorObj);
                    break;
                default:
                    this.handleDefaultError(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle401(){
        let alert = this.alertCrl.create({
            title: 'Erro 401: Falha de autenticação',
            message: 'Email ou senha inválidos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        })
        alert.present();
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    handle422(objError) {
        let alert = this.alertCrl.create({
            title: "Erro 422: Validação",
            message: this.listErrors(objError.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        })
        alert.present();
    }

    handleDefaultError(objError) {
        let alert = this.alertCrl.create({
            title: 'Erro ' + objError.status + ': ' + objError.error,
            message: objError.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        })
        alert.present();
    }

    private listErrors(messages: FieldMessage[]) : string {
        let s : string = '';

        for (let i=0; i<messages.length; i++) {
            s = s + "<p><strong>" + messages[i].fieldName + ": </strong>" + messages[i].message + "</p>"
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};