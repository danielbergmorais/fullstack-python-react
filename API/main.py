import os,uvicorn

from fastapi import APIRouter, FastAPI
from routes.pessoa import route


app = FastAPI()
app.include_router(route, prefix='/api/v1')

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=7000,reload=True,workers=4)