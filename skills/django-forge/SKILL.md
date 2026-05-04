---
name: django-forge
description: Generate production-ready Django + DRF APIs following Controller → Repository → Serializer pattern with Celery
---
Read `agents/django-forge.md`. Generate complete Django features: Model + Repository + Serializer + Controller + URLs + Celery Task + Tests + Migration. Follow the layered architecture from your existing Django codebase. Always use BaseRepository, SuccessJSONResponse/BadRequestJSONResponse, @handle_unknown_exception_api_view decorator, and django-simple-history for audit.
