import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "todo-app",
    brokers: ["localhost:9092"],
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "todo-group" });