# Create a new builder
docker buildx create --use
docker buildx build \
	--no-cache \
	--platform linux/amd64 \
	--push \
	--pull \
	-t davidoduneye/productivity:latest .
