import React from 'react';
import { Link } from 'react-router-dom';  // Assuming you're using react-router for navigation
import { buttonVariants, Empty, EmptyDescription, EmptyImage, EmptyTitle } from 'keep-react';

export const EmptyComponent = () => {
  return (
    <Empty>
      <EmptyImage>
        <img
          src="https://staticmania.cdn.prismic.io/staticmania/aa469681-b2d1-4384-a990-91906711a24d_Property+1%3DNight+sky_+Property+2%3DSm.svg"
          height={234}
          width={350}
          alt="404"
        />
      </EmptyImage>
      <EmptyTitle className="mb-[14px] mt-5">Sorry No Data</EmptyTitle>
      <EmptyDescription className="mb-8">
        try some other city!!
      </EmptyDescription>

    </Empty>
  );
};
