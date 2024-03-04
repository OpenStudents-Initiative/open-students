from fastapi import Request
from sqladmin.authentication import AuthenticationBackend
from ..config.settings import Settings

settings = Settings()


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username, password = form["username"], form["password"]

        if username != settings.ADMIN_USERNAME or password != settings.ADMIN_PASSWORD:
            return False

        token = settings.SECRET_KEY

        request.session.update({"token": token})

        return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        token = request.session.get("token")

        if not token:
            return False

        if token != settings.SECRET_KEY:
            return False
        return True
