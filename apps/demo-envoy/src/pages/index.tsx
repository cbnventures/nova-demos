import {
  AppMarketDownload,
  BlogPreview,
  Canvas,
  Features,
  InstallStrip,
  Spotlight,
  Stats,
} from '@cbnventures/docusaurus-preset-nova/blocks';

import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';

import styles from './index.module.css';

/**
 * Pages - Home.
 *
 * Root landing page that composes the hero header, install strip, feature grid,
 * stats, spotlight, app market download, and blog preview using theme blocks.
 *
 * @constructor
 *
 * @since 2026.8.0
 */
function Home() {
  return (
    <Layout description={translate({
      id: 'home.layout.description',
      message: 'Envoy translates between systems that were never designed to understand each other. No shared format. No shared protocol. Just delivery.',
      description: 'Front page layout description (meta description for SEO)',
    })}
    >
      <Head>
        <title>
          {translate({
            id: 'home.head.title',
            message: 'Envoy - Messages Arrive',
            description: 'Front page browser tab title',
          })}
        </title>
      </Head>
      <Canvas container="full" surface="default" className={styles['hero']}>
        <div className={styles['heroInner']}>
          <div className={styles['heroGrid']}>
            <div className={styles['heroContent']}>
              <p className={styles['heroEyebrow']}>
                {translate({
                  id: 'home.hero.eyebrow',
                  message: 'Integration Infrastructure',
                  description: 'Front page hero eyebrow above the heading',
                })}
              </p>
              <h1 className={styles['heroHeading']}>
                {translate({
                  id: 'home.hero.heading',
                  message: 'Messages arrive. That is the entire product.',
                  description: 'Front page hero main heading',
                })}
              </h1>
              <p className={styles['heroTagline']}>
                {translate({
                  id: 'home.hero.tagline',
                  message: 'Envoy translates between systems that were never designed to understand each other. No shared format. No shared protocol. Just delivery.',
                  description: 'Front page hero tagline beneath the heading',
                })}
              </p>
              <div className={styles['heroActions']}>
                <Link className="nova-cta-primary" to="/docs/overview/">
                  {translate({
                    id: 'home.hero.ctaLabel',
                    message: 'Read the Docs',
                    description: 'Front page hero primary call-to-action button label',
                  })}
                </Link>
                <Link className="nova-cta-secondary" to="https://nova.cbnventures.io">
                  {translate({
                    id: 'home.hero.secondaryCtaLabel',
                    message: 'View on Threadbare',
                    description: 'Front page hero secondary call-to-action button label',
                  })}
                </Link>
              </div>
            </div>
            <div className={styles['heroPreview']}>
              <div className={styles['heroPreviewChrome']}>
                <span className={styles['heroPreviewDot']} aria-hidden="true" />
                <span className={styles['heroPreviewDot']} aria-hidden="true" />
                <span className={styles['heroPreviewDot']} aria-hidden="true" />
                <span>
                  {translate({
                    id: 'home.hero.preview.label',
                    message: 'relay.log',
                    description: 'Front page hero code preview panel window label',
                  })}
                </span>
              </div>
              <pre className={styles['heroPreviewCode']}>
                {[
                  '# Inbound webhook',
                  '{',
                  '  "event": "payment.failed",',
                  '  "customer": "cus_8fK2mN",',
                  '  "amount_due": 4800',
                  '}',
                  '',
                  '# Parcel rewrites, Cipher verifies, Dispatch routes',
                  '{',
                  '  "channel": "#billing-alerts",',
                  '  "text": "Payment failed — cus_8fK2mN — $48.00",',
                  '  "priority": 4',
                  '}',
                  '',
                  '# Delivered in 2.8ms. Courier confirms receipt.',
                ].join('\n')}
              </pre>
            </div>
          </div>
          <InstallStrip command="vial pull envoy" copyTarget="block" className={styles['heroInstallStrip']} />
        </div>
      </Canvas>
      <main>
        <Features
          items={[
            {
              icon: 'lucide:route',
              title: translate({
                id: 'home.features.dispatch.title',
                message: 'Dispatch',
                description: 'Front page Features card title for Dispatch',
              }),
              description: translate({
                id: 'home.features.dispatch.description',
                message: 'Intelligent routing engine. Inspects every incoming payload and routes by content, source, severity, or custom rules. First match wins. No ambiguity.',
                description: 'Front page Features card description for Dispatch',
              }),
            },
            {
              icon: 'lucide:repeat',
              title: translate({
                id: 'home.features.courier.title',
                message: 'Courier',
                description: 'Front page Features card title for Courier',
              }),
              description: translate({
                id: 'home.features.courier.description',
                message: 'Guaranteed-delivery retry engine. Exponential backoff with jitter, dead-letter queues for messages that will never arrive, and delivery receipts for every attempt.',
                description: 'Front page Features card description for Courier',
              }),
            },
            {
              icon: 'lucide:package',
              title: translate({
                id: 'home.features.parcel.title',
                message: 'Parcel',
                description: 'Front page Features card title for Parcel',
              }),
              description: translate({
                id: 'home.features.parcel.description',
                message: 'Payload transformation pipeline. Rewrites messages between formats — JSON to JSON, JSON to plaintext, XML to JSON. Field mapping, lossy and lossless modes.',
                description: 'Front page Features card description for Parcel',
              }),
            },
            {
              icon: 'lucide:lock',
              title: translate({
                id: 'home.features.cipher.title',
                message: 'Cipher',
                description: 'Front page Features card title for Cipher',
              }),
              description: translate({
                id: 'home.features.cipher.description',
                message: 'Authentication gateway. HMAC-SHA256 signatures, bearer tokens, and IP allowlists. Verifies source identity before a single byte reaches the transformation pipeline.',
                description: 'Front page Features card description for Cipher',
              }),
            },
            {
              icon: 'lucide:scroll-text',
              title: translate({
                id: 'home.features.ledger.title',
                message: 'Ledger',
                description: 'Front page Features card title for Ledger',
              }),
              description: translate({
                id: 'home.features.ledger.description',
                message: 'Full delivery audit trail. Every message received, transformed, routed, and delivered is recorded in an append-only log with configurable retention policies.',
                description: 'Front page Features card description for Ledger',
              }),
            },
            {
              icon: 'lucide:shield',
              title: translate({
                id: 'home.features.embassy.title',
                message: 'Embassy',
                description: 'Front page Features card title for Embassy',
              }),
              description: translate({
                id: 'home.features.embassy.description',
                message: 'Origin-masking reverse proxy. Keeps your internal services off the public internet. External sources hit Embassy. Internal services never know the outside exists.',
                description: 'Front page Features card description for Embassy',
              }),
            },
          ]}
        />
        <Stats
          heading={translate({
            id: 'home.stats.heading',
            message: 'By the Numbers',
            description: 'Front page Stats section heading',
          })}
          items={[
            {
              value: '8',
              label: translate({
                id: 'home.stats.translators.label',
                message: 'Protocol translators',
                description: 'Front page Stats label for protocol translator count',
              }),
              color: 'primary',
            },
            {
              value: '3MB',
              label: translate({
                id: 'home.stats.image.label',
                message: 'Vial image',
                description: 'Front page Stats label for Vial image size',
              }),
              color: 'accent',
            },
            {
              value: '0',
              label: translate({
                id: 'home.stats.dependencies.label',
                message: 'External dependencies',
                description: 'Front page Stats label for external dependency count',
              }),
              color: 'primary',
            },
            {
              value: '<5ms',
              label: translate({
                id: 'home.stats.latency.label',
                message: 'Relay latency',
                description: 'Front page Stats label for relay latency',
              }),
              color: 'accent',
            },
          ]}
        />
        <Canvas container="contained" surface="default">
          <div className={styles['canvasShowcase']}>
            <h2>
              {translate({
                id: 'home.canvas.heading',
                message: 'Built for the Last Mile',
                description: 'Front page Canvas section heading',
              })}
            </h2>
            <p className={styles['canvasShowcaseDescription']}>
              {translate({
                id: 'home.canvas.description',
                message: 'Envoy handles the part nobody wants to build — the translation layer between systems that refuse to agree on anything. Format, protocol, schema. Envoy negotiates all of it.',
                description: 'Front page Canvas section description',
              })}
            </p>
          </div>
        </Canvas>
        <Spotlight
          surface="alt"
          heading={translate({
            id: 'home.spotlight.heading',
            message: 'Translate, Route, Deliver',
            description: 'Front page Spotlight section heading',
          })}
        >
          <pre className="nova-code-snippet">
            {[
              '# Glassboard alert comes in',
              '{',
              '  "alertname": "HighCPU",',
              '  "severity": "critical",',
              '  "instance": "web-03.arcline.internal",',
              '  "value": "94.2%"',
              '}',
              '',
              '# Envoy transforms and routes to Canary',
              '{',
              '  "title": "[critical] HighCPU",',
              '  "body": "web-03.arcline.internal — CPU at 94.2%",',
              '  "priority": 5,',
              '  "tags": ["rotating_light"]',
              '}',
              '',
              '# Delivered in 3.1ms. Courier confirms receipt.',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            {translate({
              id: 'home.spotlight.description',
              message: 'Glassboard fires the alert. Envoy translates the payload, routes it to the right Canary topic, and confirms delivery. Neither side knows the other exists.',
              description: 'Front page Spotlight description paragraph below the code snippet',
            })}
          </p>
        </Spotlight>
        <AppMarketDownload
          label={translate({
            id: 'home.appMarket.label',
            message: 'Get delivery notifications',
            description: 'Front page AppMarketDownload label',
          })}
          appStoreUrl="#"
          googlePlayUrl="#"
        />
        <BlogPreview
          heading={translate({
            id: 'home.blogPreview.heading',
            message: 'Dispatches from the Relay Room',
            description: 'Front page BlogPreview section heading',
          })}
          description={translate({
            id: 'home.blogPreview.description',
            message: 'Release notes, integration deep dives, and the occasional dispatch from the relay room.',
            description: 'Front page BlogPreview section description',
          })}
          auto={true}
          limit={3}
        />
      </main>
    </Layout>
  );
}

export default Home;
