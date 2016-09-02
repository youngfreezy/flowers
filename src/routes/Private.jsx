import React from 'react';

import PostsGrid from 'components/PostsGrid';

import { Container, Screen } from 'styled-minimal';

const Private = () => (
  <Screen key="Private" data-testid="PrivateWrapper">
    <Container verticalPadding>
      <PostsGrid />
    </Container>
  </Screen>
);

export default Private;
