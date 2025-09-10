import React, { useState, useEffect } from 'react';
import { Shield, Clock, Users, CheckCircle, Star, Phone, Mail, MapPin, Menu, X, Send, FileText, Smartphone } from 'lucide-react';
import ContactFormSimple from './ContactFormSimple';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('header');
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('bg-white', 'shadow-lg');
          header.classList.remove('bg-transparent');
        } else {
          header.classList.add('bg-transparent');
          header.classList.remove('bg-white', 'shadow-lg');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header id="header" className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">CareSpace</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-red-600 transition-colors">特徴</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-700 hover:text-red-600 transition-colors">料金</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-red-600 transition-colors">お客様の声</button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-700 hover:text-red-600 transition-colors">FAQ</button>
              <button onClick={() => scrollToSection('contact')} className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors">
                お問い合わせ
              </button>
            </nav>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 text-gray-700">特徴</button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-2 text-gray-700">料金</button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left py-2 text-gray-700">お客様の声</button>
              <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2 text-gray-700">FAQ</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-blue-600">お問い合わせ</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-red-600">お問い合わせ</button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 to-pink-50 pt-24 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-red-600">超かんたん</span><br />
                介護FAX・メール
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                介護事業者様向けの簡単操作FAX・メールシステム。<br />
                面倒な設定は不要、すぐに使える信頼のサービスです。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  無料で始める
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-red-600 hover:text-red-600 transition-all duration-200"
                >
                  詳細を見る
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="mb-6">
                  <img 
                    src="/hero.jpg" 
                    alt="介護スタッフがタブレットを使用している様子" 
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                </div>
                <div className="bg-gray-100 rounded-lg p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-red-600 mr-1" />
                        <span className="text-sm font-semibold">FAX</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-red-600 mr-1" />
                        <span className="text-sm font-semibold">メール</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border-l-4 border-red-600">
                      <div className="flex justify-between">
                        <span>田中様医療機関</span>
                        <span className="text-green-600">✓送信完了</span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border-l-4 border-pink-600">
                      <div className="flex justify-between">
                        <span>山田介護施設</span>
                        <span className="text-green-600">✓送信完了</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center text-gray-500">
                  簡単3クリックでFAX・メール送信完了
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">なぜ選ばれるのか</h2>
            <p className="text-xl text-gray-600">介護現場の声から生まれた、本当に使いやすいFAX・メールシステム</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-red-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">3分で導入完了</h3>
              <p className="text-gray-600 leading-relaxed">
                複雑な設定は一切不要。アカウント作成後、すぐにFAX・メール送受信を開始できます。
              </p>
            </div>

            <div className="text-center p-8 bg-pink-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-pink-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">安心のセキュリティ</h3>
              <p className="text-gray-600 leading-relaxed">
                個人情報保護に配慮した暗号化通信。FAX・メール両方で介護業界に特化したセキュリティ対策を実装。
              </p>
            </div>

            <div className="text-center p-8 bg-orange-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">充実のサポート</h3>
              <p className="text-gray-600 leading-relaxed">
                介護業務に詳しい専門スタッフがサポート。導入から運用まで安心してご利用いただけます。
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-8 lg:p-12 text-white">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
              <div className="mb-8 lg:mb-0">
                <img 
                  src="/care-staff.jpg" 
                  alt="介護施設でのコミュニケーション" 
                  className="w-full h-64 lg:h-96 object-cover rounded-2xl opacity-90"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-6">介護現場の課題を解決</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                    <span>紙詰まりや故障による業務停止の心配なし</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                    <span>FAX・メール送信履歴の管理で確実な情報伝達</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                    <span>コスト削減で運営費を圧縮</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                    <span>スマホ・タブレットからでもアクセス可能</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                    <span>メール送信で迅速な連絡が可能</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">明確な料金体系</h2>
            <p className="text-xl text-gray-600">使った分だけお支払い。初期費用・月額費用は一切不要</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* FAX料金 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-8">
                <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">FAX送信</h3>
                <div className="text-5xl font-bold text-red-600 mb-2">¥25</div>
                <div className="text-gray-600">1件あたり（税込）</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>全国どこでも同一料金</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>送信失敗時は課金なし</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>送信履歴・ステータス確認</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>PDF・Word・Excel対応</span>
                </li>
              </ul>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-2">月100件送信の場合</div>
                <div className="text-2xl font-bold text-red-600">¥2,500/月</div>
              </div>
            </div>

            {/* メール料金 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-8">
                <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-10 w-10 text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">メール送信</h3>
                <div className="text-5xl font-bold text-pink-600 mb-2">¥3</div>
                <div className="text-gray-600">1件あたり（税込）</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>添付ファイル対応（10MBまで）</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>開封確認・配信確認</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>送信予約機能</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>一斉送信対応</span>
                </li>
              </ul>
              <div className="bg-pink-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-2">月500件送信の場合</div>
                <div className="text-2xl font-bold text-pink-600">¥1,500/月</div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-3xl p-8 shadow-lg max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">共通サービス</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">初期費用無料</h4>
                <p className="text-gray-600 text-sm">導入時の費用は一切不要・月額料金もかかりません</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">簡単導入</h4>
                <p className="text-gray-600 text-sm">複雑な設定不要で最短3分で利用開始</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">マルチデバイス対応</h4>
                <p className="text-gray-600 text-sm">PC・タブレット・スマホから利用可能</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">送信予約機能</h4>
                <p className="text-gray-600 text-sm">指定した日時に自動送信</p>
              </div>
              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-pink-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">複数ユーザー管理</h4>
                <p className="text-gray-600 text-sm">スタッフごとにアカウント作成可能</p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">送信履歴管理</h4>
                <p className="text-gray-600 text-sm">いつ誰に送ったか簡単確認</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              ※ フリープランで無料で始められます
            </p>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors"
            >
              無料で始める
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">お客様の声</h2>
            <p className="text-xl text-gray-600">実際にご利用いただいている介護事業者様からの評価</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                「従来のFAX機では故障やメンテナンスが大変でしたが、CareSpaceに変えてから業務効率が大幅に改善しました。使った分だけの料金なので、コストも大幅に削減できています。」
              </p>
              <div className="flex items-center">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">T.K 様</div>
                  <div className="text-gray-600">デイサービスセンター管理者</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                「操作が本当に簡単で、パソコンが苦手なスタッフでもすぐに使いこなせました。FAXとメールを一つのシステムで管理できるのが便利で、月額料金がないのも魅力です。」
              </p>
              <div className="flex items-center">
                <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">S.M 様</div>
                  <div className="text-gray-600">訪問介護ステーション所長</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                「サポートが本当に頼りになります。メール送信でのトラブルも迅速に解決してもらえ、介護業界特有の課題を理解してくれているので安心です。」
              </p>
              <div className="flex items-center">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Y.T 様</div>
                  <div className="text-gray-600">特養ホーム事務長</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">よくあるご質問</h2>
            <p className="text-xl text-gray-600">導入前の疑問にお答えします</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "導入にはどのくらいの時間がかかりますか？",
                answer: "アカウント作成から実際のFAX・メール利用開始まで、わずか3分程度で完了します。複雑な設定や機器の設置は一切必要ありません。"
              },
              {
                question: "月額料金はかかりますか？",
                answer: "フリープランをご利用いただければ月額料金は一切かかりません。有料プランをご選択いただいた場合は、プランに応じた月額料金が発生しますが、FAX送信25円/件、メール送信3円/件の従量課金制で、使った分だけの明確な料金体系となっています。"
              },
              {
                question: "送信に失敗した場合も料金はかかりますか？",
                answer: "送信に失敗した場合は料金は発生しません。正常に送信が完了した場合のみ課金されるため、安心してご利用いただけます。"
              },
              {
                question: "セキュリティは大丈夫ですか？",
                answer: "SSL暗号化通信、個人情報保護対策、アクセス制御など、FAX・メール両方で介護業界に特化したセキュリティ対策を実装しています。"
              },
              {
                question: "既存のシステムと連携できますか？",
                answer: "現在は単独でのご利用となり、他の介護記録システムや電子カルテとの自動連携には対応しておりません。今後の機能追加については、お客様のご要望を参考に検討してまいります。"
              },
              {
                question: "支払い方法はどうなっていますか？",
                answer: "銀行振込でのお支払いとなります。法人様向けサービスのため、請求書を発行し、月末締めの翌月末払いでご利用いただけます。"
              },
              {
                question: "サポート体制はどうなっていますか？",
                answer: "介護業務に詳しい専門スタッフがサポートします。電話、メールでのサポートをご利用いただけます。"
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">その他のご質問がございましたら、お気軽にお問い合わせください。</p>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
            >
              無料で始める
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">お問い合わせ・無料で始める</h2>
            <p className="text-xl text-gray-600">フリープランでFAX・メール機能を無料でご利用いただけます</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <img 
                  src="/contact.jpg" 
                  alt="介護スタッフがサポートを受けている様子" 
                  className="w-full h-48 object-cover rounded-2xl"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">お問い合わせ情報</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-red-600 mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">電話でのお問い合わせ</div>
                    <div className="text-gray-600">0120-004-115（受付時間：平日9:00-18:00）</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-red-600 mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">メールでのお問い合わせ</div>
                    <div className="text-gray-600">info@care-space.jp</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-red-600 mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">本社所在地</div>
                    <div className="text-gray-600">山形県山形市あかねヶ丘2-12-15</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ContactFormSimple />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <div className="mb-6">
                <span className="text-2xl font-bold">CareSpace</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                介護事業者様向けの簡単操作FAX・メールシステム。信頼性の高いサービスで、介護現場の業務効率化をサポートします。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">サービス</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">超かんたん介護FAX・メール</a></li>
                <li><a href="https://ai-diagnosis-mu.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">AI診断ツール</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">サポート</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#faq" className="hover:text-white transition-colors">よくあるご質問</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">お問い合わせ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">会社情報</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://company.care-space.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">会社概要</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CareSpace Co., Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;