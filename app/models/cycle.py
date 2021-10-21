from .db import db

class Cycle(db.Model):
  __table__ = 'cycles'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)

  #Foreign Keys
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

  #Relationships
  user = db.relationships('User', back_populates='cycles')
  routines = db.relationships('Routine', back_populates='cycle')