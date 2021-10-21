from .db import db

class Workout(db.Model):
  __table__ = 'workouts'
  id = db.Column(db.Integer, primary_key=True)
  day = db.Column(db.String, nullable=False)

  #Foreign Keys
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  routine_id = db.Column(db.Integer, db.ForeignKey('routines.id'))

  #Relationships
  user = db.relationship('User', back_populates='workouts')
  routine = db.relationship('Routine', back_populates='workouts')
