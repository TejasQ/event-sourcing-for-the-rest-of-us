# Event Sourcing with Kafka and Next.js

This is a demo application that shows how to use Kafka as an event store and how to build a simple event sourcing application with Next.js.

## Getting Started

You'll need Docker, then run:

```bash
docker-compose up
```

This will start Kafka and Zookeeper. Then you can start the Next.js application:

```bash
npx next dev
```

You can find the traditional model at http://localhost:3000/traditional and the event sourcing model at http://localhost:3000/event-sourced.
