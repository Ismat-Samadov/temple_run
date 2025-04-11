// src/components/TermsOfService.tsx
'use client';

import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 inline-flex items-center mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Healthcare Assistant application (&ldquo;Application&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use the Application.
            </p>
            <p className="mt-2">
              These Terms constitute a legally binding agreement between you and Healthcare Assistant (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) regarding your use of the Application. Please read them carefully.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Healthcare Disclaimer</h2>
            <p>
              <strong>NOT MEDICAL ADVICE:</strong> The information provided through the Application is for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Never disregard professional medical advice or delay seeking it because of something you have read or heard on the Application.
            </p>
            <p className="mt-2">
              <strong>EMERGENCIES:</strong> If you are experiencing a medical emergency, please call your local emergency services immediately or visit the nearest emergency room.
            </p>
            <p className="mt-2">
              <strong>NO DOCTOR-PATIENT RELATIONSHIP:</strong> Use of the Application does not create a doctor-patient relationship between you and Healthcare Assistant, its employees, or any contributors to the Application.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Account Registration</h2>
            <p>
              To access certain features of the Application, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p className="mt-2">
              You are responsible for safeguarding your password and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account or any other breach of security.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Use of the Application</h2>
            <h3 className="text-lg font-medium text-gray-800 mb-2">4.1 Permitted Use</h3>
            <p>
              Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Application for your personal, non-commercial use.
            </p>
            
            <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">4.2 Prohibited Conduct</h3>
            <p>
              You agree not to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Use the Application for any illegal purpose or in violation of any local, state, national, or international law</li>
              <li>Harass, abuse, or harm another person</li>
              <li>Impersonate another user or person</li>
              <li>Use the Application in any manner that could interfere with, disrupt, negatively affect, or inhibit other users from fully enjoying the Application</li>
              <li>Attempt to circumvent any content-filtering techniques we employ</li>
              <li>Attempt to access or search the Application through the use of any engine, software, tool, agent, device, or mechanism other than the software or search agents provided by us</li>
              <li>Introduce any viruses, trojan horses, worms, logic bombs, or other harmful material to the Application</li>
              <li>Use the Application to send automated queries to any website or to send unsolicited commercial emails</li>
              <li>Use the Application to collect sensitive health information from others</li>
              <li>Attempt to decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Application</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Intellectual Property Rights</h2>
            <p>
              The Application and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, and the design, selection, and arrangement thereof) are owned by Healthcare Assistant, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. User Content</h2>
            <p>
              &ldquo;User Content&rdquo; means any information, data, text, or other materials that users submit to the Application. You retain all rights to your User Content, but you grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, copy, modify, create derivative works based on, distribute, publicly display, and otherwise exploit your User Content in connection with operating and providing the Application.
            </p>
            <p className="mt-2">
              You are solely responsible for your User Content and the consequences of posting or publishing it. By submitting User Content, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>You own or have the necessary rights to submit the User Content</li>
              <li>The User Content does not infringe on the rights of any third party</li>
              <li>The User Content does not contain any material that is unlawful, defamatory, obscene, or otherwise objectionable</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Third-Party Links and Content</h2>
            <p>
              The Application may contain links to third-party websites or resources. We provide these links only as a convenience and are not responsible for the content, products, or services on or available from those websites or resources. You acknowledge and agree that we are not responsible or liable for any damage or loss caused by or in connection with your use of any third-party websites or resources.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Termination</h2>
            <p>
              We may terminate or suspend your access to the Application immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Application will immediately cease.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Disclaimer of Warranties</h2>
            <p>
              THE APPLICATION IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APPLICATION WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE APPLICATION IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Limitation of Liability</h2>
            <p>
              IN NO EVENT SHALL WE, OUR DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE APPLICATION.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Healthcare Assistant and its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) that arise from or relate to your use of the Application or violation of these Terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the state of California, without regard to its conflict of law provisions.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">13. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">14. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              Email: terms@healthcareassistant.com<br />
              Healthcare Assistant<br />
              123 Health Street<br />
              Medical City, MC 12345
            </p>
          </section>
          
          <p className="mt-6 text-sm text-gray-500">Last Updated: April 11, 2025</p>
        </div>
      </div>
    </div>
  );
}