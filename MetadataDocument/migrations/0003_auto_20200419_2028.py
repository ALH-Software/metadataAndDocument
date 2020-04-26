# Generated by Django 2.0.5 on 2020-04-19 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MetadataDocument', '0002_auto_20200419_2016'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='id',
            field=models.AutoField(auto_created=True, default=0, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='metadata',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='document',
            name='document_name',
            field=models.CharField(max_length=250, unique=True),
        ),
        migrations.AlterField(
            model_name='metadata',
            name='metadata_name',
            field=models.CharField(max_length=250, unique=True),
        ),
    ]