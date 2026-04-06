import React from "react";
import Head from "next/head";
import Link from "next/link";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Nakamoto Coefficient Methodology — How Nakaflow Measures Decentralization",
  description:
    "Learn how Nakaflow calculates the Nakamoto Coefficient for Proof-of-Stake blockchains, including methodology, limitations, and practical ways to improve decentralization.",
  author: { "@type": "Organization", name: "Chainflow", url: "https://chainflow.io" },
  publisher: { "@type": "Organization", name: "Chainflow", url: "https://chainflow.io" },
  mainEntityOfPage: "https://nakaflow.io/methodology",
};

const Methodology: React.FC = () => {
  return (
    <main>
      <Head>
        <title key="title">Nakamoto Coefficient Methodology | Nakaflow</title>
        <meta
          name="description"
          content="How Nakaflow calculates the Nakamoto Coefficient for Proof-of-Stake blockchains. Methodology, limitations, and practical ways to improve network decentralization."
        />
        <link rel="canonical" href="https://nakaflow.io/methodology" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <h1 className="title">Nakamoto Coefficient Methodology</h1>
      <p className="description">
        How Nakaflow measures blockchain decentralization
      </p>

      <div>
        <p className="contentTitle">What is the Nakamoto Coefficient?</p>
        <p className="content">
          The <b>Nakamoto Coefficient</b> measures how many independent entities
          are required to control a critical share of a blockchain network
          (typically 33% for Proof-of-Stake systems). The higher the number, the
          harder it is for any small group to censor transactions or halt the
          chain. (i.e. the higher the Nakamoto Coefficient, the better.)
          <br /><br />
          While the concept is simple, <b>calculating it accurately is not</b>.
          <br /><br />
          In practice, Nakamoto Coefficient calculations rely on imperfect,
          publicly available data. It is often impossible to determine with
          certainty whether multiple validators are operated by the same
          underlying party. Additional factors such as validator geography, cloud
          infrastructure concentration, and shared operational dependencies can
          further influence decentralization without being directly observable
          on-chain.
        </p>
      </div>

      <div>
        <p className="contentTitle">
          How We Calculate the Nakamoto Coefficient
        </p>
        <div className="content">
          At Nakaflow, we calculate the Nakamoto Coefficient using the best
          available entity-level staking data. Instead of counting individual
          validator nodes in isolation, we aggregate stake by controlling
          entities, including:
          <ul>
            <li>Independent validator operators (e.g. Chainflow)</li>
            <li>Staking providers and pools (e.g. Lido)</li>
            <li>Other identifiable stake-controlling organizations</li>
          </ul>
          We then determine the minimum number of these entities required to
          reach the control threshold, based on their total staked share.
        </div>
      </div>

      <div>
        <p className="contentTitle">Important Limitations</p>
        <p className="content">
          Nakaflow's Nakamoto Coefficient should be understood as a
          conservative, data-driven estimate, not an absolute truth. Where
          ownership or control relationships cannot be verified, we rely on
          transparent assumptions and verifiable public information. Nakaflow
          does not currently account for geographic concentration, cloud
          infrastructure dependencies, or governance-layer centralization, which
          may further affect a network's real-world decentralization.
          <br /><br />
          Our goal is not to claim perfect certainty but to provide the clearest,
          most defensible view of real-world decentralization using available
          data.
        </p>
      </div>

      <div>
        <p className="contentTitle">
          Improving the Nakamoto Coefficient on Your Networks
        </p>
        <p className="content">
          Improving a blockchain's Nakamoto Coefficient means reducing the
          concentration of control among a small number of large entities. In
          Proof-of-Stake networks, this is primarily influenced by how and where
          tokens are staked.
          <br /><br />
          The most effective way to increase the Nakamoto Coefficient is to
          distribute stake across a larger number of independent validator
          operators, rather than concentrating it with the largest stake holders.
        </p>
      </div>

      <div>
        <p className="contentTitle">
          Practical Ways to Improve the Nakamoto Coefficient
        </p>
        <div className="content">
          Token holders can directly influence network decentralization by
          adjusting their staking behavior. Two proven approaches are:
          <ol>
            <li>
              <b>Stake with smaller, independent validators:</b> Use block
              explorers or staking dashboards to identify validator operators
              outside the top stake holders. Delegating stake to these operators
              helps reduce concentration and increases the number of entities
              required to reach control thresholds.
            </li>
            <li>
              <b>Use Algorithmic or Distributed Stake Pools:</b> Some staking
              solutions automatically rebalance stake toward high-performing but
              smaller validators. These algorithmic stake pools are designed to
              optimize both performance and decentralization without requiring
              manual validator selection.
            </li>
          </ol>
        </div>
      </div>

      <div>
        <p className="contentTitle">Why This Matters</p>
        <p className="content">
          A higher Nakamoto Coefficient makes a network more resilient to
          censorship, collusion, and operational failure. While protocol design
          plays a role, staking decisions made by token holders are a major
          driver of real-world decentralization.
          <br /><br />
          By consciously distributing stake, participants contribute to stronger,
          more decentralized blockchain networks.
        </p>
      </div>

      <p className="content">
        <Link href="/">← Back to Nakamoto Coefficients</Link>
      </p>

      <style jsx>{`
        main {
          padding: 2rem 0 3rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 0 0 16px;
          line-height: 1.15;
          font-size: 3rem;
          font-weight: 700;
          text-align: center;
          max-width: 800px;
        }

        .description {
          text-align: center;
          max-width: 800px;
          line-height: 1.5;
          font-size: 1.5rem;
          margin: 4px 0 20px;
        }

        .contentTitle {
          text-align: left;
          font-weight: 800;
          line-height: 1.5;
          font-size: 1.5rem;
          margin: 4px 0 20px;
        }

        .content {
          line-height: 1.6;
          font-size: 1.2rem;
          margin: 4px 0 20px;
          max-width: 800px;
        }
      `}</style>
    </main>
  );
};

export default Methodology;
