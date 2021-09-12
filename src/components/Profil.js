import React from "react";
import { Row, Col, Form, Button, Container  } from "react-bootstrap";
import axios from "axios";
import qs from 'qs';
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom';
import QRCode from "react-qr-code"

import NavBar from "./NavBar";
import API from "../utils/API";

//theme
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme/theme';
import { GlobalStyles } from '../utils/theme/global';

const lienAPI = 'http://localhost:8800/';
const imagesPublic = 'http://localhost:3000/images/';

export class Profil extends React.Component {

    constructor() {
        super();
        this.state = {
            test: 'test',
            qr: 'yes'
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        const APIURL = lienAPI;
        const memberToken = localStorage.getItem("memberToken");
        const benevoleToken = localStorage.getItem("benevoleToken");
        let token, type;
        if (!memberToken) {
            token = benevoleToken;
            type = 'benevole';
        } else {
            token = memberToken;
            type = 'membre';
        }
        axios({
            method: 'post',
            url: `${APIURL}user/info`,
            data: qs.stringify({
                token: token,
                type
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
            .then((res) => {
                const nom = res.data.nom;
                const email = res.data.email;
                const etablissement = res.data.etablissement;
                const qr = res.data.qr;
                const user = res.data.user;
                const admin = res.data.admin;
                this.setState({ nom, email, etablissement, qr, user, admin });

            }, (error) => {
                this.setState({ nom: 'invité' });
                console.log(error);
            })

        const themeStorage = localStorage.getItem("theme");
        if (themeStorage) {
            this.setState({ theme: themeStorage });
        } else {
            this.setState({ theme: 'light' });
        }

    }

    openModal() {
        this.setState({ open: true });
    }
    closeModal() {
        this.setState({ open: false });
    }

    setTheme(data) {
        this.setState({ theme: data });
        localStorage.setItem("theme", data);
    }

    render() {
        const { nom, theme } = this.state;
        const tabSuggestions = [];

        const toggleTheme = () => {
            if (theme === 'light') {
                this.setTheme('dark');
            } else {
                this.setTheme('light');
            }
        }

        const themeInverse = () => {
            if (theme === 'light') {
                return 'dark';
            } else {
                return 'light';
            }
        }

        return (
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <NavBar
                    nom={nom}
                    theme={theme}
                />
                <GlobalStyles />

                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs={6}>

                            <button className="btn btn-primary btn border rounded shadow-lg p-3 mb-3" onClick={this.openModal}>
                                Afficher le QR code
                            </button>
                            <br /><br />
                            <Popup
                                open={this.state.open}
                                closeOnDocumentClick
                                onClose={this.closeModal}
                            >
                                <Row className="justify-content-md-center">
                                    <Col md="auto">
                                        <br />
                                        <div className={"card style1 text-center bg-" + theme}>
                                            <div className="card-body">
                                                <h5 className="card-title text-center">QR code</h5>
                                                <QRCode value={this.state.qr} size={170} />
                                            </div>
                                        </div>
                                        <br />
                                    </Col>
                                </Row>
                            </Popup>
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Nom et Prénom</Form.Label>
                                        <Form.Control readOnly defaultValue={this.state.nom} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Etablissement</Form.Label>
                                        <Form.Control readOnly defaultValue={this.state.etablissement} />
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" readOnly defaultValue={this.state.email} />
                                </Form.Group>
                            </Form>

                            

                            <div className="text-center ">
                                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                <button type="button" className={"btn btn-outline-" + themeInverse()} onClick={toggleTheme}>Switch Theme</button>
                            </div>

                        </Col>
                        <Col></Col>
                    </Row>
                </Container>


            </ThemeProvider >
        );
    }
}