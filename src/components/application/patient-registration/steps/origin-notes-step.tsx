import { FC } from "react";
import { TextField } from "@/components/base/inputs/text-field";

interface OriginNotesStepProps {
    className?: string;
}

export const OriginNotesStep: FC<OriginNotesStepProps> = ({ className }) => {
    return (
        <div className={`space-y-6 ${className || ''}`}>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Origem e Notas
                </h3>
                <p className="text-sm text-gray-600">
                    Informações sobre como o paciente chegou até a clínica e notas internas
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Coluna Esquerda */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Como o paciente soube da clínica?
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none focus:outline-none transition-colors">
                        <option value="">Selecionar origem</option>
                        <option value="google">Google</option>
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                        <option value="indicacao">Indicação de paciente</option>
                        <option value="indicacao-medico">Indicação médica</option>
                        <option value="site-clinica">Site da clínica</option>
                        <option value="panfletos">Panfletos</option>
                        <option value="outdoor">Outdoor</option>
                        <option value="radio">Rádio</option>
                        <option value="tv">TV</option>
                        <option value="jornal">Jornal</option>
                        <option value="outro">Outro</option>
                    </select>
                </div>

                {/* Coluna Direita */}
                <TextField
                    label="Notas Internas (Apenas Psicólogo)"
                    multiline
                    rows={6}
                    placeholder="Quaisquer notas sobre o paciente ou caso"
                />
            </div>
        </div>
    );
};
