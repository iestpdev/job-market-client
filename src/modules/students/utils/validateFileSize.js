export function validateFileSize(file, maxSizeMB, resetFileCallback, fileInputRef) {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file && file.size > maxSizeBytes) {
        alert(`Has superado el tamaño máximo de ${maxSizeMB}MB`);
        if (typeof resetFileCallback === "function") resetFileCallback();
        if (fileInputRef?.current) fileInputRef.current.value = "";

        return false;
    }

    return true;
}
