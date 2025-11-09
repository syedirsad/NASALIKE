import React from 'react';

const SocialLink: React.FC<{ href: string; icon: string; label: string }> = ({ href, icon, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-nasa-light-gray hover:text-nasa-white transition-colors duration-300 flex items-center gap-2">
        <i className={`${icon} text-xl`}></i>
        <span className="hidden sm:inline">{label}</span>
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-space-light/50 border-t border-nasa-light-gray/20 text-nasa-white pt-10 pb-6 mt-16">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-lg font-bold font-sans">NEET PHYSICS GUJARATI</h2>
                        <p className="text-sm text-nasa-light-gray">Guidance by Irshad Sir</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        <SocialLink href="https://www.youtube.com/@npgujarati" icon="fab fa-youtube" label="YouTube" />
                        <SocialLink href="https://chat.whatsapp.com/LGeExJ4a5562e13B04uuQm" icon="fab fa-whatsapp" label="WhatsApp" />
                        <SocialLink href="https://t.me/neet_physics_gujarati" icon="fab fa-telegram" label="Telegram" />
                        <SocialLink href="https://instagram.com/neet_physics.gujarati" icon="fab fa-instagram" label="Instagram" />
                    </div>
                </div>
                <div className="border-t border-nasa-light-gray/20 pt-6 mt-8 text-center">
                    <p className="text-nasa-light-gray text-xs">&copy; {new Date().getFullYear()} Syed Irsad. All rights reserved. | Contact: SYED.IRSAD@GMAIL.COM</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
