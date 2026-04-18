import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import List from "components/List";
import CHAIN_DATA, { CHAINFLOW_OPERATED } from "../components/constants";

interface ChainResult {
  id: number;
  results: {
    metadata: any;
    name: string;
    icon: string;
    currVal: number;
    prevVal: number;
    chainToken: string;
    chainflowOperated: boolean;
    stakingUrl: string | null;
  };
}

interface HomeProps {
  chains: ChainResult[];
  lastUpdated: string | null;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    // const res = await fetch("http://localhost:8080/naka-coeffs");
    const res = await fetch("https://nakaflow.io/api/naka-coeffs");
    const r = await res.json();

    const chains = (r.coefficients ?? []).map((chain: any, indx: number) => ({
      id: indx + 1,
      results: {
        metadata: CHAIN_DATA?.get(chain.chain_token)?.metadata ?? null,
        name: CHAIN_DATA?.get(chain.chain_token)?.name ?? "",
        icon: CHAIN_DATA?.get(chain.chain_token)?.icon ?? "",
        currVal: chain.naka_co_curr_val ?? 0,
        prevVal: chain.naka_co_prev_val ?? 0,
        chainToken: chain.chain_token ?? "",
        chainflowOperated: CHAINFLOW_OPERATED.has(chain.chain_token ?? ""),
        stakingUrl: CHAIN_DATA?.get(chain.chain_token)?.stakingUrl ?? null,
      },
    }));

    let lastUpdated: string | null = null;
    if (r.last_updated) {
      lastUpdated = new Date(r.last_updated).toUTCString();
    }

    return {
      props: { chains, lastUpdated },
      revalidate: 1800,
    };
  } catch (e) {
    return {
      props: { chains: [], lastUpdated: null },
      revalidate: 60,
    };
  }
};

const Home: React.FC<HomeProps> = ({ chains }) => {
  const byName = (a: ChainResult, b: ChainResult) =>
    a.results.name.localeCompare(b.results.name);
  const chainflowChains = chains
    .filter((c) => c.results.chainflowOperated)
    .sort(byName);
  const otherChains = chains
    .filter((c) => !c.results.chainflowOperated)
    .sort(byName);
  const sortedChains = [...chainflowChains, ...otherChains];

  return (
    <main>
      <h1 className="title">Nakamoto Coefficients</h1>
      <h2 className="description">Live decentralization metrics for Proof-of-Stake blockchains </h2>
      <p className="content">
        See how resistant a chain is to censorship or collusion. Compare metrics, explore thresholds, export data.
      </p>
      {/* {lastUpdated && <p className="lastUpdated">Last updated: {lastUpdated}</p>} */}
      <p className="lastUpdated">Last updated: Apr 6, 2026, 12:00 PM UTC (harcoded for now)</p> 
      <List chainflowChains={chainflowChains} otherChains={otherChains} />
      <button
        className="csv-btn"
        onClick={() => {
          const header = "Name,Current Value,Previous Value";
          const rows = sortedChains.map((c: any) => {
            const name = (c.results.name ?? "").replace(/,/g, "");
            const curr = c.results.currVal ?? 0;
            const prev = c.results.prevVal ?? 0;
            return `${name},${curr},${prev}`;
          });
          const csv = [header, ...rows].join("\n");
          const blob = new Blob([csv], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "nakaflow-coefficients.csv";
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Export CSV
      </button>
      <div>
        <p className="contentTitle">About the Nakamoto Coefficient</p>
        <p className="content">
          The <b>Nakamoto Coefficient</b> measures how many independent entities are required to control a critical share of a blockchain network (typically 33% for Proof-of-Stake systems). The higher the number, the harder it is for any small group to censor transactions or halt the chain. (i.e. the higher the Nakamoto Coefficient, the better.)
          <br /><br />
          While the concept is simple, <b>calculating it accurately is not</b>.
          <br /><br />
          In practice, Nakamoto Coefficient calculations rely on imperfect, publicly available data. It is often impossible to determine with certainty whether multiple validators are operated by the same underlying party. Additional factors such as validator geography, cloud infrastructure concentration, and shared operational dependencies can further influence decentralization without being directly observable on-chain.
        </p>
      </div>

      <div>
        <p className="contentTitle">
          Our Methodology for calculating the Nakamoto Coefficient
        </p>
        <div className="content">
          At Nakaflow, we calculate the Nakamoto Coefficient using the best available entity-level staking data. Instead of counting individual validator nodes in isolation, we aggregate stake by controlling entities, including:
          <ul>
          <li>Independent validator operators (e.g. Chainflow)</li>
          <li>Staking providers and pools (e.g. Lido)</li>
          <li>Other identifiable stake-controlling organizations</li>
          </ul>

          We then determine the minimum number of these entities required to reach the control threshold, based on their total staked share.
          <br /><br />
          <Link href="/methodology">Read our full methodology, limitations, and practical guidance →</Link>
        </div>
      </div>

      <div>
        <p className="contentTitle">Contributors</p>
        <div className="content">
        Thank you to the following contributors who have submitted pull requests to add networks to Nakaflow.
          <ul>
            <li><a href="https://github.com/xenowits">xenowits</a> — Solana, Cosmos, Avalanche, Graph Protocol, Near, Polygon, Regen Network, Juno and Ethereum</li>
            <li><a href="https://github.com/Romainua">Romainua</a> — Sui</li>
            <li><a href="https://github.com/es92">es92</a> — Mina</li>
            <li><a href="https://github.com/jhernandezb">jhernandezb</a> — Stargaze</li>
            <li><a href="https://github.com/etienne-napoleone">etienne-napoleone</a> — Terra</li>
            <li><a href="https://github.com/swirlds-matt">swirlds-matt</a> — Hedera</li>
            <li><a href="https://github.com/BrazyDevelopment">BrazyDevelopment</a> — Nano</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="contentTitle">Stake With Chainflow</h2>
        <p className="content">
          Nakaflow is brought to you by{" "}
          <a href="https://chainflow.io/">Chainflow</a>, a crypto infrastructure
          company working to build the foundations for a more inclusive,
          equitable, and fair digital economy. Beyond Nakaflow, we operate
          validators on more than a dozen of the leading Proof-of-Stake networks
          and lead initiatives to support healthy, decentralized infrastructure
          ecosystems across crypto. <br />
          <br />
          Chainflow is a fully-independent team with no outside funding from
          Venture Capital or other specialist interests; we operate exclusively
          to serve our communities and advance a better future for the web.{" "}
          <br />
          <br />
          If you'd like to help keep projects like Nakaflow running and support
          our work, please consider staking with us on your networks of choice.
          You can learn more about how to do so at our{" "}
          <a href="https://chainflow.io/staking/">
            Staking Services page
          </a>
          . We sincerely appreciate your help in the movement for
          decentralization 🙏. <br />
        </p>
      </div>

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
          font-size: 4rem;
          font-weight: 700;
        }

        .title,
        .description {
          text-align: center;
          max-width: 800px;
        }

        .description {
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

        .lastUpdated {
          font-size: 0.9rem;
          color: #666;
          margin: 0 0 12px;
        }

        .csv-btn {
          margin: 12px 0 20px;
          padding: 8px 20px;
          font-size: 0.95rem;
          font-family: 'sofia-pro', sans-serif;
          background: #091636;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .csv-btn:hover {
          background: #1a2a50;
        }
      `}</style>
    </main>
  );
};

export default Home;
