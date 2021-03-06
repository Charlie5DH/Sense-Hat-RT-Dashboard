# Generated by Django 4.0.4 on 2022-04-21 20:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('liveapp', '0002_alter_sensehatenvmeasures_timestamp_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensehatenvmeasures',
            name='humidity',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sensehatenvmeasures',
            name='pressure',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sensehatenvmeasures',
            name='temperature',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sensehatenvmeasures',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 21, 17, 36, 56, 442718)),
        ),
        migrations.AlterField(
            model_name='sensehatorientationmeasures',
            name='acceleration_x',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sensehatorientationmeasures',
            name='acceleration_y',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sensehatorientationmeasures',
            name='acceleration_z',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sensehatorientationmeasures',
            name='pitch',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sensehatorientationmeasures',
            name='roll',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sensehatorientationmeasures',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 21, 17, 36, 56, 442718)),
        ),
        migrations.AlterField(
            model_name='sensehatorientationmeasures',
            name='yaw',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
