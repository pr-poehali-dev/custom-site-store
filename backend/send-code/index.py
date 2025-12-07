import json
import os
import random
import smtplib
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Отправляет код подтверждения на email или телефон
    Args: event - dict с httpMethod, body (contact, method)
          context - объект с атрибутами request_id и др.
    Returns: HTTP response dict с кодом
    """
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    contact = body_data.get('contact', '')
    auth_method = body_data.get('method', 'email')
    
    if not contact:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Contact is required'}),
            'isBase64Encoded': False
        }
    
    code = str(random.randint(100000, 999999))
    
    try:
        if auth_method == 'email':
            send_email_code(contact, code)
        else:
            send_sms_code(contact, code)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': f'Код отправлен на {contact}',
                'code': code
            }),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': str(e)
            }),
            'isBase64Encoded': False
        }

def send_email_code(email: str, code: str) -> None:
    smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    
    if not smtp_user or not smtp_password:
        raise ValueError('SMTP credentials not configured')
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'Код подтверждения WebStudio'
    msg['From'] = smtp_user
    msg['To'] = email
    
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">WebStudio</h1>
        </div>
        <div style="padding: 40px; background: #f9f9f9;">
          <h2 style="color: #333;">Ваш код подтверждения</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="color: #666; margin-bottom: 10px;">Введите этот код для входа:</p>
            <h1 style="color: #8B5CF6; font-size: 48px; margin: 20px 0; letter-spacing: 8px;">{code}</h1>
          </div>
          <p style="color: #666; font-size: 14px;">Код действителен в течение 10 минут.</p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">Если вы не запрашивали код, просто проигнорируйте это письмо.</p>
        </div>
      </body>
    </html>
    """
    
    part = MIMEText(html, 'html', 'utf-8')
    msg.attach(part)
    
    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)

def send_sms_code(phone: str, code: str) -> None:
    api_key = os.environ.get('SMS_API_KEY', '')
    
    if not api_key:
        raise ValueError('SMS API key not configured')
    
    clean_phone = ''.join(filter(str.isdigit, phone))
    
    message = f'Ваш код подтверждения WebStudio: {code}'
    
    response = requests.post(
        'https://sms.ru/sms/send',
        data={
            'api_id': api_key,
            'to': clean_phone,
            'msg': message,
            'json': 1
        },
        timeout=10
    )
    
    result = response.json()
    
    if result.get('status') != 'OK':
        raise ValueError(f"SMS sending failed: {result.get('status_text', 'Unknown error')}")
