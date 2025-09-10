import { Resend } from 'resend';

// Test script to verify Resend configuration and identify issues
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_BhwqaPRA_2XWHLYH57U7VdXJePeiJ9Gv8';
const resend = new Resend(RESEND_API_KEY);

async function testResendConfiguration() {
  console.log('🔍 Testing Resend API Configuration...');
  console.log('API Key:', RESEND_API_KEY ? `${RESEND_API_KEY.substring(0, 10)}...` : 'NOT SET');
  
  try {
    // Test 1: Verify API key by getting domains
    console.log('\n📋 Test 1: Getting verified domains...');
    const domains = await resend.domains.list();
    console.log('✅ Domains:', JSON.stringify(domains, null, 2));
    
    // Test 2: Send a test email
    console.log('\n📧 Test 2: Sending test email...');
    const testEmailData = {
      from: 'CareSpace <noreply@carespace.jp>',
      to: ['ryo.m6251@care-space.jp'],
      subject: 'Test Email from Resend API',
      html: '<h1>Test Email</h1><p>This is a test email to verify Resend configuration.</p>',
    };
    
    console.log('Email config:', JSON.stringify(testEmailData, null, 2));
    
    const result = await resend.emails.send(testEmailData);
    console.log('✅ Email sent successfully!');
    console.log('Result:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('❌ Error occurred:');
    console.error('Message:', error.message);
    console.error('Status:', error.status);
    console.error('Response:', error.response?.data || 'No response data');
    console.error('Full error:', error);
    
    // Provide debugging suggestions based on error
    if (error.message.includes('Invalid API key')) {
      console.log('\n💡 Suggestion: Your API key is invalid or expired. Please check your Resend dashboard.');
    } else if (error.message.includes('domain')) {
      console.log('\n💡 Suggestion: Domain verification issue. Make sure carespace.jp is verified in Resend.');
    } else if (error.message.includes('not verified')) {
      console.log('\n💡 Suggestion: Email address not verified. In Resend sandbox mode, you can only send to verified email addresses.');
    }
  }
}

testResendConfiguration();