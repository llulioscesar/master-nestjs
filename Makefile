PHONY: docker-up
docker-up:
	make generate-env-back
	docker-compose build --no-cache
	docker-compose up -d


PHONY: generate-env-back
generate-env-back:
	cp backend/.env.example backend/apps/accounts/.env
	cp backend/.env.example backend/apps/publications/.env
	sed -E -i '' 's/^(DB_DATABASE=)(.*)/\1publications/' backend/apps/publications/.env
