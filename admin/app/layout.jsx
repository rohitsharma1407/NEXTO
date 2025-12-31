export const metadata = { title: "Nexto2 Admin", description: "Admin dashboard" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
