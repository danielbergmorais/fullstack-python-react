import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { IMaskInput } from 'react-imask';

import Save from '@mui/icons-material/Save';
import Cancel from '@mui/icons-material/Cancel';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { ToastContainer, toast } from 'react-toastify';

import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import moment from 'moment';
import 'moment/locale/pt-br';

registerLocale('ptBR', ptBR)

import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/custom.css';

class PessoaAdicionar extends Component {

    constructor() {
        super()
        this.state = {
            pessoa: {
                nome: '',
                rg: '',
                cpf: '',
                data_nascimento: '',
                data_admissao: '',
                funcao: ''
            }
        }
        this.sendForm = this.sendForm.bind(this);
    }
    handleChange(e) {
        const name = e.target.id
        const value = e.target.value

        const pessoa = this.state.pessoa
        pessoa[name] = value

        this.setState({
            pessoa: {
                ...pessoa,
                [name]: value
            }
        })
    }
    setDates(name, value) {
        const { pessoa } = this.state

        this.setState({
            pessoa: {
                ...pessoa,
                [name]: moment(value).format('yyyy-MM-DD')
            }
        })
    }
    sendForm(event) {
        event.preventDefault();
        const { pessoa } = this.state

        axios
            .post('http://127.0.0.2:7000/api/v1/pessoas/add', pessoa)
            .then(response => {

                if (response.status == 200) {
                    toast.success('Pessoa salva com sucesso', {
                        onClose: () => window.location.reload()
                    })

                } else {
                    toast.error('Houve um erro ao salvar essa pessoa')
                    console.log(response)
                }
            })
            .catch((response, xhr) => {
                toast.error('Houve um erro na requisição')
                console.log('error', response, xhr)
            })
    }
    render() {
        const { pessoa } = this.state;
        return (
            <Fragment>
                <ToastContainer />
                <Card className='mt-5'>
                    <Card.Body>
                        <Container>
                            <h1> Adicionar pessoa </h1>
                            <Form onSubmit={this.sendForm} autoComplete="off">
                                <Row>
                                    <Form.Group className="mb-3" controlId="nome">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            type="Nome"
                                            value={pessoa.nome || ''}
                                            onChange={(event) => {
                                                this.handleChange(event)
                                            }}
                                            required
                                        />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Col lg="6" xs="12">
                                        <Form.Group className="mb-3" controlId="nome">
                                            <Form.Label>CPF</Form.Label>
                                            <IMaskInput
                                                mask="000.000.000-00"
                                                definitions={{
                                                    '#': /[1-9]/,
                                                }}
                                                id="cpf"
                                                name="cpf"
                                                className="form-control"
                                                onChange={(event) => {
                                                    this.handleChange(event)
                                                }} value={pessoa.cpf || ''}
                                                required

                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg="6" xs="12">
                                        <Form.Group className="mb-3" controlId="rg">
                                            <Form.Label>RG</Form.Label>
                                            <IMaskInput
                                                mask="00.000.000-0"
                                                definitions={{
                                                    '#': /[1-9]/,
                                                }}
                                                id="rg"
                                                name="rg"
                                                className="form-control"
                                                onChange={(event) => {
                                                    this.handleChange(event)
                                                }} value={pessoa.rg || ''}
                                                required

                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6" xs="12">
                                        <Form.Group className="mb-3" controlId="data_nascimento" lg="6">
                                            <Form.Label>Data Nascimento</Form.Label> <br />
                                            <DatePicker
                                                id="data_nascimento"
                                                className="form-control"
                                                selected={Date.parse(moment(pessoa.data_nascimento).format('MM-DD-yyyy')) || Date.now()}
                                                onChange={(date) => { this.setDates('data_nascimento', date) }}
                                                locale="ptBR"
                                                dateFormat="dd/MM/yyyy"
                                                required

                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg="6" xs="12">
                                        <Form.Group className="mb-3" controlId="data_admissao" lg="6">
                                            <Form.Label>Data admissão</Form.Label><br />
                                            <DatePicker
                                                id="data_admissao"
                                                className="form-control"
                                                selected={Date.parse(moment(pessoa.data_admissao).format('MM-DD-yyyy')) || Date.now()}
                                                onChange={(date) => { this.setDates('data_admissao', date) }}
                                                locale="ptBR"
                                                dateFormat="dd/MM/yyyy"
                                                required

                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3" controlId="funcao">
                                    <Form.Label>Função</Form.Label>
                                    <Form.Control type="funcao"
                                        onChange={(event) => {
                                            this.handleChange(event)
                                        }} value={pessoa.funcao || ''}
                                        required

                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    <Save fontSize="small" sx={{ mr: 1 }} />
                                    Salvar
                                </Button>
                                <Link to="/pessoas">
                                    <Button variant="outline-danger" className="m-2">
                                        <Cancel fontSize="small" sx={{ mr: 1 }} />
                                        Cancelar
                                    </Button>
                                </Link>
                            </Form>
                        </Container>
                    </Card.Body>
                </Card>
            </Fragment >
        )
    }
}

export default PessoaAdicionar