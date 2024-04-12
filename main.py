
from fastapi import FastAPI #fastapi라는 패키지에서 가져오기
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles #staticfiles(html,css,js)를 서버에 주입 
 
app = FastAPI()

answer = 'SUNNY'

@app.get('/answer')
def get_answer():
    return answer

app.mount("/", StaticFiles(directory="static", html=True), name="static") 

