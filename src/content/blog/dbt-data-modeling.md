---
title: "dbt로 데이터 웨어하우스 모델링하기"
description: "SQL만으로 데이터 변환 파이프라인을 구축하는 dbt의 기본 개념과 모델, 테스트, 문서화를 정리합니다."
pubDate: "2026-06-12"
category: "data-engineering"
tags: ["dbt", "SQL", "데이터모델링"]
---

## dbt가 푸는 문제

데이터 웨어하우스에 적재된 raw 데이터를 분석용 테이블로 가공하는 **T(Transform)** 단계는
보통 거대한 SQL 뭉치로 끝나기 쉽습니다. [dbt](https://www.getdbt.com/)는 이 SQL에
**버전 관리, 의존성 관리, 테스트, 문서화**를 입혀 소프트웨어 엔지니어링 관점으로 다룰 수 있게 합니다.

## 모델은 그냥 SELECT 문

dbt에서 모델(model)은 하나의 `.sql` 파일이고, 내용은 평범한 `SELECT` 입니다.

```sql
-- models/staging/stg_orders.sql
select
    id as order_id,
    user_id,
    status,
    created_at
from {{ source('raw', 'orders') }}
where created_at >= '2026-01-01'
```

`{{ ref(...) }}`로 다른 모델을 참조하면 dbt가 **실행 순서(DAG)** 를 자동으로 계산합니다.

```sql
-- models/marts/daily_orders.sql
select
    date_trunc('day', created_at) as order_date,
    count(*) as order_count
from {{ ref('stg_orders') }}
group by 1
```

## 테스트로 데이터 품질 지키기

```yaml
# models/staging/schema.yml
models:
  - name: stg_orders
    columns:
      - name: order_id
        tests:
          - unique
          - not_null
```

`dbt test` 한 번으로 "order_id는 유일하고 NULL이 없어야 한다"는 계약을 검증합니다.
파이프라인이 깨졌을 때 **데이터가 잘못 쌓이기 전에** 알아챌 수 있다는 게 핵심입니다.

## 자주 쓰는 명령어

```bash
dbt run      # 모델 빌드
dbt test     # 데이터 테스트
dbt docs generate && dbt docs serve  # 문서 + 리니지 그래프
```

dbt의 가장 큰 매력은 `dbt docs`가 만들어주는 **데이터 리니지 그래프**입니다.
어떤 테이블이 무엇으로부터 파생됐는지 한눈에 보이죠.
