import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SESSION_COOKIE_SAMESITE = os.environ.get("SESSION_COOKIE_SAMESITE")
    SESSION_COOKIE_SECURE = os.environ.get("SESSION_COOKIE_SECURE")
    SESSION_TYPE = os.environ.get("SESSION_TYPE")
    SERVER_NAME = os.environ.get("SERVER_NAME")
