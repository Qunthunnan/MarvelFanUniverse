export function onFocusClick (e, action) {
    if(e.key === 'Enter' || e.key === ' ') {
        action();
    }
}