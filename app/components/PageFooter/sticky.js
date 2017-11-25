/* to create sticky footer, height need to be coordinated between content and footer */
import styled from 'styled-components';

const height = 60;

// sticky footer height determined by param
export const Content = styled.div`
  min-height:  ${`calc(100vh - ${height}px)`};
  @media only screen and (min-device-width : 300px) and (max-device-width : 768px) {
    min-height:  ${`calc(100vh - ${80 + height}px)`};
  }
`;

export const StickyFooter = styled.div`
  height: ${`${height}px`};
  @media only screen and (min-device-width : 300px) and (max-device-width : 768px) {
    height: ${`${80 + height}px`};
  }
`;
