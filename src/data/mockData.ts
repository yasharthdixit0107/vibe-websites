import { Product, Creator, DropEvent, Soundtrack, ReviewItem, CartItem } from '../types';

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoaUtb0CSeVm83s1TlOb0mZG4xl6hcavLpJbgGmjWsAOxYDNXn0ABIUEC_4R1FiNwOPe0JmUY2TnhSChH0WW81aQm_XtGhS4y2kRj8DzzMfH6H3rMewwNAthOBB19hMbPTznLOwelQpoMdRuO0G6UhEg_s6maO6jfH6qw44RmvMAq_aH9up8wj0R027fjMA1CmsKwPC6_LnEeDhUAAJVxZt2UppJMxeYAAAhR09soK7sATgUor85VI';

export const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnYlmhWUvTq4tw6sGswichIXB3AgAvgsQihIkE7GHMEbQQirlp-3OjFatL5YfS2M36ODyWf3wNGVR8ORxxYhBoY_kINxLTnm18P-52jWkTbq9F_pQPOnFEKyBJF6ym9I5JClE5oYl3F6nCGaw0_zfmAas3IqzRbz3Hm1U47UuhSIDIJu-1jQRgeJ5a1OHFRBLtwfvFPmj-3S8Zs0o-aQGSeRhsNSQWAgB_gYbLBM-W8L16bXoCVmCu';

export const HERO_PRODUCTS = [
  {
    id: 'sour-watermelon',
    name: 'SOUR WATERMELON CRUSH',
    series: 'Hydro Isolate',
    price: 44.99,
    tag: 'NEW DROP',
    tagColor: 'secondary' as const,
    tagRotate: '0deg',
    specs: ['25G ISOLATE', '0G SUGAR'],
    description: 'Tart jolly rancher vibes without the insulin crash.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJJKd43qA-vKHS2vNtbcAoL39k4oyKcSgXwIo3ksFJLqARD1DB5rwzpt_RxrfKFkGT_oWOF_pjpr1zW5LkvvuvT4FFJqVAirm8HFgYRd9HmIQvFr9UboU6BvHiyvinFjBFBezALY2MTP6AmkVY4Ie1_qEpKbrEVRIMGsKDZH-0VQeQHxTLWTJUFDTWvXSxFlGbt2nfLGinx1Mg4bp4fiT9uOlcyb34_k0DlHfv3smfjsQcabAoB-sD',
    alt: 'Futuristic neo-brutalist neon green and magenta metallic protein supplement tub labeled SOUR WATERMELON CRUSH'
  },
  {
    id: 'electric-matcha',
    name: 'ELECTRIC MATCHA MOCHI',
    series: 'Hydro Isolate',
    price: 46.99,
    subPrice: 35.99,
    tag: 'VIRAL #1 PICK',
    tagColor: 'primary' as const,
    tagRotate: '0deg',
    restocked: true,
    isCenterpiece: true,
    specs: ['CEREMONIAL MATCHA', '110 KCAL'],
    description: 'Infused with Uji green tea and sweet mochi cream undertones.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0JlLe8eLAcp86L1ewhWwaiN2nPLKoHi7nHKAnirmG99Ix5cXnkIbIAkWTm0HDkCZ2QLPGezBQErom1AuyN4HJNQjp7_j_atW0OyYzbcv9H1JVbTrls0txTrLur2IkYeAr62wSXlXMeq54BYarulSPP5HL5qf9ywZTzQB5QogYht_9K2oloDDhn-Cy1eRPHac9n3qK1x3sH_AFtVcMw3sb2nzzNh-IIjhpCXT1IfiD1Q7SOCE4QoQs',
    alt: 'Streetwear-styled neon cyber protein powder tub Electric Matcha Mochi'
  },
  {
    id: 'cinnamon-roll',
    name: 'CINNAMON ROLL DRIP',
    series: 'Hydro Isolate',
    price: 44.99,
    tag: 'BAKERY SPEC',
    tagColor: 'neutral' as const,
    tagRotate: '0deg',
    specs: ['BREAD PUDDING TEXTURE', 'NATURAL STEVIA'],
    description: 'Warm bakery cinnamon glaze with zero synthetic aftertaste.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvlyMlwS_6ClLY6Kzse7r_Q_zoG_xDX88fC0qcSidkRIjHysW2zctieCeIxI6cLYyuf9NYJ-tZqzKhqE7br4eISUxn38e3khi9bFzxwti_UpcZp6N0AB0SevYMXClDURZkAhNjycnRk2I4r3-pzFBrLfrCGVxWaRpN1RBBFsd9-3PiyZ8WQLI-Cp0i1ZNxDXsBfkTHYRX3ededmBjoHlhFa8stJEFdX6GQytdCoIsUhgyl2iggAvpP',
    alt: 'Collectible street supplement container Cinnamon Roll Drip with glossy frosting drip'
  }
];

export const HYPE_WALL_PRODUCTS: Product[] = [
  {
    id: 'sour-blue-gummy',
    name: 'SOUR BLUE RASPBERRY GUMMY',
    series: 'HYDRO ISOLATE',
    price: 44.99,
    servings: 30,
    protein: '25G PROTEIN',
    cals: '100 CALS',
    tag: 'MOST WANTED',
    tagRotate: '-3deg',
    tagColor: 'primary',
    category: 'whey-isolate',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKRGG1UsLIWKvj2bZbQlQYuhfyaFpnMHKSZiIsFBLyebpjH_OlWHQx-6xFLqvY7v4V9jBu4zXcqFl0NLk_kBoH7rGr4rgX1DNylpUOFBPhw2OH3YHsYe94ExlAloppXODSOrHFdE-JVx1shZUtFw9HcNctIK49z-ja4JA6WX07fIEzZd1FwTJkx8dFEJaW3p8jGihBfCqyGVULSZ4BlibUx8tPRPcmuTjnsXr4mHFOLM14WeFZAXoV',
    alt: 'Cylindrical supplement container Sour Blue Gummy Blast',
    description: 'Tart nostalgic blue gummy strings flavor distilled into pure cold micro-filtered whey peptides.'
  },
  {
    id: 'atomic-peach-ring',
    name: 'ATOMIC PEACH RING SURGE',
    series: 'ALL-OUT SERUM',
    price: 39.99,
    servings: 35,
    caffeine: '350MG CAFF',
    citrulline: '6G CITRULLINE',
    tag: 'PRE-WORKOUT',
    tagRotate: '2deg',
    tagColor: 'secondary',
    category: 'pre-workout',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhymWfkRSFRSxwh3SYIAfPI1byJhVJJr-EIEcAKLfu_7ZcleWlAMItVmE5f1M4OKen9fTfFhPtgIzy6RexUVVjRRqml8PdQQS1R6d4U3r-2iDGVJ61zTtqIfzZPzskprgOXLkWOgc6RUSEELYlFAHgpBpjpnFEVHHIchW3iFQJylmw8LqwPBfVOFYchZGwTU2iQUmV755IU9TxYCtEBKM_K8vXSdehTme8pOOsE2pflaRxdPkJw3Mj',
    alt: 'Brutalist neon-styled supplement tub All-Out High Stim Preworkout Atomic Peach Blast',
    description: 'Skin-splitting nitric oxide dilation matrix with clean tyrosine focus. Never crashes.'
  },
  {
    id: 'sour-apple-creatine',
    name: 'SOUR APPLE CREATINE GUMMIES',
    series: 'CREATINE FUEL',
    price: 34.99,
    servings: '120 GUMMIES',
    creapure: '5G CREAPURE',
    specBadge: 'ZERO WATER BLOAT',
    tag: 'CLEAN TREAT',
    tagRotate: '-1deg',
    tagColor: 'neutral',
    category: 'creatine',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQWxFBPqstOc_94F94SNHHwpowvLJovhmaYioJ61NyacvmxFJL4-Jk_2R5oQ6ZXyY2pO5-LtnOSYmEqL5-RkMxIWThWj9pNjjUXzHIopSG4_awO_7dg8xKnp97aZGR-i_uLCRt4XvVSMaB5inEI1EoOzVdQ-OQ8gxlzYEMvbILE-bZdr14RPIK-2a_T9k3pPZ6jhRK7-Eu_CIASTTOTJj6kvz0nfL_wP53BbEJI96OkMSdAYGaWI1- ',
    alt: 'Chunky pouch of Creatine Monohydrate Sour Green Apple Gummy Candies',
    description: 'Chewable Creapure monohydrate gummies that taste like candy-store green apple sour belts.'
  },
  {
    id: 'strawberry-cereal-milk',
    name: 'STRAWBERRY CEREAL MILK DRIP',
    series: 'HYDRO ISOLATE',
    price: 44.99,
    servings: 30,
    protein: '25G PROTEIN',
    specBadge: 'REAL FRUIT',
    tag: 'LIMITED FLAVOR',
    tagRotate: '3deg',
    tagColor: 'secondary',
    category: 'whey-isolate',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAweIMZVs_3NH8DnFqX7sSQy-uVieFub8IPPnF16Kq5795zX8Dqja_cY4Z2a4sCCfCs4mc1TFZp2ZsZ-8gLVFBq-y21zbQ9TRkDHJ70GCQUfHx3fGJ5d9IKnTV1TSDdBb3CMzKFtxrNteOtpjI_YVb6UyLja8bgwgviCj-P_d0ov1D8y-c92iIbqR1QvSmD15TXQjSTo7C9cSqCxZfFnAo_iq_U_yszhIqIkEl5MQqtdFriQXfIH05L',
    alt: 'Collectible neon magenta tub Strawberry Cereal Milk',
    description: 'Tastes exactly like the sweet pink milk leftover in your Saturday morning cartoon cereal bowl.'
  }
];

export const ALL_VAULT_PRODUCTS: Product[] = [
  {
    id: 'hyper-isolate-blue',
    name: 'HYPER-ISOLATE: BLUE RASPBERRY SLUSH',
    series: 'Whey Isolate Series',
    price: 44.99,
    subPrice: 35.99,
    servings: '30 SERVINGS',
    tag: 'BESTSELLER 🔥',
    tagRotate: '-2deg',
    tagColor: 'primary',
    claimedPercent: '92% CLAIMED',
    specBadge: '27G PROTEIN • 0G SUGAR',
    description: '100% micro-filtered whey isolate. Instant mixing with zero clumping and crisp authentic slushie finish.',
    category: 'whey-isolate',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqws6qWXz9VI89AFJlAz854535xkGUWZyI0SikcqzRgAIBbguKeROCIzy0o0P6hEAB87eBVd5OmKz1c9uzhcZkCPKFRjNI2nBMob5wUkUuotbCOsAZ1xKKHfF-Gkvu0JyEE-l5DLBD_K3i2xG_ThDC_4esAFO0-pWU5YIqBK9P6WUgw-bEDHL9KVDsgIGYzQ7oNOPXSfwJp_undVXGPJfs20h2OmJ8m-DjzZEN_xWjD29FxynANmLm',
    alt: 'HYPER-ISOLATE Blue Raspberry Slush protein tub'
  },
  {
    id: 'psychic-surge-green',
    name: 'PSYCHIC SURGE: SOUR GREEN APPLE',
    series: 'Pre-Workout Fuel',
    price: 39.99,
    subPrice: 31.99,
    servings: '35 SERVINGS',
    tag: 'HIGH CAFFEINE (300MG)',
    tagRotate: '1deg',
    tagColor: 'secondary',
    claimedPercent: 'RESTOCK DROP',
    specBadge: '6000MG CITRULLINE • L-TYROSINE',
    description: 'Laser-focused neuro-priming matrix with skin-splitting pump flow. Zero synthetic dye crash.',
    category: 'pre-workout',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2CMCrzQI1kAbwhgQICN6rzlf2YFSgjEXvOhg4xTlpwrr91wj6f6AxJL0eG6XxrxisQPl11g4npRRSgS0IXUEdbwiOdrgZVX4z5B5cq8G1BQH2RRgrIL0YdFufY--fvB3s52LP77CV25p_r97ZTmSNU_fqvf1lT_SkrtKe0I7QqXQdWKa5KmKkVwqe-mXsUEiAAkO4YoxLWnxmfuDXjmoB4zU105HpWNRacq5o8aXaEVIFoLEcjNzX',
    alt: 'Psychic Surge sour green apple pre-workout'
  },
  {
    id: 'creatine-gummies-peach',
    name: 'CREATINE HYDRO-GUMMIES: PEACH RINGS',
    series: 'Creatine Monohydrate',
    price: 29.99,
    subPrice: 23.99,
    servings: '120 GUMMIES',
    tag: 'VIRAL ON TIKTOK ⚡',
    tagRotate: '-1deg',
    tagColor: 'primary',
    claimedPercent: 'FEW LEFT',
    specBadge: '5G CREAPURE® MONOHYDRATE',
    description: 'Chewable high-absorption Creapure formula. Zero powder shaker mess, candy-grade taste profile.',
    category: 'creatine',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKJodC8vDV8ss3nnhVcqb6NvDAnNIwSG2pfgrPYZci9jRyU8l5bidSetFeYvSLX6m43FOsVB32ywZaZSuXeJc6vdUWPo3r6IlWGC72NG4OojW3gZe4whonTuU29ObeMvEyxMu0oLFf3kH_OBVInjA3MthRJrCrB8oZQbKNkND5hhM6o_dIZEsvx5MsxKqQJ2xVtifk9iGLoHfgpIPKOUQZhQ4mrNpEMdVMaWFFeohdVKxvkissu5uv',
    alt: 'Creatine Hydro-Gummies peach rings pouch'
  },
  {
    id: 'night-casein-churro',
    name: 'NIGHT REPAIR CASEIN: CHURRO DUNK',
    series: 'Recovery Blends',
    price: 46.99,
    subPrice: 37.99,
    servings: '28 SERVINGS',
    tag: 'SLOW RELEASE 🌙',
    tagRotate: '0deg',
    tagColor: 'neutral',
    claimedPercent: 'NIGHT LAB',
    specBadge: '25G MICELLAR CASEIN • MAGNESIUM',
    description: 'Sustained 8-hour amino drip with cinnamon sweet cream texture. Enhanced with zinc and sleep botanicals.',
    category: 'whey-isolate',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvESqSvqNn9mmovAIpoGdnqmxs9XPwWQrhCCxwpHJTqvdOdcleFE6gfuGuRkSzCHCtFCoGf6bXxInGR7Pt52YWWQkkrg9AsRZPDGruuGNfJc4AbnrzhZgiDWkT7reB6RreQxVMrz3E3iVPwUUIsUn4Hshqc3rSULwKdsIo-jKB_5jjuYqAZroWB8wf2DHDcOuRyZBptlty8AgREZOR2A3FstxtsNLBHBz3Vgb0NQmraidT3-bO55fL',
    alt: 'Night Repair Casein Churro Dunk tub'
  },
  {
    id: 'raw-iso-clear-mango',
    name: 'RAW ISO CLEAR: MANGO PASSION',
    series: 'Clear Isolate Line',
    price: 42.99,
    subPrice: 34.39,
    servings: '25 SERVINGS',
    tag: 'CLEAR JUICE TEXTURE 🥭',
    tagRotate: '2deg',
    tagColor: 'primary',
    claimedPercent: 'SUMMER DROP',
    specBadge: '22G PROTEIN • NOT MILKY',
    description: 'Drinks exactly like cold-pressed tropical juice. Zero milky aftertaste, ultra-rapid gastric transit.',
    category: 'whey-isolate',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh9kOP0Ck1ZWXLTIhRt7mYY0EH6zs2OzWMDPxbAlbOU9V8_x7L_ZR_UXwPKaGrU8MdELWx_LSVFQ-B4vukEY01DQXa_MRvHL9Bv6UIYQN3v2fSxe7tTYRYSLdCibVBpFY6ieSYRZuA9iRGjHz6NG88Ve6cYK_ajMcOOZ8FcIj-zuK_yZ9owt04Gu2HupR2lxakxnCf_l_0Se_JuU8K-u_SjapY-pQGaf3uVSap1Qnq9RmvrK0IkzEg',
    alt: 'Raw ISO Clear mango passion jug'
  },
  {
    id: 'hyper-hydrate-lemonade',
    name: 'HYPER-HYDRATE: PINK LEMONADE',
    series: 'Hydration Labs',
    price: 24.99,
    subPrice: 19.99,
    servings: '30 STICKS',
    tag: 'ZERO SUGAR 🍋',
    tagRotate: '-1deg',
    tagColor: 'secondary',
    claimedPercent: 'EVERYDAY RAW',
    specBadge: '1000MG ELECTROLYTES • REAL SALT',
    description: 'Complete mineral replenishment with Himalayan pink salt, magnesium glycinate, and bio-coconut water.',
    category: 'hydration',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB_QHBNoRTdb-GJ3mHTfXNfYf-RO7YN5w9o6SHfa2vH7kRL1lWBG4j3rQvvJ18eU3Hll_LyssLKUbUI_YiJ82HeCuz_p5EU6rGHir5euu61btfbeDTzc8DKhB6tAvf27b5h-24USFsKKsJ3tEcLEFGpjbzW1nk_xzexvE5csfjYF2vgdG6wve5NPWanNqx52mpTgwBtmQM8lTlU04lpFuGtcwb2KcnfyB3WT5WTJSsIcrvKH7vwKdT',
    alt: 'Pink lemonade electrolyte stick box'
  },
  {
    id: 'heavy-metal-shaker',
    name: 'HEAVY METAL SHAKER CUP 750ML',
    series: 'Gear & Hardware',
    price: 18.99,
    servings: 'PRO SERIES',
    tag: 'INSULATED ❄️',
    tagRotate: '0deg',
    tagColor: 'neutral',
    claimedPercent: 'HARDWARE',
    specBadge: '750ML • KEEPS ICE 24H',
    description: 'Kitchen-grade 18/8 stainless steel. Zero plastic odor absorption, leak-proof magnetic flip cap.',
    category: 'merch',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZT_ub9zgVat8RJVCgElD7VABeazGvIIbVxxwXNEbMOuU1DmdUnxQyhxDRCS9VExqXvtRc2Lcvk5dvqfdBSxBWGeSc_RI97nVv_ay_Z8UBFg4Y6bfI2U-nNIdhSVIZ4W9GM0J2k70how_jfxWviLMyw4kKHJM9rMjokZJSBHU0Z7rtsoxx1M5YZBnpK9d6ibF-sRNiPxGQ36oFsuV-EMqS4GZjRnvq65LEPcPX8r8245g-5jmPprTw',
    alt: 'Stainless steel black shaker cup'
  },
  {
    id: 'x-club-heavyweight-tee',
    name: 'X-CLUB HEAVYWEIGHT PUMP TEE',
    series: 'Streetwear Apparel',
    price: 38.00,
    servings: 'S / M / L / XL',
    tag: 'VINTAGE WASH 👕',
    tagRotate: '1deg',
    tagColor: 'secondary',
    claimedPercent: 'DROP EXCLUSIVE',
    specBadge: '280 GSM • BOXY PUMP COVER',
    description: 'Heavy 100% combed cotton jersey. Drop shoulder cut engineered specifically for peak gym aesthetics.',
    category: 'merch',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQU7TnqBiOBCgD24zWEkQ2n3KyszKeB8WrCUek6clNPM2M9SnsCO2oadBzUDpwiqXJad2eCNVOGohKJ6lvtmGx27v9L8UUJGCmmhDHdDUsd55pW6jA_MibQsftZ-a3cxGDoFqCnLwgUPGpusYbIAtf4-xsaQ0gN7aOr7TAyhj6_JDjnEcIuIwkxQhevRLV5sXoh9-Jrjn6INYni6_Ie2hqt7LkjTI4yroArJ5_imD_v7VE8EgH3ac6',
    alt: 'Oversized washed vintage black streetwear t-shirt'
  }
];

export const CREATORS_LIST: Creator[] = [
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    handle: '@marcus.lifts',
    niche: 'POWERLIFTER',
    code: 'MARCUS',
    tagline: 'IPF 83kg Competitor. "Lift stupid weights, drink clean fuel, skip the fluff."',
    favoriteStack: 'Sour Gummy Pre-Workout + Pure Isolate Van-Drop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA56-vUstqw3CsZVBnISwTJbH9BuHxz4ZTw6sLkdtVt6GmdnInOyHFfraVn-HfHU37FOtdyqBSkSOhpgNoI4pgGpLKBuhn78g1gATQ931bDziN9Bx-kKq9SilSptOQw507kLgyQILVhd3RPzN5Vg5Y2PkjXkeomFEavQVng79T7hVKaVUAK_Q_FyWJ8LJ_EDOIiyxlCtMbufWchS8xCLtXe3IL6vm3uzvWOKgocSGvrnEXgDIezRduH',
    category: 'powerlifting'
  },
  {
    id: 'chloe-ray',
    name: 'Chloe Ray',
    handle: '@chloe_hybrid',
    niche: 'HYBRID ATHLETE',
    code: 'HYBRID',
    tagline: 'Sub-3 Marathoner & 250lb Squatter. Redefining what high-volume endurance looks like.',
    favoriteStack: 'Hydro-Electrolyte Peach + Plant Protein Glaze',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcgzdPXQ6Cz3NrsguewZhu43MZtmWzug2BtpAxuYp50L2Lo8eHcEzsxSaBEayY-lFE1_YfWVg3PANgnldkjMRmwtbiaWQoTUW4TvWN4tREneew7i-R6ClIEg_MgIvcaggNWhH65wzMmfS-wT1ijR3IwlIuwb4G81TQfS0x5WnFkgzrVwPTdJjo7pUgv-ypqwp1bHBYgHi9KBMUlitQBpQfSR5oTBN6syeMb7CD4qRhpwTmKa1_ghrR',
    category: 'hybrid'
  },
  {
    id: 'kai-chen',
    name: 'Kai Chen',
    handle: '@kai.mobility',
    niche: 'MOBILITY & CALI',
    code: 'KAIFLOW',
    tagline: 'Zero stiffness dogma. Gymnastics rings champion & mindful kinetic conditioning.',
    favoriteStack: 'Pure Collagen Matrix + Matcha Kinetic Fuel',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzxzxB9Vs0QfFrmTxQqbZsevwWr1TwZzXxZURJFlo98P-g2ELtNmp9LsZCY4AU0STusZohDgPbDuGEk1Mx5hTqT8xHJvYoxTAAXJaol-hJKE3wNA3-yhG6nq6P1V5_trrPYSeYnRBxvBikVh6mBHoB4S3xclhO9LxvwV320onYmZD0k6Oxsj7Lt8hgWYWot6TaMVOvubxHzEdb7NyCsB5zvd5MqyH1AHwF8DyrPeQsLhUpi9HZq2f6',
    category: 'mobility'
  },
  {
    id: 'mia-sterling',
    name: 'Mia Sterling',
    handle: '@mia_kinetic',
    niche: 'CORE & REFORMER',
    code: 'MIAPULSE',
    tagline: 'Hyper-tempo reformer, tempo burnouts & unhinged post-workout smoothie bowls.',
    favoriteStack: 'Midnight Berry BCAA + Oat Cookie Crunch Isolate',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByZ-w4E4jzSGMR_Zs7C0L15C47nwi76cJTPfGv_8Sw6xvFIfD5ANipJutvAqem9BYAZH_okcKNjJqpVjmXWNE4XFNXf2bZdg-84N26eeWf-Ad2ikrQPpY187wl8Nwes6aaTOGojLjqF3riGEixVDSVji6EWXhGJ8oai8LEouy-phfBtsM_SFLqq0zD-RikN2xp3UHE-SZt-WHYw8S9CL7ss0OVi_HtCCymVFBLcx0cFHCKUBTAeHif',
    category: 'core'
  }
];

export const DROP_EVENTS: DropEvent[] = [
  {
    id: 'drop-01',
    date: 'MAY 15',
    time: '11:00 AM EST',
    title: 'Cyber Citrus Pre-Workout Drop',
    badge: 'DROP 01 • NEXT UP',
    badgeColor: 'bg-primary-container text-on-primary-fixed',
    badgeRotate: '-1deg',
    description: 'High-stimulant nootropic formula with sour yuzu, electric lime zest, and 350mg clean-release caffeine. Strictly 1,000 numbered units with holographic lids.',
    waitlistCount: 842,
    capacity: 1000,
    soldPercent: 84
  },
  {
    id: 'drop-02',
    date: 'MAY 28',
    time: '01:00 PM EST',
    title: 'Protein X x GymRat Heavyweight Pump Cover',
    badge: 'STREETWEAR MERCH',
    badgeColor: 'bg-secondary text-on-secondary',
    badgeRotate: '2deg',
    description: 'Custom 380GSM vintage-washed french terry oversized tee with puff-printed chrome bolt graphics. Built to survive brutal chalk sessions and wash cycles.',
    waitlistCount: 510,
    capacity: 800,
    soldPercent: 62
  },
  {
    id: 'drop-03',
    date: 'JUNE 05',
    time: 'DISCORD EXCLUSIVE',
    title: 'Mystery Sour Drop: Community Voted',
    badge: 'COMMUNITY CHOICE',
    badgeColor: 'bg-tertiary-container text-on-tertiary-container',
    badgeRotate: '-1deg',
    description: 'Voted 100% by the X-Club Discord. The winning formula is Sour Blue Electric Slushie Whey Isolate. Only accessible via token unlock.',
    waitlistCount: 1420,
    capacity: 1500,
    soldPercent: 95,
    exclusive: 'Discord Exclusive'
  }
];

export const SOUNDTRACKS: Soundtrack[] = [
  {
    id: 'phonk-prs',
    title: 'PHONK & PRs',
    genre: 'Drift Phonk & Brazilian Bass',
    bpm: '160 - 175 BPM',
    duration: '4 hr 28 min',
    description: 'Aggressive drift phonk, Brazilian bass, and raw distortion designed for heavy compound triples.',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApEfyO_AgH7hhkDyg9lT-XnJxyReZ7HU52lwp3JaBGWBqrCkpIHjKYT2-Dyy6_cqb2GNNZoBCRBZYZEmTRZOCJMBPjXc9NSO8llW4qPcwTSXbj3tEfOqeXtpxQjOmI3lluonNz1RXFSooOXlWTB6aGFUF4w6g7FPX-mMwbU_2Il7YSPMq7GREbcSZTu8nWNMQvM-AdjqVaEdJPXNB0menRLvNmgej-ofZd43iPoIHDFWDgy8ycF2DY',
    badgeColor: 'text-primary-container',
    audioTrackTitle: 'KORDHELL - PHONK DRIFT REMIX',
    artist: 'Curated by DJ KINETIC'
  },
  {
    id: 'pilates-hyperpop',
    title: 'PILATES & HYPERPOP',
    genre: 'Glitchcore & Fast Bubblegum',
    bpm: '140 - 150 BPM',
    duration: '3 hr 12 min',
    description: 'Rapid synth chords, high-octane bubbly vocals, and frantic percussion for core burnouts and tempo sprints.',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIbt5BJkA4a-AmXYxpJkRdf7Pa_I_ITUm-B-c6agSJJtCQWh8sWojbR9tp87NvMfzbGsLundGrn2oCWXYv7YwDdYMPCCKfV3vO9DufbL0fIgWle6izoYSJCLLxg0R-qSAeqvY-1QU3gqJKS65JnG4YMVa0rfVsQ0gArGy1IoOKnnsrgLtcD1FFxp6nv-5Tdzexy1CS8DBu8ApJ6KjJZzBv2i-4jXgOuv-UutmfGfvC6e7L_xj6sr9w',
    badgeColor: 'text-secondary',
    audioTrackTitle: 'HYPER-TEMPO BURNOUT PT. 2',
    artist: 'Curated by MIA STERLING'
  },
  {
    id: 'late-night-sessions',
    title: 'LATE NIGHT SESSIONS',
    genre: 'Berlin Industrial Techno',
    bpm: '138 - 145 BPM',
    duration: '5 hr 40 min',
    description: 'Berlin-style hypnotic techno, sub-heavy rumble kicks, and atmospheric drive for empty 2AM gym sessions.',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5LxUu17xxUJt_l3SnMwoPZU8ENH3qBogQTe7iyxmez9nXsQMxeFaTpuFC-kQpbeM7YSWWdYgy4eLEctltmrP-YOIuM1EjwV979VYNftC_Y9Z5KqkNhQbPBnj_zwu3ThARBVklqmLEwa6vwNDqLgpr7ePzFZSoVzjL5S01u3F9IFX4V4_90MTVipKBUMXfNJIEjTA0XFdL8WpAgy4z0il-kSNQlqishLWy0BexubRxKr2i8dT1bWji',
    badgeColor: 'text-tertiary-container',
    audioTrackTitle: 'SUB RUMBLE 04 - BASEMENT EDIT',
    artist: 'Curated by BERLIN UNDERGROUND'
  }
];

export const PDP_THUMBNAILS = [
  {
    id: 0,
    title: 'Product Front Angle',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABEgTgn_qNMm0jxLNj4wISesQKW7sXRQC1Cg6kzHZaoEpqHKpgIppUUC20mNL3da0d4GFmp3ZIb851E8HNOOEwwXbaSMH59e4FwRVTy0l4qyqsouYRsrsxsyxoDjs-5VqLZwGCn1lQD66f2zau-wZ2KmZK8gDzvOFsJeuGIONdZzpgXzUa6InRX5tvR88ArlMsI75bAN8XpdhegzwtUOZx5S5iVRvLTzXtsQNx7QIpoGG6hgmx6orb',
    mainSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAeumzXxGhEByO70915Bw8Qc74Qi6AwnrWNio8nnl8QNDcGHZoURQBZ6gqWlMRkFQ13CEnZV0aVCHe88sArz5vIHUoynDl1QS2t82K_fRyAYL9a2fOjgAsnyd691Lknl8taAUiZyrrfglyL87TWs1BQGgxuJH8Ef4D-Zd95BoqlA_KtUW7S0Owv1_7ldZd0uUYs5LZae8P3WUunSRSVT2t804VBQ-8PgT3sisSMjBuUKPqrzYb0O-q'
  },
  {
    id: 1,
    title: 'Powder Scoop Macro',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcp2mNiM_TEkk34ReN_OzJePU-64WwtACyt_xZlMh0D3vNi_dTrX49qsRxOM4SZA6T5uUWSWn4ZkY7xVEdPzlldjIn8rhs7AL6ZCk_NLFmHg9uTYuD7ySwcu2QtLapma9voXsjHRc1sz3B0V4vD6lmvVRoroyuBuFicBZkt1ROA_pgoepvq8OFsKhvpn1DrDKcRFORMCIZwNWWjolalNXuQA9Nkpw0hQinD3njlYnl057kjwH6GXvb',
    mainSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcp2mNiM_TEkk34ReN_OzJePU-64WwtACyt_xZlMh0D3vNi_dTrX49qsRxOM4SZA6T5uUWSWn4ZkY7xVEdPzlldjIn8rhs7AL6ZCk_NLFmHg9uTYuD7ySwcu2QtLapma9voXsjHRc1sz3B0V4vD6lmvVRoroyuBuFicBZkt1ROA_pgoepvq8OFsKhvpn1DrDKcRFORMCIZwNWWjolalNXuQA9Nkpw0hQinD3njlYnl057kjwH6GXvb'
  },
  {
    id: 2,
    title: 'Swirling Shaker Drink',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB38t8bsUCwTFjQPTMz4Bv95JkYbQojoDt1yeLIrUIkiGeoQqEWHKZF1vEu41P3d5KW2-9yKvZdYi4gtv-U-zVLVZvFdwiQ2EXIxVfkFmJPS8Lrl0jyl-PK8sIRpEN47Usf1EFQn3GSlBMOSQXBigWI1nBhm5c0O1kEP7_UoW8SOiWd5pV1lAXS4fBq2wJoIZWLaYm5nGEo6JNESlHq18bYl9wMP9EUFadrRA-EW1-whuXswfsVXhC3',
    mainSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB38t8bsUCwTFjQPTMz4Bv95JkYbQojoDt1yeLIrUIkiGeoQqEWHKZF1vEu41P3d5KW2-9yKvZdYi4gtv-U-zVLVZvFdwiQ2EXIxVfkFmJPS8Lrl0jyl-PK8sIRpEN47Usf1EFQn3GSlBMOSQXBigWI1nBhm5c0O1kEP7_UoW8SOiWd5pV1lAXS4fBq2wJoIZWLaYm5nGEo6JNESlHq18bYl9wMP9EUFadrRA-EW1-whuXswfsVXhC3'
  },
  {
    id: 3,
    title: 'Nutrition Facts Label',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp67zZEN89vAXR2ksRAYUsb8eosSusYvtFBRl_AIEm4XYQedr0FuPOYH6Dn35olVI_RLtWHMrhq8Cy0O-pkw-TU8uVo7xDd4636jL4-70eYpfN3BVO5Y493sx55WTnlcBTt9NB2m3s2VJYIpnyoZpBBzA_Hv6Rk7Vs9-DWmWXGdkZ7I08IR7m7exE3cMQQaHBsZUNDe3o0qjU9wcjJj_sVpdMvXEf0JEounhF91h81JlQ0TNogoJae',
    mainSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp67zZEN89vAXR2ksRAYUsb8eosSusYvtFBRl_AIEm4XYQedr0FuPOYH6Dn35olVI_RLtWHMrhq8Cy0O-pkw-TU8uVo7xDd4636jL4-70eYpfN3BVO5Y493sx55WTnlcBTt9NB2m3s2VJYIpnyoZpBBzA_Hv6Rk7Vs9-DWmWXGdkZ7I08IR7m7exE3cMQQaHBsZUNDe3o0qjU9wcjJj_sVpdMvXEf0JEounhF91h81JlQ0TNogoJae'
  },
  {
    id: 4,
    title: 'Gym Athlete In Action',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDZIPyfPXQTDcbwYEjxCJQiIqbl6q2pZ9rBaWJoCmcE7byuYFE951_cRCDMOclb_ALxsvKwXMPRUrEaPJT01-jpIuQG26qwbH9NGFN34Pm-yo8ajUNO2IVIzKZ57r3ToLeVNzwR-BdIoHTAlNE7HHEJfLr9MXfN3HbjJ2sX6PshA2n6zpUVORbBup-I5QIRezYE8fL3HOHbUIFR1XITYUXVvduPm4a6r2WUU6zzYMJ_yYMWKgMiwEa',
    mainSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDZIPyfPXQTDcbwYEjxCJQiIqbl6q2pZ9rBaWJoCmcE7byuYFE951_cRCDMOclb_ALxsvKwXMPRUrEaPJT01-jpIuQG26qwbH9NGFN34Pm-yo8ajUNO2IVIzKZ57r3ToLeVNzwR-BdIoHTAlNE7HHEJfLr9MXfN3HbjJ2sX6PshA2n6zpUVORbBup-I5QIRezYE8fL3HOHbUIFR1XITYUXVvduPm4a6r2WUU6zzYMJ_yYMWKgMiwEa'
  }
];

export const PDP_FLAVORS = [
  {
    id: 'matcha',
    name: 'ELECTRIC MOCHI MATCHA',
    tagline: 'Ceremonial Grade',
    color: '#c3f400',
    emoji: '🍵',
    glowColor: 'rgba(195, 244, 0, 0.35)'
  },
  {
    id: 'bluerasp',
    name: 'BLUE RASPBERRY SLUSH',
    tagline: 'Tart Sour Pop',
    color: '#3b82f6',
    emoji: '🫐',
    glowColor: 'rgba(59, 130, 246, 0.35)'
  },
  {
    id: 'fudge',
    name: 'DOUBLE FUDGE BATTER',
    tagline: 'Rich Dutch Cocoa',
    color: '#ffb1c3',
    emoji: '🍫',
    glowColor: 'rgba(255, 177, 195, 0.3)'
  },
  {
    id: 'strawb',
    name: 'STRAWBERRY MILK CRUSH',
    tagline: 'Sweet Cream Finish',
    color: '#ff4b89',
    emoji: '🍓',
    glowColor: 'rgba(255, 75, 137, 0.35)'
  },
  {
    id: 'caramel',
    name: 'SALTED CARAMEL BRIOCHE',
    tagline: 'Bakery Crust & Maldon Flakes',
    color: '#abd600',
    emoji: '🥐',
    glowColor: 'rgba(171, 214, 0, 0.3)'
  }
];

export const PDP_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'KAI VALENTINE',
    role: 'VERIFIED PURCHASER • MOCHI MATCHA',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmxAHqWI78vAtE8cevvQom2c9ZXMchVECdT8SODbi9FAPwt_dpiF72Cdox5rc79ZNTa1M4cokcyFqlbiSQP-FZFXePgcDzrUYFgn7Nx-7vAQRbfi7Fiq0MbdpZKNAyqYY3j13kL5P3TCowN-O_GfqkvN3SLvZlZS_qFY-100Prlt4SVJVgAZTA3HFF_UqGzXB9REbY0ZNaIugmiMqualvFIRviAjzpAaWP2n-n4QGw_Nx2HToyJgn3',
    flavor: 'matcha',
    rating: 5,
    title: '"LEGIT TASTES LIKE AN ICED MATCHA BOBA FROM SOHO"',
    content: "Every other protein brand's matcha tastes like sweet grassy swamp water. Protein X actually nailed the toasted mochi aroma and genuine bitter matcha note. Plus no gas or bloated gut after back-to-back double scoop training days."
  },
  {
    id: 'rev-2',
    name: 'ELENA ROSTOVA',
    role: 'MONTHLY X-CLUB MEMBER • 5 LBS JUMBO',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3JFF9s-evbWWTm2OpuRqHY4REAqrC-u_P9roXqP-5UsLN4OTpt4uNAB-e0rb1og0bRwEhQM8FGimMW5gjA8xMxKToJXCYSWp5E6Eot3HPFuHBc7kdgLowxLf-DZqvqvgjQD86UkbjwBkdS0kwtZBy2gBw4R8VxD_Jbqjl1MnRDzNXzzT6kUl9Jb3AwlZe0Cc4DCOsW5gh_H5hLVCLGBnKABnEARZa_XC8s60jUqwADHTTSxmlKPvk',
    flavor: 'matcha',
    rating: 5,
    title: '"FINALLY A ZERO-SUGAR FORMULA WITHOUT CHEMICAL AFTERTASTE"',
    content: 'Mixed it with cold almond milk and a shot of espresso for morning breakfast fuel. Dissolved completely in 5 shakes without any strainer ball. This is my 4th tub subscription.',
    userImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Iz37YQvxZWu-f_RhUp_uZVpkE8FjECahsAbKhY08-ZTOemFhzIgksFjLaT9HbgGjeenMz1UAPjkwjohgF6NiXAodSKNVTpiJE5fq9XLfxpkuk6PDBEXd-YEjObet-I49gyX2nZRRBM_OpnjGPSCjC0FTcY7BrZqCBJPPwmXOTDZ7VH_3wgssge5JnpbdvLvgzaBaAHm4kmsf2WMTRtYQHxQcDpVbY_n2WKLRocdJgujp8hwKX60r'
  },
  {
    id: 'rev-3',
    name: 'MARCUS CHEN',
    role: 'VERIFIED PURCHASER • BLUE RASPBERRY',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU4JQzI6d4yhd7XpE9YFdjL1H68MhqtsO4Vmx7zjWzWLYyHklXUB2fCBG7Rs4QJmFOM8vjjiKrs43qI_J8gKSps6bBve3S68q4MDGYT84dpsvmEvrBtTcs3gdw-ijf25kCZCWwP_kYuKC4n2fWEu6zHgtc2G59e_rvslSzT4lSXxGLTcCyGmRBeMswQEA5JEhCspDnLu0agpTr1KNOE5QRGU3EMjG6tBW7gmAuPx47hKzKT-0_rYnu',
    flavor: 'bluerasp',
    rating: 5,
    title: '"27G PROTEIN WITH ZERO DIGESTION BLOAT"',
    content: 'I have severe lactose sensitivity and used to stick strictly to gritty pea protein powders. Switched to this isolate because of the DigeZiBlend enzymes and my stomach has had zero issues. Pure cheat code.'
  }
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-1',
    product: HYPE_WALL_PRODUCTS[0],
    quantity: 1,
    flavor: 'Sour Blue Raspberry',
    size: '2.2 lbs',
    isSubscription: false,
    price: 44.99
  },
  {
    id: 'cart-2',
    product: ALL_VAULT_PRODUCTS[1],
    quantity: 1,
    flavor: 'Sour Green Apple',
    size: '35 Servings',
    isSubscription: true,
    price: 31.99
  },
  {
    id: 'cart-3',
    product: ALL_VAULT_PRODUCTS[6],
    quantity: 1,
    flavor: 'Matte Gunmetal',
    size: '750ml',
    isSubscription: false,
    price: 18.99
  }
];
