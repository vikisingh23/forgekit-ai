# Message Queue Patterns

## When to Use Queues

| Use Case | Queue? | Why |
|----------|--------|-----|
| Send email/SMS after action | ✅ Yes | Don't block the API response |
| Process payment webhook | ✅ Yes | Retry on failure, idempotent |
| Generate report | ✅ Yes | Long-running, async |
| Real-time price update | ❌ No | Use WebSocket/SSE |
| Simple CRUD | ❌ No | Overkill |

## Bull (NestJS) Pattern

```typescript
// Producer — in service
@Injectable()
export class OrderService {
  constructor(@InjectQueue('orders') private orderQueue: Queue) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const order = await this.orderRepo.create(dto);
    await this.orderQueue.add('process-payment', {
      orderId: order.id,
      amount: order.amount,
    }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
      removeOnComplete: 100,
      removeOnFail: 500,
    });
    return order;
  }
}

// Consumer — separate processor
@Processor('orders')
export class OrderProcessor {
  @Process('process-payment')
  async handlePayment(job: Job<{ orderId: string; amount: number }>) {
    const { orderId, amount } = job.data;
    // Idempotency check
    const existing = await this.paymentRepo.findByOrderId(orderId);
    if (existing) return existing; // Already processed
    
    return this.paymentService.process(orderId, amount);
  }
}
```

## Rules

1. **Idempotent consumers** — same message processed twice must produce same result
2. **Retry with exponential backoff** — 3 attempts minimum, 5s → 10s → 20s
3. **Dead letter queue** — failed after all retries → DLQ for manual review
4. **Separate producer and consumer** — never process in the same service that enqueues
5. **Job data must be serializable** — no class instances, only plain objects
6. **Monitor queue depth** — alert if queue grows beyond threshold
7. **Graceful shutdown** — finish current job before stopping
8. **No sensitive data in job payload** — pass IDs, not full records

## Dead Letter Queue

```typescript
// After max retries, move to DLQ
@OnQueueFailed()
async onFailed(job: Job, error: Error) {
  if (job.attemptsMade >= job.opts.attempts) {
    await this.dlqQueue.add('failed-payment', {
      originalJob: job.data,
      error: error.message,
      failedAt: new Date(),
    });
    this.logger.error(`Job ${job.id} moved to DLQ`, error.stack);
  }
}
```

## Scheduled / Deferred Tasks (Celery Beat)

```python
# settings.py — periodic tasks
CELERY_BEAT_SCHEDULE = {
    'cleanup-stale-orders': {
        'task': 'core.tasks.cleanup_stale_orders',
        'schedule': timedelta(hours=6),
    },
    'send-daily-digest': {
        'task': 'core.tasks.send_daily_digest',
        'schedule': crontab(hour=9, minute=0),  # 9 AM daily
    },
}

# Deferred one-off task
send_notification.apply_async(
    args=[event_name, data],
    eta=timezone.now() + timedelta(hours=1),  # Run 1 hour from now
)
```

### Rules for Scheduled Tasks
1. **Idempotent** — safe to run twice if scheduler fires duplicate
2. **Short-lived** — if >5 min, break into smaller tasks
3. **Monitored** — alert if task doesn't complete within expected window
4. **No overlapping** — use `solo` or lock to prevent concurrent runs
