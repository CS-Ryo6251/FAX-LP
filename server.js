import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
// Use environment variable or fallback to hardcoded key (for development only)
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_BhwqaPRA_2XWHLYH57U7VdXJePeiJ9Gv8';
const resend = new Resend(RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  console.log('=== EMAIL SEND REQUEST ===');
  console.log('API Key:', RESEND_API_KEY ? `${RESEND_API_KEY.substring(0, 10)}...` : 'NOT SET');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  const {
    companyName,
    facilityName,
    name,
    email,
    phone,
    serviceType,
    challenges,
    message
  } = req.body;

  // Validate required fields
  if (!companyName || !name || !email || !challenges) {
    console.error('Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 管理者向けメール内容
    const adminEmailContent = `
      <h2>新しいお問い合わせがありました</h2>
      
      <h3>お客様情報</h3>
      <p><strong>会社名:</strong> ${companyName}</p>
      <p><strong>事業所名:</strong> ${facilityName}</p>
      <p><strong>お名前:</strong> ${name}</p>
      <p><strong>メールアドレス:</strong> ${email}</p>
      <p><strong>電話番号:</strong> ${phone}</p>
      
      <h3>サービス情報</h3>
      <p><strong>サービス種別:</strong> ${serviceType || '未選択'}</p>
      
      <h3>解決したい業務の課題</h3>
      <ul>
        ${Array.isArray(challenges) ? challenges.map(challenge => `<li>${challenge}</li>`).join('') : '<li>データなし</li>'}
      </ul>
      
      <h3>お問い合わせ内容</h3>
      <p>${message || 'なし'}</p>
    `;

    // お客様向け確認メール内容
    const customerEmailContent = `
      <div style="font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #dc2626; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">CareSpace</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 14px;">介護施設向けFAX・メール送信サービス</p>
        </div>
        
        <div style="padding: 40px 30px; background-color: #ffffff;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px;">お問い合わせありがとうございます</h2>
          
          <p style="color: #4b5563; line-height: 1.8; margin-bottom: 30px;">
            ${name}様<br><br>
            この度は、CareSpaceへお問い合わせいただき、誠にありがとうございます。<br>
            お問い合わせ内容を確認次第、担当者より1〜3営業日以内にご連絡させていただきます。
          </p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #1f2937; font-size: 18px; margin-top: 0;">お問い合わせ内容</h3>
            <p style="color: #4b5563; margin: 10px 0;"><strong>会社名:</strong> ${companyName}</p>
            <p style="color: #4b5563; margin: 10px 0;"><strong>事業所名:</strong> ${facilityName}</p>
            <p style="color: #4b5563; margin: 10px 0;"><strong>サービス種別:</strong> ${serviceType || '未選択'}</p>
            <p style="color: #4b5563; margin: 10px 0;"><strong>お問い合わせ内容:</strong><br>${message || 'なし'}</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 12px; margin-bottom: 30px; text-align: center;">
            <h3 style="color: white; font-size: 20px; margin-top: 0; margin-bottom: 15px;">
              🎁 無料AI診断ツールのご案内
            </h3>
            <p style="color: white; line-height: 1.8; margin-bottom: 20px;">
              介護施設の業務効率化を無料でAIが診断！<br>
              あなたの施設に最適な改善提案をお届けします
            </p>
            <a href="https://ai-diagnosis-mu.vercel.app/" 
               style="display: inline-block; background-color: white; color: #764ba2; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; font-size: 16px;">
              無料で診断を始める →
            </a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
              ※このメールは送信専用アドレスから送信されています。<br>
              ご返信いただいてもお答えできませんのでご了承ください。
            </p>
          </div>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px 30px; text-align: center;">
          <p style="color: #6b7280; font-size: 12px; margin: 5px 0;">
            株式会社CARESPACE<br>
            〒150-0002 東京都渋谷区渋谷2-19-15<br>
            宮益坂ビルディング609<br>
            TEL: 050-3503-7876
          </p>
        </div>
      </div>
    `;

    console.log('Sending emails with Resend...');
    
    // 管理者へメール送信
    const adminEmail = await resend.emails.send({
      from: 'CareSpace <noreply@carespace.jp>',
      to: ['info@care-space.jp'],
      subject: `【CareSpace】新規お問い合わせ - ${companyName} ${name}様`,
      html: adminEmailContent,
      reply_to: email
    });

    console.log('✅ Admin email sent successfully');

    // お客様へ確認メール送信
    const customerEmail = await resend.emails.send({
      from: 'CareSpace <noreply@carespace.jp>',
      to: [email],
      subject: '【CareSpace】お問い合わせを受け付けました',
      html: customerEmailContent
    });

    console.log('✅ Customer confirmation email sent successfully');
    console.log('Resend response:', JSON.stringify({ admin: adminEmail, customer: customerEmail }, null, 2));

    res.status(200).json({ 
      success: true, 
      data: {
        admin: adminEmail,
        customer: customerEmail
      }
    });
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      status: error.status,
      response: error.response?.data
    });
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message,
      errorCode: error.status || error.code
    });
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});