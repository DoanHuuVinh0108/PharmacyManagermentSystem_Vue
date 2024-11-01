import { POSITION, TYPE, useToast } from 'vue-toastification';

const toast = useToast();

export function showToast({description, type }) {
    switch(type) {
        case 'success':
            toast.success(description, {
                position: POSITION.TOP_RIGHT,
                timeout: 2000
            });
            break;
        case 'warning':
            toast.warning(description, {
                position: POSITION.TOP_RIGHT,
                timeout: 2000
            });
            break;
        case 'error':
            toast.error(description, {
                position: POSITION.TOP_RIGHT,
                timeout: 2000
            });
            break;
        case 'info':
            toast.info(description, {
                position: POSITION.TOP_RIGHT,
                timeout: 2000
            });
            break;
        default:
            toast.success(description, {
                position: POSITION.TOP_RIGHT,
                timeout: 2000
            });
            break;
    }
   
}
