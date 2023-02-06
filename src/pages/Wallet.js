import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import { fetchExpenses, editExpenses } from '../redux/actions';

class Wallet extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      editMode: false,
      editId: null,
    };
  }

  restoreState = () => {
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      editMode: false,
      editId: null,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { id, value, currency, method, tag, description } = this.state;
    const { fetchWalletExpenses } = this.props;
    const expense = { id, value, currency, method, tag, description };
    fetchWalletExpenses(expense);
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    this.restoreState();
  };

  handleEdit = (editId) => {
    const { expenses } = this.props;
    const expense = expenses.find((item) => item.id === editId);
    const { value, currency, method, tag, description } = expense;

    this.setState({
      value,
      currency,
      method,
      tag,
      description,
      editMode: true,
      editId,
    });
  };

  findIndex = (expenses, id) => {
    let idIndex = 0;
    expenses.forEach((item, index) => {
      if (item.id === id) idIndex = index;
    });

    return idIndex;
  };

  submitEdit = () => {
    const { value, currency, method, tag, description, editId } = this.state;
    const { expenses, modExpenses } = this.props;

    const editIndex = this.findIndex(expenses, editId);

    expenses[editIndex].value = value;
    expenses[editIndex].currency = currency;
    expenses[editIndex].method = method;
    expenses[editIndex].tag = tag;
    expenses[editIndex].description = description;
    modExpenses(expenses);
    this.restoreState();
  };

  render() {
    const { email, expenses } = this.props;
    const { editMode } = this.state;
    const totalExpenses = expenses.reduce((acc, curr) => (
      acc + parseFloat(curr.value) * parseFloat(curr.exchangeRates[curr.currency].ask)
    ), 0);
    const defaultTotal = 0;
    return (
      <>
        <Header
          email={ email }
          totalExpenses={ totalExpenses }
          defaultTotal={ defaultTotal }
        />
        <WalletForm
          expense={ this.state }
          handleChange={ this.handleChange }
          handleSubmit={ this.handleSubmit }
          submitEdit={ this.submitEdit }
        />
        <Table
          expenses={ expenses }
          editMode={ editMode }
          handleEdit={ this.handleEdit }
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWalletExpenses: (expenses) => dispatch(fetchExpenses(expenses)),
  modExpenses: (expenses) => dispatch(editExpenses(expenses)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
  fetchWalletExpenses: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
