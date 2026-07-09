# Base image that already has Deno installed
FROM denoland/deno:2.5.2

# Working directory inside the container
WORKDIR /app

# Copy the backend source code
COPY . .

# Cache Deno dependencies
RUN deno cache main.ts

# Generate Prisma Client
RUN deno task db:generate

# Start the application
CMD ["deno", "task", "start"]