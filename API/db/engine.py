import os 
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

load_dotenv(dotenv_path='.env')

DB_USER=os.getenv("DB_USER")
DB_PASSWORD=os.getenv("DB_PASSWORD")
DB_HOST=os.getenv("DB_HOST")
DB_NAME=os.getenv("DB_NAME")
DB_PORT=os.getenv("DB_PORT")
SQLALCHEMY_DATABASE_URL_DEV = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

db_engine = create_engine(
    SQLALCHEMY_DATABASE_URL_DEV,echo=False,json_serializer=True, pool_use_lifo=True, pool_pre_ping=True
)

Session = sessionmaker(bind=db_engine)
session = Session()
