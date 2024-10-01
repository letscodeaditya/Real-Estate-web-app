import React from 'react';

// Import necessary components from your UI library
import {
  buttonVariants,
  Empty,
  EmptyDescription,
  EmptyImage,
  EmptyTitle
} from 'keep-react';

export const EmptyComponent2 = () => {
  return (
    <Empty>
      <EmptyImage>
        <img
          src="https://staticmania.cdn.prismic.io/staticmania/16994ca5-ac01-4868-8ade-1b9e276ccdb3_Property+1%3DFolder_+Property+2%3DLg.svg"
          height={234}
          width={350}
          alt="404"
        />
      </EmptyImage>
      <EmptyTitle className="mb-[14px] mt-5 text-white">No Data Found</EmptyTitle>
      <EmptyDescription className="mb-8 text-white">
        u have not posted anything yet! click on new property to post.
      </EmptyDescription>

    </Empty>
  );
};
