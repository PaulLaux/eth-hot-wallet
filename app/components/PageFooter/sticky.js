import styled from 'styled-components';

/* to create sticky footer, height need to be coordinated between content and footer */

const height = 40;

// sticky footer height determined by param
export const Content = styled.div`
  min-height:  ${`calc(100vh - ${height}px)`};
`;

export const StickyFooter = styled.div`
  height: ${`${height}px`};
`;
