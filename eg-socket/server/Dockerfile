# 클라이언트 빌드 스테이지
FROM node:20-alpine as client-builder

WORKDIR /app

# 클라이언트 파일 복사 및 빌드
COPY client/package*.json client/
RUN cd client && npm install

COPY client/ client/
RUN cd client && npm run build

# 서버 빌드 및 실행 스테이지
FROM node:20-alpine

WORKDIR /app

# 서버 의존성 설치
COPY server/package*.json ./
RUN npm install

# 서버 소스 복사
COPY server/ ./

# 클라이언트 빌드 파일 복사
COPY --from=client-builder /app/client/dist ./public

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"] 