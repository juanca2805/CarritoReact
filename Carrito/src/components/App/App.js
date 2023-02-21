import React, { Component } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react'
import Menu from '../Menu'
import ProductList from '../ProductList'
import CartList from '../CartList'
import Order from '../Order'
import style from './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openOrder: false,
      total: 0,
      sum: 0,
      products: [
        {
          id: 1,
          name: 'feliz cumpleaños ferxxo tee',
          picture: 'https://cdn.shopify.com/s/files/1/0464/6715/4072/products/FelizCumpleanosFERXXOCakeT-Shirt_Black_-Back_376x.png?v=1664311939',
          price: 12346,
          datails: 'Compra Protegida, recibe el producto que esperabas o te devolvemos tu dinero.',
          marca: 'nike',
          status: 10,
        },
        {
          id: 2,
          name: 'feliz cumpleaños ferxxo hoodie',
          picture: 'https://cdn.shopify.com/s/files/1/0464/6715/4072/products/FelizCumpleanosFERXXOCakeSweatshirt_Black_-Back_1_376x.png?v=1664384461',
          price: 3938,
          datails: 'Compra Protegida, recibe el producto que esperabas o te devolvemos tu dinero.',
          marca: 'nike',
          status: 6,
        },
        {
          id: 3,
          name: 'feliz cumpleaños ferxxo gorro',
          picture: 'https://cdn.shopify.com/s/files/1/0464/6715/4072/products/bucket-hat-i-big-accessories-bx003-white-left-front-63345d6e2f866_376x.png?v=1664376179',
          price: 18999,
          datails: 'Compra Protegida, recibe el producto que esperabas o te devolvemos tu dinero.',
          marca: 'nike',
          status: 2,
        },
        {
          id: 4,
          name: 'shorts ',
          picture: 'https://cdn.shopify.com/s/files/1/0464/6715/4072/products/FEID-0009_FeidPantysito_blueshortsfront_376x.png?v=1658775726',
          price: 1000,
          datails: 'Compra Protegida, recibe el producto que esperabas o te devolvemos tu dinero.',
          marca: 'nike',
          status: 6,
        },
        {
          id: 5,
          name: 'Funda cel ',
          picture: 'https://cdn.shopify.com/s/files/1/0464/6715/4072/products/iphone-case-iphone-11-case-on-phone-62d58bec0f5d4_376x.png?v=1658162177',
          price: 328,
          marca: 'nike',
          status: 10,
        },
        {
          id: 6,
          name: 'camisa inter shibuya',
          picture: 'https://cdn.shopify.com/s/files/1/0464/6715/4072/products/LAMAFIA_B_376x.png?v=1629419999',
          price: 2733,
          marca: 'nike',
          status: 4,
        },
        {
          id: 7,
          name: 'Tripié ligero ',
          picture: 'https://cdn.shopify.com/s/files/1/0464/6715/4072/products/white_tshirt_back_376x.png?v=1650998560',
          price: 372,
          marca: 'nike',
          status: 2,
        },
        {
          id: 8,
          name: 'Fujinon XF10-24MMF4 ',
          picture: 'https://cdn.shopify.com/s/files/1/0464/6715/4072/products/SSFRIKITEEBACK_2_376x.png?v=1639771499',
          price: 25023,
          marca: 'nike',
          status: 4,
        }
      ],
      cart: [],
    }

    this.handleSaveProduct = this.handleSaveProduct.bind(this)
    this.handlerAddProduct = this.handlerAddProduct.bind(this)
    this.handlerRemoveProduct = this.handlerRemoveProduct.bind(this)
    this.handlerOpenOrder = this.handlerOpenOrder.bind(this)
    this.handlerClearCart = this.handlerClearCart.bind(this)
  }

  handlerClearCart() {
    this.setState({
      cart: [],
      sum: 0,
      total: 0
    });
  }

  sumProducts(array) {
    var total = 0
    array.forEach(product => total += product.order)
    this.setState({total: total})
  }

  sumTotal(array) {
    var sum = 0
    array.forEach(product => sum += product.total)
    this.setState({sum: sum})
  }

  handlerAddProduct(indexCart, indexProduct){
    var statusCopy = Object.assign({}, this.state);
    if (statusCopy.products[indexProduct].status !== 0) {
      statusCopy.cart[indexCart].total += statusCopy.cart[indexCart].price
      statusCopy.cart[indexCart].order += 1
      statusCopy.products[indexProduct].status -= 1
      this.setState(statusCopy)
      this.sumProducts(statusCopy.cart)
      this.sumTotal(statusCopy.cart)
    } else {
      alert('Producto inexistente')
    }
  }

  handlerRemoveProduct(productId) {
    let product = this.state.products.find(p => p.id === productId);
    let indexProduct = this.state.products.findIndex(x => x.id === product.id)
    let cart = this.state.cart.find(p => p.id === productId)
    let indexCart = this.state.cart.findIndex(x => x.id === cart.id)

    var statusCopy = Object.assign({}, this.state);
    if(statusCopy.cart[indexCart].total === statusCopy.cart[indexCart].price ){
      indexCart !== -1 && statusCopy.cart.splice( indexCart, 1 );
      this.setState(statusCopy)
      alert('El producto fue eliminado del carrito de compras')
    } else {
      statusCopy.cart[indexCart].total -= statusCopy.cart[indexCart].price
      statusCopy.products[indexProduct].status += 1
      statusCopy.cart[indexCart].order -= 1
      statusCopy.total -= 1
      statusCopy.sum -= statusCopy.cart[indexCart].price
      this.setState(statusCopy)
    }
  }

  handleSaveProduct(productId) {
    let product = this.state.products.find(p => p.id === productId);
    let indexProduct = this.state.products.findIndex(x => x.id === product.id)

    var productCart = {
      id: product.id,
      name: product.name,
      img: product.picture,
      price: product.price,
      order: 1,
      total: product.price
    }

    var exist = this.state.cart.find(p => p.id === productId)
    if (undefined !== exist && exist !== null) {
      let indexCart = this.state.cart.findIndex(x => x.id === exist.id)
      this.handlerAddProduct(indexCart, indexProduct)
    }else{
      var statusCopy = Object.assign({}, this.state);
      statusCopy.products[indexProduct].status -= 1
      this.sumProducts(statusCopy.cart)
      this.sumTotal(statusCopy.cart)
      this.setState({
        cart: this.state.cart.concat([productCart]),
        statusCopy
      })
    }
  }

  handlerOpenOrder(event) {
    event.preventDefault()
    this.setState({ openOrder: true })
  }

  renderOpenOrder() {
    if (this.state.openOrder) {
      return (
        <Order
          sum={this.state.sum}
          onClearCart={this.handlerClearCart}
        />
      )
    }
  }

  render() {
    return (
      <Container className={style.root}>
        <Menu/>
        <Grid>
          <Grid.Column width={12}>
            <ProductList
              products={this.state.products}
              onSaveProduct={this.handleSaveProduct}
              onIncrementProduct={this.handleSaveProduct}
              onRemoveProduct={this.handlerRemoveProduct}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <CartList
              items={this.state.cart}
              total={this.state.total}
              onOpenOrder={this.handlerOpenOrder}
            />
            {this.renderOpenOrder()}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default App;
