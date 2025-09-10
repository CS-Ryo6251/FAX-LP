import { Resend } from 'resend';

// Test with Gmail address to verify delivery
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_BhwqaPRA_2XWHLYH57U7VdXJePeiJ9Gv8';
const resend = new Resend(RESEND_API_KEY);

async function testGmailDelivery() {
  console.log('📧 Testing email delivery to Gmail...\n');
  
  // Replace with your Gmail address for testing
  const testGmailAddress = 'ryomail.0501@gmail.com'; // ← ここをGmailアドレスに変更してください
  
  try {
    const result = await resend.emails.send({
      from: 'CareSpace <noreply@carespace.jp>',
      to: [testGmailAddress],
      subject: '【テスト】CareSpace メール配信確認',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>メール配信テスト</h2>
          <p>このメールが届いていれば、Resend APIは正常に動作しています。</p>
          <hr />
          <p><strong>送信元:</strong> noreply@carespace.jp</p>
          <p><strong>送信時刻:</strong> ${new Date().toLocaleString('ja-JP')}</p>
          <p><strong>API:</strong> Resend</p>
        </div>
      `,
    });
    
    console.log('✅ メール送信成功！');
    console.log('Email ID:', result.data.id);
    console.log('\n📬 以下を確認してください:');
    console.log('1. 受信トレイ');
    console.log('2. 迷惑メールフォルダ');
    console.log('3. プロモーションタブ（Gmailの場合）');
    
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    if (error.response) {
      console.error('詳細:', error.response.data);
    }
  }
}

// 実行
console.log('⚠️  注意: test-gmail.jsの11行目のメールアドレスを変更してから実行してください\n');
testGmailDelivery();