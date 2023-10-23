import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

import moment from 'moment';

class PessoaListar extends Component {

    constructor() {
        super()
        this.state = {
            pessoas: []
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.2:7000/api/v1/pessoas')
            .then(response => {
                this.setState({
                    pessoas: response.data.data
                })
            })
            .catch(response => {
                console.log(response)
            })
    }

    render() {
        const { pessoas } = this.state
        return (
            <Fragment>
                <Card className='mt-5'>
                    <Card.Body>
                        <h1>Listagem de pessoas</h1>
                        <Link to="/pessoas/adicionar">
                            <Button variant="success" className="mt-2 mb-2">
                                <AddCircleOutline fontSize="small" sx={{ mr: 1 }} />
                                Adicionar pessoa
                            </Button>
                        </Link>
                        <Table striped>
                            <thead>
                                <th>Nome</th>
                                <th>Data de admissão</th>
                                <th>Ação</th>
                            </thead>
                            <tbody>
                                {
                                    pessoas ?
                                        pessoas.map(pessoa => (
                                            <tr
                                                key={pessoa.id_pessoa}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <td >
                                                    {pessoa.nome}
                                                </td>
                                                <td component="th" scope="row">
                                                    {moment(pessoa.data_admissao).format('DD/MM/yyyy')}
                                                </td>
                                                <td component="th" scope="row">
                                                    <Link to={"/pessoas/" + pessoa.id_pessoa}>
                                                        <Button variant="success" className="m-2">
                                                            <Visibility fontSize="small" sx={{ mr: 1 }} />
                                                            Visualizar
                                                        </Button>
                                                    </Link>
                                                    <Link to={"/pessoas/editar/" + pessoa.id_pessoa}>
                                                        <Button variant="primary" className="m-2">
                                                            <EditIcon fontSize="small" sx={{ mr: 1 }} />
                                                            Editar
                                                        </Button>
                                                    </Link>

                                                </td>
                                            </tr>
                                        ))
                                        : null
                                }
                            </tbody>
                        </Table>


                    </Card.Body>
                </Card>
            </Fragment >
        )
    }
}

export default PessoaListar