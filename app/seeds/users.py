from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='Lition', username='demo', email='demo@aa.io', password='password', profile_image='https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg', skin_type=['Dry'])
    vanessa = User(
        first_name='Vanessa', last_name='Sanchez', username='vanessa1', email='vanessa@aa.io', password='password', profile_image='https://upload.wikimedia.org/wikipedia/commons/3/3d/Fesoj_-_Papilio_machaon_%28by%29.jpg', skin_type=['Combination'])
    travis = User(
        first_name='Travis', last_name='Tee', username='travistee', email='travis@gmail.com', password='password', profile_image='https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg', skin_type=['Dry'])
    khloe = User(
        first_name='Khloe', last_name='Chen', username='khloechen', email='khloe@gmail.com', password='password', profile_image='https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Starsinthesky.jpg/1920px-Starsinthesky.jpg', skin_type=['Oily'])
    yasmin = User(
        first_name='Yasmin', last_name='Anderson', username='yasmin_xo', email='yasmin@gmail.com', password='password', profile_image='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Rosa_Precious_platinum.jpg/1920px-Rosa_Precious_platinum.jpg', skin_type=['Oily', 'Acne-Prone'])

    db.session.add(demo)
    db.session.add(vanessa)
    db.session.add(travis)
    db.session.add(khloe)
    db.session.add(yasmin)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
