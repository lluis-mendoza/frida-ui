import { useEffect, useState } from 'react';

import { NoImage } from '../NoImage';

interface CarouselImageProps {
  data?: string;
}
async function isBase64UrlImage(base64String: string) {
  const image = new Image();
  image.src = `data:image/jpeg;base64,${base64String}`;
  return await new Promise((resolve) => {
    image.onload = function () {
      if (image.height === 0 || image.width === 0) {
        resolve(false);
        return;
      }
      resolve(true);
    };
    image.onerror = () => {
      resolve(false);
    };
  });
}

const CarouselImage = ({ data }: CarouselImageProps) => {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  useEffect(() => {
    if (data === undefined) {
      setLoading(false);
      return;
    }
    isBase64UrlImage(data)
      .then((value) => {
        setLoading(false);
        setValid(!!value);
      })
      .catch(() => {
        setLoading(false);
        setValid(false);
      });
  }, [data]);

  if (loading) return <p>Loading</p>;
  if (data !== undefined && valid)
    return <img src={`data:image/jpeg;base64,${data}`} />;
  return <NoImage />;
};

export default CarouselImage;
