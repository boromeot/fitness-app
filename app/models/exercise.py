from .db import db

class Exercise(db.Model):
  __table__ = 'exercises'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  body_part = db.Column(db.String, nullable=False)

  #Foreign Keys
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  work_id = db.Column(db.Integer, db.ForiegnKey('workouts.id'))

  #Relationships
  user = db.relationship('User', back_populates='exercises')
  workout = db.relationship('Workout', back_populates='exercises')
  sets = db.relationship('Set', back_populates='exercise')
