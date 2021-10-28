"""empty message

Revision ID: 5baf61da0f77
Revises: d40061eebb75
Create Date: 2021-10-28 02:40:40.638165

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5baf61da0f77'
down_revision = 'd40061eebb75'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('sets', sa.Column('unit', sa.String(), nullable=True))
    op.drop_column('sets', 'is_kilogram')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('sets', sa.Column('is_kilogram', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.drop_column('sets', 'unit')
    # ### end Alembic commands ###