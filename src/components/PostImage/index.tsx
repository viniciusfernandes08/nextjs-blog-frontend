import Link from "next/link";
import Image from 'next/image';

import type { LinkProps } from "next/link";

interface PostImageProps {
    imageProps: React.ComponentProps<typeof Image>
    linkProps: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
}

export function PostImage({imageProps, linkProps }: PostImageProps) {
    return (
        <Link 
          className={`${linkProps.className} w-full h-full overflow-hidden rounded-xl`}
          {...linkProps}
        >
          <Image
              {...imageProps}
              className={`${imageProps.className} w-full h-full object-cover 
                object-center group-hover:scale-105 transition`}
              alt={imageProps.alt}
            />
        </Link>
    )
}