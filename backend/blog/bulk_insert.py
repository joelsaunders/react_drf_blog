from typing import List, Tuple

from django.contrib.auth.models import User


def normal_bulk(user_details: List[Tuple[str, str]]):
    users = []
    for username, password in user_details:
        user = User(username=username, password=password)
        users.append(user)

    User.objects.bulk_create(users)