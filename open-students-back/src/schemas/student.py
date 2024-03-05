from pydantic import UUID4, BaseModel


class StudentBase(BaseModel):
    pass


class StudentCreate(StudentBase):
    id: UUID4
    name: str
    nickname: str | None = None
    email: str
    password: str


class Student(StudentBase):
    id: UUID4
    name: str
    nickname: str | None = None
    email: str

    class Config:
        orm_mode = True


class StudentUpdate(BaseModel):
    name: str | None = None
    nickname: str | None = None
    email: str | None = None
    password: str | None = None


class StudentLogin(BaseModel):
    token: str
    userInfo: Student

    class Config:
        orm_mode = True


class StudentCredentials(BaseModel):
    username: str
    password: str
