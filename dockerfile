FROM rust:1.88.0-slim as builder

WORKDIR /usr/src/

COPY . .

RUN rustup target add x86_64-unknown-linux-musl && \
    apt update && \
    apt install -y musl-tools musl-dev && \
    update-ca-certificates


RUN apt-get update && apt-get install -y curl ca-certificates

# Install Node.js using the latest available version from NodeSource.
# In production, replace "setup_current.x" with a specific version
# to avoid unexpected breaking changes in future releases.
RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && \
    apt-get install -y nodejs
RUN cd frontend && npm install && npm run build


RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid 10001 \
    "detetive"

RUN cargo build --target x86_64-unknown-linux-musl --release

FROM scratch

WORKDIR /usr/app

COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

USER detetive:detetive

COPY --from=builder /usr/src/frontend/dist frontend/dist
COPY --from=builder /usr/src/frontend/dist/index.html frontend/dist/index.html
COPY --from=builder /usr/src/config config
COPY --from=builder /usr/src/target/x86_64-unknown-linux-musl/release/encurta_ai encurta_ai

expose 5150

ENTRYPOINT ["/usr/app/encurta_ai"]
