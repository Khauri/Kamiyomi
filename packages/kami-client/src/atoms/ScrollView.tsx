import React, {useEffect, useState} from 'react';
import { Box, forwardRef, BoxProps } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

const ScrollView = forwardRef<BoxProps, 'div'>(({children, onScrollToBottom, isFetchingNextPage = false, vertical = true, horizontal = false, ...rest}: any, ref: any) => {
  const { ref: vRef, inView } = useInView({
    rootMargin: '400px 400px',
    threshold: 0,
    initialInView: false,
    delay: 1000
  });
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    if(inView && !isScrolledToBottom) {
      setIsScrolledToBottom(true);
      if(isFetchingNextPage) {
        return;
      }
      onScrollToBottom?.();
    } else if(!inView) {
      setIsScrolledToBottom(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Box {...rest}
      ref={ref}
      overflowX={horizontal ? "auto" : "hidden"}
      overflowY={vertical ? "auto" : "hidden"}
      position="relative"
    >
      {children}
      <Box ref={vRef} position="absolute" bottom={0} left={0} right={0} height={'20px'} width={"100%"} />
    </Box>
  )
});

export default ScrollView;
