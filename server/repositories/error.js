export default function errorMessage(err) {
    console.log('[DB ERROR]', err.code);
    return {
        success: false,
        error: err.code
    };
}