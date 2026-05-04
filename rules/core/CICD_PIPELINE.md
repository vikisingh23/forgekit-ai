# CI/CD Pipeline Standards

## Pipeline Stages

```
lint → build → test → security-scan → deploy-staging → deploy-production
```

### Stage Rules
| Stage | Trigger | Gate |
|-------|---------|------|
| Lint | Every push | Auto — fail fast |
| Build | Every push | Auto |
| Test | Every push | Auto — min 80% coverage |
| Security Scan | Every MR | Auto — no critical/high vulns |
| Deploy Staging | Merge to develop | Auto |
| Deploy Production | Merge to main | Manual approval |

## GitLab CI Template

```yaml
stages: [lint, build, test, security, deploy]

variables:
  NODE_IMAGE: node:20-alpine
  DOCKER_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA

lint:
  stage: lint
  script:
    - npm ci
    - npm run lint
  rules:
    - if: $CI_MERGE_REQUEST_IID

build:
  stage: build
  script:
    - docker build -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE
  rules:
    - if: $CI_COMMIT_BRANCH == "main" || $CI_COMMIT_BRANCH == "develop"

test:
  stage: test
  script:
    - npm ci
    - npm run test:cov
  coverage: '/Statements\s*:\s*(\d+\.?\d*)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

deploy-staging:
  stage: deploy
  environment: staging
  script: [deploy script]
  rules:
    - if: $CI_COMMIT_BRANCH == "develop"

deploy-production:
  stage: deploy
  environment: production
  script: [deploy script]
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      when: manual
```

## Rules

1. **No direct deploy to production** — always through pipeline
2. **MR required** — no direct push to main/develop
3. **Tests must pass** — no merge with failing tests
4. **Coverage threshold** — minimum 80% for new code
5. **Security scan** — no critical vulnerabilities allowed
6. **Rollback plan** — every deploy must have a rollback strategy
7. **Deploy freeze** — no deploys on Fridays or month-end (financial services)
8. **Artifacts** — store build artifacts, test reports, coverage reports

## Branch → Environment Mapping

| Branch | Environment | Deploy |
|--------|-------------|--------|
| `feature/*` | — | Lint + Test only |
| `develop` | Staging | Auto |
| `main` | Production | Manual approval |
| `hotfix/*` | Production | Fast-track (still needs approval) |
