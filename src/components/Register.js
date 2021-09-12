import React from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import API from "../utils/API";
import { Link } from 'react-router-dom';
import 'react-router-dom';

export class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      cpassword: "",
      name: "",
      fields: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
  };

  send = async () => {
    const { email, password, cpassword, name } = this.state;
    if (!email || email.length === 0) return;
    if (!password || password.length === 0 || password !== cpassword) return;
    if (!name || name.length === 0) return;
    try {
      const { data } = await API.register({ email, password, name });
      localStorage.setItem("token", data.token);
      this.props.history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["name"] = "";
      fields["email"] = "";
      fields["password"] = "";
      fields["cpassword"] = "";
      this.setState({ fields: fields });
      this.send();
    }
  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Name manquant.";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
        formIsValid = false;
        errors["name"] = "*Nom et Prénom invalide";
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Email manquant.";
    }

    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Email non valide.";
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Mot de Passe manquant.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/g)) {
        formIsValid = false;
        errors["password"] = "*Il faut au moins 1 Maj + 1 Nombre + 6 Caractères.";
      }
    }

    if (!fields["cpassword"]) {
      formIsValid = false;
      errors["cpassword"] = "*Mot de Passe manquant.";
    }

    if (typeof fields["cpassword"] !== "undefined") {
      if (fields["cpassword"] !== fields["password"]) {
        formIsValid = false;
        errors["cpassword"] = "*Non correspondant.";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;

  }

  handleChange = (event) => {
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({ fields, [event.target.id]: event.target.value });
  };

  render() {
    const { email, password, cpassword, name } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <br /><br /><br />
            <div className="card style5">
              <div className="card-body">
                <h4 className="card-title">Login:</h4>
                <br />
                <FormGroup controlId="name" size="lg">
                  Nom et Prénom
                <FormControl
                    autoFocus
                    type="name"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <div className="text-center">{this.state.errors.name}</div>
                <FormGroup controlId="email" size="lg">
                  Email
                <FormControl
                    autoFocus
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <div className="text-center">{this.state.errors.email}</div>
                <FormGroup controlId="password" size="lg">
                  Mot de Passe
                <FormControl
                    value={password}
                    onChange={this.handleChange}
                    type="password"
                    name="password"
                  />
                </FormGroup>
                <div className="text-center">{this.state.errors.password}</div>
                <FormGroup controlId="cpassword" size="lg">
                  Confirmer le Mot de Passe
                <FormControl
                    value={cpassword}
                    onChange={this.handleChange}
                    type="password"
                    name="cpassword"
                  />
                </FormGroup>
                <div className="text-center">{this.state.errors.cpassword}</div>
                <br />
                <Button onClick={this.submituserRegistrationForm} block size="lg" type="submit">
                  Inscription
                </Button>
                <br />
                <h3 className="text-center">ou</h3>
                <br />
                <Link to="login" style={{ textDecoration: "none", color: "#FFF" }}>
                  <Button block size="lg" type="submit">
                    Connexion
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}