import { FC } from "react";
import { TextField, RadioGroupField, CurrencyField, CpfField, SelectField } from "@/components/base/inputs/form-inputs";
import { PatientFormData } from "@/types/patientForm";
import { Control, useWatch } from "react-hook-form";

interface BillingInsuranceStepProps {
    className?: string;
    control: Control<PatientFormData>;
}

export const BillingInsuranceStep: FC<BillingInsuranceStepProps> = ({ className, control }) => {
    // Observar o valor do campo hasInsurance
    const hasInsurance = useWatch({
        control,
        name: "billingInsurance.hasInsurance"
    });

    return (
        <div className={`${className || ''}`}>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Cobrança e Seguro
                </h3>
                <p className="text-sm text-gray-600">
                    Informações de cobrança e seguro
                </p>
            </div>

            <div className="space-y-4 mt-4">
                {/* Primeira linha: Método de pagamento e CPF */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField
                        name="billingInsurance.paymentMethodSelected"
                        control={control}
                        label="Método de pagamento escolhido"
                        placeholder="Selecionar método"
                        options={[
                            { value: "pix", label: "PIX" },
                            { value: "credit-card", label: "Cartão de Crédito" },
                            { value: "debit-card", label: "Cartão de Débito" },
                            { value: "bank-transfer", label: "Transferência Bancária" },
                            { value: "cash", label: "Dinheiro" }
                        ]}
                    />

                    <CpfField
                        name="billingInsurance.document"
                        control={control}
                        rules={{
                            pattern: {
                                value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                                message: 'CPF deve estar no formato XXX.XXX.XXX-XX'
                            }
                        }}
                        label="CPF para recibo (Caso necessário)"
                        placeholder="XXX.XXX.XXX-XX"
                    />
                </div>

                {/* Segunda linha: Dia do vencimento e Valor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <CurrencyField
                        name="billingInsurance.value"
                        control={control}
                        rules={{
                            required: 'Valor é obrigatório',
                            min: { value: 0.01, message: 'Valor deve ser maior que zero' }
                        }}
                        label="Valor acordado por sessão"
                        placeholder="R$ 0,00"
                        required
                    />
                </div>

                {/* Terceira linha: Total de sessões e Plano de saúde */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                        name="billingInsurance.totalSessions"
                        control={control}
                        label="Total de sessões por mês"
                        placeholder="Número de sessões por mês"
                    />

                    <RadioGroupField
                        name="billingInsurance.hasInsurance"
                        control={control}
                        label="Utilizará plano de saúde?"
                        options={[
                            { value: true, label: "Sim" },
                            { value: false, label: "Não" }
                        ]}
                    />
                </div>
            </div>

            {/* Campos Adicionais */}


            {/* Plano de saúde - ao final do formulário */}
            {hasInsurance === true && (
                <div className="space-y-4 mb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField
                            name="billingInsurance.insurancePlan"
                            control={control}
                            label="Plano de saúde"
                            placeholder="Ex: Unimed, Bradesco Saúde"
                        />
                        <TextField
                            name="billingInsurance.insuranceCard"
                            control={control}
                            label="Número da carteirinha do plano de saúde"
                            placeholder="Número do cartão"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
