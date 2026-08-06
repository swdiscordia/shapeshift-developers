export const DEVELOPERS_DICT = {
  expand: {
    titleLine1: 'Build with',
    titleLine2: 'ShapeShift.',
    description: 'Explore API documentation, integration guides, and reference material for crypto applications.',
    ctaButton: 'View API Docs',
  },
  page: {
    hero: {
      eyebrow: 'For dApps, chains, and wallets',
      titlePrefix: 'Add ',
      titleHighlight: 'multichain swaps',
      titleSuffix: ' to your project',
      description:
        'Embed the ShapeShift widget or build on the swap API. 48+ chains, 30,000+ assets, and a revenue share on every swap your users make.',
      ctaWidget: 'Get the widget',
      ctaApi: 'Explore the API',
    },
    partnerLogos: {
      label: 'Routing across 18 protocols',
    },
    widget: {
      eyebrow: 'The widget',
      title: 'One iframe, every chain',
      description:
        'Drop the swap widget into your site and your users can trade across chains without leaving it. You keep the session, the brand, and a cut of the fee.',
      features: [
        {
          tag: '48+ chains',
          title: 'One integration, every route',
          description:
            'Bitcoin, Ethereum, Solana, Cosmos, and every major chain. Routing across 18 protocols is handled for you.',
        },
        {
          tag: 'Themeable',
          title: 'Matches your interface',
          description:
            'Colors, radius, and typography set from URL params. The widget reads your theme and disappears into your product.',
        },
        {
          tag: 'Revenue share',
          title: 'Earn on every swap',
          description:
            'Pass your affiliate code and a fee from every swap settles to your address, on-chain, with no invoicing.',
        },
      ],
      steps: [
        {
          number: '01',
          title: 'Get your affiliate code',
          description: 'Connect to the Partner Portal and register your code.',
        },
        {
          number: '02',
          title: 'Configure in the sandbox',
          description: 'Theme, default assets, affiliate code. The sandbox generates the embed.',
        },
        { number: '03', title: 'Paste the iframe', description: 'Swaps run and fees settle to your address.' },
      ],
      cardLabel: 'Shipping it',
      ctaButton: 'Open the widget sandbox',
    },
    api: {
      eyebrow: 'The API',
      title: 'Skip the UI and build your own',
      description:
        'The same routing engine behind the widget, exposed as a REST API. Non-custodial end to end: we return transactions, your users sign them.',
      endpoints: [
        {
          method: 'GET /v1/assets',
          title: 'List chains and assets',
          description: 'Enumerate what your users can trade, by CAIP-19 ID.',
        },
        {
          method: 'GET /v1/swap/rates',
          title: 'Fetch rates for a pair',
          description: 'One call returns a rate from every available swapper. No transaction yet.',
        },
        {
          method: 'POST /v1/swap/quote',
          title: 'Get an executable quote',
          description: 'Returns transaction data. Your user signs it in their own wallet, funds never touch us.',
        },
      ],
      ctaButton: 'View API docs',
    },
    economics: {
      eyebrow: 'Economics',
      title: 'How the revenue share works',
      description:
        'The partner dashboard is self-serve and already live. Connect, get an affiliate code, set your rate, and watch swaps come through.',
      steps: [
        {
          number: '01',
          title: 'Connect and get your code',
          description:
            'The partner dashboard is self-serve. Connect a wallet, get your affiliate code, pass it to the widget or API. Swaps start attributing to you from the first trade.',
        },
        {
          number: '02',
          title: 'Set your take rate',
          description:
            'Anywhere from 0 to 100 bps, changeable at any time in the dashboard. The fee applies to the swap amount and is added on top of the protocol fee.',
        },
        {
          number: '03',
          title: 'Watch it settle on-chain',
          description:
            'Full swap history in real time. Fees settle to your address as part of each transaction, with no invoicing and no payout schedule.',
        },
      ],
      banner: { label: 'See it before you integrate.', ctaButton: 'Partner portal' },
    },
    stats: {
      chains: { value: '48+', title: 'Supported chains' },
      assets: { value: '30,000+', title: 'Tradable assets' },
      volume: { value: '$1.7B+', title: 'Lifetime swap volume' },
    },
    faq: {
      title: 'Questions partners ask',
      items: [
        {
          question: 'Which chains are supported?',
          answer:
            'Bitcoin, Ethereum and the major L2s (Arbitrum, Base, Optimism), Solana, Avalanche, BNB Chain, Cosmos, and more. 48+ chains today, with new routes added as the underlying aggregators support them. The full, current list is served by the API: https://api.shapeshift.com/v1/chains',
        },
        {
          question: 'What does it cost to integrate?',
          answer:
            'Nothing. There is no license fee or API key charge. Your affiliate fee is added on top of the protocol fee and paid directly to you.',
        },
        {
          question: 'Who holds user funds?',
          answer:
            'Swaps are non-custodial end to end. Users sign transactions from their own wallets, and funds move directly through the underlying protocols.',
        },
        {
          question: 'What support do partners get?',
          answer:
            'Support does not stop at launch. Partners get a direct channel to our integration engineers for the lifetime of the integration, on both technical and marketing questions, plus example repos and a staging affiliate ID for testing.',
        },
      ],
    },
    cta: {
      title: 'Ship multichain swaps on your project',
      description: 'One iframe or one API. Either way, you earn on every swap.',
      ctaPrimary: 'Start building',
      ctaSecondary: 'Talk with us',
    },
  },
} as const
