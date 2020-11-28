import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart.model";
import { CartItem } from "../../models/cart.item";
import { ProdutoDTO } from "../../models/produto.dto";
import { StorageService } from "../storage_service";

@Injectable()
export class CartService {

    cartItem: CartItem;

    constructor(
        public storage: StorageService) {

    }

    createOrClearCart() : Cart {
        let cart: Cart = {itens: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProdutoCart(produto : ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);

        //Se p findIndex retornar "-1", significa que o produto com o id requisitado 
        //ainda não está inserido no carrinho  
        if (position == -1) {
            cart.itens.push({
                quantidade: 1,
                produto: produto
            });
        }
        this.storage.setCart(cart);
        return cart;
    }
}