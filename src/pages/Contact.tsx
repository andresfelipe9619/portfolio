'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast, Toaster } from 'sonner';
import { AuroraText } from '@/components/magicui/aurora-text.tsx';
import { RetroGrid } from '@/components/magicui/retro-grid.tsx';
import { logEvent } from '@/lib/ga';
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fd = new FormData();

    try {
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('subject', formData.subject);
      fd.append('message', formData.message);
      fd.append('access_key', 'ce6a6db2-b865-4b4b-8f6c-c11ccb4481bf');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
      });

      const data = await response.json();
      console.log(data);

      toast(t('contact.successTitle'), {
        description: t('contact.successDesc'),
      });
      logEvent('Contact Form', 'Submit', 'Success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setCharCount(0);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast(t('contact.errorMsg'));
    } finally {
      setIsSubmitting(false);
    }
  };


  const getCharCountColor = () => {
    if (charCount > 500) return 'text-green-500';
    if (charCount > 200) return 'text-yellow-500';
    return 'text-muted-foreground';
  };

  const getCharCountMessage = () => {
    if (charCount === 0) return 'Your thoughts go here';
    if (charCount < 50) return 'Just getting warmed up...';
    if (charCount < 200) return "Now we're talking!";
    if (charCount < 500) return 'This is getting good!';
    if (charCount < 1000) return "You're on fire! 🔥";
    return 'Novel-length message detected!';
  };

  return (
    <div className="p-4 w-full">
      <RetroGrid opacity={0.8} />
      <div className="mx-auto max-w-2xl py-8 ">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-sm font-mono">
            /contact
          </Badge>
          <h1 className="text-4xl font-bold mb-4 text-balance">
            {t('contact.title0')} <AuroraText>{t('contact.title1')}</AuroraText>
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-lg mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Contact Form */}
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm p-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl">{t('contact.cardTitle')}</CardTitle>
            <CardDescription className="text-base">
              {t('contact.cardDesc')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    {t('contact.nameLabel')}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t('contact.namePlaceholder')}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t('contact.emailLabel')}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium">
                  {t('contact.subjectLabel')}
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder={t('contact.subjectPlaceholder')}
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="message" className="text-sm font-medium">
                    {t('contact.messageLabel')} <span className="text-destructive">*</span>
                  </Label>
                  <span className={`text-xs ${getCharCountColor()}`}>
                    {getCharCountMessage()} ({charCount} {t('contact.chars')})
                  </span>
                </div>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('contact.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-base font-medium py-6 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      {t('contact.sendingBtn')}
                    </span>
                  ) : (
                    t('contact.sendBtn')
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-sm">
            {t('contact.footerNote')}
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
