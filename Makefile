all: build push

default: build

build:
	docker build -t clickandmortar/ntail:latest .

push:
	docker push clickandmortar/ntail:latest
