# Environment & Configuration Standards

## Environment Files

```
.env                    # Local defaults (gitignored)
.env.example            # Template with all keys (committed)
.env.development        # Dev overrides (gitignored)
.env.staging            # Staging (gitignored)
.env.production         # Production (gitignored, managed by DevOps)
```

### Rules
- `.env.example` MUST be committed — lists every required variable with placeholder values
- Real `.env` files MUST be gitignored
- Never commit secrets, tokens, or passwords
- Use descriptive variable names: `DATABASE_CONNECTION_STRING` not `DB_STR`

## Configuration Validation

### NestJS
```typescript
// Validate at startup with Joi
@Module({
  imports: [ConfigModule.forRoot({
    validationSchema: Joi.object({
      DATABASE_URL: Joi.string().required(),
      JWT_SECRET: Joi.string().min(32).required(),
      REDIS_URL: Joi.string().required(),
      PORT: Joi.number().default(3000),
    }),
  })],
})
```

### .NET
```csharp
// Validate at startup with IOptions
services.AddOptions<DatabaseConfig>()
    .BindConfiguration("Database")
    .ValidateDataAnnotations()
    .ValidateOnStart();
```

### React / React Native
```typescript
// Validate at build time
const config = {
  apiUrl: import.meta.env.VITE_API_URL ?? throwError('VITE_API_URL required'),
  environment: import.meta.env.VITE_ENV ?? 'development',
};
```

## Secret Management

| Environment | Method |
|-------------|--------|
| Local dev | `.env` file (gitignored) |
| CI/CD | Pipeline variables (masked) |
| Staging/Prod | Vault / AWS Secrets Manager / Azure Key Vault |

### Rules
- No secrets in code, config files, or logs
- Rotate secrets quarterly
- Use separate secrets per environment
- Mask secrets in CI/CD output
- Use `IDataProtector` (.NET) or encryption for PII at rest

## Feature Flags

```typescript
// Use environment variables for simple flags
const FEATURES = {
  newDashboard: process.env.FEATURE_NEW_DASHBOARD === 'true',
  betaPayments: process.env.FEATURE_BETA_PAYMENTS === 'true',
};
```

- Feature flags for all new features in production
- Remove flag + dead code within 2 sprints of full rollout
- Never nest feature flags
