import React, { Component, Fragment } from "react";
import 'react-router-dom';
import { Navbar, Nav, Button, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import API from "../utils/API";


class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nom: '',
      logged: false
    };

  }

  componentDidMount() {
    this.setState({ nom: this.props.nom })
    if (this.state.nom !== '') {
      this.setState({ logged: true })
    }
  }

  //se déconnecté
  disconnect = () => {
    API.logout();
  };


  render() {
    let { logged } = this.state;
    let divs;

    if (this.props.nom !== 'invité') {
      divs =
        <Nav>
          <NavDropdown className="mt-1" title={'Bonjour ' + this.props.nom} id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/profil">
                Profil
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link to="login">
            <Link
              to="/welcome"
              className="nounderline"
              innerRef={this.refCallback}>
              <Button variant="outline-danger" onClick={this.disconnect}>Déconnexion</Button>
            </Link>
          </Nav.Link>
        </Nav>;
    } else {
      divs =
        <Nav>
          <Nav.Link>
            <Link
              to="/welcome"
              className="nounderline"
              innerRef={this.refCallback}>
              Login
            </Link>
          </Nav.Link>
        </Nav>;
    }

    return (
      <div className="font-weight-bold shadow-lg rounded-0">
        <Fragment>
          <Navbar bg={this.props.theme} collapseOnSelect expand="lg" variant={this.props.theme}>
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav.Link to="/" className="p-2 text-success nounderline">
                  <h2 >
                    <Link
                      to="/"
                      className="nounderline"
                      innerRef={this.refCallback}>
                      Forma Green
                    </Link>
                  </h2>
                </Nav.Link>
                <Nav className="me-auto d-flex flex-row">
                <Nav.Link href="">
                    <Link
                      to="/forming"
                      className="nounderlinecolor"
                      innerRef={this.refCallback}>
                      Forming Structure
                    </Link>
                  </Nav.Link>
                  <Nav.Link href="">
                    <Link
                      to="/greenarea"
                      className="nounderlinecolor"
                      innerRef={this.refCallback}>
                      Green Areas
                    </Link>
                  </Nav.Link>
                  <Nav.Link href="">
                    <Link
                      to="/partnership"
                      className="nounderlinecolor"
                      innerRef={this.refCallback}>
                      Partnerships
                    </Link>
                  </Nav.Link>
                  <Nav.Link href="">
                    <Link
                      to="/donation"
                      className="nounderlinecolor"
                      innerRef={this.refCallback}>
                      Donations
                    </Link>
                  </Nav.Link>
                </Nav>
                {divs}
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Fragment>
      </div>
    );
  }
}

export default NavBar;