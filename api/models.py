from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=32, default='')
    bio = models.TextField(max_length=500, default="Привет мир")
    avatar = models.URLField(default=None)
    status = models.CharField(max_length=16, blank=True, default='')

    def __str__(self):
        return f'Профиль {self.user}'

class Thread(models.Model):
    TOPIC_CHOICES = (
    ("1", "Цели и задачи ВКР"),
    ("2", "План работы"),
    ("3", "Теоретические результаты"),
    ("4", "Практические результаты"),
    ("5", "Технологии"),
    ("6", "Литература"),
    ("7", "Презентация"),
    ("8", "Общие вопросы"),
)
    subject = models.CharField(max_length=128, verbose_name="Тема")
    content = models.TextField(verbose_name="Содержание")
    creator = models.ForeignKey('User', on_delete=models.CASCADE, related_name='creator_threads', verbose_name="Автор")
    topic = models.CharField(max_length=32, choices=TOPIC_CHOICES, default=1, verbose_name="Категория")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    updated = models.DateTimeField(auto_now=True, verbose_name="Обновлено")
    replyCount = models.IntegerField(default=0, verbose_name="Количество ответов")

    def __str__(self):
        return f'Тема {self.subject} создана пользователем {self.creator.username}.'


class Post(models.Model):
    content = models.TextField(verbose_name="Содержание")
    thread = models.ForeignKey('Thread', on_delete=models.CASCADE, related_name='thread_posts', verbose_name="Тема")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    updated = models.DateTimeField(auto_now=True, verbose_name="Обновлено")
    creator = models.ForeignKey('User', on_delete=models.CASCADE, related_name='creator_posts', verbose_name="Автор")

    def __str__(self):
        return f'Ответ в теме {self.thread.subject} от пользователя {self.creator.username}.'


class Pin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_pin", verbose_name="Закреплено пользователем")
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name="thread_pin", verbose_name="Тема")

    def __str__(self):
        return f"{self.user.username} закрепил тему с id: {self.thread.id}"





