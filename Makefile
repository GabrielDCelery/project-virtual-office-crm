dev:
	cd ./dockerdeploy; \
	docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml up 
test:
	docker exec -it -e APP_PORT=8081 pvoc_backend npm run test