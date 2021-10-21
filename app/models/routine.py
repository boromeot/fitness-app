from .db import db

class Routine(db.Model):
  __tablename__ = 'routines'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)

  #Foreign Keys
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  cycle_id = db.Column(db.Integer, db.ForeignKey('cycles.id'))

  #Relationships
  user = db.relationship('User', back_populates='routines')
  cycle = db.relationship('Cycle', back_populates='routines')
  workouts = db.relationship('Workout', back_populates='routine')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'workouts': self.workouts
    }
