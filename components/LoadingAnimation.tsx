"use client";

/**
 * LoadingAnimation — Uses the real logo.png as a CSS mask.
 * A gold gradient rises from bottom to top through the actual logo shape,
 * creating a liquid fill effect. Pure CSS, no SVG recreation needed.
 */
export default function LoadingAnimation() {
  return (
    <div className="loading-animation-wrapper">
      <div className="loading-logo-stage">
        {/* Base layer: navy logo (always visible) */}
        <div className="logo-layer logo-navy" />

        {/* Gold fill layer: masked by logo shape, animated bottom→top */}
        <div className="logo-layer logo-gold-fill">
          <div className="gold-liquid" />
        </div>
      </div>

      <p className="loading-text">Analyse en cours...</p>

      <style>{`
        .loading-animation-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .loading-logo-stage {
          position: relative;
          width: 100px;
          height: 100px;
        }

        .logo-layer {
          position: absolute;
          inset: 0;
          -webkit-mask-image: url("/logo.png");
          mask-image: url("/logo.png");
          -webkit-mask-size: contain;
          mask-size: contain;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
        }

        /* Navy base — always fully visible */
        .logo-navy {
          background: #1B2A4A;
        }

        /* Gold fill container — also masked by logo */
        .logo-gold-fill {
          overflow: hidden;
        }

        /* The rising gold rectangle */
        .gold-liquid {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100%;
          background: linear-gradient(
            to top,
            #BF9B51 0%,
            #D4B878 40%,
            #E8CC8A 70%,
            #F0DDA0 85%,
            rgba(240, 221, 160, 0.6) 95%,
            transparent 100%
          );
          animation: liquid-rise 3s ease-in-out infinite;
          transform: translateY(100%);
        }

        @keyframes liquid-rise {
          0% {
            transform: translateY(100%);
          }
          40% {
            transform: translateY(0%);
          }
          60% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        /* Shimmer on top of the gold */
        .gold-liquid::after {
          content: "";
          position: absolute;
          top: 0;
          left: -50%;
          width: 200%;
          height: 8px;
          background: linear-gradient(
            90deg,
            transparent 20%,
            rgba(255, 255, 255, 0.5) 50%,
            transparent 80%
          );
          filter: blur(3px);
          animation: shimmer-move 2s ease-in-out infinite;
        }

        @keyframes shimmer-move {
          0%, 100% { transform: translateX(-30%); }
          50% { transform: translateX(30%); }
        }

        /* Drop shadow glow synced with fill */
        .loading-logo-stage {
          filter: drop-shadow(0 4px 15px rgba(191, 155, 81, 0.15));
          animation: glow-pulse 3s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 4px 15px rgba(191, 155, 81, 0.1)); }
          50% { filter: drop-shadow(0 4px 25px rgba(191, 155, 81, 0.3)); }
        }

        @keyframes text-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .loading-text {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #1B2A4A;
          animation: text-pulse 2s ease-in-out infinite;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
