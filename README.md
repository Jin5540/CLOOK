# CLOOK

CLOOK는 사용자의 위치를 기반으로 날씨 정보와 시간을 제공하는 웹 애플리케이션입니다. 간단하고 직관적인 UI를 통해 실시간 날씨와 지역 정보를 확인할 수 있습니다.

## 🧩 주요 기능

- 사용자 위치 기반 날씨 정보 제공
- 실시간 지역 시간 표시
- 반응형 웹 디자인
- 날씨에 따른 캐릭터 변화
- 백엔드(Spring Boot)와 프론트엔드(React)의 통합

## 🛠 기술 스택

### 프론트엔드
- HTML/CSS/JavaScript
- React
- yarn/npm 기반 의존성 관리

### 백엔드
- Spring Boot
- Gradle 빌드 도구
- REST API 통신

### 기타
- OpenWeather API 또는 위치 기반 API 사용 가능성 있음
- Git으로 버전 관리
- token 디렉토리로 보아 민감 정보는 별도 관리

## 📁 프로젝트 구조

```
CLOOK/
├── src/                 # 소스 코드 디렉토리
├── token/               # 토큰 등 민감 정보 저장
├── node_modules/        # 프론트엔드 패키지들
├── build.gradle         # Gradle 설정
├── package.json         # 프론트엔드 의존성 설정
├── README.md            # 프로젝트 소개 파일
└── ...
```

## ⚙️ 실행 방법

### 프론트엔드
```bash
cd CLOOK
yarn install
yarn start
```

### 백엔드
```bash
./gradlew build
./gradlew bootRun
```

## 📌 주의 사항

- `token/` 디렉토리는 `.gitignore`로 관리되고 있으며, API 키 등 민감 정보를 담고 있을 수 있습니다. 별도로 `.env` 또는 `application.properties` 파일을 작성해야 할 수 있습니다.

## 📄 라이선스

해당 프로젝트는 별도 명시된 라이선스가 없는 경우 MIT 라이선스를 따릅니다.




