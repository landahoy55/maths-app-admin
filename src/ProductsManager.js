import React, { Component } from 'react';
import ProductItem from './ProductItem';
import AddItem from './AddItem';

class ProductsManager extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            products: JSON.parse(localStorage.getItem('products'))
        };

        //bind function
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }

    //Read local storage
    componentWillMount() {
        // //parse as JS array
        // const products = JSON.parse(localStorage.getItem('products'));
        // console.log(products);

        // //set state to local products using destructring
        // this.setState({products});
        const products = this.getProducts();
        this.setState({ products });
    }

    getProducts() {
        return this.state.products;
    }

    onAdd(name, price){
        console.log(name, price);

        //get original
        const products = this.getProducts();

        products.push({ name, price });

        this.setState( { products } );

    }

    onEditSubmit(name, price, originalName) {

        let products = this.getProducts();

        products = products.map(product => {
            if (product.name === originalName) {
                product.name = name;
                product.price = price
            }
            return product
        });

        this.setState( {products} );

    }

    //passed down.
    onDelete(name) {
        console.log(name);

        const products = this.getProducts();

        const filteredProducts = products.filter(
            product => {
                return product.name !== name;
            }
        );

        console.log(filteredProducts);
        
        this.setState({ products: filteredProducts });
    }

    render() {
    
      return (
        <div className="ProductsManager App">
            <h1>Products Manager</h1>

            <AddItem 
                onAdd={this.onAdd}
            />

            {
                this.state.products.map(product => {
                    return (
                        <ProductItem 
                            key={product.name} 
                            name={product.name}
                            price={product.price}
                            onDelete={this.onDelete}
                            onEditSubmit={this.onEditSubmit}
                        />
                    )
                })
            }

        </div>
      );
    }
  }
  
  
  
  export default ProductsManager;