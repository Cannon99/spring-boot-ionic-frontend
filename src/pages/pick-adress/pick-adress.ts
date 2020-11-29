import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  items : EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua do Rei",
        numero: "99",
        complemento: "Apto 99",
        bairro: "Bairro do Rei",
        cep: "999999",
        cidade: {
          id: "1",
          nome: "Cidade do Rei",
          estado: {
            id: "1",
            nome: "Estado do Rei"
          }
        }
      },
      {
        id: "1",
        logradouro: "Rua do Rei 2",
        numero: "99",
        complemento: "Apto 99",
        bairro: "Bairro do Rei 2",
        cep: "999999",
        cidade: {
          id: "1",
          nome: "Cidade do Rei 2",
          estado: {
            id: "1",
            nome: "Estado do Rei 2"
          }
        }
      }
    ]
  }
}
