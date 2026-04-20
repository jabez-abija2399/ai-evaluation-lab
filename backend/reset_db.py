
from database.db import engine
from database.schema import Base
print("Deleting old tables...")
Base.metadata.drop_all(bind=engine)
print("Creating new tables with 'mode' column...")
Base.metadata.create_all(bind=engine)
print("Success! ✅")
    