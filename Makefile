all: build push manifest

default: build

build:
	docker build --platform linux/amd64 -t clickandmortar/ntail-amd64:latest .
	docker build --platform linux/arm64 -t clickandmortar/ntail-arm:latest .

push:
	docker push clickandmortar/ntail-amd64:latest
	docker push clickandmortar/ntail-arm:latest

manifest:
	docker manifest create clickandmortar/ntail:latest \
		clickandmortar/ntail-amd64:latest \
		clickandmortar/ntail-arm:latest
	docker manifest annotate clickandmortar/ntail:latest clickandmortar/ntail-arm:latest --arch arm
	docker manifest annotate clickandmortar/ntail:latest clickandmortar/ntail-amd64:latest --arch amd64
	docker manifest push clickandmortar/ntail:latest
