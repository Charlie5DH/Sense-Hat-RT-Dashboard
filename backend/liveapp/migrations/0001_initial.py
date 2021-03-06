# Generated by Django 4.0.4 on 2022-04-21 20:33

import datetime
from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SenseHatEnvMeasures',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(default='SenseHat', max_length=100)),
                ('temperature', models.FloatField(null=True)),
                ('pressure', models.FloatField(null=True)),
                ('humidity', models.FloatField(null=True)),
                ('timestamp', models.DateTimeField(default=datetime.datetime(2022, 4, 21, 17, 33, 45, 750175))),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='SenseHatOrientationMeasures',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(default='SenseHat', max_length=100)),
                ('acceleration_x', models.FloatField(null=True)),
                ('acceleration_y', models.FloatField(null=True)),
                ('acceleration_z', models.FloatField(null=True)),
                ('pitch', models.FloatField(null=True)),
                ('roll', models.FloatField(null=True)),
                ('yaw', models.FloatField(null=True)),
                ('timestamp', models.DateTimeField(default=datetime.datetime(2022, 4, 21, 17, 33, 45, 750175))),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
