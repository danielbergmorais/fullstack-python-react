from fastapi import APIRouter, Request, HTTPException
from model.pessoa import Pessoa, PessoaType
from db.engine import session

route = APIRouter()

@route.get("/pessoas")
def listar_pessoas():
    try:
        results = session.query(Pessoa).all()
        data = {
            "response": "success",
            "data": results
        }
        return data
    except Exception as error:
        return HTTPException(400, detail=str(error))


@route.get('/pessoas/{id}')
def get_pessoa(id: int):
    try:
        result = session.query(Pessoa).get(id)
        data = {
            "response": "success",
            "data": result
        }
        if result is None:
            return HTTPException(404, detail=str('Não foi possivel encontrar o registro solicitado'))
            
        return data
           
    except Exception as error:
        return HTTPException(400, detail=str(error))

@route.post("/pessoas/add")
def add_pessoa(pessoa: PessoaType):
    try:
        novo = Pessoa(    
                    nome = pessoa.nome, 
                    rg = pessoa.rg, 
                    cpf = pessoa.cpf, 
                    data_nascimento = pessoa.data_nascimento, 
                    data_admissao = pessoa.data_admissao, 
                    funcao = pessoa.funcao
                )
        session.add(novo)
        session.commit()
        session.refresh(novo)

        data = {
            "response": "success",
            "data": novo
        }
        return data
    except Exception as error:
        return HTTPException(400, detail=str(error))

@route.post("/pessoas/edit/{id}")
def editar_pessoa(id: int, pessoa: PessoaType):
    try:
        person_edit = session.query(Pessoa).get(id)
        if person_edit is None:
            return HTTPException(404, detail=str('Não foi possivel encontrar o registro solicitado'))

        session.query(Pessoa).filter(Pessoa.id_pessoa == id).update({
                                                                    'nome': pessoa.nome, 
                                                                    'rg': pessoa.rg, 
                                                                    'cpf': pessoa.cpf, 
                                                                    'data_nascimento': pessoa.data_nascimento, 
                                                                    'data_admissao': pessoa.data_admissao, 
                                                                    'funcao': pessoa.funcao
                                                                    })
        session.commit()
        session.refresh(person_edit)

        data = {
            "response": "success",
            "data": person_edit
        }
        return data
    except Exception as error:
        return HTTPException(400, detail=str(error))