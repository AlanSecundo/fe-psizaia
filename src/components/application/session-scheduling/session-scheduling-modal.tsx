import { FC, useState } from "react";
import { X, Calendar, ChevronDown, Clock, User } from "lucide-react";

interface SessionSchedulingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface RecurrenceOption {
    value: string;
    label: string;
}

interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
}

const recurrenceOptions: RecurrenceOption[] = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Quinzenal' },
    { value: 'monthly', label: 'Mensal' },
];

// Mock data for patients
const mockPatients: Patient[] = [
    { id: '1', name: 'Ana Silva', email: 'ana.silva@email.com', phone: '(11) 99999-1111' },
    { id: '2', name: 'Carlos Santos', email: 'carlos.santos@email.com', phone: '(11) 99999-2222' },
    { id: '3', name: 'Maria Oliveira', email: 'maria.oliveira@email.com', phone: '(11) 99999-3333' },
    { id: '4', name: 'João Costa', email: 'joao.costa@email.com', phone: '(11) 99999-4444' },
    { id: '5', name: 'Fernanda Lima', email: 'fernanda.lima@email.com', phone: '(11) 99999-5555' },
];

// Time options for time picker
const timeOptions = [
    "08:00 - 08:50 ", "09:00 - 09:50 ", "10:00 - 10:50 ", "11:00 - 11:50 ",
    "12:00 - 12:50 ", "13:00 - 13:50 ", "14:00 - 14:50 ", "15:00 - 15:50 ",
    "16:00 - 16:50 ", "17:00 - 17:50 ", "18:00 - 18:50 ", "19:00 - 19:50 ",];

// Date picker component
const DatePicker = ({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleDateSelect = (date: Date) => {
        onChange(formatDate(date));
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                readOnly
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors cursor-pointer"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                        <div className="p-2 font-medium text-gray-500">Dom</div>
                        <div className="p-2 font-medium text-gray-500">Seg</div>
                        <div className="p-2 font-medium text-gray-500">Ter</div>
                        <div className="p-2 font-medium text-gray-500">Qua</div>
                        <div className="p-2 font-medium text-gray-500">Qui</div>
                        <div className="p-2 font-medium text-gray-500">Sex</div>
                        <div className="p-2 font-medium text-gray-500">Sáb</div>

                        {Array.from({ length: 31 }, (_, i) => {
                            const day = i + 1;
                            const date = new Date(2025, 9, day); // October 2025
                            return (
                                <button
                                    key={day}
                                    onClick={() => handleDateSelect(date)}
                                    className="p-2 hover:bg-purple-50 hover:text-purple-600 rounded transition-colors"
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

// Time picker component
const TimePicker = ({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                readOnly
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors cursor-pointer"
            />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {timeOptions.map((time) => (
                        <button
                            key={time}
                            onClick={() => {
                                onChange(time);
                                setIsOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-purple-50 hover:text-purple-600 transition-colors flex items-center"
                        >
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            {time}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// Patient selector component
const PatientSelector = ({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedPatient = mockPatients.find(patient => patient.id === value);

    return (
        <div className="relative">
            <input
                type="text"
                placeholder={placeholder}
                value={selectedPatient ? selectedPatient.name : ""}
                readOnly
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors cursor-pointer"
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {mockPatients.map((patient) => (
                        <button
                            key={patient.id}
                            onClick={() => {
                                onChange(patient.id);
                                setIsOpen(false);
                            }}
                            className="w-full px-3 py-3 text-left hover:bg-purple-50 hover:text-purple-600 transition-colors flex items-start border-b border-gray-100 last:border-b-0"
                        >
                            <div className="flex-1">
                                <div className="font-medium text-gray-900">{patient.name}</div>
                                <div className="text-sm text-gray-500">{patient.email}</div>
                                <div className="text-sm text-gray-500">{patient.phone}</div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export const SessionSchedulingModal: FC<SessionSchedulingModalProps> = ({
    isOpen,
    onClose
}) => {
    const [formData, setFormData] = useState({
        patientId: "",
        date: "",
        type: "",
        time: "",
        isRecurring: false,
        recurrence: "weekly",
        modality: "online",
        duration: "50"
    });

    if (!isOpen) return null;

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        const selectedPatient = mockPatients.find(patient => patient.id === formData.patientId);
        console.log("Dados do agendamento:", {
            ...formData,
            patient: selectedPatient
        });
        // TODO: Implementar lógica de agendamento
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden border border-gray-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Agendamento de Sessão
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Preencha os detalhes para agendar uma nova sessão.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    <div className="space-y-4">
                        {/* Seleção de Paciente */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 w-24">
                                Paciente
                            </label>
                            <div className="flex-1 max-w-xs">
                                <PatientSelector
                                    value={formData.patientId}
                                    onChange={(value) => handleInputChange("patientId", value)}
                                    placeholder="Selecione um paciente"
                                />
                            </div>
                        </div>

                        {/* Data */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 w-24">
                                Data
                            </label>
                            <div className="flex-1 max-w-xs">
                                <DatePicker
                                    value={formData.date}
                                    onChange={(value) => handleInputChange("date", value)}
                                    placeholder="Selecione a data"
                                />
                            </div>
                        </div>

                        {/* Horário */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 w-24">
                                Horário
                            </label>
                            <div className="flex-1 max-w-xs">
                                <TimePicker
                                    value={formData.time}
                                    onChange={(value) => handleInputChange("time", value)}
                                    placeholder="Selecione o horário"
                                />
                            </div>
                        </div>

                        {/* Modalidade e Duração na mesma linha */}
                        <div className="flex items-center justify-between">
                            {/* Modalidade */}
                            <div className="space-y-3 flex-grow">
                                <label className="block text-sm font-medium text-gray-700">
                                    Modalidade
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="modality"
                                            value="online"
                                            checked={formData.modality === "online"}
                                            onChange={(e) => handleInputChange("modality", e.target.value)}
                                            className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Online</span>
                                    </label>
                                    <label className="flex items-center ">
                                        <input
                                            type="radio"
                                            name="modality"
                                            value="presencial"
                                            checked={formData.modality === "presencial"}
                                            onChange={(e) => handleInputChange("modality", e.target.value)}
                                            className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Presencial</span>
                                    </label>
                                </div>
                            </div>

                            {/* Duração */}
                            <div className="space-y-3 flex-grow">
                                <label className="block text-sm font-medium text-gray-700">
                                    Duração
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="duration"
                                            value="30"
                                            checked={formData.duration === "30"}
                                            onChange={(e) => handleInputChange("duration", e.target.value)}
                                            className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">30 minutos</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="duration"
                                            value="50"
                                            checked={formData.duration === "50"}
                                            onChange={(e) => handleInputChange("duration", e.target.value)}
                                            className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">50 minutos</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Sessão Recorrente */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="recurring"
                                checked={formData.isRecurring}
                                onChange={(e) => handleInputChange("isRecurring", e.target.checked)}
                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <label htmlFor="recurring" className="ml-2 text-sm text-gray-700">
                                Sessão recorrente?
                            </label>
                        </div>

                        {/* Recorrência - Condicional */}
                        {formData.isRecurring && (
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">
                                    Recorrência
                                </label>
                                <div className="space-y-2">
                                    {recurrenceOptions.map((option) => (
                                        <label key={option.value} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="recurrence"
                                                value={option.value}
                                                checked={formData.recurrence === option.value}
                                                onChange={(e) => handleInputChange("recurrence", e.target.value)}
                                                className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                        Agendar Sessão
                    </button>
                </div>
            </div>
        </div>
    );
};
