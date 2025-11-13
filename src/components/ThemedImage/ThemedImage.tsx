import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ThemedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    lightSrc: string;
    darkSrc: string;
    alt: string;
}

const ThemedImage = ({ lightSrc, darkSrc, alt, ...props }: ThemedImageProps) => {
    const { effectiveTheme } = useTheme();
    const src = effectiveTheme === 'dark' ? darkSrc : lightSrc;

    return <img src={src} alt={alt} {...props} />;
};

export default ThemedImage;
