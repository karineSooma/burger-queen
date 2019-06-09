import React from 'react';
import './App.css';
import firebase from './firebaseConfig';
import Button from './components/Button';
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      listUser:[]
    };
  }

  componentDidMount() {
    database.collection('users').get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ listUser: data });
        console.log(data);
      });
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  handleClick = () => {
    const object = {
      email: this.state.email,
        password: this.state.password
    }
    database.collection('users').add(object)
    this.setState({
      listUser: this.state.listUser.concat(object)
    })
  }

createUser = () => {
  this.props.createUserWithEmailAndPassword(this.state.email, this.state.password)
}

signIn = () => {
  this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      alert('uhuu');
    });
}
<Router>
<Route path='/' Component{Index}/>
<Route path='/salao' Component={Salao}/>
</Router>

function Index() {
  return (
    <p>Sooooo</p>
  );
}

function Salao() {
  return (
    <p>Salaaao</p>
  );
}
  render() {
    return (
    <div className="App">
        <header className="App-header">
          <h1>Burger-Queen</h1>
          <input value={this.state.email} 
          placeholder="Digite seu email"
          onChange={this.handleEmailChange}/>
           <input value={this.state.password}
          placeholder="Digite sua senha"
          onChange={this.handlePasswordChange}/>
          <Button text='criar usuário' onClick={this.createUser} />
          <Button text='Login' onClick={this.signIn} />
        {
          this.state.listUser.map((item, index) => {
            return <p key={index}>{item.email} | {item.password}</p>
          })
        }
        </header>
        </div>
      )
    }
  }

export default withFirebaseAuth({firebaseAppAuth})(App);
