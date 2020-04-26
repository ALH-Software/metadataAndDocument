# Generated by Django 2.0.5 on 2020-04-19 16:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document_name', models.CharField(max_length=250, unique=True)),
                ('document_file', models.FileField(blank=True, upload_to='documents')),
            ],
        ),
        migrations.CreateModel(
            name='Metadata',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('metadata_name', models.CharField(max_length=250, unique=True)),
                ('metadata_string', models.TextField()),
            ],
        ),
    ]