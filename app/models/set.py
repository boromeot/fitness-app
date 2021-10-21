from .db import db

class Set(db.Model):
  __tablename__ = 'sets'
  id = db.Column(db.Integer, primary_key=True)
  completed_reps = db.Column(db.Integer, default=0)
  total_reps = db.Column(db.Integer)
  weight = db.Column(db.Float, default=0)
  body_weight = db.Column(db.Boolean, default=False)
  is_kilogram = db.Column(db.Boolean, default=False)

  #Foreign Keys
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'))

  #Relationships
  user = db.relationship('User', back_populates='sets')
  exercise = db.relationship('Exercise', back_populates='sets')
