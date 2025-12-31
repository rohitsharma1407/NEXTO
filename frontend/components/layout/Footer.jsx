"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {

  return (
    <>
      <footer className="w-full bg-white dark:bg-black border-t dark:border-gray-800">
        <div className="max-w-[768px] mx-auto px-4 py-4">
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            {/* Left */}
            <div className="order-3 sm:order-1 text-[11px] sm:text-xs text-gray-500 dark:text-gray-600 w-full sm:w-auto text-center sm:text-left sm:justify-self-start">
              © 2025 <b>NEXTO</b>. All rights reserved.
            </div>

            {/* Middle */}
            <div className="order-1 sm:order-2 flex justify-center items-center gap-4 w-full sm:w-auto sm:justify-self-center">
              <a href="#" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="X / Twitter" className="w-9 h-9 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 transition-colors text-white">
                <i className="fab fa-x-twitter"></i>
              </a>
            </div>

            {/* Right */}
            <div className="order-2 sm:order-3 flex flex-wrap justify-center sm:justify-end gap-3 text-xs text-gray-600 dark:text-gray-400 w-full sm:w-auto sm:justify-self-end sm:text-right">
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="hover:underline">Terms</Link>
              <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

    </>
  );
}



// "use client";
// import React from "react";

// export default function Footer() {
//   return (
//     <div className="w-full flex items-center justify-center py-4 border-t border-gray-200 bg-white">
//       <p className="text-xs text-gray-600">© 2025 NEXTO</p>
//     </div>
//   );
// }
