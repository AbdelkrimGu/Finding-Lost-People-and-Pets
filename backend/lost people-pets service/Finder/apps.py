from django.apps import AppConfig


class FinderConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Finder'

    def ready(self):
        from .  import signals
