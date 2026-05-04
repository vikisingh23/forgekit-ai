---
name: django-forge
description: Generate production-ready Django + DRF APIs following Controller → Repository → Serializer pattern with Celery
---

Generate Django + DRF APIs following Controller → Repository → Serializer pattern.

## What it generates
Model (audit fields + history) + Repository (extends BaseRepository) +
Serializer (DRF validation) + Controller (@api_view + decorators) +
URLs + Celery tasks + Tests + Migration.

Uses: django-simple-history, django-filter, django-redis.

For full instructions, read `agents/django-forge.md`.
