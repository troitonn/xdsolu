import { Language } from '../context/LanguageContext';

export interface LocalizedContent {
  [key: string]: string;
}

export const translations: Record<Language, LocalizedContent> = {
  pt: {
    // Nav
    'nav.solutions': 'Soluções',
    'nav.payroll': 'Folha & Consignado',
    'nav.about': 'Sobre a XD',
    'nav.xdpay': 'XD Pay',
    'nav.accessAccount': 'Acesse sua conta',
    'nav.openAccount': 'Abrir conta de pagamento',
    'nav.contact': 'Fale com a gente',
    'nav.backHome': 'Voltar para a página inicial',
    
    // Languages
    'lang.pt': 'Português',
    'lang.en': 'English',
    'lang.es': 'Español',

    // Hero
    'hero.title': 'Capital inteligente para empresas que não podem esperar.',
    'hero.subtitle': 'Crédito estruturado, pagamentos e gestão de caixa em uma única infraestrutura. A XD Capital simplifica sua operação com análise ágil, garantias sob medida e liquidez previsível.',
    'hero.btnOpenAccount': 'Abrir conta de pagamento',
    'hero.btnContact': 'Fale com a gente',
    'hero.trust72h': 'Análise em até 72h',
    'hero.trustSecurity': 'Sigilo & Segurança Bancária',
    'hero.trustService': 'Atendimento exclusivo',

    // Stats
    'stats.volume.num': '+ R$ 1,2 Bi',
    'stats.volume.label': 'volume intermediado em operações estruturadas',
    'stats.time.num': '72h',
    'stats.time.label': 'prazo médio de análise de empenho',
    'stats.bacen.num': '100%',
    'stats.bacen.label': 'das operações liquidadas via Bacen',

    // Solutions
    'solutions.eyebrow': 'PLATAFORMA INTEGRADA',
    'solutions.title': 'Soluções estruturadas para cada desafio de liquidez.',
    'solutions.subtitle': 'Conectamos sua empresa a instrumentos modernos de crédito, meios de pagamento e tesouraria com segurança jurídica e taxas altamente competitivas.',
    'solutions.cta': 'Estruturar esta solução',
    'solutions.learnMore': 'Conhecer mais detalhes',

    // Segments
    'segments.eyebrow': 'ECOSSISTEMA & MERCADOS',
    'segments.title': 'Inteligência financeira para o seu segmento.',
    'segments.subtitle': 'Adaptamos nossas esteiras de análise e produtos às particularidades regulatórias e comerciais de cada setor econômico.',
    'segments.cta': 'Falar com especialista setorial',

    // Process
    'process.eyebrow': 'ESTEIRA OPERACIONAL',
    'process.title': 'Da análise inicial ao crédito em conta com previsibilidade.',
    'process.subtitle': 'Um fluxo de 4 etapas desenhado para dar segurança jurídica, transparência regulatória e máxima velocidade à sua demanda de capital.',
    'process.step1.title': 'Diagnóstico da operação',
    'process.step1.desc': 'Mapeamento do modelo de negócio, histórico de faturamento e instrumentos contratuais a serem antecipados ou estruturados.',
    'process.step1.deliv': 'Parecer prévio em até 24h',
    'process.step2.title': 'Análise de crédito e documentação',
    'process.step2.desc': 'Checagem cadastral, conferência de empenhos junto aos órgãos emissores e validação de compliance via esteira automatizada.',
    'process.step2.deliv': 'Definição de taxa e limite',
    'process.step3.title': 'Estruturação e formalização',
    'process.step3.desc': 'Emissão dos contratos digitais e instrumentos de garantia com assinatura eletrônica e total segurança jurídica.',
    'process.step3.deliv': 'Assinatura digitalizada',
    'process.step4.title': 'Liquidação e acompanhamento',
    'process.step4.desc': 'Liberação do recurso via conta gráfica homologada pelo Banco Central e suporte contínuo de um gerente de conta dedicado.',
    'process.step4.deliv': 'Recurso creditado em conta',

    // Payroll & Consigned
    'payroll.eyebrow': 'BENEFÍCIOS CORPORATIVOS & CONSIGNADO',
    'payroll.title': 'Crédito Consignado com desconto em folha para servidores públicos e empresas privadas.',
    'payroll.subtitle': 'Soluções completas para prefeituras, órgãos estaduais, autarquias federais e departamentos de Recursos Humanos de empresas privadas.',
    'payroll.tabPublic': 'Consignado Servidor Público',
    'payroll.tabPrivate': 'Consignado Privado CLT',
    'payroll.btnSimulate': 'Simular Consignado',
    'payroll.btnPartnership': 'Firmar Convênio Corporativo',

    // XD Pay
    'xdpay.eyebrow': 'XD PAY · MEIOS DE PAGAMENTO & ADQUIRÊNCIA',
    'xdpay.title': 'Maquininhas inteligentes e gestão de recebíveis para o seu negócio.',
    'xdpay.subtitle': 'Aceite as principais bandeiras no crédito, débito e Pix com as melhores taxas do mercado e conciliação automática das suas vendas.',
    'xdpay.btnRequest': 'Pedir Maquininha XD Pay',
    'xdpay.btnCalculate': 'Simular Taxas da Minha Empresa',

    // FAQ
    'faq.eyebrow': 'DÚVIDAS FREQUENTES',
    'faq.title': 'Perguntas Frequentes',
    'faq.subtitle': 'Esclareça as principais dúvidas sobre nossa atuação como correspondente bancário, prazos operacionais e requisitos de contratação.',
    'faq.ctaTitle': 'Ainda tem dúvidas sobre a sua operação?',
    'faq.ctaDesc': 'Nossos especialistas estão à disposição para analisar o seu caso sem compromisso.',
    'faq.ctaBtn': 'Falar no WhatsApp Corporativo',

    // CTA Section
    'cta.eyebrow': 'PRÓXIMO PASSO',
    'cta.title': 'Pronto para destravar o fluxo financeiro da sua empresa?',
    'cta.subtitle': 'Fale diretamente com nossa mesa de crédito corporativo e receba uma análise preliminar em até 24 horas úteis.',
    'cta.btnPrimary': 'Iniciar atendimento especializado',
    'cta.btnSecondary': 'Abrir conta de pagamento PJ',

    // Footer
    'footer.desc': 'A XD Capital é um hub de inteligência e intermediação financeira que atua como correspondente bancário para conectar empresas a crédito estruturado, meios de pagamento e tesouraria eficiente.',
    'footer.solutions': 'Soluções',
    'footer.institutional': 'Institucional',
    'footer.legal': 'Jurídico & Compliance',
    'footer.contact': 'Atendimento',
    'footer.rights': 'Todos os direitos reservados.',
    'footer.regulatoryNotice': 'A XD Capital Serviço de Intermediação Financeira Ltda. (CNPJ 55.038.166/0001-99) atua como correspondente bancário nos termos das Resoluções CMN nº 3.954/2011, nº 4.935/2021 e Resolução Conjunta BCB/CMN nº 16 e 17/2025. Não somos uma instituição financeira autorizada a operar diretamente pelo Banco Central; as contas de pagamento e liquidações são operadas por parceiros regulados autorizados.',
    'footer.about': 'Sobre a XD Capital',
    'footer.privacy': 'Política de Privacidade',
    'footer.terms': 'Termos de Uso',
    'footer.lgpd': 'Portal de Privacidade (LGPD)',
    'footer.ouvidoria': 'Ouvidoria Corporativa',
    'footer.pldft': 'Prevenção à Lavagem de Dinheiro (PLD/FT)',
    'footer.sp': 'Sede: São Paulo / SP - Brasil',

    // Subpages General
    'page.back': 'Voltar para a página inicial',
    'page.share': 'Compartilhar',
    'page.print': 'Imprimir',

    // About Page
    'about.eyebrow': 'CONHEÇA A XD CAPITAL',
    'about.title': 'Nossa história: construindo pontes entre empresas e liquidez real.',
    'about.subtitle': 'A XD Capital nasceu com um propósito claro: eliminar os gargalos de capital de giro e transformar recebíveis complexos em liquidez previsível para empresas que impulsionam a economia brasileira.',
    'about.storyEyebrow': 'COMO TUDO COMEÇOU',
    'about.storyTitle': 'A necessidade que moldou nossa trajetória',
    'about.p1': 'Durante anos no mercado financeiro e corporativo, nossos fundadores testemunharam um padrão recorrente: empresas sólidas, idôneas e altamente produtivas enfrentando severas crises de liquidez não por falta de faturamento, mas pela morosidade e rigidez dos grandes bancos tradicionais.',
    'about.p2': 'Especialmente no fornecimento para órgãos públicos (prefeituras, governos estaduais, autarquias federais) e grandes cadeias industriais, os prazos de medição e liquidação chegam a 60, 90 ou 180 dias. Enquanto o faturamento formal demorava a se converter em caixa, despesas operacionais, folha de pagamento e insumos não podiam esperar.',
    'about.p3': 'Foi a partir dessa realidade que a XD Capital Serviço de Intermediação Financeira foi concebida: uma estrutura ágil, especializada em crédito estruturado e antecipação de recebíveis, desenhada para entender a particularidade jurídica de cada operação e liberar recursos em tempo recorde.',
    'about.missionTitle': 'Nossa Missão',
    'about.missionDesc': 'Garantir fluxo de caixa e segurança financeira para médias e grandes empresas através de crédito sob medida, tecnologia e velocidade de resposta.',
    'about.visionTitle': 'Nossa Visão',
    'about.visionDesc': 'Ser o parceiro financeiro de primeira escolha para fornecedores do setor público, indústria e comércio em todo o território nacional.',
    'about.valuesTitle': 'Nossos Valores',
    'about.valuesDesc': 'Transparência irrestrita, rigor regulatório, compromisso com o resultado do cliente, sigilo bancário e foco em relacionamentos de longo prazo.',
    'about.governanceTitle': 'Governança e Conformidade Regulatória',
    'about.governanceDesc': 'Operamos com rigoroso cumprimento das normas do Conselho Monetário Nacional (CMN) e do Banco Central do Brasil (BCB), em conformidade estrita com as Resoluções Conjuntas BCB/CMN nº 16 e 17/2025.',

    // Contact Page
    'contact.eyebrow': 'CANAL CORPORATIVO',
    'contact.title': 'Fale com nossa equipe especializada.',
    'contact.subtitle': 'Canal direto com nossos especialistas para estruturação de crédito corporativo, antecipação de contratos públicos, meios de pagamento e conta de pagamento PJ.',
    'contact.formTitle': 'Envie uma mensagem para a mesa de atendimento',
    'contact.formDesc': 'Preencha os dados da sua empresa abaixo para iniciarmos seu atendimento.',
    'contact.fieldName': 'Nome completo',
    'contact.fieldEmail': 'E-mail corporativo',
    'contact.fieldPhone': 'Telefone / WhatsApp',
    'contact.fieldCnpj': 'CNPJ da empresa',
    'contact.fieldSubject': 'Assunto de interesse',
    'contact.fieldMessage': 'Mensagem ou detalhes da operação',
    'contact.btnSend': 'Enviar solicitação para a mesa',
    'contact.sending': 'Enviando mensagem...',
    'contact.successTitle': 'Mensagem enviada com sucesso!',
    'contact.successDesc': 'Recebemos sua solicitação. Nosso time entrará em contato em até 2 horas úteis.',
    'contact.sendAnother': 'Enviar outra mensagem',

    // Modals
    'modal.close': 'Fechar',
    'modal.clientAreaTitle': 'Área do Cliente XD',
    'modal.clientAreaDesc': 'Acesse a esteira de contratos, posições de antecipação e extrato.',
    'modal.clientAreaAuth': 'AMBIENTE CORPORATIVO CRIPTOGRAFADO',
    'modal.clientAreaBtn': 'Acessar Ambiente Seguro',
    'modal.openAccountTitle': 'Abertura de Conta de Pagamento PJ',
    'modal.openAccountDesc': 'Complete o processo em poucos minutos para ter acesso à conta empresarial integrada.',
    'cookie.text': 'Utilizamos cookies e tecnologias semelhantes para garantir o funcionamento seguro do nosso site e aprimorar a sua experiência.',
    'cookie.accept': 'Aceitar todos',
    'cookie.privacy': 'Ler Política de Privacidade'
  },
  en: {
    // Nav
    'nav.solutions': 'Solutions',
    'nav.payroll': 'Payroll & Consignment',
    'nav.about': 'About XD',
    'nav.xdpay': 'XD Pay',
    'nav.accessAccount': 'Client Area',
    'nav.openAccount': 'Open payment account',
    'nav.contact': 'Contact Us',
    'nav.backHome': 'Back to homepage',
    
    // Languages
    'lang.pt': 'Português',
    'lang.en': 'English',
    'lang.es': 'Español',

    // Hero
    'hero.title': 'Intelligent capital for companies that cannot wait.',
    'hero.subtitle': 'Structured credit, payment solutions, and cash management on a single platform. XD Capital simplifies your operations with agile analysis, tailored guarantees, and predictable liquidity.',
    'hero.btnOpenAccount': 'Open payment account',
    'hero.btnContact': 'Contact our desk',
    'hero.trust72h': 'Analysis in up to 72h',
    'hero.trustSecurity': 'Banking Privacy & Security',
    'hero.trustService': 'Dedicated executive support',

    // Stats
    'stats.volume.num': '+ $ 240M USD',
    'stats.volume.label': 'structured credit and liquidity volume',
    'stats.time.num': '72h',
    'stats.time.label': 'average contract evaluation turnaround',
    'stats.bacen.num': '100%',
    'stats.bacen.label': 'cleared through Central Bank network',

    // Solutions
    'solutions.eyebrow': 'INTEGRATED PLATFORM',
    'solutions.title': 'Structured solutions for every corporate liquidity challenge.',
    'solutions.subtitle': 'We connect your company to modern credit instruments, payment terminals, and corporate treasury with full legal compliance and competitive rates.',
    'solutions.cta': 'Structure this solution',
    'solutions.learnMore': 'Learn more details',

    // Segments
    'segments.eyebrow': 'ECOSYSTEM & MARKETS',
    'segments.title': 'Financial intelligence customized for your industry.',
    'segments.subtitle': 'We tailor our analysis pipelines and financial instruments to the specific regulatory and commercial realities of each economic sector.',
    'segments.cta': 'Speak with an industry specialist',

    // Process
    'process.eyebrow': 'OPERATIONAL PIPELINE',
    'process.title': 'From initial analysis to cleared funds with total predictability.',
    'process.subtitle': 'A 4-step workflow designed to deliver full legal compliance, regulatory transparency, and rapid execution for your capital requirements.',
    'process.step1.title': 'Operational Diagnosis',
    'process.step1.desc': 'Mapping the business model, billing history, and contractual instruments to be structured or advanced.',
    'process.step1.deliv': 'Preliminary assessment within 24h',
    'process.step2.title': 'Credit Analysis & Verification',
    'process.step2.desc': 'Background checks, contract validation with issuing entities, and automated compliance screening.',
    'process.step2.deliv': 'Rate and limit determination',
    'process.step3.title': 'Structuring & Formalization',
    'process.step3.desc': 'Issuance of digital agreements and security instruments with electronic signature and complete legal certainty.',
    'process.step3.deliv': 'Digitally signed contracts',
    'process.step4.title': 'Settlement & Monitoring',
    'process.step4.desc': 'Disbursement of funds via Central Bank compliant accounts and continuous support from a dedicated account manager.',
    'process.step4.deliv': 'Funds credited to account',

    // Payroll & Consigned
    'payroll.eyebrow': 'CORPORATE BENEFITS & CONSIGNMENT',
    'payroll.title': 'Payroll Loans and Credit Solutions for Public Servants and Private Enterprise.',
    'payroll.subtitle': 'Comprehensive financial solutions for municipal and state governments, federal agencies, and corporate HR departments.',
    'payroll.tabPublic': 'Public Servant Consignment',
    'payroll.tabPrivate': 'Private Sector Payroll Loan',
    'payroll.btnSimulate': 'Simulate Payroll Credit',
    'payroll.btnPartnership': 'Establish Corporate Agreement',

    // XD Pay
    'xdpay.eyebrow': 'XD PAY · POINT OF SALE & ACQUIRING',
    'xdpay.title': 'Smart POS terminals and receivables management for your business.',
    'xdpay.subtitle': 'Accept all major cards, debit, and instant Pix with market-leading rates and automated sales reconciliation.',
    'xdpay.btnRequest': 'Order XD Pay Terminal',
    'xdpay.btnCalculate': 'Calculate Rates for My Business',

    // FAQ
    'faq.eyebrow': 'FREQUENTLY ASKED QUESTIONS',
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Get answers to key questions about our role as a banking correspondent, operational timelines, and requirements.',
    'faq.ctaTitle': 'Still have questions about your operation?',
    'faq.ctaDesc': 'Our specialists are available to review your scenario with no obligation.',
    'faq.ctaBtn': 'Contact on Corporate WhatsApp',

    // CTA Section
    'cta.eyebrow': 'NEXT STEP',
    'cta.title': 'Ready to unlock your company’s financial velocity?',
    'cta.subtitle': 'Speak directly with our corporate credit desk and receive a preliminary assessment in up to 24 business hours.',
    'cta.btnPrimary': 'Start specialized consultation',
    'cta.btnSecondary': 'Open corporate payment account',

    // Footer
    'footer.desc': 'XD Capital is a financial intelligence and intermediation hub operating as a banking correspondent to connect businesses to structured credit, acquiring solutions, and treasury management.',
    'footer.solutions': 'Solutions',
    'footer.institutional': 'Institutional',
    'footer.legal': 'Legal & Compliance',
    'footer.contact': 'Support Desk',
    'footer.rights': 'All rights reserved.',
    'footer.regulatoryNotice': 'XD Capital Serviço de Intermediação Financeira Ltda. (Tax ID / CNPJ 55.038.166/0001-99) operates as a banking correspondent pursuant to Central Bank of Brazil (BCB) and CMN Resolutions. We are not a direct banking institution; payment accounts and settlements are operated by authorized regulated partners.',
    'footer.about': 'About XD Capital',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.lgpd': 'Privacy Portal (LGPD)',
    'footer.ouvidoria': 'Corporate Ombudsman',
    'footer.pldft': 'Anti-Money Laundering (AML/CFT)',
    'footer.sp': 'HQ: São Paulo / SP - Brazil',

    // Subpages General
    'page.back': 'Back to homepage',
    'page.share': 'Share',
    'page.print': 'Print',

    // About Page
    'about.eyebrow': 'ABOUT XD CAPITAL',
    'about.title': 'Our history: building bridges between enterprise and real liquidity.',
    'about.subtitle': 'XD Capital was founded with a clear mandate: eliminate working capital bottlenecks and transform complex receivables into predictable cash flow for productive enterprises.',
    'about.storyEyebrow': 'HOW IT ALL STARTED',
    'about.storyTitle': 'The market reality that shaped our mission',
    'about.p1': 'Over years in corporate and investment banking, our founders identified a recurring hurdle: solid, compliant, and highly productive companies facing cash flow distress not from lack of revenue, but due to the rigid bureaucracy and slow processing times of traditional legacy banks.',
    'about.p2': 'Especially when supplying public sector entities or large industrial chains, payment settlement cycles can stretch to 60, 90, or 180 days. While formal invoices took months to liquidate, payroll, supply procurement, and operational expenses could not wait.',
    'about.p3': 'From this imperative, XD Capital was born: an agile financial intermediary specializing in structured credit and receivables advancement, engineered to analyze the legal nuances of each operation and disburse capital in record time.',
    'about.missionTitle': 'Our Mission',
    'about.missionDesc': 'Ensure financial velocity and liquidity security for mid-sized and large enterprises through tailored credit, technology, and rapid turnaround.',
    'about.visionTitle': 'Our Vision',
    'about.visionDesc': 'To be the partner of first choice for public sector contractors, industry, and commerce across Brazil.',
    'about.valuesTitle': 'Our Values',
    'about.valuesDesc': 'Uncompromising transparency, regulatory rigor, client-driven outcomes, bank-grade confidentiality, and long-term partnerships.',
    'about.governanceTitle': 'Corporate Governance & Regulatory Compliance',
    'about.governanceDesc': 'We operate in strict adherence to National Monetary Council (CMN) and Central Bank of Brazil (BCB) frameworks, including Joint Resolutions BCB/CMN No. 16 and 17/2025.',

    // Contact Page
    'contact.eyebrow': 'CORPORATE DESK',
    'contact.title': 'Speak with our specialized team.',
    'contact.subtitle': 'Direct communication with our specialists for structured corporate credit, government contract advances, acquiring terminals, and corporate payment accounts.',
    'contact.formTitle': 'Send a message to our credit desk',
    'contact.formDesc': 'Fill in your company details below to initiate your review.',
    'contact.fieldName': 'Full name',
    'contact.fieldEmail': 'Corporate email',
    'contact.fieldPhone': 'Phone / WhatsApp',
    'contact.fieldCnpj': 'Company Tax ID (CNPJ / EIN)',
    'contact.fieldSubject': 'Area of interest',
    'contact.fieldMessage': 'Message or transaction details',
    'contact.btnSend': 'Submit request to desk',
    'contact.sending': 'Sending message...',
    'contact.successTitle': 'Message sent successfully!',
    'contact.successDesc': 'We have received your request. An executive will contact you within 2 business hours.',
    'contact.sendAnother': 'Send another message',

    // Modals
    'modal.close': 'Close',
    'modal.clientAreaTitle': 'XD Client Portal',
    'modal.clientAreaDesc': 'Access your contracts, advance positions, and banking statements.',
    'modal.clientAreaAuth': 'ENCRYPTED CORPORATE ENVIRONMENT',
    'modal.clientAreaBtn': 'Access Secure Environment',
    'modal.openAccountTitle': 'Corporate Account Opening',
    'modal.openAccountDesc': 'Complete the registration in minutes for an integrated corporate treasury account.',
    'cookie.text': 'We use cookies and similar technologies to ensure secure navigation and optimize your user experience.',
    'cookie.accept': 'Accept all',
    'cookie.privacy': 'Read Privacy Policy'
  },
  es: {
    // Nav
    'nav.solutions': 'Soluciones',
    'nav.payroll': 'Nómina y Consignado',
    'nav.about': 'Sobre XD',
    'nav.xdpay': 'XD Pay',
    'nav.accessAccount': 'Área del Cliente',
    'nav.openAccount': 'Abrir cuenta de pago',
    'nav.contact': 'Contáctenos',
    'nav.backHome': 'Volver al inicio',
    
    // Languages
    'lang.pt': 'Português',
    'lang.en': 'English',
    'lang.es': 'Español',

    // Hero
    'hero.title': 'Capital inteligente para empresas que no pueden esperar.',
    'hero.subtitle': 'Crédito estructurado, soluciones de pago y gestión de tesorería en una única infraestructura. XD Capital simplifica su operación con análisis ágil, garantías a medida y liquidez predecible.',
    'hero.btnOpenAccount': 'Abrir cuenta de pago',
    'hero.btnContact': 'Hablar con un especialista',
    'hero.trust72h': 'Análisis en hasta 72h',
    'hero.trustSecurity': 'Sigilo y Seguridad Bancaria',
    'hero.trustService': 'Atención ejecutiva exclusiva',

    // Stats
    'stats.volume.num': '+ R$ 1,2 MM',
    'stats.volume.label': 'volumen intermediado en operaciones estructuradas',
    'stats.time.num': '72h',
    'stats.time.label': 'plazo promedio de análisis de contratos',
    'stats.bacen.num': '100%',
    'stats.bacen.label': 'de las operaciones liquidadas vía Banco Central',

    // Solutions
    'solutions.eyebrow': 'PLATAFORMA INTEGRADA',
    'solutions.title': 'Soluciones estructuradas para cada desafío de liquidez.',
    'solutions.subtitle': 'Conectamos su empresa con instrumentos modernos de crédito, medios de pago y tesorería con respaldo legal y tasas altamente competitivas.',
    'solutions.cta': 'Estructurar esta solución',
    'solutions.learnMore': 'Conocer más detalles',

    // Segments
    'segments.eyebrow': 'ECOSISTEMA Y MERCADOS',
    'segments.title': 'Inteligencia financiera para su sector.',
    'segments.subtitle': 'Adaptamos nuestros procesos de evaluación a las particularidades regulatorias y comerciales de cada sector económico.',
    'segments.cta': 'Hablar con un especialista sectorial',

    // Process
    'process.eyebrow': 'PROCESO OPERATIVO',
    'process.title': 'Del análisis inicial a los fondos en cuenta con predictibilidad.',
    'process.subtitle': 'Un flujo de 4 etapas diseñado para brindar seguridad jurídica, transparencia regulatoria y máxima rapidez a su requerimiento de capital.',
    'process.step1.title': 'Diagnóstico de la operación',
    'process.step1.desc': 'Evaluación del modelo de negocio, historial de facturación e instrumentos contractuales a estructurar o anticipar.',
    'process.step1.deliv': 'Informe previo en hasta 24h',
    'process.step2.title': 'Análisis de crédito y documentación',
    'process.step2.desc': 'Verificación de antecedentes, validación de contratos con organismos emisores y control de cumplimiento normativo.',
    'process.step2.deliv': 'Definición de tasa y límite',
    'process.step3.title': 'Estructuración y formalización',
    'process.step3.desc': 'Emisión de contratos digitales e instrumentos de garantía con firma electrónica y total seguridad jurídica.',
    'process.step3.deliv': 'Firma digitalizada',
    'process.step4.title': 'Liquidación y seguimiento',
    'process.step4.desc': 'Desembolso de recursos a través de cuentas reguladas por el Banco Central y soporte continuo de un ejecutivo dedicado.',
    'process.step4.deliv': 'Fondos acreditados en cuenta',

    // Payroll & Consigned
    'payroll.eyebrow': 'BENEFICIOS CORPORATIVOS Y CRÉDITO',
    'payroll.title': 'Crédito de Nómina con descuento directo para servidores públicos y empresas privadas.',
    'payroll.subtitle': 'Soluciones completas para alcaldías, gobiernos estaduales, entidades públicas y departamentos de Recursos Humanos.',
    'payroll.tabPublic': 'Consignado Servidores Públicos',
    'payroll.tabPrivate': 'Consignado Sector Privado',
    'payroll.btnSimulate': 'Simular Crédito de Nómina',
    'payroll.btnPartnership': 'Establecer Convenio Corporativo',

    // XD Pay
    'xdpay.eyebrow': 'XD PAY · MEDIOS DE PAGO Y ADQUISICIÓN',
    'xdpay.title': 'Terminales de punto de venta inteligentes y gestión de cobros para su negocio.',
    'xdpay.subtitle': 'Acepte todas las tarjetas de crédito, débito y transferencias instantáneas con las mejores tasas y conciliación automática.',
    'xdpay.btnRequest': 'Solicitar Terminal XD Pay',
    'xdpay.btnCalculate': 'Simular Tasas para mi Empresa',

    // FAQ
    'faq.eyebrow': 'PREGUNTAS FRECUENTES',
    'faq.title': 'Preguntas Frecuentes',
    'faq.subtitle': 'Aclare sus principales dudas sobre nuestra función como corresponsal bancario, plazos y requisitos.',
    'faq.ctaTitle': '¿Aún tiene dudas sobre su operación?',
    'faq.ctaDesc': 'Nuestros especialistas están a su disposición para evaluar su caso sin compromiso.',
    'faq.ctaBtn': 'Contactar por WhatsApp Corporativo',

    // CTA Section
    'cta.eyebrow': 'SIGUIENTE PASO',
    'cta.title': '¿Listo para acelerar el flujo financiero de su empresa?',
    'cta.subtitle': 'Hable directamente con nuestra mesa de crédito corporativo y reciba una evaluación preliminar en hasta 24 horas hábiles.',
    'cta.btnPrimary': 'Iniciar atención especializada',
    'cta.btnSecondary': 'Abrir cuenta de pago corporativa',

    // Footer
    'footer.desc': 'XD Capital es un hub de inteligencia e intermediación financiera que opera como corresponsal bancario para conectar empresas con crédito estructurado, medios de pago y tesorería.',
    'footer.solutions': 'Soluciones',
    'footer.institutional': 'Institucional',
    'footer.legal': 'Legal y Cumplimiento',
    'footer.contact': 'Atención',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.regulatoryNotice': 'XD Capital Serviço de Intermediação Financeira Ltda. (CNPJ 55.038.166/0001-99) actúa como corresponsal bancario conforme a la normativa del Banco Central de Brasil. No somos una institución bancaria directa; las cuentas de pago y liquidaciones son operadas por socios autorizados.',
    'footer.about': 'Sobre XD Capital',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Uso',
    'footer.lgpd': 'Portal de Privacidad (LGPD)',
    'footer.ouvidoria': 'Defensoría del Cliente (Ouvidoria)',
    'footer.pldft': 'Prevención de Lavado de Dinero (PLD/FT)',
    'footer.sp': 'Sede: São Paulo / SP - Brasil',

    // Subpages General
    'page.back': 'Volver a la página principal',
    'page.share': 'Compartir',
    'page.print': 'Imprimir',

    // About Page
    'about.eyebrow': 'CONOZCA A XD CAPITAL',
    'about.title': 'Nuestra historia: construyendo puentes entre empresas y liquidez real.',
    'about.subtitle': 'XD Capital nació con un propósito claro: eliminar los obstáculos de capital de trabajo y transformar cuentas por cobrar en liquidez predecible para empresas productivas.',
    'about.storyEyebrow': 'CÓMO COMENZÓ TODO',
    'about.storyTitle': 'La necesidad que moldeó nuestra trayectoria',
    'about.p1': 'Durante años en el sector financiero, nuestros fundadores observaron un patrón constante: empresas sólidas y altamente productivas enfrentando crisis de liquidez debido a la rigidez y lentitud de los bancos tradicionales.',
    'about.p2': 'Especialmente en contratos con el sector público y grandes industrias, los plazos de pago pueden demorar 60, 90 o 180 días. Mientras los cobros tardaban en concretarse, los salarios, suministros y costos operativos no podían esperar.',
    'about.p3': 'De esa necesidad nació XD Capital: una estructura ágil, especializada en crédito estructurado y anticipo de cuentas por cobrar, diseñada para liberar recursos en tiempo récord con respaldo legal.',
    'about.missionTitle': 'Nuestra Misión',
    'about.missionDesc': 'Garantizar flujo de caja y estabilidad financiera a medianas y grandes empresas a través de crédito a medida, tecnología y rapidez de respuesta.',
    'about.visionTitle': 'Nuestra Visión',
    'about.visionDesc': 'Ser el aliado financiero preferido para proveedores del sector público, la industria y el comercio en todo el país.',
    'about.valuesTitle': 'Nuestros Valores',
    'about.valuesDesc': 'Transparencia irrestricta, rigor regulatorio, compromiso con los resultados del cliente, confidencialidad bancaria y relaciones a largo plazo.',
    'about.governanceTitle': 'Gobernanza y Cumplimiento Normativo',
    'about.governanceDesc': 'Operamos en estricto apego a las normas del Consejo Monetario Nacional (CMN) y del Banco Central de Brasil (BCB), cumpliendo con las Resoluciones Conjuntas BCB/CMN nº 16 y 17/2025.',

    // Contact Page
    'contact.eyebrow': 'CANAL CORPORATIVO',
    'contact.title': 'Hable con nuestro equipo especializado.',
    'contact.subtitle': 'Canal directo con nuestros especialistas para crédito corporativo, anticipo de contratos públicos, terminales de pago y cuentas empresariales.',
    'contact.formTitle': 'Envíe un mensaje a nuestra mesa de atención',
    'contact.formDesc': 'Complete los datos de su empresa a continuación para iniciar su atención.',
    'contact.fieldName': 'Nombre completo',
    'contact.fieldEmail': 'Correo corporativo',
    'contact.fieldPhone': 'Teléfono / WhatsApp',
    'contact.fieldCnpj': 'Identificación fiscal de la empresa',
    'contact.fieldSubject': 'Asunto de interés',
    'contact.fieldMessage': 'Mensaje o detalles de la operación',
    'contact.btnSend': 'Enviar solicitud a la mesa',
    'contact.sending': 'Enviando mensaje...',
    'contact.successTitle': '¡Mensaje enviado con éxito!',
    'contact.successDesc': 'Hemos recibido su solicitud. Nuestro equipo se pondrá en contacto en un plazo de hasta 2 horas hábiles.',
    'contact.sendAnother': 'Enviar otro mensaje',

    // Modals
    'modal.close': 'Cerrar',
    'modal.clientAreaTitle': 'Área del Cliente XD',
    'modal.clientAreaDesc': 'Acceda al seguimiento de contratos, posiciones de anticipo y extractos.',
    'modal.clientAreaAuth': 'ENTORNO CORPORATIVO CIFRADO',
    'modal.clientAreaBtn': 'Acceder a Entorno Seguro',
    'modal.openAccountTitle': 'Apertura de Cuenta Corporativa de Pago',
    'modal.openAccountDesc': 'Complete el registro en minutos para acceder a una cuenta empresarial integrada.',
    'cookie.text': 'Utilizamos cookies y tecnologías similares para garantizar el funcionamiento seguro de nuestro sitio y mejorar su experiencia.',
    'cookie.accept': 'Aceptar todos',
    'cookie.privacy': 'Leer Política de Privacidad'
  }
};
