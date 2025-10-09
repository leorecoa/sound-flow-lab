import { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';

// Define the steps for the guided tour
const TOUR_STEPS: Step[] = [
    {
        target: 'body',
        content: 'Bem-vindo ao Sound Flow Lab! Vamos fazer um tour rápido pelas principais funcionalidades.',
        placement: 'center',
        disableBeacon: true,
    },
    {
        target: '#practice-flow-section',
        content: 'Aqui você encontra os módulos de prática. Comece pelo primeiro para aprender as conexões sonoras.',
        placement: 'top',
    },
    {
        target: '#module-card-1',
        content: 'Cada card é um módulo. Clique aqui para iniciar sua primeira lição!',
        placement: 'top',
    },
    {
        target: '#user-menu-button',
        content: 'Acesse seu perfil, configurações e o leaderboard por este menu.',
        placement: 'bottom',
    },
];

export const AppTour = () => {
    const [runTour, setRunTour] = useState(false);

    // Check if the tour has been completed before
    useEffect(() => {
        const tourHasBeenSeen = localStorage.getItem('soundflowlab_tour_completed');
        if (!tourHasBeenSeen) {
            setRunTour(true);
        }
    }, []);

    // Handle tour completion
    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status } = data;
        const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            setRunTour(false);
            localStorage.setItem('soundflowlab_tour_completed', 'true');
        }
    };

    return (
        <Joyride
            callback={handleJoyrideCallback}
            continuous
            run={runTour}
            scrollToFirstStep
            showProgress
            showSkipButton
            steps={TOUR_STEPS}
            styles={{
                options: {
                    primaryColor: 'hsl(var(--primary))',
                    textColor: 'hsl(var(--foreground))',
                    arrowColor: 'hsl(var(--card))',
                    backgroundColor: 'hsl(var(--card))',
                },
            }}
        />
    );
};