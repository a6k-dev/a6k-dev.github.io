---
title: "데이터 엔지니어를 위한 Python 팁 5가지"
description: "대용량 데이터를 다룰 때 유용한 제너레이터, 타입 힌트, 데이터클래스 등 실무에서 자주 쓰는 Python 패턴을 모았습니다."
pubDate: "2026-05-25"
category: "development"
tags: ["Python", "데이터엔지니어링", "팁"]
---

데이터 파이프라인 코드를 짜면서 반복적으로 유용했던 Python 패턴을 정리합니다.

## 1. 제너레이터로 메모리 아끼기

큰 파일을 `readlines()`로 통째로 읽으면 메모리가 폭발합니다. 제너레이터로 한 줄씩 흘려보내세요.

```python
def read_rows(path):
    with open(path) as f:
        for line in f:
            yield line.strip().split(",")

for row in read_rows("huge.csv"):  # 한 줄씩만 메모리에
    process(row)
```

## 2. 타입 힌트로 파이프라인 계약 명시

```python
from typing import Iterator

def parse(rows: Iterator[list[str]]) -> Iterator[dict]:
    for row in rows:
        yield {"id": int(row[0]), "name": row[1]}
```

함수 시그니처만 봐도 입출력이 보이면 협업과 디버깅이 훨씬 쉬워집니다.

## 3. dataclass로 레코드 표현

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Event:
    user_id: int
    action: str
    ts: float
```

`frozen=True`로 불변 객체를 만들면 파이프라인 중간에서 값이 바뀌는 사고를 막을 수 있습니다.

## 4. pathlib 쓰기

```python
from pathlib import Path

for f in Path("data").glob("*.parquet"):
    print(f.stem)
```

문자열로 경로를 조합하는 것보다 안전하고 OS 독립적입니다.

## 5. 재시도는 데코레이터로

```python
import time
from functools import wraps

def retry(times=3, delay=1):
    def deco(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            for i in range(times):
                try:
                    return fn(*args, **kwargs)
                except Exception:
                    if i == times - 1:
                        raise
                    time.sleep(delay * (2 ** i))  # 지수 백오프
        return wrapper
    return deco

@retry(times=5)
def call_flaky_api():
    ...
```

네트워크 호출처럼 가끔 실패하는 작업에 붙여두면 파이프라인 안정성이 크게 올라갑니다.
