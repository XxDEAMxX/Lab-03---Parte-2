import json
from kafkaConfig import create_consumer
from emailSender import send_email

def start_consumer():
    consumer = create_consumer('show-interactions', 'notifications-group')

    for message in consumer:
        event = message.value
        if event['age'] < 18:
            send_email(
                to=event['email'],
                subject="Notificación de película",
                body=f"El usuario {event['userName']} seleccionó la película '{event['movieName']}'."
            )
            print(f"Correo enviado a {event['email']}.")

if __name__ == "__main__":
    start_consumer()
