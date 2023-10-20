from sqlalchemy import create_engine, Column, String, Integer, CHAR, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from db.engine import db_engine
from pydantic import BaseModel

Base = declarative_base()

class Pessoa(Base):
    __tablename__ = 'pessoas'

    id_pessoa = Column("id_pessoa", Integer, primary_key=True)
    nome = Column("nome", String)
    rg = Column("rg", String)
    cpf = Column("cpf", String)
    data_nascimento = Column("data_nascimento", Date)
    data_admissao = Column("data_admissao", Date)
    funcao = Column("funcao", String)

    def __init(self, id_pessoa, nome, rg, cpf, data_nascimento, data_admissao, funcao):
        self.id_pessoa = id_pessoa
        self.nome = nome
        self.rg = rg
        self.cpf = cpf
        self.data_nascimento = data_nascimento
        self.data_admissao = data_admissao
        self.funcao = funcao

Base.metadata.create_all(bind=db_engine)

class PessoaType(BaseModel):
    nome: str
    rg: str
    cpf: str
    data_nascimento: str
    data_admissao: str
    funcao: str
