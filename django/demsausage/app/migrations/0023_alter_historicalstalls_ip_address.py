# Generated by Django 3.2.13 on 2022-05-05 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0022_taskresults'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalstalls',
            name='ip_address',
            field=models.TextField(null=True),
        ),
    ]
