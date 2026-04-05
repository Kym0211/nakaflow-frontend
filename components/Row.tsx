import React, { Fragment, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { usePlausible } from 'next-plausible';
import { Info } from 'react-feather';
import DetailsCard from './DetailsCard';

interface RowProps {
  protocol: any;
}

const toggle = (isOpen: boolean) => !isOpen;

const cardHeight = 5000;

const Row: React.FC<RowProps> = ({ protocol }) => {
  const plausible = usePlausible();
  const [open, setOpen] = useState(false);
  let isApp = true;

  return (
    <Fragment>
      {(!protocol.results.name) ? null: 
      <>
        <div
        onClick={() => {
          setOpen(toggle);
          plausible("open-details", {
            props: {
              label: protocol.results.name,
            },
          });
        }}
        className={`item ${isApp ? "app" : ""} ${open ? "open" : ""}`}
        style={{
          backgroundImage: protocol.results.icon
            ? `url('${protocol.results.icon}')`
            : undefined,
        }}
      >
        <div className="name">
          {protocol.results.name}
          <span className={`info-icon ${open ? "active" : ""}`}><Info size={14} /></span>
        </div>
        <div className="amount">{protocol.results.currVal == undefined ? 0: protocol.results.currVal}</div>
        <div className="amount">{protocol.results.prevVal == undefined ? 0: protocol.results.prevVal}</div>
      </div>

      <CSSTransition in={open} timeout={500} unmountOnExit>
        <div className="details-container">
          <DetailsCard metadata={protocol.results.metadata} />
        </div>
      </CSSTransition>
      </>}
      <style jsx>{`
        .item {
          display: flex;
          padding: 0 4px;
          background-color: #fff;
          font-size: 18px;
          background-repeat: no-repeat;
          background-position: 10px center;
          background-size: 20px 20px;
          padding-left: 10px;
          color: black;
          text-decoration: none;
          align-items: center;
          height: 54px;
        }
        .item:hover {
          background-color: #f5f5f5;
        }

        .item.app {
          background-color: #fad3f6;
        }
        .item.app:hover {
          background-color: #f8c3f3;
        }

        .name {
          flex: 1;
          padding-left: 32px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .amount {
          padding-left: 32px;
        }

        .amount {
          min-width: 200px;
          text-align: right;
          padding-right: 32px;
          font-family: "Noto Sans TC", sans-serif;
        }

        .info-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 5px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          opacity: 0.4;
          transition: opacity 0.2s ease, background-color 0.2s ease;
          cursor: pointer;
          flex-shrink: 0;
          line-height: 0;
        }
        .info-icon:hover {
          opacity: 0.8;
          background-color: rgba(0, 0, 0, 0.06);
        }
        .info-icon.active {
          opacity: 1;
          color: #29221F;
          background-color: #E1E3E6;
        }

        @keyframes slidein {
          from {
            max-height: 0px;
            opacity: 0;
          }

          to {
            max-height: ${cardHeight}px;
            opacity: 1;
          }
        }

        @keyframes slideout {
          from {
            max-height: ${cardHeight}px;
            opacity: 1;
          }

          to {
            max-height: 0px;
            opacity: 0;
          }
        }

        .details-container {
          max-height: none;
          animation: 0.5s 1 slidein;
          overflow: visible;

          border-top: solid 1px #e3e3e3;
          border-bottom: solid 1px #e3e3e3;
          display: flex;
          flex-direction: column;
        }

        .details-container.exit {
          max-height: 0;
          overflow: hidden;
          animation: 0.5s 1 slideout;
        }

        @media (max-width: 700px) {
          .amount {
            font-size: 14px;
            min-width: 110px;
            padding-left: 8px;
            padding-right: 2px;
          }

          .item {
            padding-left: 30px;
            background-position: 6px center;
          }

          .info-icon {
            width: 20px;
            height: 20px;
          }
        }

        @media (max-width: 500px) {
          .name {
            padding-left: 8px;
          }
          .item {
            background-position: 8px 19px;
          }
          .amount {
            min-width: 80px;
            padding-left: 20px;
            padding-right: 2px;
          }
          .info-icon {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default Row;