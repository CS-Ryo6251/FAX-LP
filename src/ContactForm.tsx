import React, { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, X } from 'lucide-react';
import { EMAILJS_CONFIG } from './emailjs-config';

interface FormData {
  companyName: string;
  facilityName: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  challenges: string[];
  message: string;
}

interface ContactFormProps {
  onClose?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    facilityName: '',
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    challenges: [],
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const challengeOptions = [
    '提供票の発送作業を効率化したい',
    '関係先への情報共有を効率化したい',
    'ファイリングなど事務作業を軽減したい',
    'ペーパーレス化を進めたい',
    'コストを下げたい',
    'DXを進めたい',
    'スタッフの負担を軽減したい',
    '直行直帰できる環境にしたい',
    'e-FAXを導入したい',
    '訪問先からも業務を行いたい',
    '電話をかける頻度を減らしたい',
    '利用者と向き合う時間を増やしたい',
    '施設探しの負担を減らしたい',
    'その他'
  ];

  const serviceTypes = [
    '訪問介護',
    '訪問入浴介護',
    '訪問看護',
    '訪問リハビリテーション',
    '居宅療養管理指導',
    '通所介護（デイサービス）',
    '通所リハビリテーション（デイケア）',
    '短期入所生活介護（ショートステイ）',
    '短期入所療養介護',
    '特定施設入居者生活介護',
    '福祉用具貸与',
    '特定福祉用具販売',
    '定期巡回・随時対応型訪問介護看護',
    '夜間対応型訪問介護',
    '地域密着型通所介護',
    '認知症対応型通所介護',
    '小規模多機能型居宅介護',
    '認知症対応型共同生活介護（グループホーム）',
    '地域密着型特定施設入居者生活介護',
    '地域密着型介護老人福祉施設入所者生活介護',
    '看護小規模多機能型居宅介護',
    '介護老人福祉施設（特別養護老人ホーム）',
    '介護老人保健施設',
    '介護医療院',
    '介護療養型医療施設',
    '居宅介護支援',
    '介護予防支援',
    'サービス付き高齢者向け住宅',
    '有料老人ホーム',
    'その他'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChallengeChange = (challenge: string) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter(c => c !== challenge)
        : [...prev.challenges, challenge]
    }));
  };

  const validateForm = () => {
    if (!formData.companyName || !formData.facilityName || !formData.name || 
        !formData.email || !formData.phone || formData.challenges.length === 0) {
      setError('必須項目をすべて入力してください。');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('有効なメールアドレスを入力してください。');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      // Prepare template parameters
      const templateParams = {
        company_name: formData.companyName,
        facility_name: formData.facilityName,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service_type: formData.serviceType || '未選択',
        challenges: formData.challenges.join(', '),
        message: formData.message || 'なし',
        to_email: 'info@care-space.jp' // Your receiving email
      };

      // Send email
      await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams);

      // Show success message
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        companyName: '',
        facilityName: '',
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        challenges: [],
        message: ''
      });

    } catch (error) {
      console.error('Failed to send email:', error);
      setError('送信に失敗しました。しばらくしてから再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">送信完了しました</h2>
          <p className="text-gray-600 mb-6">
            お問い合わせありがとうございます。<br />
            担当者より1〜3営業日以内にご連絡させていただきます。
          </p>
          <button
            onClick={() => {
              setShowSuccess(false);
              if (onClose) onClose();
            }}
            className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          会社名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="株式会社○○"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          事業所名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="facilityName"
          value={formData.facilityName}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="○○介護センター"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="田中 太郎"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="info@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          電話番号 <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="03-1234-5678"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          サービス種別
        </label>
        <select 
          name="serviceType"
          value={formData.serviceType}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="">選択してください</option>
          {serviceTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          解決したい業務の課題（※複数選択可） <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50 max-h-64 overflow-y-auto">
          {challengeOptions.map((challenge) => (
            <label key={challenge} className="flex items-center cursor-pointer">
              <input 
                type="checkbox"
                checked={formData.challenges.includes(challenge)}
                onChange={() => handleChallengeChange(challenge)}
                className="mr-3 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">{challenge}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          お問い合わせ内容
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="ご質問やご相談がございましたらお気軽にお書きください"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center ${
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-red-600 text-white hover:bg-red-700'
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            送信中...
          </>
        ) : (
          <>
            <Send className="h-5 w-5 mr-2" />
            無料でFAX・メールを始める
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;