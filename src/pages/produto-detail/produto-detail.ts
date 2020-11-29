import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoService } from '../../services/domain/produto.service';

/**
 * Generated class for the ProdutoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    this.produtoService.findById(this.navParams.get('prod'))
      .subscribe(response => {
        this.item = response;
        this.loadImageFromBucket();
      },
      error => {}); 
  }

  loadImageFromBucket() {
    let id = this.navParams.get('prod');
    this.produtoService.getImageFromBuket(id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
      },
      error => {});
  }

  addToCart(produto: ProdutoDTO) {
    this.cartService.addProdutoCart(produto);
    this.navCtrl.setRoot('CartPage');
  }
}
