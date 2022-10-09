export default function getDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      (e) => {
        resolve(e.target?.result as string);
      },
      false
    );
    reader.addEventListener(
      "error",
      (e) => {
        reject(e.target?.error);
      },
      false
    );

    reader.readAsDataURL(file);
  });
}
