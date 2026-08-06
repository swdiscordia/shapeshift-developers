'use client'

import { useState } from 'react'

import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

const codePanels = [
  {
    label: 'GET /v1/assets',
    lines: [
      '$ # chains',
      'curl "https://api.shapeshift.com/v1/chains"',
      '',
      '# assets, filtered by chain',
      'curl "https://api.shapeshift.com/v1/assets\\',
      '  ?chainId=eip155:1&limit=100"',
      '',
      '# response · 200',
      '{',
      '  "assets": [{',
      '    "assetId": "eip155:1/slip44:60",',
      '    "chainId": "eip155:1",',
      '    "name": "Ethereum",',
      '    "symbol": "ETH",',
      '    "precision": 18,',
      '    "icon": "https://…/eth@2x.png"',
      '  }, …],',
      '  "timestamp": 1754241000000',
      '}',
    ],
  },
  {
    label: 'GET /v1/swap/rates',
    lines: [
      '$ curl "https://api.shapeshift.com/v1/swap/rates\\',
      '  ?sellAssetId=eip155:1/slip44:60\\',
      '  &buyAssetId=bip122:00000000...93/slip44:0\\',
      '  &sellAmountCryptoBaseUnit=1000000000000000000" \\',
      '  -H "X-API-Key: YOUR_KEY"',
      '',
      '# response · 200',
      '{',
      '  "rates": [{',
      '    "swapperName": "THORChain",',
      '    "rate": "0.04829",',
      '    "buyAmountCryptoBaseUnit": "4829000",',
      '    "steps": 1,',
      '    "estimatedExecutionTimeMs": 60000,',
      '    "affiliateBps": "10"',
      '  }, …one entry per swapper…],',
      '  "expiresAt": 1754241060000',
      '}',
    ],
  },
  {
    label: 'POST /v1/swap/quote',
    lines: [
      '$ curl -X POST "https://api.shapeshift.com/v1/swap/quote" \\',
      '  -H "X-API-Key: YOUR_KEY" \\',
      '  -H "Content-Type: application/json" \\',
      "  -d '{",
      '    "sellAssetId": "eip155:1/slip44:60",',
      '    "buyAssetId": "bip122:00000000...93/slip44:0",',
      '    "sellAmountCryptoBaseUnit": "1000000000000000000",',
      '    "receiveAddress": "bc1qar0s...f5mdq",',
      '    "swapperName": "Relay"',
      "  }'",
      '',
      '# response · 200',
      '{',
      '  "quoteId": "0f8e2b1a-…",',
      '  "swapperName": "Relay",',
      '  "rate": "0.04829",',
      '  "affiliateBps": "10",',
      '  "steps": [{',
      '    "transactionData": {',
      '      "to": "0xdef1c0de…", "data": "0x…",',
      '      "value": "1000000000000000000"',
      '    }',
      '  }],',
      '  "expiresAt": 1754241060000',
      '}',
    ],
  },
]

export function DevelopersApiSection(): ReactNode {
  const { api } = DEVELOPERS_DICT.page
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id={'api'} className={'container pt-[120px]'}>
      <div className={'mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-blue'}>{api.eyebrow}</div>
      <h2 className={'mb-4 text-[44px] font-bold leading-tight tracking-[-0.02em]'}>{api.title}</h2>
      <p className={'mb-14 max-w-[640px] text-lg leading-relaxed text-secondary'}>{api.description}</p>

      <div className={'grid grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_1.1fr]'}>
        <div>
          {api.endpoints.map((endpoint, index) => (
            <div
              key={endpoint.method}
              onClick={() => setActiveTab(index)}
              className={'grid cursor-pointer grid-cols-[44px_1fr] gap-0 border-t border-stroke py-6'}
            >
              <span
                className={
                  activeTab === index ? 'font-mono text-[13px] text-[#7FA3FF]' : 'font-mono text-[13px] text-gray-600'
                }
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className={'flex flex-col gap-2'}>
                <div className={'flex flex-wrap items-center gap-3'}>
                  <span
                    className={
                      activeTab === index
                        ? 'text-lg font-semibold tracking-[-0.01em] text-white transition-colors'
                        : 'text-lg font-semibold tracking-[-0.01em] text-gray-500 transition-colors'
                    }
                  >
                    {endpoint.title}
                  </span>
                  <span
                    className={
                      'whitespace-nowrap rounded-md bg-blue/10 px-2.5 py-1 font-mono text-[11.5px] text-[#7FA3FF]'
                    }
                  >
                    {endpoint.method}
                  </span>
                </div>
                <p className={'text-[14.5px] leading-relaxed text-gray-500'}>{endpoint.description}</p>
              </div>
            </div>
          ))}
          <div className={'border-t border-stroke pt-7'}>
            <Button href={'https://api.shapeshift.com/docs'} variant={'blue'} title={api.ctaButton} hasArrow />
          </div>
        </div>

        <div className={'sticky top-[120px] overflow-hidden rounded-2xl border border-stroke bg-[#0d1117]'}>
          <div className={'flex items-center gap-3.5 border-b border-stroke px-5 py-3.5'}>
            <div className={'flex gap-1.5'}>
              <span className={'size-2.5 rounded-full bg-stroke'} />
              <span className={'size-2.5 rounded-full bg-stroke'} />
              <span className={'size-2.5 rounded-full bg-stroke'} />
            </div>
            <span className={'font-mono text-xs text-gray-500'}>{codePanels[activeTab].label}</span>
          </div>
          <pre className={'overflow-x-auto whitespace-pre p-7 font-mono text-[12.5px] leading-[1.75] text-[#c9d1d9]'}>
            {codePanels[activeTab].lines.join('\n')}
          </pre>
        </div>
      </div>
    </section>
  )
}
