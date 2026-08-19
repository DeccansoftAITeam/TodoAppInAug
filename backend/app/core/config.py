"""Application configuration."""

from pydantic import BaseModel


class Settings(BaseModel):
    """Static settings for the Todo API."""

    app_name: str = "Todo API"
    api_prefix: str = "/api"


settings = Settings()
