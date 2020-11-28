import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        nome: ['Rei',[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['rei@rei.com', [Validators.required, Validators.email]],
        tipo: ['1', [Validators.required]],
        cpfOuCnpj: ['99227078029', [Validators.required, Validators.min(11), Validators.maxLength(14)]],
        senha: ['9999', [Validators.required]],
        logradouro: ['Rua do Rei', [Validators.required]],
        numero: ['99', [Validators.required]],
        complemento: ['Rei Com', []],
        bairro: ['Bairro do Rei', []],
        cep: ['99999999', [Validators.required]],
        telefone1: ['991699011', [Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]]     
      })
  }
  
  signupUser() {
    console.log("Enviou o form")
  }

}
