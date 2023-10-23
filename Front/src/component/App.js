import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import PessoaListar from './pessoa/Listar';
import PessoaAdicionar from './pessoa/Adicionar';
import PessoaEditar from './pessoa/Editar';
import PessoaVisualizar from './pessoa/Visualizar';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {

    render() {
        return (
            <div className="container teste">
                <Routes>
                    <Route exact path="/" element={<PessoaListar />} ></Route>
                    <Route path="/pessoas" element={<PessoaListar />} ></Route>
                    <Route path="/pessoas/:pessoaId" element={<PessoaVisualizar />} ></Route>
                    <Route path="/pessoas/adicionar" element={<PessoaAdicionar />} ></Route>
                    <Route path="/pessoas/editar/:pessoaId" element={<PessoaEditar />} ></Route>
                </Routes>
            </div>
        );
    }
}
