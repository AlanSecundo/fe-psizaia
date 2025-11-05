import { FC, useState, useEffect, useRef } from "react";
import { X, Calendar, ChevronDown, Clock, User } from "lucide-react";
import { usePatients, useSchedule } from "@/hooks";
import type { Patient } from "@/types/patient";
import type { AvailableSlot } from "@/types/schedule";

interface SessionSchedulingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface RecurrenceOption {
    value: string;
    label: string;
}

const recurrenceOptions: RecurrenceOption[] = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Quinzenal' },
    { value: 'monthly', label: 'Mensal' },
];

// Date picker component
const DatePicker = ({
    value,
    onChange,
    placeholder,
    availableSlots,
    isLoading
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    availableSlots: AvailableSlot[];
    isLoading: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const datePickerRef = useRef<HTMLDivElement>(null);

    // Converter data da API (YYYY-MM-DD) para formato brasileiro
    const formatDateFromAPI = (dateString: string) => {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    // Fechar ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleDateSelect = (dateString: string) => {
        const formatted = formatDateFromAPI(dateString);
        onChange(formatted);
        setIsOpen(false);
    };

    // Ordenar datas disponíveis
    const sortedSlots = [...availableSlots].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return (
        <div className="relative" ref={datePickerRef}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                readOnly
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors cursor-pointer"
                disabled={isLoading}
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4 max-h-96 overflow-y-auto">
                    {isLoading ? (
                        <div className="px-3 py-3 text-center text-sm text-gray-500">
                            Carregando datas disponíveis...
                        </div>
                    ) : sortedSlots.length === 0 ? (
                        <div className="px-3 py-3 text-center text-sm text-gray-500">
                            Nenhuma data disponível
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {sortedSlots.map((slot) => {
                                const formatted = formatDateFromAPI(slot.date);
                                const isSelected = value === formatted;

                                return (
                                    <button
                                        key={slot.date}
                                        onClick={() => handleDateSelect(slot.date)}
                                        className={`w-full px-4 py-3 text-left rounded-lg transition-colors ${isSelected
                                            ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                                            : 'hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
                                            }`}
                                    >
                                        <div className="font-medium">{formatted}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {slot.timeSlots.length} horário(s) disponível(is)
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Time picker component
const TimePicker = ({
    value,
    onChange,
    placeholder,
    selectedDate,
    availableSlots,
    isLoading
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    selectedDate: string;
    availableSlots: AvailableSlot[];
    isLoading: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const timePickerRef = useRef<HTMLDivElement>(null);

    // Converter data do formato brasileiro para YYYY-MM-DD
    const parseDateToAPI = (dateString: string): string | null => {
        const slot = availableSlots.find(slot => {
            const date = new Date(slot.date + 'T00:00:00');
            const formatted = date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
            return formatted === dateString;
        });
        return slot ? slot.date : null;
    };

    // Formatar horário para exibição (HH:mm - HH:mm)
    const formatTimeSlot = (startTime: string, endTime: string): string => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const startHour = start.getHours().toString().padStart(2, '0');
        const startMin = start.getMinutes().toString().padStart(2, '0');
        const endHour = end.getHours().toString().padStart(2, '0');
        const endMin = end.getMinutes().toString().padStart(2, '0');
        return `${startHour}:${startMin} - ${endHour}:${endMin}`;
    };

    // Fechar ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Obter slots da data selecionada
    const dateApiFormat = selectedDate ? parseDateToAPI(selectedDate) : null;
    const selectedSlot = availableSlots.find(slot => slot.date === dateApiFormat);
    const timeSlots = selectedSlot ? selectedSlot.timeSlots : [];

    // Ordenar horários
    const sortedTimeSlots = [...timeSlots].sort((a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

    return (
        <div className="relative" ref={timePickerRef}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                readOnly
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors cursor-pointer"
                disabled={!selectedDate || isLoading}
            />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {!selectedDate ? (
                        <div className="px-3 py-3 text-center text-sm text-gray-500">
                            Selecione uma data primeiro
                        </div>
                    ) : isLoading ? (
                        <div className="px-3 py-3 text-center text-sm text-gray-500">
                            Carregando horários...
                        </div>
                    ) : sortedTimeSlots.length === 0 ? (
                        <div className="px-3 py-3 text-center text-sm text-gray-500">
                            Nenhum horário disponível para esta data
                        </div>
                    ) : (
                        sortedTimeSlots.map((timeSlot) => {
                            const formattedTime = formatTimeSlot(timeSlot.startTime, timeSlot.endTime);
                            const isSelected = value === formattedTime;

                            return (
                                <button
                                    key={`${timeSlot.startTime}-${timeSlot.endTime}`}
                                    onClick={() => {
                                        onChange(formattedTime);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full px-3 py-2 text-left transition-colors flex items-center ${isSelected
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'hover:bg-purple-50 hover:text-purple-600'
                                        }`}
                                >
                                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                    {formattedTime}
                                </button>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};

// Patient selector component
const PatientSelector = ({
    value,
    onChange,
    placeholder,
    patients,
    isLoading
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    patients: Patient[];
    isLoading: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedPatient = patients.find(patient => patient.id === value);

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
                    {isLoading ? (
                        <div className="px-3 py-3 text-center text-sm text-gray-500">
                            Carregando pacientes...
                        </div>
                    ) : patients.length === 0 ? (
                        <div className="px-3 py-3 text-center text-sm text-gray-500">
                            Nenhum paciente encontrado
                        </div>
                    ) : (
                        patients.map((patient) => (
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
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export const SessionSchedulingModal: FC<SessionSchedulingModalProps> = ({
    isOpen,
    onClose
}) => {
    const { patients, isLoading: isLoadingPatients } = usePatients();
    const {
        availableSlots,
        isLoading: isLoadingSlots,
        scheduleSession,
        isScheduling,
        isScheduleSuccess,
        isScheduleError,
        scheduleError,
        resetSchedule
    } = useSchedule();
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

    // Limpar horário quando a data mudar
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            time: ""
        }));
    }, [formData.date]);

    // Fechar modal quando agendamento for bem-sucedido
    useEffect(() => {
        if (isScheduleSuccess) {
            // Resetar formulário
            setFormData({
                patientId: "",
                date: "",
                type: "",
                time: "",
                isRecurring: false,
                recurrence: "weekly",
                modality: "online",
                duration: "50"
            });
            resetSchedule();
            onClose();
        }
    }, [isScheduleSuccess, resetSchedule, onClose]);

    if (!isOpen) return null;

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Converter data do formato brasileiro para YYYY-MM-DD
    const parseDateToAPI = (dateString: string): string | null => {
        const slot = availableSlots.find(slot => {
            const date = new Date(slot.date + 'T00:00:00');
            const formatted = date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
            return formatted === dateString;
        });
        return slot ? slot.date : null;
    };

    // Converter horário formatado (HH:mm - HH:mm) para ISO datetime
    const parseTimeToDateTime = (dateString: string, timeString: string): string | null => {
        const dateApiFormat = parseDateToAPI(dateString);
        if (!dateApiFormat) return null;

        // Extrair horário de início do formato "HH:mm - HH:mm"
        const startTime = timeString.split(' - ')[0];
        const [hours, minutes] = startTime.split(':').map(Number);

        // Criar data ISO com o horário
        const date = new Date(dateApiFormat);
        date.setHours(hours, minutes, 0, 0);

        return date.toISOString();
    };

    // Converter modalidade para o formato da API
    const convertModalityToType = (modality: string): "IN_PERSON" | "ONLINE" => {
        return modality === "presencial" ? "IN_PERSON" : "ONLINE";
    };

    const handleSubmit = () => {
        // Validações
        if (!formData.patientId) {
            alert("Por favor, selecione um paciente");
            return;
        }

        if (!formData.date) {
            alert("Por favor, selecione uma data");
            return;
        }

        if (!formData.time) {
            alert("Por favor, selecione um horário");
            return;
        }

        // Converter dados para o formato da API
        const scheduledDateTime = parseTimeToDateTime(formData.date, formData.time);
        if (!scheduledDateTime) {
            alert("Erro ao processar data e horário");
            return;
        }

        const scheduleData = {
            patientId: formData.patientId,
            scheduledDateTime: scheduledDateTime,
            durationMinutes: parseInt(formData.duration, 10),
            type: convertModalityToType(formData.modality),
            notes: undefined,
            isRecurring: formData.isRecurring
        };

        scheduleSession(scheduleData);
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
                                    patients={patients}
                                    isLoading={isLoadingPatients}
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
                                    availableSlots={availableSlots}
                                    isLoading={isLoadingSlots}
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
                                    selectedDate={formData.date}
                                    availableSlots={availableSlots}
                                    isLoading={isLoadingSlots}
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
                    {isScheduleError && (
                        <div className="flex-1 text-sm text-red-600">
                            {scheduleError?.message || "Erro ao agendar sessão. Tente novamente."}
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        disabled={isScheduling}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isScheduling || !formData.patientId || !formData.date || !formData.time}
                        className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isScheduling ? "Agendando..." : "Agendar Sessão"}
                    </button>
                </div>
            </div>
        </div>
    );
};
