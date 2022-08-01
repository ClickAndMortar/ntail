all: build push

default: build

build:
	docker build --platform linux/amd64 -t clickandmortar/ntail:latest .

push:
	docker push clickandmortar/ntail:latest
