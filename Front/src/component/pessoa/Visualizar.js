import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import withParams from '../../helpers/withParams';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

import 'react-toastify/dist/ReactToastify.css';

class PessoaVisualizar extends Component {

    constructor() {
        super()
        this.state = {
            pessoa: {
                id_pessoa: '',
                nome: '',
                rg: '',
                cpf: '',
                data_nascimento: '',
                data_admissao: '',
                funcao: ''
            }
        }
    }
    componentDidMount() {
        let { pessoaId } = this.props.params;

        pessoaId = parseInt(pessoaId)

        if (!Number.isInteger(parseInt(pessoaId))) {
            window.location.href = '/pessoas';
        }

        axios.get('http://127.0.0.2:7000/api/v1/pessoas/' + pessoaId)
            .then(response => {
                if (response.data.data) {
                    this.setState({
                        pessoa: response.data.data
                    })
                } else {
                    toast.error('Pessoa não encontrada')
                    window.location.href = '/pessoas';
                }
            })
            .catch(response => {
                console.log(response)
            })
    }

    render() {
        const { pessoa } = this.state
        return (
            <Fragment>
                <ToastContainer />
                <Card className="mt-5">
                    <Card.Body>
                        <h1>Visualizar dados da pessoa</h1>
                        <Link to={"/pessoas/editar/" + pessoa.id_pessoa}>
                            <Button variant="primary" className="m-2">
                                <EditIcon fontSize="small" sx={{ mr: 1 }} />
                                Editar
                            </Button>
                        </Link>
                        <Table striped="columns">

                            <tbody>
                                <tr>
                                    <td><strong>Nome:</strong></td>
                                    <td>{pessoa.nome || ''}</td>
                                </tr>
                                <tr>
                                    <td><strong>RG:</strong></td>
                                    <td>{pessoa.rg || ''}</td>
                                </tr>
                                <tr>
                                    <td><strong>CPF:</strong></td>
                                    <td>{pessoa.cpf || ''}</td>
                                </tr>
                                <tr>
                                    <td><strong>Data Nascimento:</strong></td>
                                    <td>{moment(pessoa.data_nascimento).format('DD/MM/yyyy') || ''}</td>
                                </tr>
                                <tr>
                                    <td><strong>Data Admissão:</strong></td>
                                    <td>{moment(pessoa.data_admissao).format('DD/MM/yyyy') || ''}</td>
                                </tr>
                                <tr>
                                    <td><strong>Função:</strong></td>
                                    <td>{pessoa.funcao || ''}</td>
                                </tr>
                            </tbody>
                        </Table>


                    </Card.Body>
                </Card>
            </Fragment >
        )
    }
}

export default withParams(PessoaVisualizar)