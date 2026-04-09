import React from 'react';
import Head from 'next/head';

const SocialTags: React.FC = () => {
  const title = "Nakaflow | Real-Time Nakamoto Coefficient Tracker";
  const description =
    "Track the Nakamoto Coefficient for major Proof-of-Stake blockchains in near-real time. Compare decentralization, explore methodology, and export data. By Chainflow.";
  const url = "https://nakaflow.io/";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Nakaflow",
    url,
    description: "Real-time Nakamoto Coefficient tracker for Proof-of-Stake blockchains",
    applicationCategory: "Blockchain Analytics",
    operatingSystem: "Web",
    creator: {
      "@type": "Organization",
      name: "Chainflow",
      url: "https://chainflow.io",
    },
  };

  return (
    <Head>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${url}og-image.png`}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={`${url}og-image.png`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
};

export default SocialTags;
