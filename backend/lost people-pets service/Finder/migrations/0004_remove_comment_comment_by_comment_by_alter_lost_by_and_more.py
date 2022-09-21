# Generated by Django 4.0.3 on 2022-05-29 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Finder', '0003_alter_found_by'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='comment_by',
        ),
        migrations.AddField(
            model_name='comment',
            name='by',
            field=models.IntegerField(blank=True, default=5, null=True),
        ),
        migrations.AlterField(
            model_name='lost',
            name='by',
            field=models.IntegerField(blank=True, default=5, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='by',
            field=models.IntegerField(blank=True, default=5, null=True),
        ),
    ]
