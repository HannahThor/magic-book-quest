type AvatarProps = {
  className?: string;
  src: string;
  alt: string;
};

export default function Avatar({ className, src, alt }: AvatarProps) {
  return <img src={src || src} alt={alt} className={className} />;
}

//
