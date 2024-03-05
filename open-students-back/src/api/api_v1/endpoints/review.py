import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from src.config.db_config import get_db
from src.config.settings import Settings
from src.schemas.review import Review, ReviewCreate
from src.services.review import review_service

settings = Settings()

security = HTTPBearer()
router = APIRouter()


def get_user_id_from_token(
    token: HTTPAuthorizationCredentials = Depends(security),
):
    INVALID_CREDENTIALS = "Invalid authentication credentials"
    try:
        if token:
            jwt_token = token.credentials
            payload = jwt.decode(
                jwt_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
            )
            user_id = payload.get("id")
            if user_id:
                return user_id

    except jwt.PyJWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=INVALID_CREDENTIALS,
        ) from e

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=INVALID_CREDENTIALS,
    )


@router.post("/", response_model=Review, status_code=status.HTTP_201_CREATED)
def create_review(
    review: ReviewCreate,
    db: Session = Depends(get_db),
    creator: str = Depends(get_user_id_from_token),
):
    return review_service.create_with_creator(db, obj_in=review, creator=creator)
