import os,uvicorn

from fastapi import APIRouter, FastAPI
from routes.pessoa import route
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(route, prefix='/api/v1')
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.2", port=7000,reload=True,workers=4)