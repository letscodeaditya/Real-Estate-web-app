import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { buttonVariants, Empty, EmptyDescription, EmptyImage, EmptyTitle } from 'keep-react';

export const NotFound = () => {
  return (
    <Empty>
      <EmptyImage>
        <img
          src="https://staticmania.cdn.prismic.io/staticmania/a8befbc0-90ae-4835-bf37-8cd1096f450f_Property+1%3DSearch_+Property+2%3DSm.svg"
          height={234}
          width={350}
          alt="404"
        />
      </EmptyImage>
      <EmptyTitle className="mb-[14px] mt-5">Sorry, No result found!</EmptyTitle>
      <EmptyDescription className="mb-8">
        you can go back and try something else, while we try our best to add more things.
      </EmptyDescription>
      <Link to="/" className={buttonVariants({ color: 'dark' })}>
        Go to home
      </Link>
    </Empty>
  );
};

export default NotFound;
