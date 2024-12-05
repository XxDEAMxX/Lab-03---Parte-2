import json
import time
from kafkaConfig import create_consumer
from emailSender import send_email

print("Iniciando consumidor...")

def start_consumer():
    while True:  # Bucle infinito para intentos de reconexión
        try:
            consumer = create_consumer('counter', 'notifications-group')
            print("Consumidor creado con éxito.")
            
            for message in consumer:
                try:
                    event = message.value
                    print(f"Recibido evento: {event}")

                    user_data = event.get('userData', {})
                    movie_data = event.get('movie', {})
                    if user_data.get('age') is None or movie_data.get('title') is None:
                        print("Evento con datos incompletos. Saltando...")
                        continue

                    if user_data['age'] < 18:
                        print(f"Enviando correo a {user_data['email']} usuario {user_data['name']} vio la película: '{movie_data['title']}'")
                        try:
                            send_email(
                                to=user_data['email'],
                                subject="Notificación de película",
                                body=f"El usuario {user_data['name']} seleccionó la película '{movie_data['title']}'."
                            )
                            print(f"Correo enviado a {user_data['email']}.")
                        except Exception as e:
                            print(f"Error al enviar el correo: {e}")
                except KeyError as ke:
                    print(f"Clave faltante en el evento: {ke}")
                except Exception as e:
                    print(f"Error al procesar el mensaje: {e}")
        except Exception as e:
            print(f"Error al crear el consumidor: {e}")
            print("Reintentando en 5 segundos...")
            time.sleep(5)  # Espera antes de reintentar la conexión

if __name__ == "__main__":
    try:
        start_consumer()
    except KeyboardInterrupt:
        print("Proceso interrumpido manualmente. Saliendo...")
