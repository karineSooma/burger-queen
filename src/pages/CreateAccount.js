import React from 'react';
import firebase from '../firebaseConfig';
import Button from '../components/Button';
import Input from '../components/Input'
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome:'',
      email:'',
      password:'',
      tipo:'cozinha'
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

createUser = () => {
  this.props.createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then(resp => {
    if (resp) {
      const id = resp.user.uid;
      database.collection('users').doc(id).set({
      nome: this.state.nome,
      email: this.state.email,
      password: this.state.password,
      tipo: this.state.tipo
    })
    .then(() => {
      this.props.history.push(`/${this.state.tipo}`);
     });
    } 
  })
}

signIn = () => {
  firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((resp) => {
      const id = resp.user.uid;
      database.collection('users').doc(id).get()
        .then(resp => {
          const data = resp.data();
          this.props.history.push(`/${data.tipo}`);
        })
    });
}

  render() {
    if (this.props.error) {
      alert(this.props.error)
    }
    return (
          <div>
          <Input onChange={(e) => this.handleChange(e, 'nome')} 
          value={this.state.nome} placeholder='Digite seu nome' />
          <Input onChange={(e) => this.handleChange(e, 'email')}
          value={this.state.email} placeholder='Digite seu email' />
          <Input onChange={(e) => this.handleChange(e, 'password')} 
          value={this.state.password} placeholder='Digite sua senha' />
          <select onChange={(e) => this.handleChange(e, 'tipo')}>
            <option value="cozinha">Cozinha</option>
            <option value="salao">Salão</option>
          </select>
          <Button text="criar usuário" onClick={this.createUser} />
          </div>
          
          
        )
    }
  }

export default withFirebaseAuth({firebaseAppAuth, })(CreateAccount);
