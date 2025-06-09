export function handleImagePreview(file, onValid, onError) {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const isValidType = validTypes.includes(file.type);
    const isValidSize = file.size <= 5 * 1024 * 1024;

    if (!isValidType) {
        onError("Solo se permiten imágenes JPEG, PNG o WEBP.");
        return;
    }

    if (!isValidSize) {
        onError("El archivo excede los 5 MB.");
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        onValid(file, reader.result);
    };
    reader.readAsDataURL(file);
}
