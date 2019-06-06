build:
	cd ./dockerdeploy; \
	docker-compose build
dev:
	cd ./dockerdeploy; \
	docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml up 
test:
	cd ./dockerdeploy; \
	docker-compose -f ./docker-compose.yml -f ./docker-compose.test.yml up --exit-code-from backend
build-and-test:
	cd ./dockerdeploy; \
	docker-compose -f ./docker-compose.yml -f ./docker-compose.test.yml up --build --exit-code-from backend
db:
	cd ./dockerdeploy; \
	docker-compose -f ./docker-compose.db.yml up