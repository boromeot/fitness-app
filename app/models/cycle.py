from .db import db

class Cycle(db.Model):
  __tablename__ = 'cycles'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)

  #Foreign Keys
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

  #Relationships
  user = db.relationship('User', back_populates='cycles')
  routines = db.relationship('Routine', back_populates='cycle')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'routines': self.routines
    }
