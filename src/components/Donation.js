import React from "react";
import { Row, Col, Table, Container, Badge, Form, Button } from "react-bootstrap";
import axios from "axios";
import qs from 'qs';

import NavBar from "./NavBar";

//theme
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme/theme';
import { GlobalStyles } from '../utils/theme/global';

const lienAPI = 'http://localhost:8800/';

export class Donation extends React.Component {

    constructor() {
        super();
        this.state = {
            data: []
        };
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
                const admin = res.data.admin;
                this.setState({ nom, admin });

            }, (error) => {
                this.setState({ nom: 'invité' });
                console.log(error);
            })

        axios({
            method: 'get',
            url: `${APIURL}donation/data`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
            .then((res) => {
                const data = res.data.data;
                let tab = [];
                data.map((data, i, callback) => {
                    tab.push(data.nom + ',' + data.montant + ',' + data.type)
                })

                this.setState({ data: tab });

            }, (error) => {
                console.log(error);
            })

        const themeStorage = localStorage.getItem("theme");
        if (themeStorage) {
            this.setState({ theme: themeStorage });
        } else {
            this.setState({ theme: 'light' });
        }

    }

    setTheme(data) {
        this.setState({ theme: data });
        localStorage.setItem("theme", data);
    }

    render() {
        const { nom, theme, data, admin } = this.state;

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
                            <br />
                            <h1>
                                Donations <Badge bg="secondary">Liste</Badge>
                            </h1>
                            <br />
                            <Table striped bordered hover variant={theme}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nom</th>
                                        <th>Montant</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        data.map((data, i, callback) => {
                                            let temp = data.split(',');
                                            return <tr key={i}>
                                                <td>{i+1}</td>
                                                <td>{temp[0]}</td>
                                                <td>{temp[1]}</td>
                                                <td>{temp[2]}</td>
                                            </tr>
                                        })
                                    }

                                </tbody>
                            </Table>

                            <div className="text-center ">
                                <br />
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