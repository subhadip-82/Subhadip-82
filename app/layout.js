import './globals.css';

export const metadata = {
  title: 'Subhadip Chowdhury — Senior Analyst, BI & Automation',
  description:
    'Portfolio of Subhadip Chowdhury — Senior Data Analyst at DXC Technology. Specialising in Power BI, DAX, ETL automation, PowerShell, and cloud analytics.',
  keywords: ['Subhadip Chowdhury', 'Power BI', 'Data Analyst', 'BI Developer', 'DXC Technology', 'ETL', 'DAX', 'PowerShell', 'Azure', 'AWS'],
  authors: [{ name: 'Subhadip Chowdhury' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
