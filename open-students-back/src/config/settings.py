import os

from dotenv import load_dotenv
from pydantic import validator
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    DB_NAME: str = os.getenv("DB_NAME", "")
    DB_USER: str = os.getenv("DB_USER", "")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD", "")
    DB_HOST: str = os.getenv("DB_HOST", "")
    DB_PORT: str = os.getenv("DB_PORT", "")
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "")
    API_V1_STR: str = os.getenv("API_V1_STR", "")
    ADMIN_USERNAME: str = os.getenv("ADMIN_USERNAME", "")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "")
    ALGORITHM: str = os.getenv("ALGORITHM", "")

    @validator("*", pre=True)
    def ensure_str_and_not_empty(cls, v):
        if isinstance(v, str) and v:
            return v
        raise ValueError(
            "One or more environent variables has not been set properly. Please make a complete .env file"
        )

    class Config:
        case_sensitive = True
