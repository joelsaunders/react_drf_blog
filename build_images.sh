#!/usr/bin/env bash
set -e

# Also set up tags here for local building, should be the same as env vars exported in circle.yml
export COMMIT=`git rev-parse HEAD`
export BASE_TAG="joelsaunders91"

export FRONTEND_TAG=$BASE_TAG/thebookofjoel-frontend:$COMMIT
export BACKEND_TAG=$BASE_TAG/thebookofjoel-backend:$COMMIT
export NGINX_TAG=$BASE_TAG/thebookofjoel-nginx:$COMMIT

echo "building frontend image"
docker build -t $FRONTEND_TAG -q ./frontend
rm -rf nginx/www
mkdir -p nginx/www/src
cp -a frontend/src/style nginx/www/src
cp -a frontend/index.html nginx/www
cp -a frontend/favicon.ico nginx/www
docker run --entrypoint cat --rm $FRONTEND_TAG /code/dist/bundle.js > nginx/www/bundle.js
echo "frontend build finished"
echo "$FRONTEND_TAG"

echo "building backend image"
docker build -t $BACKEND_TAG -q ./backend
export id=$(sudo docker run -d $BACKEND_TAG)
mkdir -p nginx/www/static
docker cp $id:/code/main/static nginx/www/
# sudo mv nginx/www/staticfiles nginx/www/static
docker stop $id
echo "finished building backend image"
echo "$BACKEND_TAG"

echo "building nginx image"
docker build -t $NGINX_TAG -q ./nginx
echo "finished building nginx image"
echo "$NGINX_TAG"

if [ "$1" == "deploy" ]; then
    echo "Pushing images to registry"
    docker push $BACKEND_TAG
    docker push $NGINX_TAG
    echo "adding tags to kubectl"
    sed -i "s#image: backend#image: ${BACKEND_TAG}#" ./k8s/deployment.yaml
    sed -i "s#image: nginx#image: ${NGINX_TAG}#" ./k8s/deployment.yaml
    kubectl apply -Rf .
fi
