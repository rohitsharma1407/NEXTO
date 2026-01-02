"use client";
import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.brandTitle}>NEXTO</h3>
            <p className={styles.brandText}>
              Your go-to platform for global news, curated just for you.
            </p>
          </div>

          <div className={styles.card}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="#" className={styles.linkItem}>
                  <span className={styles.bullet}></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.linkItem}>
                  <span className={styles.bullet}></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={styles.linkItem}>
                  <span className={styles.bullet}></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h4 className={`${styles.sectionTitle} ${styles.socialTitle}`}>Follow Us</h4>
            <div className={styles.socialRow}>
              <a href="#" className={`${styles.socialButton} ${styles.twitter}`} aria-label="Twitter">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className={`${styles.socialButton} ${styles.facebook}`} aria-label="Facebook">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className={`${styles.socialButton} ${styles.instagram}`} aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.copy}>
          <p>
            &copy; 2025 NEXTO News. All rights reserved. | Crafted with <span className={styles.heart}>❤️</span> for news lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
