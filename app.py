from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Email configuration (use environment variables in production)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = "your-email@gmail.com"
EMAIL_PASSWORD = "your-email-password"

@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        order = request.get_json()
        
        # Save order to database (in a real app)
        # db.orders.insert_one(order)
        
        # Send confirmation email
        send_order_confirmation(order)
        
        return jsonify({
            "status": "success",
            "message": "Order received",
            "orderId": order['orderId']
        }), 200
        
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

def send_order_confirmation(order):
    # Create email content
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = order['customer']['email']
    msg['Subject'] = f"Your Nasty Vapes Order #{order['orderId']}"
    
    # Create HTML email content
    items_html = "\n".join([
        f"<tr><td>{item['name']}</td><td>{item['quantity']}</td><td>R{item['price']}</td><td>R{item['price'] * item['quantity']}</td></tr>"
        for item in order['items']
    ])
    
    html = f"""
    <html>
        <body>
            <h1>Thank you for your order!</h1>
            <p>Hi {order['customer']['name']},</p>
            <p>Your order #{order['orderId']} has been received and is being processed.</p>
            
            <h2>Order Summary</h2>
            <table border="1" cellpadding="5" cellspacing="0">
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
                {items_html}
                <tr>
                    <td colspan="3">Shipping</td>
                    <td>R50.00</td>
                </tr>
                <tr>
                    <td colspan="3"><strong>Grand Total</strong></td>
                    <td><strong>R{order['total']}</strong></td>
                </tr>
            </table>
            
            <h2>Shipping Information</h2>
            <p>
                {order['customer']['address']}<br>
                Phone: {order['customer']['phone']}
            </p>
            
            <p>We'll notify you when your order ships. If you have any questions, please reply to this email.</p>
            
            <p>Thanks,<br>The Nasty Vapes Team</p>
        </body>
    </html>
    """
    
    msg.attach(MIMEText(html, 'html'))
    
    # Send email
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)

if __name__ == '__main__':
    app.run(debug=True, port=5000)