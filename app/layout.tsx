// app/layout.tsx

export const metadata = {
  title: "Copture – Ladda upp",
  description: "Uppladdning av flygfiler till Copture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
