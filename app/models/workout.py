from app.models.exercise import Exercise
from .db import db

class Workout(db.Model):
  __tablename__ = 'workouts'
  id = db.Column(db.Integer, primary_key=True)
  day = db.Column(db.String, nullable=False)

  #Foreign Keys
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  routine_id = db.Column(db.Integer, db.ForeignKey('routines.id'))

  #Relationships
  user = db.relationship('User', back_populates='workouts')
  routine = db.relationship('Routine', back_populates='workouts')
  exercises = db.relationship('Exercise', back_populates='workout')

  def to_dict(self):
    return {
      'id': self.id,
      'day': self.day,
      'exercises': [exercise.to_dict() for exercise in self.exercises]
    }
