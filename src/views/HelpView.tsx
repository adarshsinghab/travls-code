import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Send,
} from 'lucide-react';

interface HelpViewProps {
  onNotify: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

export const HelpView: React.FC<HelpViewProps> = ({ onNotify }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const faqs = [
    {
      q: 'How does the zero foreign exchange (FX) guarantee work?',
      a: 'When spending abroad with your TRAVLS Black Elite or Platinum Card, transactions are converted at interbank wholesale mid-market spot rates without any 3% bank foreign surcharge markup.',
    },
    {
      q: 'How fast do cash out transfers arrive in India and Nigeria?',
      a: 'Indian rupee payouts utilize direct IMPS rail integrations with average clearing in 15 to 45 seconds. Nigerian naira payouts settle via the NIP interbank network in under 60 seconds.',
    },
    {
      q: 'Can I add my TRAVLS Card to Apple Pay and Google Wallet?',
      a: 'Yes. Both our Virtual and Physical Metal cards support instant 1-tap provisioning into Apple Wallet and Google Pay from the card settings screen.',
    },
    {
      q: 'What happens if I lose my physical metal card?',
      a: 'Open your TRAVLS Cards tab and tap "Freeze Card" immediately. This instantly stops all contactless and chip transactions. You can then request an emergency DHL replacement with one click.',
    },
    {
      q: 'How is my crypto custody protected?',
      a: 'Your digital assets are secured inside segregated multi-party computation (MPC) cold vaults with institutional custody insurance provided by licensed European partners.',
    },
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      onNotify('Incomplete Ticket', 'Please provide a subject and message for our concierge.', 'error');
      return;
    }

    onNotify(
      'Priority Ticket Dispatched',
      'Your VIP concierge will reply to adarsh@travls.io within 15 minutes.',
      'success'
    );
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
          Help & 24/7 VIP Concierge
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Direct private support line, answers to common inquiries, and travel concierge assistance.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* FAQs Accordion */}
        <div
          style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <HelpCircle size={20} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Frequently Answered Inquiries
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      color: isOpen ? 'var(--brand-primary)' : 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: '14px',
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 16px 16px 16px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Concierge Form */}
        <div
          style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <HelpCircle size={20} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Contact VIP Concierge Desk
            </h3>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Available 24/7/365 for cardholders. Average response SLA: under 15 minutes.
          </p>

          <form onSubmit={handleSubmitTicket} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Subject
              </label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g. Airport Lounge access inquiry in Dubai"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Message
              </label>
              <textarea
                rows={4}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="How may our concierge team assist your travel or banking today?"
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--brand-primary)',
                color: '#0B0F17',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Send size={16} />
              <span>Dispatch Request to Concierge</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
