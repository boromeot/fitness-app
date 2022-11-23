from .db import db, environment, SCHEMA, add_prefix_for_prod

class Routine(db.Model):
  __tablename__ = 'routines'
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)

  #Foreign Keys
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  cycle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cycles.id')))

  #Relationships
  user = db.relationship('User', back_populates='routines')
  cycle = db.relationship('Cycle', back_populates='routines')
  workouts = db.relationship('Workout', back_populates='routine')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'workouts': [workout.to_dict() for workout in self.workouts]
    }
