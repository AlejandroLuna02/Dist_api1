import amqp from "amqplib";
import express from "express";

const config = {
  protocol: "amqp",
  hostname: "54.204.104.121",
  port: 5672,
  username: "aleluna",
  password: "15082002",
};

export const loadRouter = express.Router();

loadRouter.get("/", async function loadEvent(req, res) {
  const conn = await amqp.connect(config);
  console.log("Conexión exitosa");
  const channel = await conn.createChannel();
  console.log("Canal creado exitosamente");
  const objeto = {
    id: 0,
    name: "ali",
    description: "alilopez",
    price: 150,
  };
  await channel.sendToQueue(
    "InitialEvent",
    Buffer.from(JSON.stringify(objeto))
  );
  console.log("Mensaje enviado");
  await channel.close();
  await conn.close();
  res.status(200).send("OK");
});
