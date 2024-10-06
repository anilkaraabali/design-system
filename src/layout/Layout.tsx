import { Container } from '@/design-system/container';
import { Footer } from '@/layout/footer';
import { Header } from '@/layout/header';

export const Layout: React.FC<React.PropsWithChildren> = (props) => (
  <>
    <Header />
    <Container as='main' id='main'>
      {props.children}
    </Container>
    <Footer />
  </>
);
