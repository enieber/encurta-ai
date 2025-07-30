FROM clux/muslrust:stable AS chef
USER root
RUN cargo install cargo-chef
WORKDIR /app

FROM chef AS planner
COPY Cargo.toml Cargo.lock ./
COPY src src/
COPY config config/
COPY migration migration/
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder
WORKDIR /app
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --target x86_64-unknown-linux-musl --recipe-path recipe.json

COPY Cargo.toml Cargo.lock ./
COPY src src/
COPY config config/
COPY migration migration/

RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid 10001 \
    "detetive"

RUN cargo build --target x86_64-unknown-linux-musl --release

FROM node:18-alpine AS front-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY frontend ./
RUN npm run build

# Limpar node_modules após build
RUN rm -rf node_modules

FROM scratch
WORKDIR /app

COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

USER detetive:detetive

COPY --from=front-builder /app/dist frontend/dist


COPY --from=builder /app/config config
COPY --from=builder /app/target/x86_64-unknown-linux-musl/release/encurta_ai encurta_ai

ENTRYPOINT ["/app/encurta_ai"]
