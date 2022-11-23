from .db import db, environment, SCHEMA, add_prefix_for_prod

class Set(db.Model):
  __tablename__ = 'sets'
  if environment == "production":
      __table_args__ = {'schema': SCHEMA}
  id = db.Column(db.Integer, primary_key=True)
  completed_reps = db.Column(db.Integer, default=0)
  total_reps = db.Column(db.Integer)
  weight = db.Column(db.Float, default=0)
  unit = db.Column(db.String, default='lbs')
  body_weight = db.Column(db.Boolean, default=False)

  #Foreign Keys
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  exercise_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('exercises.id')))

  #Relationships
  user = db.relationship('User', back_populates='sets')
  exercise = db.relationship('Exercise', back_populates='sets')

  def to_dict(self):
    return {
      'id': self.id,
      'completed_reps': self.completed_reps,
      'total_reps': self.total_reps,
      'weight': self.weight,
      'body_weight': self.body_weight,
      'unit': self.unit
    }
