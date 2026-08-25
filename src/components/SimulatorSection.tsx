import React, { useState, useMemo } from 'react';
import { Calculator, ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Wallet } from 'lucide-react';

interface SimulatorProps {
  onOpenContact: (subject: string) => void;
}

export const SimulatorSection: React.FC<SimulatorProps> = ({ onOpenContact }) => {
  const [salaryBalance, setSalaryBalance] = useState<number>(1200);
  const [days, setDays] = useState<number>(15);
  const [serviceFee, setServiceFee] = useState<number>(120);

  // Calculation
  const calculation = useMemo(() => {
    const gross = salaryBalance;
    const fee = serviceFee;
    const liquid = Math.max(0, gross - fee);

    return {
      gross,
      liquid,
      fee
    };
  }, [salaryBalance, serviceFee]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <section
      id="simulador"
      aria-label="Simulador de Antecipação de Salário"
      className="py-20 md:py-32 bg-[#FAFAFC] border-t border-slate-200/80 relative"
    >
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context */}
          <div className="lg:col-span-5">
            <div className="eyebrow-label mb-3">SALÁRIO SOB DEMANDA</div>
            <h2 className="section-h2 text-[#0B0F19] mb-5">
              Simulador de antecipação de salário.
            </h2>
            <p className="body-text text-[16.5px] leading-relaxed text-slate-600 mb-6">
              Receba instantaneamente pelos seus dias já trabalhados antes da data oficial do pagamento. Sem burocracia, sem juros rotativos de cartão e sem contrair dívidas bancárias.
            </p>

            <div className="space-y-3.5 mb-8">
              <div className="flex items-center gap-2.5 text-[14px] text-slate-700 font-normal">
                <CheckCircle2 className="w-4 h-4 text-[#A3192E]" />
                <span>Transferência imediata via Pix para a sua conta</span>
              </div>
              <div className="flex items-center gap-2.5 text-[14px] text-slate-700 font-normal">
                <CheckCircle2 className="w-4 h-4 text-[#A3192E]" />
                <span>Sem consulta ao SPC/Serasa ou restrições cadastrais</span>
              </div>
              <div className="flex items-center gap-2.5 text-[14px] text-slate-700 font-normal">
                <CheckCircle2 className="w-4 h-4 text-[#A3192E]" />
                <span>Taxa fixa e transparente descontada na própria folha</span>
              </div>
            </div>

            <div className="p-4 rounded-[14px] bg-white border border-slate-200 flex items-center gap-3 text-[13px] text-slate-600 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#A3192E] shrink-0" />
              <span>Simulação indicativa para colaboradores de empresas e órgãos parceiros da XD Capital.</span>
            </div>
          </div>

          {/* Right Column: Interactive Simulator Card */}
          <div className="lg:col-span-7">
            <div
              onMouseMove={handleMouseMove}
              className="spotlight-card rounded-[24px] p-7 sm:p-9 bg-white border border-slate-200/90 shadow-xl"
            >
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#A3192E]/10 border border-[#A3192E]/25 flex items-center justify-center">
                    <Calculator className="w-4 h-4 text-[#A3192E]" />
                  </div>
                  <span className="font-normal text-[16px] text-slate-900">Parâmetros da Antecipação</span>
                </div>
                <span className="text-[12px] font-mono text-[#A3192E] font-normal bg-[#A3192E]/[0.08] border border-[#A3192E]/20 px-2.5 py-1 rounded">
                  CÁLCULO DINÂMICO
                </span>
              </div>

              {/* Slider 1: Saldo Disponível para Antecipar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="input-saldo" className="text-[13.5px] font-normal text-slate-700 flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-slate-400" />
                    <span>Saldo Disponível para Antecipar</span>
                  </label>
                  <span className="text-[18px] font-normal text-slate-900 font-mono">
                    {formatBRL(salaryBalance)}
                  </span>
                </div>
                <input
                  id="input-saldo"
                  type="range"
                  min="200"
                  max="5000"
                  step="50"
                  value={salaryBalance}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSalaryBalance(val);
                    // Dynamically scale default fee proportionally (10% rounded to nearest 5)
                    setServiceFee(Math.round((val * 0.1) / 5) * 5);
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#A3192E]"
                />
                <div className="flex justify-between text-[11.5px] font-mono text-slate-500 mt-1">
                  <span>R$ 200</span>
                  <span>R$ 1.200</span>
                  <span>R$ 5.000</span>
                </div>
              </div>

              {/* Slider 2: Dias até o Próximo Pagamento */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="input-prazo" className="text-[13.5px] font-normal text-slate-700">
                    Dias até o Próximo Pagamento
                  </label>
                  <span className="text-[18px] font-normal text-slate-900 font-mono">
                    {days} dias
                  </span>
                </div>
                <input
                  id="input-prazo"
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#A3192E]"
                />
                <div className="flex justify-between text-[11.5px] font-mono text-slate-500 mt-1">
                  <span>5 dias</span>
                  <span>15 dias</span>
                  <span>30 dias</span>
                </div>
              </div>

              {/* Slider 3: Taxa de Antecipação (em Reais, sem %) */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="input-taxa" className="text-[13.5px] font-normal text-slate-700">
                    Taxa do Serviço de Antecipação
                  </label>
                  <span className="text-[18px] font-normal text-[#A3192E] font-mono">
                    {formatBRL(serviceFee)}
                  </span>
                </div>
                <input
                  id="input-taxa"
                  type="range"
                  min="20"
                  max="500"
                  step="5"
                  value={serviceFee}
                  onChange={(e) => setServiceFee(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#A3192E]"
                />
                <div className="flex justify-between text-[11.5px] font-mono text-slate-500 mt-1">
                  <span>R$ 20,00</span>
                  <span>R$ 120,00</span>
                  <span>R$ 500,00</span>
                </div>
              </div>

              {/* Output Results Box */}
              <div className="p-5 rounded-[18px] bg-[#F1F3F7] border border-slate-200/90 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <span className="text-[12px] uppercase tracking-wider text-slate-500 font-mono font-normal block mb-1">
                      Valor Líquido a Receber (Pix)
                    </span>
                    <span className="text-[26px] sm:text-[30px] font-normal text-slate-900 font-tabular font-mono">
                      {formatBRL(calculation.liquid)}
                    </span>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[12px] uppercase tracking-wider text-slate-500 font-mono font-normal block mb-1">
                      Taxa de Antecipação
                    </span>
                    <span className="text-[18px] sm:text-[20px] font-normal text-[#A3192E] font-tabular font-mono">
                      - {formatBRL(calculation.fee)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-200/70 flex items-center justify-between text-[12px] text-slate-600">
                  <span>Desconto na folha de pagamento:</span>
                  <span className="font-mono font-medium text-slate-800">{formatBRL(calculation.gross)}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenContact(`Simulação de Antecipação Salarial: Saldo ${formatBRL(salaryBalance)} em ${days} dias (Líquido: ${formatBRL(calculation.liquid)} / Taxa: ${formatBRL(serviceFee)})`)}
                className="w-full btn-primary justify-center text-[15px] !py-3.5 cursor-pointer"
              >
                <span>Solicitar antecipação salarial</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

