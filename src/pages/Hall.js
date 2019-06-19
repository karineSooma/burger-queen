import React from 'react';
import firebase from '../firebaseConfig';
import Button from '../components/Button';
import Menu from '../Menu.json';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';

const database = firebase.firestore();

class Hall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: '',
      table: '',
      list: []
    };
  }

  productChosen = item => {
    const itemIndex = this.state.list.findIndex(product => {
      return product.name === item.name;
    });
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        amount: 1,
      };
      this.setState({
        list: this.state.list.concat(newItem),
      });
    } else {
      const newList = this.state.list;
      newList[itemIndex].amount += 1;
      this.setState({
        list: newList,
      });
    }
  }; 

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  deleteItem = item => {
    const itemIndex = this.state.list.findIndex(product => {
      return product.name === item.name;
    });
    const newList = this.state.list;
    newList[itemIndex].amount -= 1;
    const amount = newList[itemIndex].amount;
    if (amount > 0) {
      this.setState({
        list: newList
      });
    } else {
      newList.splice(itemIndex, 1);
      this.setState({
        list: newList
      });
    }
  };

  handleClick = () => {
    if (this.state.clientName && this.state.table && this.state.list !== []) {
      let order = {
        order: this.state.list,
        clientName: this.state.clientName,
        table: this.state.table,
      };
      database
        .collection('hall-orders')
        .add(order)
        .then(() => alert('Pedido enviado com sucesso!'));
      this.setState({
        list: [],
        clientName: '',
        table: ''
      });
    } else {
      alert('Por favor, insira o nome e a mesa do cliente antes de enviar o pedido.')
    }
  };

  signOut = () => {
    this.props.signOut().then(() => (window.location = '/'));
  };

  render() {
   const totalAmount = this.state.list.reduce((acc, cur) => {
    return acc + (cur.amount * cur.price)
   }, 0);
    return (
      <div>
      <div>
        <h1>Café da manhã:</h1>
      {
        Menu.breakfast.map((product, index) => {
          return (
      <Button text={product.name} key={index} onClick={() => this.productChosen(product)} />
      );
    })}
    </div>
    <div>
        <h1>Almoço:</h1>
      {
        Menu.dayMenu.Hamburgueres.map((product, index) => {
          return (
      <Button text={product.name} key={index} onClick={() => this.productChosen(product)} />
      );
    })}
    </div>
    <div>
     <h2>Acompanhamentos:</h2>
      {
        Menu.dayMenu.Acompanhamentos.map((product, index) => {
          return (
      <Button text={product.name} key={index} onClick={() => this.productChosen(product)} />
      );
    })}
    </div>
    <div>
    <h2>Bebidas:</h2>
      {
        Menu.dayMenu.Bebidas.map((product, index) => {
          return (
      <Button text={product.name} key={index} onClick={() => this.productChosen(product)} />
      );
    })}
    </div>
    <div>
    <h2>Produtos Selecionados:</h2>
    {
      this.state.list.map((product, index) => {
        return (
          <div>
        <p key={index}>{product.name} - 
          Preço: {product.price * product.amount} - Quantidade: {product.amount}</p>
          <Button text='Excluir' onClick={() => this.deleteItem(product)} />
          </div>
        )
        })
      }
    </div>
    <div>
    <h2>Total:</h2>
    <p>R$ {totalAmount}</p>
    </div>
      </div>
    )}
  }

export default Hall;
