class ImageCoder {
  constructor() {
    this.codeToBase64 = this.codeToBase64.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  public codeToBase64(file: File): Promise<string | ArrayBuffer | null> {
    const promise: Promise<string | ArrayBuffer | null> = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
    });
    return promise;
  }
}

export const imageCoder = new ImageCoder();

export default ImageCoder;