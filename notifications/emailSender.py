import smtplib
from email.mime.text import MIMEText

def send_email(to, subject, body):
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    smtp_user = 'deam10hw@gmail.com'
    smtp_password = 'uors jowd gfev tiyp'

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = smtp_user
    msg['To'] = to

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to, msg.as_string())
