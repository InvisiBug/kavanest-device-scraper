import { MqttClient } from "mqtt";
import { RadiatorStore, options } from "../database";

export default class RadiatorMonitor {
  client: MqttClient;
  topic: String;

  constructor(client: MqttClient) {
    this.client = client;
    this.topic = "Radiator";
  }

  async handleIncoming(topic: String, rawPayload: Object) {
    if (topic === "Radiator Monitor") {
      const inlet = parseFloat((JSON.parse(rawPayload.toString()).inlet - 0.56).toFixed(2));
      const outlet = parseFloat((JSON.parse(rawPayload.toString()).outlet - 0).toFixed(2));

      await RadiatorStore.findOneAndUpdate({ room: "ourRoom" }, { inlet, outlet }, options);
    }
  }
}
