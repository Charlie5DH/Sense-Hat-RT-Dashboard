# Generated by Django 4.0.4 on 2022-05-05 12:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_sensehatenvmeasures_timestamp_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensehatenvmeasures',
            name='timestamp',
            field=models.DateTimeField(default='2022-05-05 12:33:08'),
        ),
        migrations.AlterField(
            model_name='sensehatorientationmeasures',
            name='timestamp',
            field=models.DateTimeField(default='2022-05-05 12:33:08'),
        ),
    ]
