from .db import db, environment, SCHEMA, add_prefix_for_prod

class Exercise(db.Model):
  __tablename__ = 'exercises'
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  body_part = db.Column(db.String, nullable=False)

  #Foreign Keys
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  work_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('workouts.id')))

  #Relationships
  user = db.relationship('User', back_populates='exercises')
  workout = db.relationship('Workout', back_populates='exercises')
  sets = db.relationship('Set', back_populates='exercise')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'body_part': self.body_part,
      'sets': [set.to_dict() for set in self.sets]
    }
