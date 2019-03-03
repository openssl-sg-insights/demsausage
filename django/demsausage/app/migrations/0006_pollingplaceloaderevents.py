# Generated by Django 2.1.7 on 2019-03-01 06:25

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_auto_20190223_0930'),
    ]

    operations = [
        migrations.CreateModel(
            name='PollingPlaceLoaderEvents',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('payload', django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=None)),
            ],
        ),
    ]