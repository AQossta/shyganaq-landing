import { useCallback, useEffect, useRef, useState } from 'react';

type IconName =
  | 'arrow'
  | 'close'
  | 'earth'
  | 'grain'
  | 'leaf'
  | 'menu'
  | 'pin'
  | 'recycle';

type Destination = {
  title: string;
  eyebrow: string;
  image: string;
  description: string;
  detail: string;
  location?: string;
  objectPosition?: string;
};

const images = {
  steppe:
    'https://images.unsplash.com/photo-1764521970660-fc4d6e493425?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1800',
  millet:
    'https://images.unsplash.com/photo-1672415505494-64f6ec38b564?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=900',
  honey:
    'https://images.unsplash.com/photo-1773957949275-da0b3c04647e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=900',
  walnut:
    'https://images.unsplash.com/photo-1571645099557-18b03f72c3e3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=900',
  fruits:
    'https://images.unsplash.com/photo-1781773338966-373f0b949645?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=900',
  waterfall:
    'https://images.unsplash.com/photo-1482685945432-29a7abf2f466?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=84&w=1200',
  mausoleum:
    'https://images.unsplash.com/photo-1651515089125-e73c19f1dedf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=84&w=1200',
  village:
    'https://images.unsplash.com/photo-1786992689952-a4986cd2efa0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=84&w=1200',
};

const ingredients = [
  {
    number: '01',
    name: 'Тары',
    image: images.millet,
    description:
      'Қазақ даласының дәстүрлі дақылы. Өнімнің негізгі құрамдас бөлігі әрі ұлттық тағам мәдениетінің символы.',
  },
  {
    number: '02',
    name: 'Табиғи бал',
    image: images.honey,
    description:
      'Табиғи тәтті дәм мен хош иіс қосады. Ингредиенттерді біріктіруге көмектеседі.',
  },
  {
    number: '03',
    name: 'Грек жаңғағы',
    image: images.walnut,
    description:
      'Өнімге қытырлақ құрылым мен жаңғақтың ерекше дәмін береді.',
  },
  {
    number: '04',
    name: 'Кептірілген жемістер',
    image: images.fruits,
    description:
      'Табиғи жеміс дәмін, хош иісін және түрлі текстураны толықтырады.',
  },
];

const destinations: Destination[] = [
  {
    title: 'Қасқыр сарқырамасы',
    eyebrow: 'Табиғат көрінісі',
    image: images.waterfall,
    location: 'Ақтөбе өңірі',
    description:
      'Табиғаттың ерекше көрінісін тамашалап, жартастар мен су ағысының үйлесімін сезінуге мүмкіндік беретін көрікті мекен.',
    detail:
      'Бұл бағыт өңірдің табиғи болмысын сезінуге шақырады. Сапар алдында жергілікті ресми дереккөздерден жол жағдайы мен бару тәртібін нақтылаған жөн.',
  },
  {
    title: 'Абат-Байтақ кесенесі',
    eyebrow: 'Тарих пен сәулет үндестігі',
    image: images.mausoleum,
    description:
      'XIV–XV ғасырлармен байланысты сәулет ескерткіші. Кесене – өңірдің тарихи жадын, сәулет өнері мен рухани мұрасын танытатын маңызды орын.',
    detail:
      'Абат-Байтақ кесенесі арқылы Батыс Қазақстанның көне сәулет дәстүрі мен дала мәдениетінің тарихи сабақтастығын тануға болады.',
  },
  {
    title: 'Шығанақ Берсиев ауылы',
    eyebrow: 'Еңбек даңқының мекені',
    image: images.village,
    description:
      'Қазақтың әйгілі тары өсірушісі Шығанақ Берсиевтің есімімен байланысты мекен. Бұл жер еңбек дәстүрі мен дала мәдениетінің тарихын таныстыруға мүмкіндік береді.',
    detail:
      'Ауыл тарихы тары өсіру мәдениетімен, Ойыл өңірінің еңбек дәстүрімен және Шығанақ Берсиевтің өнегелі мұрасымен сабақтас.',
  },
  {
    title: 'Сүлеймен ата',
    eyebrow: 'Рухани мұра мен тағылым',
    image: images.steppe,
    description:
      'Өңірдің рухани-мәдени мұрасымен байланысты орын. Бұл бағыт арқылы жергілікті тарих пен ел жадында сақталған дәстүрлерді тереңірек тануға болады.',
    detail:
      'Сүлеймен атаға қатысты бағыт өңірдің рухани жадын құрметпен танып-білуге мүмкіндік береді. Мұндағы сурет нақты нысанның фотосы емес, өңір табиғатын жеткізетін иллюстрация.',
    objectPosition: 'center 64%',
  },
];

const navItems = [
  ['Басты бет', 'basty'],
  ['Өнім туралы', 'onim'],
  ['Құрамы', 'kuramy'],
  ['Экология', 'ekologia'],
  ['Туристік бағыттар', 'sayahat'],
];

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    earth: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    grain: <><path d="M12 21V7" /><path d="M12 10C8 10 6 8 6 5c4 0 6 2 6 5ZM12 15c4 0 6-2 6-5-4 0-6 2-6 5ZM12 19c-4 0-6-2-6-5 4 0 6 2 6 5Z" /></>,
    leaf: <><path d="M20 4C12 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-16Z" /><path d="M5 20c3-5 7-8 12-11" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    recycle: <><path d="m9 5 3-3 3 3M12 2v6M19 9l3 1-1 4M22 10l-5 3M5 19l-1-4 4-1M4 19l5-3" /><path d="M7 7a7 7 0 0 0-2 5M17 17a7 7 0 0 1-5 2M18 7a7 7 0 0 1 1 2" /></>,
  };
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Logo({ light = false, onNavigate }: { light?: boolean; onNavigate?: () => void }) {
  return (
    <a className={`logo ${light ? 'logo-light' : ''}`} href="#basty" aria-label="SHYGANAQ — басты бет" onClick={onNavigate}>
      <span className="logo-mark"><Icon name="grain" /></span>
      <span>
        <strong>SHYGANAQ</strong>
        <small>DALADAN · 1943</small>
      </span>
    </a>
  );
}

function ButtonLink({
  children,
  href,
  secondary = false,
  light = false,
}: {
  children: React.ReactNode;
  href: string;
  secondary?: boolean;
  light?: boolean;
}) {
  return (
    <a className={`button ${secondary ? 'button-secondary' : ''} ${light ? 'button-light' : ''}`} href={href}>
      <span>{children}</span><Icon name="arrow" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus({ preventScroll: true });
    };
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1101px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    const frame = window.requestAnimationFrame(() => navRef.current?.querySelector('a')?.focus({ preventScroll: true }));
    document.body.classList.add('menu-open');
    window.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [open]);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="nav-shell">
        <Logo onNavigate={() => setOpen(false)} />
        <nav id="main-navigation" ref={navRef} className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Негізгі навигация">
          {navItems.map(([label, id]) => (
            <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="mobile-cta" href="#sayahat" onClick={() => setOpen(false)}>Өңірді зерттеу</a>
        </nav>
        <div className="nav-actions">
          <a className="nav-cta" href="#sayahat">Өңірді зерттеу <Icon name="arrow" /></a>
          <button
            ref={toggleRef}
            className="menu-button"
            type="button"
            aria-label={open ? 'Мәзірді жабу' : 'Мәзірді ашу'}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}

function SectionTitle({
  label,
  title,
  intro,
  light = false,
}: {
  label: string;
  title: string;
  intro?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading reveal ${light ? 'light' : ''}`}>
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function ProductMockup({ small = false }: { small?: boolean }) {
  return (
    <div className={`product-scene ${small ? 'product-scene-small' : ''}`} aria-label="SHYGANAQ қаптамасының дизайн-тұжырымдамасы">
      <div className="grain-halo" />
      <div className="snack-bar">
        <span /><span /><span /><span />
      </div>
      <div className="pack">
        <div className="pack-top">ТАБИҒИ ТАРЫ ӨНІМІ</div>
        <div className="pack-ornament">✦</div>
        <strong>SHYGANAQ</strong>
        <em>даланың дәмі</em>
        <div className="pack-line" />
        <small>ТАРЫ · БАЛ · ЖАҢҒАҚ</small>
      </div>
      {!small && <span className="concept-label">Қаптама дизайн-тұжырымдамасы</span>}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="basty">
      <img className="hero-bg" src={images.steppe} alt="Көкжиекке ұласқан алтын түсті дала" />
      <div className="hero-overlay" />
      <div className="ornament ornament-hero" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-copy">
          <span className="hero-label">АҚТӨБЕ ӨҢІРІНІҢ ТАБИҒИ МҰРАСЫ</span>
          <h1>SHYGANAQ</h1>
          <p className="hero-script">«Аңызбен танысу»</p>
          <p className="hero-lead">Тарының дәмі. Даланың тарихы.<br />Ұрпаққа жалғасқан мұра.</p>
          <div className="hero-actions">
            <ButtonLink href="#kuramy" light>Өніммен танысу</ButtonLink>
            <ButtonLink href="#mura" secondary light>Тарихты ашу</ButtonLink>
          </div>
        </div>
        <div className="hero-product"><ProductMockup /></div>
        <div className="hero-story">
          <span className="story-year">1943</span>
          <p>Ойыл өңірінде Шығанақ Берсиев гектарынан 201 центнер өнім алып, әлемдік рекорд орнатты.</p>
        </div>
      </div>
      <div className="hero-bottom">
        <p>Бұл жай ғана тағам емес. Бұл – Ақтөбе жерінің тарихы мен мәдениеті.</p>
        <a href="#mura" aria-label="Келесі бөлімге өту">ТӨМЕН ЖЫЛЖЫҢЫЗ <span>↓</span></a>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="story section" id="mura">
      <div className="story-grid">
        <div className="story-visual reveal">
          <img src={images.steppe} alt="Алтын түсті егін алқабы мен кең дала" />
          <div className="story-caption">
            <span>ОЙЫЛ · АҚТӨБЕ ӨҢІРІ</span>
            <p>Еңбек пен жерге деген құрметтен туған тарих</p>
          </div>
          <div className="vertical-word">МҰРА</div>
        </div>
        <div className="story-content">
          <SectionTitle label="01 · БРЕНД ТАРИХЫ" title="Тарихтан басталған дәм" />
          <p className="story-text reveal">
            Шығанақ Берсиев – тары өсірудің шебері, қазақ даласының еңбекқорлығы мен
            табандылығын әлемге танытқан тұлға. 1943 жылы Ойыл өңірінде гектарына
            201 центнер тары өнімін алып, рекордтық нәтижеге қол жеткізді.
          </p>
          <div className="timeline reveal">
            <span className="timeline-dot" />
            <span className="timeline-line" />
            <span className="timeline-dot" />
            <div className="timeline-labels"><span>Өткеннің өнегесі</span><span>Бүгінгі табиғи дәм</span></div>
          </div>
          <div className="stats reveal">
            <div><strong>1943</strong><span>тарихи рекорд орнатылған жыл</span></div>
            <div><strong>201 <small>ц/га</small></strong><span>тары өнімділігі</span></div>
            <div><strong>Ойыл</strong><span>тарихи мұраның мекені</span></div>
          </div>
          <blockquote className="reveal">
            «SHYGANAQ – өткеннің өнегесін бүгінгі күннің табиғи дәмімен байланыстыратын жоба.»
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function Ingredients() {
  return (
    <section className="ingredients section" id="kuramy">
      <div className="section-shell">
        <SectionTitle
          label="02 · ҚҰРАМЫ"
          title="Табиғаттан туған төрт дәм"
          intro="Әр ингредиенттің өз орны бар. Әр дәмнің өз тарихы бар."
        />
        <div className="ingredient-grid">
          {ingredients.map((item) => (
            <article className="ingredient-card reveal" key={item.name}>
              <div className="ingredient-image">
                <img src={item.image} alt={`${item.name} — өнім ингредиенті`} loading="lazy" />
                <span>{item.number}</span>
              </div>
              <div className="ingredient-copy">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="ingredient-line" />
              </div>
            </article>
          ))}
        </div>
        <div className="philosophy reveal">
          <span className="ornament-symbol">✦</span>
          <p>Қарапайым құрам. <em>Табиғи дәм.</em> Ұлттық тамыр.</p>
          <span className="ornament-symbol">✦</span>
        </div>
      </div>
    </section>
  );
}

function Product({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="product section" id="onim">
      <div className="product-layout">
        <div className="product-copy">
          <SectionTitle label="03 · SHYGANAQ ӨНІМІ" title="Дәстүрдің жаңа дәмі" light />
          <p className="reveal">Қазақтың дәстүрлі тарысын заманауи өнім форматында ұсынатын ерекше жоба.</p>
          <ul className="product-notes reveal">
            <li><span>01</span> Жергілікті тарихтан нәр алған тұжырым</li>
            <li><span>02</span> Төрт табиғи ингредиенттің үйлесімі</li>
            <li><span>03</span> Ұлттық нақыштағы заманауи қаптама</li>
          </ul>
          <button className="button button-light" type="button" onClick={onOpen}>
            <span>Өнім туралы білу</span><Icon name="arrow" />
          </button>
        </div>
        <div className="product-stage reveal">
          <ProductMockup />
          <div className="product-stamp"><Icon name="grain" /><span>ДАЛА<br />ДӘМІ</span></div>
        </div>
      </div>
    </section>
  );
}

function Ecology() {
  const features = [
    ['leaf', 'Табиғатқа құрмет', 'Табиғи ресурстарға жауапкершілікпен қарау.'],
    ['recycle', 'Қайта өңдеуге бағытталған қаптама', 'Материалдарды қайта пайдалануға және қалдықты азайтуға назар аудару.'],
    ['earth', 'Саналы тұтыну', 'Өнім таңдауда экологиялық жауапкершілікті ескеру.'],
  ] as const;
  return (
    <section className="ecology section" id="ekologia">
      <div className="eco-shell">
        <div className="eco-intro">
          <SectionTitle label="04 · ЭКОЛОГИЯ" title="Табиғатты қорғай отырып" light />
          <p className="reveal">Біз үшін табиғи өнімнің құндылығы оның құрамымен ғана шектелмейді. Қоршаған ортаға жауапкершілікпен қарау да маңызды.</p>
        </div>
        <div className="eco-highlight reveal">
          <span>БІЗДІҢ ҰСТАНЫМ</span>
          <strong>Қаптама – 100% экологиялық таза және қайта өңдеуге жарамды.</strong>
        </div>
        <div className="eco-features">
          {features.map(([icon, title, text], i) => (
            <article className="eco-card reveal" key={title}>
              <div className="eco-number">0{i + 1}</div>
              <div className="eco-icon"><Icon name={icon} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tourism({ onSelect }: { onSelect: (destination: Destination) => void }) {
  return (
    <section className="tourism section" id="sayahat">
      <div className="section-shell">
        <div className="tourism-heading">
          <SectionTitle label="05 · АҚТӨБЕ ӨҢІРІ" title="Біздің өңірге келіңіз" />
          <p className="reveal">Ақтөбе өңірінің табиғи сұлулығын, тарихи орындарын және ұрпақтан ұрпаққа жалғасқан аңыздарын таныңыз.</p>
        </div>
        <div className="destination-grid">
          {destinations.map((item, i) => (
            <article className={`destination-card reveal destination-${i + 1}`} key={item.title}>
              <div className="destination-photo">
                <img
                  src={item.image}
                  alt={`${item.title} бағытын бейнелейтін көрнекі иллюстрация`}
                  loading="lazy"
                  style={{ objectPosition: item.objectPosition }}
                />
                <span className="image-note">КӨРНЕКІ ИЛЛЮСТРАЦИЯ</span>
                <span className="destination-index">0{i + 1}</span>
              </div>
              <div className="destination-content">
                <span className="destination-eyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                {item.location && <span className="location"><Icon name="pin" />{item.location}</span>}
                <p>{item.description}</p>
                <div className="destination-actions">
                  <button type="button" onClick={() => onSelect(item)}>Толығырақ <Icon name="arrow" /></button>
                  <a href="#map">Бағытты зерттеу</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="tourism-closing reveal">Әр сапар – жаңа әсер. <em>Әр мекен – өзіндік тарих.</em></p>
      </div>
    </section>
  );
}

function MapSection({ onSelect }: { onSelect: (destination: Destination) => void }) {
  return (
    <section className="map-section section" id="map">
      <div className="map-shell">
        <div className="map-copy">
          <SectionTitle label="06 · БАҒЫТТАР" title="Ақтөбені жаңаша таныңыз" light />
          <p className="reveal">Ойыл өңірінің тарихы мен табиғатын бір сапардың мазмұнына біріктіріңіз.</p>
          <span className="map-disclaimer reveal">Бұл — географиялық навигация емес, өңірді таныстыруға арналған иллюстрациялық карта.</span>
        </div>
        <div className="illustrative-map reveal" aria-label="Ақтөбе өңірінің иллюстрациялық картасы">
          <div className="map-river" />
          <div className="map-label-main">АҚТӨБЕ<br /><small>ӨҢІРІ</small></div>
          {destinations.map((item, i) => (
            <button
              className={`map-marker marker-${i + 1}`}
              type="button"
              key={item.title}
              onClick={() => onSelect(item)}
              aria-label={`${item.title} туралы оқу`}
            >
              <span>{i + 1}</span><strong>{item.title}</strong>
            </button>
          ))}
          <span className="map-oyil">ОЙЫЛ АУДАНЫ</span>
          <div className="compass"><span>С</span><i /></div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta">
      <img src={images.steppe} alt="" loading="lazy" />
      <div className="final-overlay" />
      <div className="final-product reveal"><ProductMockup small /></div>
      <div className="final-content reveal">
        <span className="eyebrow">ДАЛА ДӘМІ · ДАЛА ТАРИХЫ</span>
        <h2>Бір дәмнен басталатын<br /><em>үлкен тарих</em></h2>
        <p>SHYGANAQ арқылы қазақ даласының бай мұрасын танып, Ақтөбе өңірінің ерекше мекендерін ашыңыз.</p>
        <div className="hero-actions">
          <ButtonLink href="#sayahat" light>Туристік бағыттарды көру</ButtonLink>
          <ButtonLink href="#mura" secondary light>SHYGANAQ тарихын оқу</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div><Logo light /><p>Ұлттық мұра. Табиғи дәм. Жаңа көзқарас.</p></div>
        <div className="footer-nav">
          <strong>НАВИГАЦИЯ</strong>
          {navItems.slice(0, 4).map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </div>
        <div className="footer-nav">
          <strong>ӨҢІРДІ ТАНУ</strong>
          <a href="#sayahat">Туристік бағыттар</a>
          <a href="#map">Иллюстрациялық карта</a>
          <a href="#mura">Шығанақ Берсиев мұрасы</a>
        </div>
        <a className="back-top" href="#basty" aria-label="Беттің басына оралу">↑</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} SHYGANAQ. Барлық құқықтар қорғалған.</span>
        <span>АҚТӨБЕ ӨҢІРІ · ҚАЗАҚСТАН</span>
      </div>
    </footer>
  );
}

function Modal({
  destination,
  product,
  onClose,
}: {
  destination: Destination | null;
  product: boolean;
  onClose: () => void;
}) {
  const visible = Boolean(destination || product);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!visible) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus({ preventScroll: true });
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const controls = modalRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handler);
    document.body.classList.add('modal-open');
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.classList.remove('modal-open');
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [visible, onClose]);
  if (!visible) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button ref={closeRef} className="modal-close" type="button" onClick={onClose} aria-label="Терезені жабу"><Icon name="close" /></button>
        <div className="modal-content">
        {destination ? (
          <>
            <div className="modal-image">
              <img src={destination.image} alt={`${destination.title} бағытын бейнелейтін көрнекі иллюстрация`} />
              <span>КӨРНЕКІ ИЛЛЮСТРАЦИЯ</span>
            </div>
            <div className="modal-copy">
              <span className="eyebrow">{destination.eyebrow}</span>
              <h2 id="modal-title">{destination.title}</h2>
              <p>{destination.description}</p>
              <p>{destination.detail}</p>
              <div className="modal-note"><Icon name="pin" /><span>Нақты маршрут пен карта сілтемесі ресми дерек расталғаннан кейін қосылады.</span></div>
              <button className="button" type="button" onClick={onClose}><span>Түсінікті</span></button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-product"><ProductMockup /></div>
            <div className="modal-copy">
              <span className="eyebrow">SHYGANAQ ӨНІМІ</span>
              <h2 id="modal-title">Даладан жеткен төрт дәм</h2>
              <p>SHYGANAQ – дәстүрлі тарыны табиғи бал, грек жаңғағы және кептірілген жемістермен үйлестіретін өнім тұжырымдамасы.</p>
              <div className="modal-ingredients">
                {ingredients.map((item) => <span key={item.name}>{item.name}</span>)}
              </div>
              <p className="small-copy">Қаптама мен өнім бейнесі — брендті таныстыруға арналған дизайн-тұжырымдамасы.</p>
              <button className="button" type="button" onClick={onClose}><span>Жабу</span></button>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState<Destination | null>(null);
  const [productOpen, setProductOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeModal = useCallback(() => {
    setSelected(null);
    setProductOpen(false);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Story />
        <Ingredients />
        <Product onOpen={() => setProductOpen(true)} />
        <Ecology />
        <Tourism onSelect={setSelected} />
        <MapSection onSelect={setSelected} />
        <FinalCta />
      </main>
      <Footer />
      <Modal destination={selected} product={productOpen} onClose={closeModal} />
    </>
  );
}
