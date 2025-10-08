export function createWelcomeEmailTemplate(name,clientURL){
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Chat-it</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 50px 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.3; }
        }
        
        .logo {
            font-size: 32px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
        }
        
        .header-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 50px 40px;
        }
        
        .welcome-badge {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 8px 20px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        h1 {
            font-size: 32px;
            color: #1a1a1a;
            margin-bottom: 20px;
            font-weight: 700;
        }
        
        .intro-text {
            font-size: 16px;
            color: #666;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0 30px 0;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }
        
        .feature-card {
            background: #f8f9ff;
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
        }
        
        .feature-icon {
            font-size: 36px;
            margin-bottom: 10px;
        }
        
        .feature-title {
            font-size: 14px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 5px;
        }
        
        .feature-desc {
            font-size: 12px;
            color: #666;
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
            margin: 40px 0;
        }
        
        .tips {
            background: #f8f9ff;
            padding: 30px;
            border-radius: 12px;
            border-left: 4px solid #667eea;
        }
        
        .tips-title {
            font-size: 18px;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 15px;
        }
        
        .tips ul {
            list-style: none;
            padding-left: 0;
        }
        
        .tips li {
            padding: 8px 0;
            color: #666;
            font-size: 14px;
            position: relative;
            padding-left: 25px;
        }
        
        .tips li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #667eea;
            font-weight: bold;
        }
        
        .footer {
            background: #f5f5f5;
            padding: 40px;
            text-align: center;
        }
        
        .social-links {
            margin: 20px 0;
        }
        
        .social-links a {
            display: inline-block;
            width: 40px;
            height: 40px;
            margin: 0 8px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 50%;
            line-height: 40px;
            transition: all 0.3s ease;
        }
        
        .social-links a:hover {
            background: #764ba2;
            transform: scale(1.1);
        }
        
        .footer-text {
            font-size: 12px;
            color: #999;
            margin-top: 20px;
        }
        
        .footer-text a {
            color: #667eea;
            text-decoration: none;
        }
        
        @media (max-width: 600px) {
            .content {
                padding: 30px 20px;
            }
            
            h1 {
                font-size: 24px;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">Chat-it</div>
            <div class="header-subtitle">Your Journey Starts Here</div>
        </div>
        
        <div class="content">
            <span class="welcome-badge">Welcome Aboard</span>
            <h1>Hey there, ${name}! 👋</h1>
            <p class="intro-text">
                We're absolutely thrilled to have you join our community! You've just taken the first step towards something amazing, and we couldn't be more excited to have you with us.
            </p>
            
            <a href=${clientURL} class="cta-button">Get Started Now</a>
            
            <div class="features">
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <div class="feature-title">Fast Setup</div>
                    <div class="feature-desc">Get up and running in minutes</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔒</div>
                    <div class="feature-title">Secure</div>
                    <div class="feature-desc">Your data is protected</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">💬</div>
                    <div class="feature-title">24/7 Support</div>
                    <div class="feature-desc">We're here to help</div>
                </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="tips">
                <div class="tips-title">Quick Tips to Get Started:</div>
                <ul>
                    <li>Complete your profile to unlock all features</li>
                    <li>Explore our interactive tutorial</li>
                    <li>Connect with other members in the community</li>
                    <li>Check out our resource center for guides and tips</li>
                </ul>
            </div>
            
            <p class="intro-text" style="margin-top: 30px;">
                If you have any questions or need assistance, our support team is always ready to help. Just hit reply to this email or visit our help center.
            </p>
            
            <p class="intro-text">
                <strong>Welcome to the family!</strong><br>
                The YourBrand Team
            </p>
        </div>
        
        <div class="footer">
            <div class="social-links">
                <a href="#">f</a>
                <a href="#">t</a>
                <a href="#">in</a>
                <a href="#">ig</a>
            </div>
            <div class="footer-text">
                © 2025 YourBrand. All rights reserved.<br>
                123 Main Street, City, Country<br>
                <a href="#">Unsubscribe</a> | <a href="#">Privacy Policy</a> | <a href="#">Contact Us</a>
            </div>
        </div>
    </div>
</body>
</html>`
}