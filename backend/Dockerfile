FROM denoland/deno:2.5.2

WORKDIR /app

# Copy the application
COPY . .

# Generate Prisma client
RUN deno task db:generate

# Cache dependencies
RUN deno cache main.ts

# Document the listening port
EXPOSE 8002

# Start the application
CMD ["deno", "task", "start"]