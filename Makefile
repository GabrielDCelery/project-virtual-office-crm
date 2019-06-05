dev:
	cd ./docker
	docker-compose -f ./docker/docker-compose.yml up
test:
	cd ./docker
	docker-compose -f ./docker/docker-compose.yml -f ./docker/docker-compose.test.yml up --exit-code-from backend
build-and-test:
	cd ./docker
	docker-compose -f ./docker/docker-compose.yml -f ./docker/docker-compose.test.yml up --exit-code-from backend