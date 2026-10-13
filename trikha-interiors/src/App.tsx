/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { JournalPage } from './pages/JournalPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { ManageBookingPage } from './pages/ManageBookingPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { Appointment } from './types/booking';
import { getBusinessSettings, initializeStorageIfNeeded } from './services/bookingStorage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [manageRef, setManageRef] = useState<string>('');
  const [manageToken, setManageToken] = useState<string>('');

  // Initialize data on mount
  useEffect(() => {
    initializeStorageIfNeeded();

    // Check hash on load
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'services', 'portfolio', 'about', 'journal', 'contact', 'book', 'manage', 'admin'].includes(hash)) {
      setCurrentPage(hash);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash && ['home', 'services', 'portfolio', 'about', 'journal', 'contact', 'book', 'manage', 'admin'].includes(newHash)) {
        setCurrentPage(newHash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSuccess = (appointment: Appointment) => {
    setConfirmedAppointment(appointment);
    setCurrentPage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleManageBooking = (ref: string, token: string) => {
    setManageRef(ref);
    setManageToken(token);
    setCurrentPage('manage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const settings = getBusinessSettings();

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#262622] flex flex-col font-sans selection:bg-[#E8E0D5]">
      {/* Main Studio Navbar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content View with smooth header offset */}
      <main className="flex-1 pt-20">
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        {currentPage === 'services' && <ServicesPage onNavigate={handleNavigate} />}
        {currentPage === 'portfolio' && <PortfolioPage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'journal' && <JournalPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
        {currentPage === 'book' && (
          <BookingPage
            onBookingSuccess={handleBookingSuccess}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'confirmation' && confirmedAppointment && (
          <BookingConfirmationPage
            appointment={confirmedAppointment}
            settings={settings}
            onNavigate={handleNavigate}
            onManageBooking={handleManageBooking}
          />
        )}
        {currentPage === 'confirmation' && !confirmedAppointment && (
          <BookingPage
            onBookingSuccess={handleBookingSuccess}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'admin' && <AdminDashboard onNavigate={handleNavigate} />}
        {currentPage === 'manage' && (
          <ManageBookingPage
            initialReference={manageRef}
            initialToken={manageToken}
            settings={settings}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Luxury Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
