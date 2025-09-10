import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_BhwqaPRA_2XWHLYH57U7VdXJePeiJ9Gv8';
const resend = new Resend(RESEND_API_KEY);

async function testAlternativeEmails() {
  console.log('📧 Testing email delivery to different addresses...');
  
  const testEmails = [
    'ryo.m6251@care-space.jp', // Original recipient  
    'test@gmail.com', // Test Gmail (if you have access)
    'test@yahoo.com', // Test Yahoo (if you have access)
    // Add your personal email addresses here for testing
  ];
  
  for (const emailAddress of testEmails) {
    try {
      console.log(`\n📤 Sending to: ${emailAddress}`);
      
      const result = await resend.emails.send({
        from: 'CareSpace <noreply@carespace.jp>',
        to: [emailAddress],
        subject: `Test Email Delivery - ${new Date().toISOString()}`,
        html: `
          <h1>Email Delivery Test</h1>
          <p>This email was sent to: <strong>${emailAddress}</strong></p>
          <p>Timestamp: ${new Date().toISOString()}</p>
          <p>If you receive this email, delivery is working correctly.</p>
        `,
      });
      
      console.log(`✅ Sent successfully! ID: ${result.data.id}`);
      
    } catch (error) {
      console.error(`❌ Failed to send to ${emailAddress}:`, error.message);
    }
  }
  
  console.log('\n💡 Check your email inboxes (including spam folders) for these test emails.');
  console.log('💡 This will help identify if the issue is specific to one email address.');
}

testAlternativeEmails();