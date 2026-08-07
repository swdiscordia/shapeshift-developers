export const DEVELOPERS_DICT = {
  expand: {
    titleLine1: 'Build with',
    titleLine2: 'ShapeShift.',
    description: 'Explore API documentation, integration guides, and reference material for crypto applications.',
    ctaButton: 'View API Docs',
  },
  page: {
    hero: {
      eyebrow: 'ShapeShift Widget + API',
      titlePrefix: 'Add ',
      titleHighlight: 'multichain swaps',
      titleSuffix: ' to your product',
      description:
        'Launch fast with our ready-to-embed Widget or build a fully custom experience with the API. One integration, 48+ chains, non-custodial execution, and partner revenue on every swap.',
      ctaWidget: 'Explore the Widget',
      ctaApi: 'Explore the API',
    },
    partnerLogos: {
      label: 'Routing across 18 protocols',
    },
    widget: {
      eyebrow: 'The widget',
      title: 'A complete swap experience, ready to embed',
      description:
        'Configure the ShapeShift Widget to match your product, choose the default assets, and ship multichain swaps without building the interface or routing logic.',
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
        { number: '03', title: 'Add the embed', description: 'Swaps run and fees settle to your address.' },
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
        'One partner code follows every swap from your product to on-chain settlement. No invoice, no payout schedule.',
      steps: [
        {
          number: '01',
          title: 'Add your partner code',
          description: 'Create it in the partner portal, then add it once to the Widget or API.',
        },
        {
          number: '02',
          title: 'ShapeShift routes the swap',
          description: 'Your user gets the best available route while the trade stays attributed to you.',
        },
        {
          number: '03',
          title: 'Your fee settles on-chain',
          description: 'Choose 0–100 bps. Your share lands directly in your wallet with every swap.',
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
