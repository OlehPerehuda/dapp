import { ToastContainer } from 'react-toastify';

import { PositionsOnPage } from '@/app/utils/notifications';

export function Notification() {
    const DURATION = 1500;

    return (
        <ToastContainer
            position={PositionsOnPage.TOP_RIGHT}
            autoClose={DURATION}
            hideProgressBar
            newestOnTop={false}
            pauseOnFocusLoss
            pauseOnHover
        />
    );
};
