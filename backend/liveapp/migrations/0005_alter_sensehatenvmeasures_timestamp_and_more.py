# Generated by Django 4.0.4 on 2022-04-21 20:41

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('liveapp', '0004_alter_sensehatenvmeasures_humidity_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensehatenvmeasures',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 21, 17, 41, 36, 595938)),
        ),
        migrations.AlterField(
            model_name='sensehatorientationmeasures',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 21, 17, 41, 36, 595938)),
        ),
    ]