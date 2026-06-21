---
title: "MLflow로 머신러닝 실험 관리하기"
description: "하이퍼파라미터와 메트릭, 모델 아티팩트를 체계적으로 기록하는 MLflow Tracking의 기본 사용법을 정리합니다."
pubDate: "2026-06-02"
category: "mlops"
tags: ["MLflow", "MLOps", "실험관리"]
---

## "그때 그 모델, 어떤 설정이었지?"

머신러닝을 하다 보면 학습률을 바꾸고, 피처를 더하고, 데이터를 갈아끼우며 수십 번 실험합니다.
그러다 보면 **가장 성능 좋았던 실험의 설정을 잃어버리는** 일이 생깁니다.
[MLflow](https://mlflow.org/)는 이 실험들을 자동으로 기록해 줍니다.

## 기본 사용법

```python
import mlflow

mlflow.set_experiment("churn-prediction")

with mlflow.start_run():
    params = {"max_depth": 6, "n_estimators": 200}
    mlflow.log_params(params)

    model = train(params)
    acc = evaluate(model)

    mlflow.log_metric("accuracy", acc)
    mlflow.sklearn.log_model(model, "model")
```

`with mlflow.start_run()` 블록 안에서 기록한 파라미터·메트릭·모델은 모두 하나의 **run**으로 묶입니다.

## UI로 비교하기

```bash
mlflow ui
```

브라우저에서 `http://localhost:5000` 에 접속하면 실험들을 표로 비교하고,
메트릭 변화를 그래프로 확인할 수 있습니다. **여러 run을 나란히 놓고 비교**할 때 진가가 드러납니다.

## 모델 레지스트리

좋은 모델을 찾았다면 **Model Registry**에 등록해 `Staging` → `Production` 단계를 관리할 수 있습니다.
서빙 단계와 학습 단계를 느슨하게 연결해 주는 다리 역할을 합니다.

## 정리

- 실험은 기억이 아니라 **기록**으로 관리하세요.
- 파라미터·메트릭·아티팩트를 함께 남겨야 나중에 재현할 수 있습니다.
- 팀 단위라면 Tracking Server를 띄워 **공동 실험 저장소**로 쓰는 것을 추천합니다.
