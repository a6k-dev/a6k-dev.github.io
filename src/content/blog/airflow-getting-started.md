---
title: "Airflow로 데이터 파이프라인 오케스트레이션 시작하기"
description: "Apache Airflow의 핵심 개념(DAG, Operator, Task)을 정리하고, 첫 번째 DAG를 작성하는 과정을 살펴봅니다."
pubDate: "2026-06-18"
category: "data-engineering"
tags: ["Airflow", "오케스트레이션", "Python"]
---

## Airflow란

[Apache Airflow](https://airflow.apache.org/)는 워크플로를 **코드(Python)로 정의**하고
스케줄링·모니터링하는 오케스트레이션 도구입니다. 데이터 파이프라인을 cron + 셸 스크립트로
관리하다 보면 의존성, 재시도, 백필(backfill)에서 금방 한계를 만나는데, Airflow는 이 문제를
표준화된 방식으로 풀어줍니다.

## 핵심 개념

| 개념 | 설명 |
| --- | --- |
| **DAG** | 방향성 비순환 그래프. 파이프라인 전체를 나타냅니다. |
| **Task** | DAG를 구성하는 작업 단위. |
| **Operator** | Task가 *무엇을* 하는지 정의 (`PythonOperator`, `BashOperator` 등). |

## 첫 번째 DAG

```python
from airflow import DAG
from airflow.operators.python import PythonOperator
import pendulum


def extract():
    print("데이터를 추출합니다")


def transform():
    print("데이터를 변환합니다")


with DAG(
    dag_id="my_first_pipeline",
    schedule="0 9 * * *",  # 매일 오전 9시
    start_date=pendulum.datetime(2026, 1, 1, tz="Asia/Seoul"),
    catchup=False,
) as dag:
    t1 = PythonOperator(task_id="extract", python_callable=extract)
    t2 = PythonOperator(task_id="transform", python_callable=transform)

    t1 >> t2  # extract 다음에 transform
```

`t1 >> t2` 한 줄이 "extract가 끝나야 transform이 시작된다"는 의존성을 표현합니다.

## 실무 팁

- **멱등성(idempotency)**을 지키세요. 같은 Task를 두 번 실행해도 결과가 같아야 백필이 안전합니다.
- Task 간에는 큰 데이터를 직접 주고받지 말고 **외부 스토리지(S3, GCS)** 를 경유하세요.
- `catchup=False`를 기본으로 두면 과거 구간이 한꺼번에 실행되는 사고를 막을 수 있습니다.

다음 글에서는 dbt와 Airflow를 연결해 변환(Transform) 단계를 다뤄보겠습니다.
