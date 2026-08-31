import { SolutionTab, SegmentItem, ProcessStep, FaqItem } from '../types';
import { Language } from '../context/LanguageContext';

export const SOLUTIONS_DATA_BY_LANG: Record<Language, SolutionTab[]> = {
  pt: [
    {
      id: 'setor-publico',
      number: '01',
      tabLabel: 'Setor Público',
      tabSub: 'Empenhos e Contratos',
      title: 'O trilho financeiro de quem fornece para o Estado.',
      description: 'Antecipação de recebíveis, capital de giro e garantias para empresas que fornecem para órgãos públicos, com análise ágil de empenhos e contratos.',
      pills: ['Antecipação de empenhos', 'Capital de giro', 'Garantias contratuais'],
      subcards: [
        {
          title: 'Análise de empenhos e contratos',
          description: 'Leitura do instrumento contratual, do empenho e do histórico do órgão para definir limite e taxa competitiva sem travar o seu fluxo.',
          tag: 'Destaque Setorial'
        },
        {
          title: 'Garantias sob medida',
          description: 'Estruturação de garantia contratual e performance bond para participação em licitações e execução de grandes certames federais e estaduais.',
          tag: 'Segurança Jurídica'
        }
      ]
    },
    {
      id: 'pagamentos',
      number: '02',
      tabLabel: 'Pagamentos',
      tabSub: 'Maquininha e Captura',
      title: 'Maquininha e captura para o varejo.',
      description: 'Meios de pagamento completos para o varejo, com credenciamento, terminais e conciliação automática das vendas em múltiplos pontos.',
      pills: ['Crédito e débito', 'Pix na maquininha', 'Antecipação de recebíveis de cartão'],
      subcards: [
        {
          title: 'Terminais e credenciamento',
          description: 'Equipamentos modernos com conexão multi-operadora e liquidação direta na conta da sua empresa com taxas customizadas ao volume.',
          tag: 'Hardware & Captura'
        },
        {
          title: 'Conciliação e repasse automático',
          description: 'Painel integrado para conferência de vendas, antecipação automática de fluxo e conciliação bancária sem atrito operacional.',
          tag: 'Gestão de Caixa'
        }
      ]
    },
    {
      id: 'conta-pj',
      number: '03',
      tabLabel: 'Conta Digital PJ',
      tabSub: 'Gestão e Integração',
      title: 'Conta empresarial sem tarifas escondidas.',
      description: 'Pix ilimitado, cobranças, pagamentos em lote e conciliação integrada ao seu ERP para uma tesouraria eficiente e transparente.',
      pills: ['Pix ilimitado', 'Pagamento em lote', 'Integração com ERP'],
      subcards: [
        {
          title: 'Cobrança e boleto',
          description: 'Emissão ágil de cobranças híbridas com QR Code Pix dinâmico e régua automatizada de notificações para reduzir inadimplência.',
          tag: 'Recebimentos'
        },
        {
          title: 'Multiusuário com alçadas de aprovação',
          description: 'Controle de acessos com dupla checagem, alçadas financeiras por departamento e auditoria completa de cada transferência realizada.',
          tag: 'Governança'
        }
      ]
    },
    {
      id: 'agronegocio',
      number: '04',
      tabLabel: 'Agronegócio',
      tabSub: 'Safra e Crédito Rural',
      title: 'Do plantio à comercialização da safra.',
      description: 'Crédito rural estruturado, CPR financeira e soluções de barter para produtores e cooperativas acelerarem a produção no campo.',
      pills: ['CPR financeira', 'Barter', 'Crédito rural estruturado'],
      subcards: [
        {
          title: 'Estruturação de CPR',
          description: 'Emissão e colocação de Cédula de Produto Rural Financeira alinhada ao ciclo biológico da cultura e janela de colheita.',
          tag: 'Instrumentos do Agro'
        },
        {
          title: 'Barter com fornecedores de insumo',
          description: 'Operações triangulares de troca entre defensivos, fertilizantes e produção futura com previsibilidade e mitigação de risco.',
          tag: 'Cadeia Produtiva'
        }
      ]
    },
    {
      id: 'investimentos',
      number: '05',
      tabLabel: 'Investimentos',
      tabSub: 'Tesouraria e Caixa',
      title: 'O caixa da empresa trabalhando com método.',
      description: 'Gestão de caixa e alocação inteligente do capital da sua empresa, com carteiras construídas a partir do seu horizonte e apetite de risco.',
      pills: ['Gestão de caixa', 'Renda fixa', 'Suitability corporativo'],
      subcards: [
        {
          title: 'Alocação por horizonte de liquidez',
          description: 'Estratégias de caixa diário, reserva operacional e excedentes corporativos para otimização de rendimento sem travar compromissos.',
          tag: 'Eficiência de CDI'
        },
        {
          title: 'Relatórios de performance',
          description: 'Acompanhamento consolidado com transparência tributária, marcação a mercado e suporte de especialistas dedicados.',
          tag: 'Relatórios'
        }
      ]
    },
    {
      id: 'folha-consignado',
      number: '06',
      tabLabel: 'Folha & Consignado',
      tabSub: 'Público e Privado',
      title: 'Gestão de folha e crédito consignado sob medida.',
      description: 'Processamento eficiente de folha de pagamento e linhas de crédito consignado com taxas justas para servidores públicos e colaboradores CLT.',
      pills: ['Consignado Público', 'Consignado Privado CLT', 'Processamento de Folha'],
      subcards: [
        {
          title: 'Consignado para Servidores Públicos',
          description: 'Convênios diretos com prefeituras, governos e autarquias com prazos de até 120 meses e averbação eletrônica segura.',
          tag: 'Setor Público'
        },
        {
          title: 'Consignado Privado para Empresas CLT',
          description: 'Benefício financeiro para retenção de talentos com zero custo ou risco para o empregador e contratação 100% digital.',
          tag: 'Setor Privado'
        }
      ]
    },
    {
      id: 'caas',
      number: '07',
      tabLabel: 'CaaS',
      tabSub: 'Credit as a Service',
      title: 'Sua empresa oferecendo crédito com infraestrutura completa.',
      description: 'Infraestrutura tecnológica e regulatória plug-and-play para empresas e plataformas emitirem e gerenciarem produtos de crédito com marca própria via APIs.',
      pills: ['Crédito White-label', 'Integração via APIs REST', 'Esteira Regulatória Completa'],
      subcards: [
        {
          title: 'Emissão e Gestão White-label',
          description: 'Personalize a experiência do seu cliente com regras de crédito próprias, onboarding digital e formalização automatizada.',
          tag: 'White-label'
        },
        {
          title: 'APIs e Compliance Regulatório',
          description: 'Conecte-se aos nossos motores de análise de risco, prevenção a fraudes e liquidação financeira homologada pelo Banco Central.',
          tag: 'Infraestrutura & APIs'
        }
      ]
    }
  ],
  en: [
    {
      id: 'setor-publico',
      number: '01',
      tabLabel: 'Public Sector',
      tabSub: 'Contracts & Commitments',
      title: 'The financial rail for government suppliers.',
      description: 'Receivables advance, working capital, and performance guarantees for government contractors, with agile legal and credit analysis.',
      pills: ['Contract advances', 'Working capital', 'Bid & performance bonds'],
      subcards: [
        {
          title: 'Contract & Commitment Analysis',
          description: 'Evaluation of public contracts and issuer historical payment records to establish competitive rates without locking your cash flow.',
          tag: 'Sector Specialization'
        },
        {
          title: 'Tailored Guarantees',
          description: 'Structuring contractual guarantees and performance bonds for municipal, state, and federal bidding processes.',
          tag: 'Legal Security'
        }
      ]
    },
    {
      id: 'pagamentos',
      number: '02',
      tabLabel: 'Payments',
      tabSub: 'POS & Acquiring',
      title: 'Smart terminals and payment acquiring for retail.',
      description: 'Comprehensive retail payment solutions with multi-carrier connectivity, modern terminals, and automated sales reconciliation.',
      pills: ['Credit & debit', 'Instant Pix at POS', 'Card receivables advance'],
      subcards: [
        {
          title: 'POS Terminals & Enrollment',
          description: 'Next-gen payment hardware with direct settlement into your business account and volume-tiered merchant discount rates.',
          tag: 'Hardware & Capture'
        },
        {
          title: 'Automated Reconciliation',
          description: 'Integrated dashboard for multi-store transaction audits, auto-advance rules, and seamless ERP banking sync.',
          tag: 'Cash Management'
        }
      ]
    },
    {
      id: 'conta-pj',
      number: '03',
      tabLabel: 'Corporate Account',
      tabSub: 'Management & APIs',
      title: 'Business account with zero hidden fees.',
      description: 'Unlimited instant Pix, bulk payouts, payment slips, and ERP synchronization for streamlined, transparent corporate treasury.',
      pills: ['Unlimited Pix', 'Batch payouts', 'ERP Integration'],
      subcards: [
        {
          title: 'Invoicing & Dynamic QR Code',
          description: 'Agile hybrid billing with dynamic Pix QR codes and automated notification routines to reduce payment delinquency.',
          tag: 'Receivables'
        },
        {
          title: 'Multi-User Approval Hierarchy',
          description: 'Granular role-based access, dual authorization workflows, and full audit logs for every outgoing transaction.',
          tag: 'Governance'
        }
      ]
    },
    {
      id: 'agronegocio',
      number: '04',
      tabLabel: 'Agribusiness',
      tabSub: 'Harvest & Rural Credit',
      title: 'From planting to crop commercialization.',
      description: 'Structured rural financing, financial CPR notes, and barter solutions for agricultural producers and cooperatives.',
      pills: ['Financial CPR', 'Barter agreements', 'Structured rural credit'],
      subcards: [
        {
          title: 'Financial CPR Structuring',
          description: 'Issuance and placement of Rural Product Bonds synchronized with agricultural cycles and harvesting windows.',
          tag: 'Agro Instruments'
        },
        {
          title: 'Input Supplier Barter',
          description: 'Triangular transactions exchanging fertilizers and agrochemicals for future crop yield with high predictability.',
          tag: 'Supply Chain'
        }
      ]
    },
    {
      id: 'investimentos',
      number: '05',
      tabLabel: 'Treasury & Investments',
      tabSub: 'Cash Optimization',
      title: 'Corporate cash working with strict methodology.',
      description: 'Cash allocation and institutional liquidity strategies designed around your company’s investment horizon and risk profile.',
      pills: ['Cash management', 'Fixed income', 'Corporate suitability'],
      subcards: [
        {
          title: 'Liquidity Horizon Allocation',
          description: 'Daily operational cash, contingency buffers, and strategic surplus allocation to maximize return without locking liquidity.',
          tag: 'Yield Efficiency'
        },
        {
          title: 'Performance Reporting',
          description: 'Consolidated reporting with tax transparency, mark-to-market accuracy, and dedicated executive support.',
          tag: 'Reporting'
        }
      ]
    },
    {
      id: 'folha-consignado',
      number: '06',
      tabLabel: 'Payroll & Consigned',
      tabSub: 'Public & Private',
      title: 'Custom payroll management and payroll-deducted credit.',
      description: 'Efficient payroll disbursement and fair-rate payroll loan agreements for public sector employees and private sector workers.',
      pills: ['Public Sector Consigned', 'Private Sector Payroll', 'Payroll Processing'],
      subcards: [
        {
          title: 'Public Servant Payroll Credit',
          description: 'Direct agreements with municipal, state, and federal entities with up to 120-month terms and secure electronic validation.',
          tag: 'Public Sector'
        },
        {
          title: 'Private Enterprise Employee Benefit',
          description: 'Financial wellness tool for talent retention with zero cost or liability for the employer and 100% digital onboarding.',
          tag: 'Private Sector'
        }
      ]
    },
    {
      id: 'caas',
      number: '07',
      tabLabel: 'CaaS',
      tabSub: 'Credit as a Service',
      title: 'Empower your platform with end-to-end credit infrastructure.',
      description: 'Plug-and-play technological and regulatory infrastructure enabling enterprises and platforms to issue, underwrite, and manage branded credit products via robust APIs.',
      pills: ['White-label Credit', 'RESTful API Integration', 'Regulatory & Compliance Suite'],
      subcards: [
        {
          title: 'White-label Issuance & Management',
          description: 'Deliver a native customer experience with customizable underwriting rules, digital onboarding, and automated contract execution.',
          tag: 'White-label'
        },
        {
          title: 'APIs & Regulatory Infrastructure',
          description: 'Seamlessly connect to our risk evaluation engines, fraud prevention systems, and Central Bank regulated settlement rails.',
          tag: 'APIs & Infrastructure'
        }
      ]
    }
  ],
  es: [
    {
      id: 'setor-publico',
      number: '01',
      tabLabel: 'Sector Público',
      tabSub: 'Contratos y Adjudicaciones',
      title: 'El respaldo financiero para proveedores del Estado.',
      description: 'Anticipo de cuentas por cobrar, capital de trabajo y garantías para empresas proveedoras de entidades públicas.',
      pills: ['Anticipo de contratos', 'Capital de trabajo', 'Garantías contractuales'],
      subcards: [
        {
          title: 'Análisis de contratos y licitaciones',
          description: 'Evaluación del instrumento contractual y antecedentes del organismo pagador para fijar tasas competitivas.',
          tag: 'Especialidad Sectorial'
        },
        {
          title: 'Garantías a la medida',
          description: 'Estructuración de fianzas contractuales y pólizas de cumplimiento para licitaciones públicas.',
          tag: 'Seguridad Jurídica'
        }
      ]
    },
    {
      id: 'pagamentos',
      number: '02',
      tabLabel: 'Pagos',
      tabSub: 'Terminales y Captura',
      title: 'Terminales de punto de venta y cobros para comercios.',
      description: 'Soluciones integrales de cobro presencial con conectividad multioperador, terminales modernos y conciliación automática.',
      pills: ['Crédito y débito', 'Transferencias instantáneas', 'Anticipo de liquidaciones'],
      subcards: [
        {
          title: 'Terminales y Afiliación',
          description: 'Equipos POS de última generación con liquidación directa en su cuenta y comisiones ajustadas a su volumen.',
          tag: 'Hardware y Captura'
        },
        {
          title: 'Conciliación Automática',
          description: 'Panel integrado para auditoría de ventas multitienda y sincronización contable sin fricción operativa.',
          tag: 'Gestión de Tesorería'
        }
      ]
    },
    {
      id: 'conta-pj',
      number: '03',
      tabLabel: 'Cuenta Corporativa',
      tabSub: 'Gestión e Integración',
      title: 'Cuenta empresarial sin comisiones ocultas.',
      description: 'Transferencias ilimitadas, pagos masivos, emisión de cobros y sincronización con su software contable (ERP).',
      pills: ['Transferencias ilimitadas', 'Pagos masivos', 'Integración ERP'],
      subcards: [
        {
          title: 'Facturación y Cobro Digital',
          description: 'Emisión ágil de cobros con códigos QR dinámicos y recordatorios automáticos para reducir la morosidad.',
          tag: 'Cobranzas'
        },
        {
          title: 'Control Multiusuario y Firmas',
          description: 'Permisos granulares por departamento, flujos de doble autorización y auditoría completa de transferencias.',
          tag: 'Gobernanza'
        }
      ]
    },
    {
      id: 'agronegocio',
      number: '04',
      tabLabel: 'Agronegocios',
      tabSub: 'Cosecha y Crédito Rural',
      title: 'Desde la siembra hasta la comercialización.',
      description: 'Financiamiento rural estructurado, títulos CPR y esquemas de trueque (barter) para productores y cooperativas.',
      pills: ['Títulos CPR', 'Acuerdos Barter', 'Crédito rural estructurado'],
      subcards: [
        {
          title: 'Estructuración de Títulos CPR',
          description: 'Emisión y colocación de Cédulas de Producto Rural alineadas al ciclo biológico del cultivo.',
          tag: 'Instrumentos Agro'
        },
        {
          title: 'Barter con Proveedores de Insumos',
          description: 'Operaciones de intercambio entre fertilizantes, defensivos y producción futura con mitigación de riesgos.',
          tag: 'Cadena Productiva'
        }
      ]
    },
    {
      id: 'investimentos',
      number: '05',
      tabLabel: 'Tesorería e Inversión',
      tabSub: 'Optimización de Liquidez',
      title: 'La tesorería de su empresa trabajando con método.',
      description: 'Estrategias de asignación de capital institucional adaptadas al horizonte de liquidez y perfil de riesgo de su empresa.',
      pills: ['Gestión de liquidez', 'Renta fija corporativa', 'Perfil institucional'],
      subcards: [
        {
          title: 'Asignación por Horizontes',
          description: 'Caja operativa diaria, fondos de reserva y excedentes estratégicos para maximizar el rendimiento.',
          tag: 'Eficiencia Financiera'
        },
        {
          title: 'Informes de Desempeño',
          description: 'Monitoreo consolidado con transparencia fiscal y acompañamiento de ejecutivos senior.',
          tag: 'Reportes'
        }
      ]
    },
    {
      id: 'folha-consignado',
      number: '06',
      tabLabel: 'Nómina y Consignado',
      tabSub: 'Público y Privado',
      title: 'Gestión de nómina y créditos con descuento directo.',
      description: 'Procesamiento de nómina y líneas de crédito con descuento en nómina para funcionarios públicos y empleados del sector privado.',
      pills: ['Consignado Público', 'Consignado Privado', 'Procesamiento de Nómina'],
      subcards: [
        {
          title: 'Consignado para Funcionarios Públicos',
          description: 'Convenios directos con alcaldías y organismos estatales con plazos de hasta 120 meses y validación digital.',
          tag: 'Sector Público'
        },
        {
          title: 'Beneficio Privado para Empleados',
          description: 'Bienestar financiero para retención de talentos sin costo ni riesgo para el empleador.',
          tag: 'Sector Privado'
        }
      ]
    },
    {
      id: 'caas',
      number: '07',
      tabLabel: 'CaaS',
      tabSub: 'Credit as a Service',
      title: 'Su empresa ofreciendo crédito con infraestructura integral.',
      description: 'Infraestructura tecnológica y regulatoria llave en mano para que empresas y plataformas emitan y gestionen productos de crédito con marca propia mediante APIs.',
      pills: ['Crédito White-label', 'Integración por APIs REST', 'Cumplimiento Regulatorio'],
      subcards: [
        {
          title: 'Emisión y Gestión White-label',
          description: 'Personalice la experiencia de sus clientes con reglas de crédito a medida, alta 100% digital y contratos automatizados.',
          tag: 'Marca Blanca'
        },
        {
          title: 'APIs e Infraestructura Regulatoria',
          description: 'Conéctese a nuestros motores de riesgo, prevención de fraude y liquidación supervisada por el Banco Central.',
          tag: 'Infraestructura y APIs'
        }
      ]
    }
  ]
};

export const SEGMENTS_DATA_BY_LANG: Record<Language, SegmentItem[]> = {
  pt: [
    {
      id: 'fornecedores-publicos',
      title: 'Fornecedores do setor público',
      description: 'Empresas com contratos vigentes e empenhos emitidos que necessitam de antecipação previsível e garantias para suportar o ciclo de recebimento governamental.',
      tag: 'Especialidade Principal',
      featured: true,
      metrics: '+ R$ 450M antecipados',
      iconName: 'Building2'
    },
    {
      id: 'varejo-franquias',
      title: 'Varejo e franquias',
      description: 'Redes comerciais com alto volume de cartões e necessidade de conciliação diária, taxas justas e antecipação imediata do fluxo de balcão.',
      tag: 'Alto Volume',
      iconName: 'Store'
    },
    {
      id: 'produtores-cooperativas',
      title: 'Produtores e cooperativas',
      description: 'Produtores rurais, cerealistas e cooperativas que demandam estruturação de CPR, custeio de safra e soluções de barter eficientes.',
      tag: 'Agronegócio',
      iconName: 'Wheat'
    },
    {
      id: 'industria-distribuicao',
      title: 'Indústria e distribuição',
      description: 'Cadeias industriais e centros de distribuição que requerem limites robustos para aquisição de matéria-prima e financiamento de pedidos.',
      tag: 'Supply Chain',
      iconName: 'Factory'
    },
    {
      id: 'prestadores-servico',
      title: 'Prestadores de serviço B2B',
      description: 'Consultorias, empresas de engenharia e TI que demandam contas inteligentes com gestão de múltiplos usuários e cobrança automatizada.',
      tag: 'Serviços Corporativos',
      iconName: 'Briefcase'
    },
    {
      id: 'tesourarias-holdings',
      title: 'Tesourarias e holdings',
      description: 'Grupos econômicos e tesourarias centralizadas que buscam alocação profissional de caixa excedente e visão consolidada de liquidez.',
      tag: 'Gestão Patrimonial',
      iconName: 'Landmark'
    }
  ],
  en: [
    {
      id: 'fornecedores-publicos',
      title: 'Government & Public Suppliers',
      description: 'Companies with active public contracts and commitments that require predictable cash flow and bonds to bridge government payment cycles.',
      tag: 'Core Specialization',
      featured: true,
      metrics: '+ $ 90M USD advanced',
      iconName: 'Building2'
    },
    {
      id: 'varejo-franquias',
      title: 'Retail & Franchises',
      description: 'Retail chains with high card volume requiring automated daily reconciliation, fair processing fees, and immediate checkout liquidity.',
      tag: 'High Volume',
      iconName: 'Store'
    },
    {
      id: 'produtores-cooperativas',
      title: 'Agri Producers & Co-ops',
      description: 'Growers, grain processors, and agricultural cooperatives requiring CPR structuring, harvest financing, and barter mechanisms.',
      tag: 'Agribusiness',
      iconName: 'Wheat'
    },
    {
      id: 'industria-distribuicao',
      title: 'Manufacturing & Distribution',
      description: 'Industrial supply chains and distribution hubs requiring robust credit limits for raw material procurement and order financing.',
      tag: 'Supply Chain',
      iconName: 'Factory'
    },
    {
      id: 'prestadores-servico',
      title: 'B2B Professional Services',
      description: 'Consultancies, engineering firms, and tech providers that need smart accounts with multi-user permissions and automated billing.',
      tag: 'Corporate Services',
      iconName: 'Briefcase'
    },
    {
      id: 'tesourarias-holdings',
      title: 'Treasuries & Holding Companies',
      description: 'Corporate groups seeking professional institutional cash management, portfolio suitability, and unified liquidity oversight.',
      tag: 'Asset Management',
      iconName: 'Landmark'
    }
  ],
  es: [
    {
      id: 'fornecedores-publicos',
      title: 'Proveedores del Sector Público',
      description: 'Empresas con contratos públicos vigentes que requieren anticipo de fondos y pólizas de garantía para cubrir los plazos de pago estatal.',
      tag: 'Especialidad Principal',
      featured: true,
      metrics: '+ R$ 450M anticipados',
      iconName: 'Building2'
    },
    {
      id: 'varejo-franquias',
      title: 'Comercio Minorista y Franquicias',
      description: 'Cadenas comerciales con alto volumen de transacciones con tarjeta que requieren conciliación diaria y liquidación inmediata.',
      tag: 'Alto Volumen',
      iconName: 'Store'
    },
    {
      id: 'produtores-cooperativas',
      title: 'Productores y Cooperativas Agro',
      description: 'Productores agrícolas y cooperativas que requieren estructuración de títulos CPR, financiamiento de cosechas y convenios barter.',
      tag: 'Agronegocios',
      iconName: 'Wheat'
    },
    {
      id: 'industria-distribuicao',
      title: 'Industria y Distribución',
      description: 'Cadenas industriales que demandan líneas de crédito para compra de materia prima y financiamiento de pedidos a escala.',
      tag: 'Cadena de Suministro',
      iconName: 'Factory'
    },
    {
      id: 'prestadores-servico',
      title: 'Servicios Profesionales B2B',
      description: 'Empresas de ingeniería, consultoría y tecnología que necesitan cuentas con permisos jerárquicos y facturación automática.',
      tag: 'Servicios Corporativos',
      iconName: 'Briefcase'
    },
    {
      id: 'tesourarias-holdings',
      title: 'Tesorerías y Grupos Empresariales',
      description: 'Corporativos que buscan una gestión profesional de excedentes de liquidez y visión consolidada de posición de caja.',
      tag: 'Gestión Patrimonial',
      iconName: 'Landmark'
    }
  ]
};

export const PROCESS_STEPS_BY_LANG: Record<Language, ProcessStep[]> = {
  pt: [
    {
      number: '01',
      title: 'Diagnóstico da operação',
      description: 'Mapeamento do modelo de negócio, histórico de faturamento e instrumentos contratuais a serem antecipados ou estruturados.',
      deliverable: 'Parecer prévio em até 24h'
    },
    {
      number: '02',
      title: 'Análise de crédito e documentação',
      description: 'Checagem cadastral, conferência de empenhos junto aos órgãos emissores e validação de compliance via esteira automatizada.',
      deliverable: 'Definição de taxa e limite'
    },
    {
      number: '03',
      title: 'Estruturação e formalização',
      description: 'Emissão dos contratos digitais e instrumentos de garantia com assinatura eletrônica e total segurança jurídica.',
      deliverable: 'Assinatura digitalizada'
    },
    {
      number: '04',
      title: 'Liquidação e acompanhamento',
      description: 'Liberação do recurso via conta gráfica homologada pelo Banco Central e suporte contínuo de um gerente de conta dedicado.',
      deliverable: 'Recurso creditado em conta'
    }
  ],
  en: [
    {
      number: '01',
      title: 'Operational Diagnosis',
      description: 'Mapping the business model, billing history, and contractual instruments to be structured or advanced.',
      deliverable: 'Preliminary assessment within 24h'
    },
    {
      number: '02',
      title: 'Credit Analysis & Verification',
      description: 'Background checks, contract validation with issuing public bodies, and automated compliance screening.',
      deliverable: 'Rate and limit determination'
    },
    {
      number: '03',
      title: 'Structuring & Formalization',
      description: 'Issuance of digital agreements and security instruments with electronic signature and full legal validity.',
      deliverable: 'Digitally signed contracts'
    },
    {
      number: '04',
      title: 'Settlement & Monitoring',
      description: 'Disbursement of funds via Central Bank authorized accounts and continuous dedicated account management.',
      deliverable: 'Funds credited to account'
    }
  ],
  es: [
    {
      number: '01',
      title: 'Diagnóstico de la operación',
      description: 'Evaluación del modelo de negocio, facturación histórica e instrumentos contractuales a estructurar o anticipar.',
      deliverable: 'Informe previo en hasta 24h'
    },
    {
      number: '02',
      title: 'Análisis de crédito y documentación',
      description: 'Verificación de antecedentes, control de contratos con organismos pagadores y validación de cumplimiento.',
      deliverable: 'Definición de tasa y límite'
    },
    {
      number: '03',
      title: 'Estructuración y formalización',
      description: 'Emisión de contratos digitales y garantías con firma electrónica y total validez jurídica.',
      deliverable: 'Firma digitalizada'
    },
    {
      number: '04',
      title: 'Liquidación y seguimiento',
      description: 'Desembolso de recursos a través de cuentas reguladas por el Banco Central y acompañamiento de un ejecutivo dedicado.',
      deliverable: 'Fondos acreditados en cuenta'
    }
  ]
};

export const FAQ_DATA_BY_LANG: Record<Language, FaqItem[]> = {
  pt: [
    {
      question: 'A XD Capital é um banco?',
      answer: 'Não. A XD Capital é um hub de inteligência e intermediação financeira que atua como correspondente bancário nos termos da regulamentação vigente. Todas as contas de pagamento e liquidações financeiras são operadas pela Fidúcia SCM, instituição financeira autorizada pelo Banco Central do Brasil sob o código 382.'
    },
    {
      question: 'Quais documentos preciso enviar para antecipar um empenho?',
      answer: 'Para a análise preliminar, basta enviar o Contrato Administrativo assinado, a Nota de Empenho (NE) válida emitida pelo órgão público e a medição/nota fiscal correspondente (caso já emitida), além dos documentos cadastrais básicos da empresa (Contrato Social e balanço recente).'
    },
    {
      question: 'Em quanto tempo sai a análise?',
      answer: 'A análise documental e checagem de veracidade do empenho junto ao órgão contratante é concluída em média em até 72 horas úteis. Após a assinatura do termo de cessão, a liquidação dos recursos ocorre no mesmo dia.'
    },
    {
      question: 'Quem opera a conta digital e a liquidação?',
      answer: 'As contas digitais PJ, custódia e liquidação de recebíveis são operadas diretamente pela Fidúcia Sociedade de Crédito ao Microempreendedor e à Empresa de Pequeno Porte Ltda. (Fidúcia SCM), autorizada e fiscalizada pelo Banco Central do Brasil.'
    },
    {
      question: 'Atendem empresas de qualquer porte e região?',
      answer: 'Atendemos empresas fornecedoras do setor público, varejistas, indústrias e produtores rurais em todas as 27 unidades da federação. Nosso foco é em pessoas jurídicas com faturamento anual a partir de R$ 500 mil ou com contratos públicos vigentes.'
    },
    {
      question: 'Como funciona a integração com o meu ERP?',
      answer: 'Disponibilizamos APIs RESTful de alta performance e suporte aos padrões CNAB 240/400 para envio de remessas e leitura de retornos de pagamento, cobrança e conciliação bancária automática com os principais sistemas de gestão do mercado (TOTVS, SAP, Omie, ContaAzul, Sankhya, etc).'
    },
    {
      question: 'Como funciona a solução de CaaS (Credit as a Service)?',
      answer: 'Com a solução CaaS da XD Capital, sua empresa pode oferecer empréstimos, financiamentos e crédito consignado sob sua própria marca (white-label). Cuidamos de toda a infraestrutura regulatória, esteira de risco e liquidação via APIs simples de integrar.'
    },
    {
      question: 'Posso antecipar recebíveis de contratos privados ou cartões?',
      answer: 'Sim. Além da especialidade em empenhos públicos, realizamos antecipação de recebíveis de duplicatas mercantis privadas, cartões de crédito e contratos corporativos com taxas competitivas e liquidação rápida em conta PJ.'
    }
  ],
  en: [
    {
      question: 'Is XD Capital a bank?',
      answer: 'No. XD Capital is a financial intelligence and intermediation hub operating as a regulated banking correspondent. Payment accounts and settlements are operated by Fidúcia SCM, a financial institution authorized and supervised by the Central Bank of Brazil (Bacen Code 382).'
    },
    {
      question: 'What documentation is required to advance a public contract?',
      answer: 'For preliminary review, submit the signed Public Contract, the valid Commitment Note (NE) issued by the government entity, and corresponding invoices or work-orders, alongside standard corporate registration documents (Articles of Incorporation and recent balance sheet).'
    },
    {
      question: 'What is the turnaround time for credit approval?',
      answer: 'Documentary analysis and confirmation with the contracting public authority typically concludes within 72 business hours. Following assignment agreement signature, funds are disbursed on the same day.'
    },
    {
      question: 'Who operates the digital payment accounts and settlement?',
      answer: 'Corporate digital accounts, custody, and settlement are directly executed by Fidúcia SCM, a licensed financial institution under the jurisdiction of the Central Bank of Brazil.'
    },
    {
      question: 'Do you serve businesses of all sizes across Brazil?',
      answer: 'We serve public sector contractors, retailers, manufacturers, and agribusiness enterprises across all 27 Brazilian states, focusing on companies with annual turnover from R$ 500k or active public contracts.'
    },
    {
      question: 'How does ERP integration work?',
      answer: 'We provide high-performance RESTful APIs and standard banking file formats (CNAB 240/400) for batch payouts, dynamic invoicing, and automated bank reconciliation with leading ERP systems (SAP, TOTVS, Omie, ContaAzul, etc.).'
    },
    {
      question: 'How does Credit as a Service (CaaS) work?',
      answer: 'With XD Capital’s CaaS solution, your company can launch and manage proprietary white-label credit and lending products. We provide the complete regulatory rail, underwriting engine, and settlement infrastructure via plug-and-play APIs.'
    },
    {
      question: 'Can I advance private contracts and card receivables?',
      answer: 'Yes. In addition to public sector contracts, we advance private trade bills, credit card transactions, and commercial contracts with competitive rates and same-day settlement into your corporate account.'
    }
  ],
  es: [
    {
      question: '¿Es XD Capital un banco?',
      answer: 'No. XD Capital es un hub de inteligencia e intermediación financiera que opera como corresponsal bancario autorizado. Las cuentas de pago y liquidaciones son operadas por Fidúcia SCM, institución financiera autorizada por el Banco Central de Brasil (Código Bacen 382).'
    },
    {
      question: '¿Qué documentos son necesarios para anticipar un contrato público?',
      answer: 'Para la evaluación preliminar, basta enviar el Contrato Administrativo firmado, la Nota de Compromiso/Empenho válida emitida por el organismo público y la factura correspondiente, además de los documentos constitutivos de la empresa.'
    },
    {
      question: '¿Cuál es el tiempo de respuesta para la aprobación?',
      answer: 'El análisis documental y verificación con el organismo contratante concluye en promedio en hasta 72 horas hábiles. Tras la firma del contrato de cesión, los fondos se desembolsan en el mismo día.'
    },
    {
      question: '¿Quién administra las cuentas digitales y la liquidación?',
      answer: 'Las cuentas empresariales de pago, custodia y liquidación son operadas directamente por Fidúcia SCM, institución supervisada por el Banco Central de Brasil.'
    },
    {
      question: '¿Atienden a empresas de cualquier tamaño y región?',
      answer: 'Atendemos a proveedores del sector público, comercios, industrias y productores agropecuarios en todo el territorio de Brasil con facturación anual o contratos públicos vigentes.'
    },
    {
      question: '¿Cómo funciona la integración con mi sistema ERP?',
      answer: 'Ofrecemos APIs RESTful de alto rendimiento y formatos bancarios estándar (CNAB 240/400) para pagos masivos, cobranzas con QR y conciliación bancaria automática con los principales ERPs del mercado.'
    },
    {
      question: '¿Cómo funciona la solución de CaaS (Credit as a Service)?',
      answer: 'Con la solución CaaS de XD Capital, su empresa puede ofrecer préstamos y productos crediticios bajo su propia marca blanca (white-label), con respaldo regulatorio e integración directa mediante APIs.'
    },
    {
      question: '¿Puedo anticipar cuentas por cobrar privadas o cobros de tarjetas?',
      answer: 'Sí. Además de contratos públicos, realizamos anticipo de facturas comerciales privadas, cuentas por cobrar de tarjetas y pagarés empresariales con liquidación ágil en cuenta bancaria.'
    }
  ]
};

// Backward-compatible default exports
export const SOLUTIONS_DATA = SOLUTIONS_DATA_BY_LANG.pt;
export const SEGMENTS_DATA = SEGMENTS_DATA_BY_LANG.pt;
export const PROCESS_STEPS = PROCESS_STEPS_BY_LANG.pt;
export const FAQ_DATA = FAQ_DATA_BY_LANG.pt;
