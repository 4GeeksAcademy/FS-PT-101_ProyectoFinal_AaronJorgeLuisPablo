from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime, ForeignKey, Float, Integer
from enum import Enum as PyEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timezone
from sqlalchemy import Enum as SQLAEnum
# default=datetime.now(timezone.utc)

db = SQLAlchemy()

class enumProf(PyEnum):
    freelance = "FREELANCE"
    business = "BUSINESS"

class enumClts(PyEnum):
    male = "MALE"
    female = "FEMALE"
    not_telling = "NOT TELLING"

class enumInfo(PyEnum):
    tourism = "TOURISM"
    leisure = "LEISURE"
    sport = "SPORT"


class Users(db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(40), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    name: Mapped[str] = mapped_column(String(20), nullable=False)
    surname: Mapped[str] = mapped_column(String(40))
    telephone: Mapped[str] = mapped_column(String(15), unique=True, nullable=False)
    NID: Mapped[str] = mapped_column(String(10), unique=True, nullable=False)
    creation_date: Mapped[datetime] = mapped_column(DateTime(), default=datetime.utcnow, nullable=False)
    avatar_url: Mapped[str] = mapped_column(String, default="0.jpg")
    address: Mapped[str] = mapped_column(String, nullable=False)
    city: Mapped[str] = mapped_column(String, nullable=False)
    birthdate: Mapped[datetime] = mapped_column(DateTime(), nullable=False)
    gender: Mapped[enumClts] = mapped_column(SQLAEnum(enumClts), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    reports: Mapped[list["Reports"]] = relationship("Reports",back_populates="user")
    professional: Mapped["Professionals"] = relationship("Professionals",back_populates="user",uselist=False)
    inscriptions: Mapped[list["Inscriptions"]] = relationship("Inscriptions",back_populates="user")
    favourites: Mapped[list["Favourites"]] = relationship(back_populates="user")
    reviews: Mapped[list["Reviews"]] = relationship(back_populates="user")

    def serialize(self):
        prof = {name: value for name, value in self.professional.serialize().items() if name != "user"} if self.professional else None
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "name": self.name,
            "surname": self.surname,
            "telephone": self.telephone,
            "NID": self.NID,
            "creation_date": self.creation_date.isoformat(),
            "is_active": self.is_active,
            "avatar_url": self.avatar_url,
            "address": self.address,
            "city": self.city,
            "birthdate": self.birthdate.isoformat(),
            "gender": self.gender.value,
            "is_professional": True if self.professional else False,
            "professional": prof,
            "inscriptions": [i.id for i in self.inscriptions],
            "favourites": [fav.info_activity_id for fav in self.favourites],
            "reviews": [rev.id for rev in self.reviews]
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
        user = {"email": self.user.email, "username": self.user.username, "name": self.user.name, "surname": self.user.surname, "telephone": self.user.telephone,"creation_date": self.user.creation_date.isoformat(), "avatar_url": self.user.avatar_url}
        return {
            "user_id": self.user_id,
            "bio": self.bio,
            "type": self.type.value,
            "business_name": self.business_name,
            "tax_address": self.tax_address,
            "nuss": self.nuss,
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
    creation_date: Mapped[datetime] = mapped_column(DateTime(),  default=datetime.utcnow, nullable=False)
    start_date: Mapped[datetime] = mapped_column(DateTime(), nullable=False)
    end_date: Mapped[datetime] = mapped_column(DateTime(), nullable=False)
    is_finished: Mapped[Boolean] = mapped_column(Boolean, default=False)
    meeting_point: Mapped[str] = mapped_column(String, nullable=False)
    is_active: Mapped[Boolean] = mapped_column(Boolean, default=True)

    info_activity: Mapped["Info_activity"] = relationship("Info_activity", back_populates="activities", uselist=False)
    inscriptions: Mapped[list["Inscriptions"]] = relationship("Inscriptions", back_populates="activity")

    def serialize(self):
        return {
            "id": self.id,
            "price": self.price,
            "slots": self.slots,
            "creation_date": self.creation_date.isoformat(),
            "start_date": self.start_date.isoformat(),
            "end_date": self.end_date.isoformat(),
            "is_finished": self.is_finished,
            "meeting_point": self.meeting_point,
            "is_active": self.is_active,
            "info_activity": self.info_activity.serialize(),
            "inscriptions": [{"user_id": i.user_id, "username": i.user.username} for i in self.inscriptions]
        }

class Info_activity(db.Model):
    __tablename__ = "info_activities"
    id: Mapped[int] = mapped_column(primary_key=True)
    professional_id: Mapped[int] = mapped_column(ForeignKey("professionals.user_id"), nullable=False)
    name: Mapped[str] = mapped_column(String(60), nullable=False)
    desc: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[enumInfo] = mapped_column(SQLAEnum(enumInfo), nullable=False)
    location: Mapped[str] = mapped_column(String(60), nullable=False)
    last_update: Mapped[datetime] = mapped_column(DateTime(),  default=datetime.utcnow, nullable=False)

    professional: Mapped["Professionals"] = relationship("Professionals", back_populates="info_activities", uselist=False)
    activities: Mapped[list["Activities"]] = relationship("Activities", back_populates="info_activity")
    reports: Mapped[list["Reports"]] = relationship("Reports", back_populates="info_activity")
    favourited_by: Mapped[list["Favourites"]] = relationship(back_populates="activities")
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
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    inscription_date: Mapped[datetime] = mapped_column(DateTime(),  default=datetime.utcnow, nullable=False)
    is_active: Mapped[Boolean] = mapped_column(Boolean, default=True, nullable=False)

    activity: Mapped["Activities"] = relationship("Activities",back_populates="inscriptions",uselist=False)
    user: Mapped["Users"] = relationship("Users",back_populates="inscriptions",uselist=False)
      
    def serialize(self):
        return {
            "id": self.id,
            "activity_id": self.activity_id,
            "inscription_date": self.inscription_date.isoformat(),
            "is_active": self.is_active,
            "activity": self.activity.serialize() if self.activity else None,
            "user": self.user.id if self.user else None
        }

class Favourites(db.Model):
    __tablename__ = "favourites"
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    info_activity_id: Mapped[int] = mapped_column(ForeignKey("info_activities.id"), primary_key=True)

    user: Mapped["Users"] = relationship(back_populates="favourites")
    activities: Mapped["Info_activity"] = relationship(back_populates="favourited_by")

    def serialize(self):
        return{
            "user_id": self.user_id,
            "info_activity_id": self.info_activity_id,
            "user": [user.serialize() for user in self.users],
            "activities": [activity.serialize() for activity in self.activities]
        }

class Media(db.Model):
    __tablename__ = "media"
    id: Mapped[int] = mapped_column(primary_key=True)
    info_activity_id: Mapped[int] = mapped_column(
        ForeignKey("info_activities.id"))
    url: Mapped[str] = mapped_column(String, nullable=False)
    # alt_desc: Mapped[String] = mapped_column(String)
    info_activity: Mapped["Info_activity"] = relationship(back_populates="media", uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "url": self.url
        }

class Administrators(db.Model):
    __tablename__ = "administrators"
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), primary_key=True)

class Reviews(db.Model):
    __tablename__ = "reviews"
    id: Mapped[int] = mapped_column(primary_key=True)
    info_activity_id: Mapped[int] = mapped_column(ForeignKey("info_activities.id"))
    professional_id: Mapped[int] = mapped_column(ForeignKey("professionals.user_id"))
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    professional_rating: Mapped[float] = mapped_column(Float, nullable=True)
    activity_rating: Mapped[float] = mapped_column(Float, nullable=True)
    professional_message: Mapped[str] = mapped_column(String, nullable=True)
    activity_message: Mapped[str] = mapped_column(String, nullable=True)
    creation_date: Mapped[datetime] = mapped_column(DateTime(),  default=datetime.utcnow, nullable=False)

    user: Mapped["Users"] = relationship(back_populates="reviews")
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
            "user": {"id": self.user.id, "username": self.user.username},
            "info_activity": {"id": self.info_activity.id, "name": self.info_activity.name},
            "professional": {"user_id": self.professional.user_id, "username": self.professional.user.username}
        }

class Reports(db.Model):
    __tablename__ = "reports"
    id: Mapped[int] = mapped_column(primary_key=True)
    message: Mapped[str] = mapped_column(String, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    professional_target_id: Mapped[int] = mapped_column(ForeignKey("professionals.user_id", name="fk_reports_professional_target_id"), nullable=True)
    activity_target_id: Mapped[int] = mapped_column(ForeignKey("info_activities.id", name="fk_reports_activity_target_id"), nullable=True)
    creation_date: Mapped[datetime] = mapped_column(DateTime(), default=datetime.utcnow, nullable=False)
    is_checked: Mapped[bool] = mapped_column(Boolean, default=False)
      
    user: Mapped["Users"] = relationship("Users", back_populates="reports")
    professional: Mapped["Professionals"] = relationship("Professionals", back_populates="reports", foreign_keys=[professional_target_id])
    info_activity: Mapped["Info_activity"] = relationship("Info_activity", back_populates="reports", foreign_keys=[activity_target_id])

    def serialize(self):
        return {
            "id": self.id,
            "message": self.message,
            "user": {"id": self.user.id, "username": self.user.username} if self.user else None,
            "professional": {"id": self.professional.user_id, "username": self.professional.user.username} if self.professional else None,
            "info_activity": {"id": self.info_activity.id, "name": self.info_activity.name} if self.info_activity else None,
            "is_checked": self.is_checked,
            "creation_date": self.creation_date.isoformat()
        }