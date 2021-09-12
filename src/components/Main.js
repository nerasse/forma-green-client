import React from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import qs from 'qs';
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom';

import NavBar from "./NavBar";
import API from "../utils/API";

//theme
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme/theme';
import { GlobalStyles } from '../utils/theme/global';

const lienAPI = 'http://localhost:8800/';
const imagesPublic = 'http://localhost:3000/images/';

export class Main extends React.Component {

    constructor() {
        super();
        this.state = {
            test: 'test'
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
                this.setState({ nom });

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
                <div className="Dash">

                    

                    <div className="container">
                        <div className="row justify-content-md-center">
                            <div className="col-md-auto">

                                <div className="text-center ">

                                    <button className="btn btn-primary btn border rounded shadow-lg p-3 mb-3" onClick={this.openModal}>
                                        Rechercher/Ajouter une Ville
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
                                                        <h5 className="card-title text-center">Rechercher/Ajouter une Ville</h5>
                                                        yes2.
                                                    </div>
                                                </div>
                                                <br />
                                            </Col>
                                        </Row>
                                    </Popup>
                                </div>
                                <div className="text-center ">
                                    <div className="row ">

                                        yes.

                                    </div>
                                    <br /><br /><br />
                                    <button type="button" className={"btn btn-outline-" + themeInverse()} onClick={toggleTheme}>Switch Theme</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}