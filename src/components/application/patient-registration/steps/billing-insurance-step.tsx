import { FC, useState } from "react";
import { TextField } from "@/components/base/inputs/text-field";

interface BillingInsuranceStepProps {
    className?: string;
}

export const BillingInsuranceStep: FC<BillingInsuranceStepProps> = ({ className }) => {
    const [hasInsurance, setHasInsurance] = useState<null | boolean>(null);
    const [insurancePlan, setInsurancePlan] = useState("");
    const [insuranceCard, setInsuranceCard] = useState("");
    return (
        <div className={`space-y-4 ${className || ''}`}>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Cobrança e Seguro
                </h3>
                <p className="text-sm text-gray-600">
                    Informações de cobrança e seguro
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Coluna Esquerda */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Método de pagamento escolhido
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none focus:outline-none transition-colors">
                            <option value="">Selecionar método</option>
                            <option value="pix">PIX</option>
                            <option value="credit-card">Cartão de Crédito</option>
                            <option value="debit-card">Cartão de Débito</option>
                            <option value="bank-transfer">Transferência Bancária</option>
                            <option value="cash">Dinheiro</option>
                        </select>
                    </div>

                    <TextField
                        label="Documento para recibo (CPF/CNPJ)"
                        type="text"
                        placeholder="CPF/CNPJ do pagador (opcional)"
                    />

                    <div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Dia do vencimento
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none focus:outline-none transition-colors">
                                <option value="">Selecionar dia</option>
                                {Array.from({ length: 31 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        Dia {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Coluna Direita */}
                <div className="space-y-4">
                    <TextField
                        label="Valor acordado por sessão* (R$)"
                        type="text"
                        placeholder="R$ 0.00"
                    />
                    <TextField
                        label="Total de sessões por mês"
                        type="number"
                        placeholder="Número de sessões por mês"
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Possui plano de saúde?
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="inline-flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="has-insurance"
                                    checked={hasInsurance === true}
                                    onChange={() => setHasInsurance(true)}
                                />
                                <span className="text-sm text-gray-700">Sim</span>
                            </label>
                            <label className="inline-flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="has-insurance"
                                    checked={hasInsurance === false}
                                    onChange={() => setHasInsurance(false)}
                                />
                                <span className="text-sm text-gray-700">Não</span>
                            </label>
                        </div>
                    </div>

                </div>
            </div>

            {/* Campos Adicionais */}


            {/* Plano de saúde - ao final do formulário */}
            <div className="space-y-4 mb-2">
                {hasInsurance === true && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField
                            label="Plano de saúde"
                            type="text"
                            placeholder="Ex: Unimed, Bradesco Saúde"
                            value={insurancePlan}
                            onChange={(e) => setInsurancePlan(e.target.value)}
                        />
                        <TextField
                            label="Número da carteirinha do plano de saúde"
                            type="text"
                            placeholder="Número do cartão"
                            value={insuranceCard}
                            onChange={(e) => setInsuranceCard(e.target.value)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
