FROM denoland/deno:2.5.2

WORKDIR /app

# Copy the application
COPY . .

# Cache dependencies
RUN deno cache main.ts

# Generate Prisma client
RUN deno task db:generate

# Document the listening port
EXPOSE 8002

# Start the application
CMD ["deno", "task", "start"]