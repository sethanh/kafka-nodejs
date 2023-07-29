let {KafkaConfig} = require('./config/kafk.config');

const kafkaConfig = new KafkaConfig();
kafkaConfig.consume("my-topic", (value) => {
  console.log("📨 Receive message: ", value);
});

const sendMessageToKafka = async (req, res) => {
    try {
      const { message } = req.body;
      const kafkaConfig = new KafkaConfig();
      const messages = [{ key: "key1", value: message }];
      kafkaConfig.produce("my-topic", messages);
  
      res.status(200).json({
        status: "Ok!",
        message: "Message successfully send!",
      });
    } catch (error) {
      console.log(error);
    }
  };