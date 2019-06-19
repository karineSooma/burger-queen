import React from 'react';
import firebase from '../firebaseConfig';
import Button from '../components/Button';
import Input from '../components/Input'
import withFirebaseAuth from 'react-with-firebase-auth';
import CreateAccount from './CreateAccount';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:''
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

signIn = event => {
  event.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(resp => {
      const uid = resp.user.uid;
      database
        .collection("users")
        .doc(uid)
        .get()
        .then(doc => this.props.history.push(`/${doc.data().accType}`));
    })
    .catch(error => {
      alert(
        "Suas informações de login estão incorretas. Tente novamente ou crie uma conta."
      );
    });
};

  render() {
    return (
      <section className="login-container">
        <form>
          <div className="form-group">
            <label for="email">E-mail</label>
            <Input onChange={(e) => this.handleChange(e, 'email')}
          value={this.state.email} placeholder='Digite seu email' />
          </div>
          <div className="form-group">
            <label for="password">Senha</label>
            <Input onChange={(e) => this.handleChange(e, 'password')} 
          value={this.state.password} placeholder='Digite sua senha' />
          </div>
        </form>
        <Button text="Login" onClick={this.signIn} />
        <Button text="criar usuário" onClick={this.createUser} />
      </section>
    );
  }
}
export default withFirebaseAuth({firebaseAppAuth, })(Home);
