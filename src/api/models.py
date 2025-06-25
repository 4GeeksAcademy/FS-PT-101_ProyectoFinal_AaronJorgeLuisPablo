from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime, ForeignKey, Float, Integer
from enum import Enum as PyEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timezone
from sqlalchemy import Enum as SQLAEnum
# default=datetime.now(timezone.utc)
# default=datetime.utcnow

db = SQLAlchemy()

class enumProf(PyEnum):
    freelance = "FREELANCE"
    business = "BUSINESS"

class enumClts(PyEnum):
    male = "MALE"
    female = "FEMALE"
    other = "OTHER"
    not_telling = "NOT TELLING"

class enumInfo(PyEnum):
    tourism = "TOURISM"
    leisure = "LEISURE"
    sport = "SPORT"

class Users(db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    client: Mapped["Clients"] = relationship("Clients", back_populates="user", uselist=False)
    professional: Mapped["Professionals"] = relationship("Professionals",back_populates="user",uselist=False)
    admin: Mapped["Administrators"] = relationship(back_populates="user", uselist=False)

    def serialize(self):
        prof = {name: value for name, value in self.professional.serialize().items() if name != "user"} if self.professional else None
        response = self.client.serialize() if self.client is not None else {"username": f"traveler{self.id}", "avatar_url": "https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg"}
        if self.admin is not None:
            response = {**response, "is_admin": True}
        return {**response,
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "is_professional": True if self.professional else False,
            "professional": prof
        }
    
class Clients(db.Model):
    __tablename__ = "clients"
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    username: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(20), nullable=False)
    surname: Mapped[str] = mapped_column(String(40), nullable=False)
    telephone: Mapped[str] = mapped_column(String(15), unique=True, nullable=False)
    NID: Mapped[str] = mapped_column(String(10), unique=True, nullable=False)
    creation_date: Mapped[datetime] = mapped_column(DateTime(), default=datetime.now(timezone.utc))
    avatar_url: Mapped[str] = mapped_column(String, default="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg")
    address: Mapped[str] = mapped_column(String, nullable=True)
    city: Mapped[str] = mapped_column(String, nullable=True)
    country: Mapped[str] = mapped_column(String, nullable=True)
    birthdate: Mapped[datetime] = mapped_column(DateTime(), nullable=True)
    gender: Mapped[enumClts] = mapped_column(SQLAEnum(enumClts), default=enumClts.not_telling)

    user: Mapped["Users"] = relationship(back_populates="client")
    reports: Mapped[list["Reports"]] = relationship("Reports",back_populates="client")
    inscriptions: Mapped[list["Inscriptions"]] = relationship("Inscriptions",back_populates="client")
    favourites: Mapped[list["Favourites"]] = relationship(back_populates="client")
    reviews: Mapped[list["Reviews"]] = relationship(back_populates="client")

    def serialize(self):
        return {
                "id": self.user_id,
                "username": self.username,
                "name": self.name,
                "surname": self.surname,
                "telephone": self.telephone,
                "NID": self.NID,
                "avatar_url": self.avatar_url,
                "creation_date": self.creation_date.isoformat(),
                "address": self.address,
                "city": self.city,
                "country": self.country,
                "birthdate": self.birthdate.isoformat() if self.birthdate else None,
                "gender": self.gender.value,
                "inscriptions": [{"id": i.id, "activity_id": i.activity_id} for i in self.inscriptions if i.is_active],
                "favourites": [fav.serialize() for fav in self.favourites],
                "reviews": [rev.serialize() for rev in self.reviews] if self.reviews else None
            }

class Professionals(db.Model):
    __tablename__ = "professionals"
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    bio: Mapped[str] = mapped_column(String)
    type: Mapped[enumProf] = mapped_column(SQLAEnum(enumProf), nullable=False)
    business_name: Mapped[str] = mapped_column(String)
    tax_address: Mapped[str] = mapped_column(String)
    nuss: Mapped[str] = mapped_column(String(12))
    user: Mapped["Users"] = relationship("Users", back_populates="professional", uselist=False)
    info_activities: Mapped[list["Info_activity"]] = relationship("Info_activity", back_populates="professional")
    reports: Mapped[list["Reports"]] = relationship("Reports", back_populates="professional")
    reviews: Mapped[list["Reviews"]] = relationship(back_populates="professional")

    def serialize(self, depth=True):
        rating = 0
        count = 0
        if len(self.reviews) > 0:
            for review in self.reviews:
                if review.professional_rating:
                    rating = rating + review.professional_rating
                    count += 1
            if count > 0:
              rating = rating / count
        user = {"email": self.user.email, "username": self.user.client.username, "name": self.user.client.name, "surname": self.user.client.surname, "telephone": self.user.client.telephone,"creation_date": self.user.client.creation_date.isoformat(), "avatar_url": self.user.client.avatar_url}

        return {
            "id": self.user_id,
            "bio": self.bio,
            "type": self.type.value,
            "business_name": self.business_name,
            "tax_address": self.tax_address,
            "rating": rating,
            "info_activities": [a.serialize() for a in self.info_activities] if depth is True else [{"id": a.id, "name": a.name} for a in self.info_activities],
            "reviews": [rev.serialize() for rev in self.reviews],
            "user": user
        }

class Activities(db.Model):
    __tablename__ = "activities"
    id: Mapped[int] = mapped_column(primary_key=True)
    info_id: Mapped[int] = mapped_column(ForeignKey("info_activities.id"))
    price: Mapped[float] = mapped_column(Float, nullable=False)
    slots: Mapped[int] = mapped_column(Integer, nullable=False)
    creation_date: Mapped[datetime] = mapped_column(DateTime(),  default=datetime.now(timezone.utc), nullable=False)
    start_date: Mapped[datetime] = mapped_column(DateTime(), nullable=False)
    end_date: Mapped[datetime] = mapped_column(DateTime(), nullable=False)
    is_finished: Mapped[Boolean] = mapped_column(Boolean, default=False)
    meeting_point: Mapped[str] = mapped_column(String, nullable=False)
    is_active: Mapped[Boolean] = mapped_column(Boolean, default=True)

    info_activity: Mapped["Info_activity"] = relationship("Info_activity", back_populates="activities", uselist=False)
    inscriptions: Mapped[list["Inscriptions"]] = relationship("Inscriptions", back_populates="activity")

    def serialize(self, can_see=False):
        response_body = {}
        if can_see:
            response_body = {"inscriptions": [{"id": i.id, "user_id": i.user_id, "username": i.client.username, "name": i.client.name, "surname": i.client.surname, "telephone": i.client.telephone, "NID": i.client.NID} for i in self.inscriptions if i.is_active]}
        return {
            "id": self.id,
            "info_id": self.info_id,
            "price": self.price,
            "slots": self.slots,
            "creation_date": self.creation_date.isoformat(),
            "start_date": self.start_date.isoformat(),
            "end_date": self.end_date.isoformat(),
            "is_finished": self.is_finished,
            "meeting_point": self.meeting_point,
            "is_active": self.is_active,
            "info_activity": self.info_activity.serialize(),
            "slots_taken": len(self.inscriptions),
            **response_body
        }

class Info_activity(db.Model):
    __tablename__ = "info_activities"
    id: Mapped[int] = mapped_column(primary_key=True)
    professional_id: Mapped[int] = mapped_column(ForeignKey("professionals.user_id"), nullable=False)
    name: Mapped[str] = mapped_column(String(60), nullable=False)
    desc: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[enumInfo] = mapped_column(SQLAEnum(enumInfo), nullable=False)
    location: Mapped[str] = mapped_column(String(60), nullable=False)
    last_update: Mapped[datetime] = mapped_column(DateTime(),  default=datetime.now(timezone.utc), nullable=False)

    professional: Mapped["Professionals"] = relationship("Professionals", back_populates="info_activities", uselist=False)
    activities: Mapped[list["Activities"]] = relationship("Activities", back_populates="info_activity")
    reports: Mapped[list["Reports"]] = relationship("Reports", back_populates="info_activity")
    favourited_by: Mapped[list["Favourites"]] = relationship(back_populates="activity")
    media: Mapped[list["Media"]] = relationship(back_populates="info_activity")
    reviews: Mapped[list["Reviews"]] = relationship(back_populates="info_activity")

    def serialize(self):
        rating = 0
        count = 0
        if len(self.reviews) > 0:
            for review in self.reviews:
                if review.activity_rating:
                    rating = rating + review.activity_rating
                    count += 1
            if count > 0:
                rating = rating / count
        return {
            "id": self.id,
            "name": self.name,
            "desc": self.desc,
            "type": self.type.value,
            "location": self.location,
            "last_update": self.last_update.isoformat(),
            "rating": rating,
            "media": [m.url for m in self.media],
            "reviews": [r.serialize() for r in self.reviews],
            "professional": self.professional.serialize(False)
        }

class Inscriptions(db.Model):
    __tablename__ = "inscriptions"
    id: Mapped[int] = mapped_column(primary_key=True)
    activity_id: Mapped[int] = mapped_column(ForeignKey("activities.id"))
    user_id: Mapped[int] = mapped_column(ForeignKey("clients.user_id"))
    inscription_date: Mapped[datetime] = mapped_column(DateTime(), default=datetime.now(timezone.utc), nullable=False)
    is_active: Mapped[Boolean] = mapped_column(Boolean, default=True, nullable=False)
    payment_intent: Mapped[String] = mapped_column(String, nullable=True)

    activity: Mapped["Activities"] = relationship("Activities",back_populates="inscriptions",uselist=False)
    client: Mapped["Clients"] = relationship("Clients",back_populates="inscriptions",uselist=False)
      
    def serialize(self):
        return {
            "id": self.id,
            "activity_id": self.activity_id,
            "inscription_date": self.inscription_date.isoformat(),
            "is_active": self.is_active,
            "activity": self.activity.serialize(False) if self.activity else None,
            "user": self.client.user_id if self.client else None
        }
class Favourites(db.Model):
    __tablename__ = "favourites"
    user_id: Mapped[int] = mapped_column(ForeignKey("clients.user_id"), primary_key=True)
    info_activity_id: Mapped[int] = mapped_column(ForeignKey("info_activities.id"), primary_key=True)
    client: Mapped["Clients"] = relationship(back_populates="favourites")
    activity: Mapped["Info_activity"] = relationship(back_populates="favourited_by")

    def serialize(self):
        return{
            "user": {"id": self.user_id, "username": self.client.username},
            "activity": self.activity.serialize()
        }

class Media(db.Model):
    __tablename__ = "media"
    id: Mapped[int] = mapped_column(primary_key=True)
    info_activity_id: Mapped[int] = mapped_column(
        ForeignKey("info_activities.id"))
    url: Mapped[str] = mapped_column(String, nullable=False)


    info_activity: Mapped["Info_activity"] = relationship(back_populates="media", uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "url": self.url
        }

class Administrators(db.Model):
    __tablename__ = "administrators"
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)

    user: Mapped["Users"] = relationship(back_populates="admin")

class Reviews(db.Model):
    __tablename__ = "reviews"
    id: Mapped[int] = mapped_column(primary_key=True)
    info_activity_id: Mapped[int] = mapped_column(ForeignKey("info_activities.id"))
    professional_id: Mapped[int] = mapped_column(ForeignKey("professionals.user_id"))
    user_id: Mapped[int] = mapped_column(ForeignKey("clients.user_id"))
    professional_rating: Mapped[float] = mapped_column(Float, nullable=True)
    activity_rating: Mapped[float] = mapped_column(Float, nullable=True)
    professional_message: Mapped[str] = mapped_column(String, nullable=True)
    activity_message: Mapped[str] = mapped_column(String, nullable=True)
    creation_date: Mapped[datetime] = mapped_column(DateTime(), default=datetime.now(timezone.utc))


    client: Mapped["Clients"] = relationship(back_populates="reviews")
    info_activity: Mapped["Info_activity"] = relationship(back_populates="reviews")
    professional: Mapped["Professionals"] = relationship(back_populates="reviews")
    
    def serialize(self):
        return {
            "id": self.id,
            "professional_rating": self.professional_rating,
            "activity_rating": self.activity_rating,
            "professional_message": self.professional_message,
            "activity_message": self.activity_message,
            "creation_date": self.creation_date.isoformat(),
            "user": {"id": self.client.user_id, "username": self.client.username, "name": self.client.name, "surname": self.client.surname,"avatar_url": self.client.avatar_url},
            "info_activity": {"id": self.info_activity.id, "name": self.info_activity.name},
            "professional": {"id": self.professional.user_id, "username": self.professional.user.client.username}
        }

class Reports(db.Model):
    __tablename__ = "reports"
    id: Mapped[int] = mapped_column(primary_key=True)
    message: Mapped[str] = mapped_column(String, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("clients.user_id"))
    professional_target_id: Mapped[int] = mapped_column(ForeignKey("professionals.user_id", name="fk_reports_professional_target_id"), nullable=True)
    activity_target_id: Mapped[int] = mapped_column(ForeignKey("info_activities.id", name="fk_reports_activity_target_id"), nullable=True)
    creation_date: Mapped[datetime] = mapped_column(DateTime(), default=datetime.now(timezone.utc), nullable=False)
    is_checked: Mapped[bool] = mapped_column(Boolean, default=False)
      
    client: Mapped["Clients"] = relationship("Clients", back_populates="reports")
    professional: Mapped["Professionals"] = relationship("Professionals", back_populates="reports", foreign_keys=[professional_target_id])
    info_activity: Mapped["Info_activity"] = relationship("Info_activity", back_populates="reports", foreign_keys=[activity_target_id])

    def serialize(self):
        return {
            "id": self.id,
            "message": self.message,
            "user": {"id": self.client.user_id, "username": self.client.username} if self.client else None,
            "professional": {"id": self.professional.user_id, "username": self.professional.user.client.username} if self.professional else None,
            "info_activity": {"id": self.info_activity.id, "name": self.info_activity.name} if self.info_activity else None,
            "is_checked": self.is_checked,
            "creation_date": self.creation_date.isoformat()
        }