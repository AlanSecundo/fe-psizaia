import { FC, useState } from "react";
import { PatientRegistrationOrchestrator } from "./patient-registration-orchestrator";
import { SessionSchedulingModal } from "../session-scheduling/session-scheduling-modal";

interface PatientRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PatientRegistrationModal: FC<PatientRegistrationModalProps> = ({
    isOpen,
    onClose
}) => {
    const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

    const handleScheduleSession = () => {
        setIsSessionModalOpen(true);
    };

    return (
        <>
            <PatientRegistrationOrchestrator
                isOpen={isOpen}
                onClose={onClose}
                onScheduleSession={handleScheduleSession}
            />

            <SessionSchedulingModal
                isOpen={isSessionModalOpen}
                onClose={() => setIsSessionModalOpen(false)}
            />
        </>
    );
};
