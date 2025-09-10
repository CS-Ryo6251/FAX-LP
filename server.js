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

  try {
    const emailContent = `
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
        ${challenges.map(challenge => `<li>${challenge}</li>`).join('')}
      </ul>
      
      <h3>お問い合わせ内容</h3>
      <p>${message || 'なし'}</p>
    `;

    const data = await resend.emails.send({
      from: 'CareSpace <onboarding@resend.dev>',
      to: ['ryo.m6251@care-space.jp'], // Resendの制限により、検証済みメールアドレスに送信
      subject: `【CareSpace】新規お問い合わせ - ${companyName} ${name}様`,
      html: emailContent,
      reply_to: email
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});