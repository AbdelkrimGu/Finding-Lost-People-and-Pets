# Generated by Django 4.0.3 on 2022-05-29 18:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Finder', '0002_alter_post_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='found',
            name='by',
            field=models.IntegerField(blank=True, default=5, null=True),
        ),
    ]
