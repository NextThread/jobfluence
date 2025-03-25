
import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on 
              behalf of an entity ("you") and JobFluence ("we," "us" or "our"), concerning your access to and use of the 
              JobFluence website as well as any other media form, media channel, mobile website or mobile application 
              related, linked, or otherwise connected thereto (collectively, the "Site").
            </p>
            <p className="mt-2">
              You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these 
              Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited 
              from using the Site and you must discontinue use immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. User Registration</h2>
            <p>
              You may be required to register with the Site. You agree to keep your password confidential and will be 
              responsible for all use of your account and password. We reserve the right to remove, reclaim, or change 
              a username you select if we determine, in our sole discretion, that such username is inappropriate, 
              obscene, or otherwise objectionable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. User Representations</h2>
            <p>
              By using the Site, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
              <li>You are not a minor in the jurisdiction in which you reside.</li>
              <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
              <li>You will not use the Site for any illegal or unauthorized purpose.</li>
              <li>Your use of the Site will not violate any applicable law or regulation.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Prohibited Activities</h2>
            <p>
              You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>
            <p className="mt-2">
              As a user of the Site, you agree not to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, database, or directory without written permission from us.</li>
              <li>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Site.</li>
              <li>Engage in unauthorized framing of or linking to the Site.</li>
              <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Submissions</h2>
            <p>
              You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information 
              regarding the Site ("Submissions") provided by you to us are non-confidential and shall become our sole property. 
              We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted 
              use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment 
              or compensation to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Site Management</h2>
            <p>
              We reserve the right, but not the obligation, to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Monitor the Site for violations of these Terms of Service.</li>
              <li>Take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Service.</li>
              <li>Refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof.</li>
              <li>In our sole discretion and without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Termination</h2>
            <p>
              We may terminate your access to all or any part of the Site at any time, with or without cause, with or without notice, effective immediately. If you wish to terminate this Agreement or your JobFluence account (if you have one), you may simply discontinue using the Site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
            <p>
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            </p>
            <div className="mt-2">
              <p>Email: terms@jobfluence.com</p>
              <p>Address: 1234 Job Street, Employment City</p>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
