import React from 'react';
import { ToastComponent } from '~/components';
import { useToast } from '~/utils/toastUtils';

const ToastNotification = () => {
    const { toastData, hideToast } = useToast();

    return (
        <ToastComponent
            title={toastData.title}
            description={toastData.description}
            variant={toastData.variant}
            visible={toastData.visible}
            onClose={hideToast}
            position={toastData.position}
        />
    );
};

export default ToastNotification;
