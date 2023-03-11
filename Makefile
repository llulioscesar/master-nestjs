PHONY: docker-up
docker-up:
	make generate-env-back
	make node-install-backend
	make node-install-frontend
	docker-compose up -d

PHONY: generate-env-back
generate-env-back:
	cp backend/.env.example backend/apps/accounts/.env
	cp backend/.env.example backend/apps/publications/.env
	cp frontend/.env.example frontend/.env
	sed -E -i '' 's/^(DB_DATABASE=)(.*)/\1publications/' backend/apps/publications/.env
	sed -E -i '' 's/^(REACT_APP_URL_API_ACCOUNTS=)(.*)/\1http:\/\/localhost:3000/' frontend/.env
	sed -E -i '' 's/^(REACT_APP_URL_API_PUBLICATIONS=)(.*)/\1http:\/\/localhost:3001/' frontend/.env

PHONY: node-install-backend
node-install-backend:
	cd backend && npm install

PHONY: node-install-frontend
node-install-frontend:
	cd frontend && npm install
