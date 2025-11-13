import { Mail, Github, Code2, AlertTriangle, BookOpen, MessageSquare, ShieldCheck } from 'lucide-react';
import { JsonLd } from 'react-schemaorg';
import Seo from '../../components/Seo/Seo';
import { useLanguage } from '../../context/LanguageContext';
import { useValidateLanguage } from '../../hooks/useValidateLanguage';
import { CONTACT_METHODS, SUPPORT_LINKS } from './Contact.const';
import { getContactSeoData } from './Contact.utils';
import SupportSection from './SupportSection/SupportSection';
import ContactMethodCard from './ContactMethodCard/ContactMethodCard';
import avatar from '../../assets/images/avatar.webp';

const Contact = () => {
    const { t, language } = useLanguage();
    const NotFound = useValidateLanguage();

    if (NotFound) return NotFound;

    return (
        <>
            <Seo
                title={t('seo.contact.title')}
                description={t('seo.contact.description')}
                path={language === 'en' ? '/contact' : `/${language}/contact`}
            />

            <JsonLd item={getContactSeoData(t('seo.contact.description'))} />

            <div className="relative min-h-screen py-16 bg-gradient-to-b from-gray-50 to-white dark:from-[#121212] dark:to-[#1E1E1E] overflow-hidden">
                {/* Organic fluid shapes */}
                <svg aria-hidden="true" className="absolute top-0 left-1/4 w-[900px] h-[900px] opacity-[0.15] dark:opacity-[0.08]" viewBox="0 0 200 200">
                    <path fill="#d1d5db" className="dark:fill-[#2D2D2D]" d="M45.3,-77.5C59.2,-70.2,71.5,-58.5,78.8,-44.2C86.1,-29.9,88.4,-13.1,86.5,3.1C84.6,19.3,78.5,34.9,69.1,47.9C59.7,60.9,47,71.3,32.7,77.7C18.4,84.1,2.5,86.5,-13.7,85.8C-29.9,85.1,-46.4,81.3,-60.2,73.7C-74,66.1,-85.1,54.7,-89.9,40.8C-94.7,26.9,-93.2,10.5,-88.4,-4.4C-83.6,-19.3,-75.5,-32.7,-65.5,-44.1C-55.5,-55.5,-43.6,-65,-29.8,-71.8C-16,-78.6,-0.3,-82.7,14.7,-83.4C29.7,-84.1,59.4,-81.4,45.3,-77.5Z" transform="translate(100 100)" />
                </svg>

                <svg aria-hidden="true" className="absolute bottom-0 right-0 w-[800px] h-[800px] opacity-[0.18] dark:opacity-[0.08]" viewBox="0 0 200 200">
                    <path fill="#d1d5db" className="dark:fill-[#2D2D2D]" d="M41.2,-71.8C53.7,-64.3,64.3,-53.4,71.4,-40.2C78.5,-27,82.1,-11.5,81.3,3.7C80.5,18.9,75.3,33.8,66.8,46.3C58.3,58.8,46.5,68.9,33.1,75.3C19.7,81.7,4.7,84.4,-10.8,84.1C-26.3,83.8,-42.2,80.5,-55.8,73.1C-69.4,65.7,-80.7,54.2,-85.9,40.2C-91.1,26.2,-90.2,9.7,-86.4,-5.3C-82.6,-20.3,-75.9,-33.8,-66.4,-44.8C-56.9,-55.8,-44.6,-64.3,-31.6,-71.5C-18.6,-78.7,-5,-84.6,7.4,-95.6C19.8,-106.6,39.6,-122.7,41.2,-71.8Z" transform="translate(100 100)" />
                </svg>

                <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-[#E5E5E5] mb-4">
                            {t('contact.hero.title')}
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-[#B0B0B0]">
                            {t('contact.hero.description')}
                        </p>
                    </div>

                    {/* Developer Info Card */}
                    <div className="bg-white dark:bg-[#2D2D2D] rounded-lg shadow-lg p-4 sm:p-6 md:p-8 lg:p-12 mb-12">
                        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
                            <img
                                src={avatar}
                                alt={t('contact.developer.name')}
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mb-6 ring-4 ring-primary-400/20 dark:ring-primary-600/20"
                            />

                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#E5E5E5] mb-2">
                                {t('contact.developer.name')}
                            </h2>

                            <p className="text-base sm:text-lg text-gray-600 dark:text-[#B0B0B0]">
                                {t('contact.developer.role')}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* Email */}
                            <ContactMethodCard
                                href={CONTACT_METHODS.EMAIL}
                                icon={<Mail className="w-6 h-6 text-primary-600 dark:text-[#60C5F5]" />}
                                labelKey="contact.methods.email.label"
                                valueKey="contact.methods.email.value"
                            />

                            {/* GitHub Profile */}
                            <ContactMethodCard
                                href={CONTACT_METHODS.GITHUB_PROFILE}
                                icon={<Github className="w-6 h-6 text-primary-600 dark:text-[#60C5F5]" />}
                                labelKey="contact.methods.github.label"
                                valueKey="contact.methods.github.value"
                                external
                            />

                            {/* Repository */}
                            <ContactMethodCard
                                href={CONTACT_METHODS.REPOSITORY}
                                icon={<Code2 className="w-6 h-6 text-primary-600 dark:text-[#60C5F5]" />}
                                labelKey="contact.methods.repository.label"
                                valueKey="contact.methods.repository.value"
                                external
                            />

                            {/* Issues */}
                            <ContactMethodCard
                                href={CONTACT_METHODS.ISSUES}
                                icon={<AlertTriangle className="w-6 h-6 text-primary-600 dark:text-[#60C5F5]" />}
                                labelKey="contact.methods.issues.label"
                                valueKey="contact.methods.issues.value"
                                external
                            />
                        </div>
                    </div>

                    {/* Support & Resources */}
                    <div className="bg-white dark:bg-[#2D2D2D] rounded-lg shadow-lg p-4 sm:p-6 md:p-8 lg:p-12 mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#E5E5E5] mb-6 sm:mb-8">
                            {t('contact.support.title')}
                        </h2>

                        <div className="space-y-6 sm:space-y-8">
                            <SupportSection
                                icon={<BookOpen />}
                                iconColor="blue"
                                titleKey="contact.support.documentation.title"
                                descriptionKey="contact.support.documentation.description"
                                linkTextKey="contact.support.documentation.link"
                                linkHref={SUPPORT_LINKS.README}
                            />

                            <SupportSection
                                icon={<MessageSquare />}
                                iconColor="green"
                                titleKey="contact.support.community.title"
                                descriptionKey="contact.support.community.description"
                                linkTextKey="contact.support.community.link"
                                linkHref={SUPPORT_LINKS.DISCUSSIONS}
                            />

                            <SupportSection
                                icon={<ShieldCheck />}
                                iconColor="purple"
                                titleKey="contact.support.privacy.title"
                                descriptionKey="contact.support.privacy.description"
                                linkTextKey="contact.support.privacy.link"
                                linkHref={SUPPORT_LINKS.PRIVACY_POLICY}
                            />
                        </div>
                    </div>

                    {/* Contributing Section */}
                    <div className="bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-lg shadow-lg p-6 sm:p-8 md:p-12 text-center text-white">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            {t('contact.contributing.title')}
                        </h2>

                        <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto text-white/90 dark:text-[#E5E5E5]/90">
                            {t('contact.contributing.description')}
                        </p>

                        <a
                            href={CONTACT_METHODS.REPOSITORY}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 sm:px-8 bg-white text-primary-600 dark:bg-[#E5E5E5] dark:text-primary-700 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-white transition-colors"
                        >
                            {t('contact.contributing.button')} →
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
