from kafka import KafkaConsumer

def create_consumer(topic, group_id):
    return KafkaConsumer(
        topic,
        bootstrap_servers=['localhost:9092'],
        group_id=group_id,
        value_deserializer=lambda x: json.loads(x.decode('utf-8'))
    )
