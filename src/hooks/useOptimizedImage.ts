import { useState, useEffect } from 'react';

interface UseOptimizedImageParams {
    src: string;
    targetWidth: number;
    quality: number;
    format: string;
}

const UseOptimizedImage = ({ src, targetWidth, quality = 0.8, format = 'image/webp' }: UseOptimizedImageParams) => {
    const [optimizedImage, setOptimizedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const cacheKey = `${src}_${targetWidth}_${quality}_${format}`;

    useEffect(() => {
        const optimizeImage = async () => {
            try {
                const cachedImage = localStorage.getItem(cacheKey);
                if(cachedImage) {
                    setOptimizedImage(cachedImage);
                    return;
                }

                setIsLoading(true);
                setError(null);

                const img = new Image();
                img.crossOrigin = 'anonymous';
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = src;
                });

                const aspectRatio = img.width / img.height;
                const targetHeight = targetWidth / aspectRatio;

                const canvas = document.createElement('canvas');
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                const ctx = canvas.getContext('2d');

                if(!ctx) throw new Error('Errore nella creazione del canvas');

                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
                const optimizedImageUrl = canvas.toDataURL(format, quality);
                localStorage.setItem(cacheKey, optimizedImageUrl);
                setOptimizedImage(optimizedImageUrl);

            } catch (error) {
                setError(error as Error);
                console.error(`Errore nell'ottimizzazione dell'immagine: ${error}`);
            } finally {
                setIsLoading(false);
            }
        }

        optimizeImage();
    }, [src, targetWidth, quality, format]);

    return { optimizedImage, isLoading, error };
}

export default UseOptimizedImage;