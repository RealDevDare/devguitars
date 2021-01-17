import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  getBrands, 
  getWoods,
  getProductsToShop
} from '../../actions/products_actions';
import {frets, price} from '../utils/Form/fixed_categories';

import PageTop from '../utils/page_top';
import CollapseCheckbox from '../utils/collapseCheckbox';
import CollapseRadio from '../utils/collapseRadio';

class Shop extends Component {
  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: []
    }
  }

  componentDidMount(){
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());

    this.props.dispatch(getProductsToShop(
      this.state.skip,
      this.state.limit,
      this.state.filters
    ));
  }

  handleFilters = (filters, category) => {
    const newFilters = {...this.state.filters};
    newFilters[category] = filters;

    if(category === 'price'){
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    this.setState({
      filters: newFilters
    },() => {
     this.showFilteredResults();
    });
  }

  handlePrice = priceId => {
    const data = price;
    let array = [];

    for(let key in data){
      if(data[key]._id === parseInt(priceId,10)){
        array = data[key].array;
      }
    }

    return array;
  }
  
  showFilteredResults = () => {
    this.props.dispatch(getProductsToShop(
      0,
      this.state.limit,
      this.state.filters
    ))
      .then(() => this.setState({skip: 0}));
  }

  render() {
    const products = this.props.products;

    return (
      <div>
        <PageTop title="Browse Products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              
              <CollapseCheckbox 
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={(filters) => this.handleFilters(filters, 'brand')}
              />

              <CollapseCheckbox 
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={(filters) => this.handleFilters(filters, 'frets')}
              />

              <CollapseCheckbox 
                initState={false}
                title="Wood"
                list={products.woods}
                handleFilters={(filters) => this.handleFilters(filters, 'wood')}
              />

              <CollapseRadio 
                initState={true}
                title="Price"
                list={price}
                handleFilters={(filters) => this.handleFilters(filters, 'price')}
              />

            </div>
            <div className="right">
              right
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Shop);