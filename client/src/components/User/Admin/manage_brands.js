import React, { Component } from 'react';
import { connect } from "react-redux";
import { getBrands, addBrand } from "../../../actions/products_actions";
import FormField from "../../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from "../../utils/Form/formActions";


class ManageBrands extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter your brand",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
    }
  }

  componentDidMount(){
    this.props.dispatch(getBrands());
  }

  showCategoryItems = () => (
    this.props.products.brands ?
      this.props.products.brands.map((item) => (
        <div key={item._id} className="category_item">
          {item.name}
        </div>
      ))
    : null
  )

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'brands');
    let formIsValid = isFormValid(this.state.formdata, 'brands');

    if(formIsValid){
      this.props
        .dispatch(addBrand(dataToSubmit, this.props.products.brands))
        .then(() => {
          console.log(this.props.products.addBrand);
        });

    } else {
      this.setState({
        formError: true
      });
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'brands');

    this.setState({
      formError: false,
      formdata: newFormdata
    })
  }

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Brands</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={(event) => this.submitForm(event)}>
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
              />

              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}

              <button onClick={(event) => this.submitForm(event)}>
                Add Brand
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(ManageBrands);