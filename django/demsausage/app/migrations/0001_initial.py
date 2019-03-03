# Generated by Django 2.1.5 on 2019-02-15 07:25

import demsausage.app.enums
import demsausage.app.models
import demsausage.app.validators
from django.conf import settings
import django.contrib.gis.db.models.fields
import django.contrib.postgres.fields.jsonb
import django.contrib.postgres.indexes
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AllowedUsers',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Elections',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('old_id', models.IntegerField(null=True)),
                ('geom', django.contrib.gis.db.models.fields.PointField(geography=True, srid=4326)),
                ('default_zoom_level', models.IntegerField()),
                ('name', models.TextField(unique=True)),
                ('short_name', models.TextField(unique=True)),
                ('is_hidden', models.BooleanField(default=False)),
                ('is_primary', models.BooleanField(default=False)),
                ('polling_places_loaded', models.BooleanField(default=False)),
                ('election_day', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='HistoricalStalls',
            fields=[
                ('id', models.IntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('ip_address', models.GenericIPAddressField(null=True)),
                ('old_id', models.IntegerField(null=True)),
                ('name', models.TextField()),
                ('description', models.TextField()),
                ('website', models.TextField(blank=True)),
                ('noms', django.contrib.postgres.fields.jsonb.JSONField(default=None, validators=[demsausage.app.validators.JSONSchemaValidator(limit_value={'additionalProperties': False, 'properties': {'bacon_and_eggs': {'type': 'boolean'}, 'bbq': {'type': 'boolean'}, 'cake': {'type': 'boolean'}, 'coffee': {'type': 'boolean'}, 'free_text': {'type': 'string'}, 'halal': {'type': 'boolean'}, 'nothing': {'type': 'boolean'}, 'run_out': {'type': 'boolean'}, 'vego': {'type': 'boolean'}}, 'schema': 'http://json-schema.org/draft-07/schema#', 'type': 'object'})])),
                ('location_info', django.contrib.postgres.fields.jsonb.JSONField(default=None, null=True, validators=[demsausage.app.validators.JSONSchemaValidator(limit_value={'additionalProperties': False, 'properties': {'address': {'type': 'string'}, 'geom': {'properties': {'coordinates': {'items': {'type': 'number'}, 'type': 'array'}, 'type': {'type': 'string'}}, 'type': 'object'}, 'name': {'type': 'string'}, 'state': {'type': 'string'}}, 'required': ['name', 'address', 'state', 'geom'], 'schema': 'http://json-schema.org/draft-07/schema#', 'type': 'object'})])),
                ('email', models.EmailField(max_length=254)),
                ('reported_timestamp', models.DateTimeField(blank=True, editable=False)),
                ('status', models.TextField(choices=[(demsausage.app.enums.StallStatus('Pending'), 'Pending'), (demsausage.app.enums.StallStatus('Approved'), 'Approved'), (demsausage.app.enums.StallStatus('Declined'), 'Declined')], default=demsausage.app.enums.StallStatus('Pending'))),
                ('mail_confirm_key', models.TextField(blank=True)),
                ('mail_confirmed', models.BooleanField(default=False)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical stalls',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='MailgunEvents',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('event_type', models.TextField()),
                ('payload', django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=None)),
            ],
        ),
        migrations.CreateModel(
            name='PollingPlaceFacilityType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='PollingPlaceNoms',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('noms', django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=None, validators=[demsausage.app.validators.JSONSchemaValidator(limit_value={'additionalProperties': False, 'properties': {'bacon_and_eggs': {'type': 'boolean'}, 'bbq': {'type': 'boolean'}, 'cake': {'type': 'boolean'}, 'coffee': {'type': 'boolean'}, 'free_text': {'type': 'string'}, 'halal': {'type': 'boolean'}, 'nothing': {'type': 'boolean'}, 'run_out': {'type': 'boolean'}, 'vego': {'type': 'boolean'}}, 'schema': 'http://json-schema.org/draft-07/schema#', 'type': 'object'})])),
                ('name', models.TextField(blank=True)),
                ('description', models.TextField(blank=True)),
                ('website', models.TextField(blank=True)),
                ('extra_info', models.TextField(blank=True)),
                ('first_report', models.DateTimeField(auto_now_add=True, null=True)),
                ('latest_report', models.DateTimeField(auto_now=True, null=True)),
                ('chance_of_sausage', models.FloatField(null=True)),
                ('source', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='PollingPlaces',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('old_id', models.IntegerField(null=True)),
                ('geom', django.contrib.gis.db.models.fields.PointField(geography=True, srid=4326)),
                ('name', models.TextField()),
                ('premises', models.TextField(blank=True)),
                ('address', models.TextField()),
                ('divisions', django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=list)),
                ('state', models.CharField(max_length=8)),
                ('wheelchair_access', models.TextField(blank=True)),
                ('entrance_desc', models.TextField(blank=True)),
                ('opening_hours', models.TextField(blank=True)),
                ('booth_info', models.TextField(blank=True)),
                ('status', models.TextField(choices=[(demsausage.app.enums.PollingPlaceStatus('Archived'), 'Archived'), (demsausage.app.enums.PollingPlaceStatus('Active'), 'Active'), (demsausage.app.enums.PollingPlaceStatus('Draft'), 'Draft')], default=demsausage.app.enums.PollingPlaceStatus('Draft'))),
                ('election', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='app.Elections')),
                ('facility_type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='app.PollingPlaceFacilityType')),
                ('noms', models.OneToOneField(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='polling_place', to='app.PollingPlaceNoms')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_image_url', models.URLField()),
                ('is_approved', models.BooleanField(default=False)),
                ('settings', django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=demsausage.app.models.default_profile_settings)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Stalls',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('old_id', models.IntegerField(null=True)),
                ('name', models.TextField()),
                ('description', models.TextField()),
                ('website', models.TextField(blank=True)),
                ('noms', django.contrib.postgres.fields.jsonb.JSONField(default=None, validators=[demsausage.app.validators.JSONSchemaValidator(limit_value={'additionalProperties': False, 'properties': {'bacon_and_eggs': {'type': 'boolean'}, 'bbq': {'type': 'boolean'}, 'cake': {'type': 'boolean'}, 'coffee': {'type': 'boolean'}, 'free_text': {'type': 'string'}, 'halal': {'type': 'boolean'}, 'nothing': {'type': 'boolean'}, 'run_out': {'type': 'boolean'}, 'vego': {'type': 'boolean'}}, 'schema': 'http://json-schema.org/draft-07/schema#', 'type': 'object'})])),
                ('location_info', django.contrib.postgres.fields.jsonb.JSONField(default=None, null=True, validators=[demsausage.app.validators.JSONSchemaValidator(limit_value={'additionalProperties': False, 'properties': {'address': {'type': 'string'}, 'geom': {'properties': {'coordinates': {'items': {'type': 'number'}, 'type': 'array'}, 'type': {'type': 'string'}}, 'type': 'object'}, 'name': {'type': 'string'}, 'state': {'type': 'string'}}, 'required': ['name', 'address', 'state', 'geom'], 'schema': 'http://json-schema.org/draft-07/schema#', 'type': 'object'})])),
                ('email', models.EmailField(max_length=254)),
                ('reported_timestamp', models.DateTimeField(auto_now_add=True)),
                ('status', models.TextField(choices=[(demsausage.app.enums.StallStatus('Pending'), 'Pending'), (demsausage.app.enums.StallStatus('Approved'), 'Approved'), (demsausage.app.enums.StallStatus('Declined'), 'Declined')], default=demsausage.app.enums.StallStatus('Pending'))),
                ('mail_confirm_key', models.TextField(blank=True)),
                ('mail_confirmed', models.BooleanField(default=False)),
                ('election', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='app.Elections')),
                ('polling_place', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='app.PollingPlaces')),
            ],
        ),
        migrations.AddIndex(
            model_name='pollingplacenoms',
            index=django.contrib.postgres.indexes.GinIndex(fields=['noms'], name='app_polling_noms_c0dc2d_gin'),
        ),
        migrations.AddField(
            model_name='historicalstalls',
            name='election',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='app.Elections'),
        ),
        migrations.AddField(
            model_name='historicalstalls',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalstalls',
            name='polling_place',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='app.PollingPlaces'),
        ),
        migrations.AddIndex(
            model_name='pollingplaces',
            index=models.Index(fields=['election'], name='app_polling_electio_4cef11_idx'),
        ),
    ]