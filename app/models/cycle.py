from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cycle(db.Model):
  __tablename__ = 'cycles'
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)

  #Foreign Keys
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

  #Relationships
  user = db.relationship('User', back_populates='cycles')
  routines = db.relationship('Routine', back_populates='cycle')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'routines': [routine.to_dict() for routine in self.routines]
    }
