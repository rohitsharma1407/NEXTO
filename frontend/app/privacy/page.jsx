// export default function PrivacyPage() {
//   return (
//     <div className="px-4 py-6 space-y-3">
//       <h1 className="text-lg font-semibold">Privacy Policy</h1>
//       <p className="text-sm text-gray-700 dark:text-gray-300">
//         NEXTO respects your privacy. We do not sell personal data.
//         News preferences are used only to personalize your feed.
//       </p>
//       <p className="text-sm text-gray-700 dark:text-gray-300">
//         We may collect anonymous usage data to improve the product.
//       </p>
//     </div>
//   );
// }

export default function PrivacyPage() {
  return (
    <main className="max-w-[720px] mx-auto px-4 py-8 space-y-8">
      
      {/* Title */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: January 2026
        </p>
      </header>

      {/* Intro */}
      <section className="space-y-3">
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          At <strong>NEXTO</strong>, your privacy is extremely important to us.
          This Privacy Policy explains how we collect, use, protect, and handle
          your information when you use our application.
        </p>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          By accessing or using NEXTO, you agree to the terms outlined in this
          Privacy Policy.
        </p>
      </section>

      {/* Info we collect */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Information We Collect
        </h2>

        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>Account Information:</strong> Email address or login details
            used for authentication.
          </li>
          <li>
            <strong>User Preferences:</strong> Selected categories, language,
            location, and personalization settings.
          </li>
          <li>
            <strong>Usage Data:</strong> Anonymous data such as interactions,
            page views, and feature usage.
          </li>
          <li>
            <strong>Device Information:</strong> Browser type, device type, and
            operating system (non-identifiable).
          </li>
        </ul>
      </section>

      {/* How we use data */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          How We Use Your Information
        </h2>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          We use the collected information strictly to improve your experience
          on NEXTO. This includes:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>Personalizing your news feed using AI</li>
          <li>Improving application performance and reliability</li>
          <li>Understanding feature usage to build better experiences</li>
          <li>Sending important service-related updates (if enabled)</li>
        </ul>
      </section>

      {/* Data sharing */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Data Sharing & Disclosure
        </h2>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          We do <strong>not</strong> sell, trade, or rent your personal data.
          Data may be shared only in the following limited cases:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>With trusted service providers to operate the platform</li>
          <li>To comply with legal obligations or law enforcement requests</li>
          <li>To protect the rights, safety, and security of users</li>
        </ul>
      </section>

      {/* Security */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Data Security
        </h2>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          We implement industry-standard security measures to protect your data.
          However, no system is completely secure, and we cannot guarantee
          absolute protection.
        </p>
      </section>

      {/* Cookies */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Cookies & Tracking
        </h2>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          NEXTO may use cookies or similar technologies to enhance functionality,
          analyze usage, and improve performance. You can manage cookie
          preferences through your browser settings.
        </p>
      </section>

      {/* User rights */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Your Rights
        </h2>

        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>Access and review your personal information</li>
          <li>Request correction or deletion of your data</li>
          <li>Opt-out of certain data collection features</li>
        </ul>
      </section>

      {/* Changes */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Changes to This Policy
        </h2>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          We may update this Privacy Policy from time to time. Any changes will
          be reflected on this page with an updated revision date.
        </p>
      </section>

      {/* Contact */}
      <section className="space-y-3 border-t pt-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Contact Us
        </h2>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          If you have any questions or concerns regarding this Privacy Policy,
          please contact us at:
        </p>

        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          📧 support@nexto.ai
        </p>
      </section>
    </main>
  );
}

