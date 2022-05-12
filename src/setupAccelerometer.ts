export function setupAccelerometer(callbackFn: (acl: Accelerometer) => void) {
    let acl = new Accelerometer({ frequency: 60 });
    acl.addEventListener('reading', () => callbackFn(acl));
    acl.start();
}