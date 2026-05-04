# Event-Driven Patterns

## Kafka Producer/Consumer (Django)

### Producer (in controller/service)
```python
from core.tasks import send_notification

class EmailController:
    @staticmethod
    @api_view(["POST"])
    @handle_unknown_exception_api_view(logger=LOGGER)
    @authenticate_user_token
    def schedule_email(request):
        event_name = request.data.get("kafka_topic")
        notification_dict = request.data.get("notification_dict")
        schedule = notification_dict.get("schedule")
        # Delegate to Celery — never block the request
        send_notification.delay(event_name, notification_dict, schedule)
        return SuccessJSONResponse({"status": "scheduled"})
```

### Consumer (Celery task)
```python
@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_notification(self, event_name, notification_dict, schedule=None):
    try:
        if schedule:
            # Deferred execution
            self.apply_async(eta=parse_schedule(schedule))
            return
        # Process immediately
        NotificationService.send(event_name, notification_dict)
    except Exception as exc:
        self.retry(exc=exc)
```

## Scheduled/Deferred Tasks

```python
from celery import shared_task
from datetime import timedelta
from django.utils import timezone

# Schedule for later
send_notification.apply_async(
    args=[event_name, data],
    eta=timezone.now() + timedelta(hours=1),
)

# Periodic tasks (celery-beat)
# In settings.py
CELERY_BEAT_SCHEDULE = {
    'cleanup-stale-orders': {
        'task': 'core.tasks.cleanup_stale_orders',
        'schedule': timedelta(hours=6),
    },
}
```

## Inter-Service Communication

```python
# Service-to-service auth decorator
def authenticate_user_token(func):
    """Validates service-to-service JWT token"""
    @functools.wraps(func)
    def wrapper(request, *args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            return UnauthorizedJSONResponse(message="Token required")
        try:
            payload = jwt.decode(token, PUBLIC_KEY, algorithms=['RS256'])
            request.service_user = payload
        except jwt.InvalidTokenError:
            return UnauthorizedJSONResponse(message="Invalid token")
        return func(request, *args, **kwargs)
    return wrapper
```

## Rules

1. **Never block API response** for async work — use Celery
2. **Idempotent consumers** — check state before processing
3. **Dead letter queue** — failed after retries → DLQ
4. **Service-to-service auth** — JWT with RS256, short-lived tokens
5. **Scheduled tasks** — use `apply_async(eta=)` not `time.sleep()`
6. **Event naming** — `{service}.{entity}.{action}` (e.g., `order.payment.completed`)
