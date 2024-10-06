import type { Meta, StoryObj } from '@storybook/react';

import { CollapsingDescription } from './CollapsingDescription';

const meta: Meta<typeof CollapsingDescription> = {
  component: CollapsingDescription,
  title: 'Design System/Collapsing Description',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    text: '<p margin:="">Tessin Tischwäsche: Zeitlose Eleganz für Ihren Tisch<br><br>Willkommen bei Tessin Tischwäsche – wo klassische Eleganz auf zeitlose Schönheit trifft. Unsere hochwertige Tischwäsche aus feinster Baumwolle in Hotelqualität wird Ihren Tisch in ein Kunstwerk verwandeln. In verschiedenen Größen erhältlich, passt sie sich perfekt an Ihre Bedürfnisse an.<br><br>-  Farbenvielfalt mit Stil: Unsere Tischwäsche ist mehr als nur ein Accessoire – sie ist eine Aussage. Mit einer reichen Auswahl an Farben und Stilen, können Sie Ihre Tafel individuell gestalten und harmonisch mit anderen Elementen kombinieren.<br></p>\n<p margin:="">- Pflegeleicht und Langlebig: Genießen Sie die mühelose Pflege unserer Tischwäsche. Sie ist nicht nur pflegeleicht, sondern auch hitzebeständig, so dass Sie sie bedenkenlos in heißen Temperaturen waschen können. Das garantiert langanhaltende Schönheit.<br><br>- Akzente Setzen mit Atlaskante: Entdecken Sie die Magie unserer Atlaskante Tischwäsche und Servietten. Diese verleihen Ihrem Zuhause eine besondere Note und schaffen eine angenehme Atmosphäre für unvergessliche Momente.<br><br>Unsere Tessin/Tessa Servietten, in der Größe 50x50 cm, sind nicht nur praktisch, sondern auch unverzichtbar. Die Vorteile von Stoffservietten liegen auf der Hand: umweltfreundlich, wiederverwendbar und kostensparend. Zusätzlich bieten sie optimale Hygiene und Saugfähigkeit.<br><br>Klassisch und Strapazierfähig: Unsere Tischwäsche zeichnet sich durch klassisches Design mit umlaufendem Atlasstreifen aus. Haltbarkeit ist durch spezielle Zwirngarne gewährleistet, unterstützt von 2 gewebten Kanten und 2 Saumkanten, alle mit besonderer Mercerisierung veredelt.<br><br>Entdecken Sie die zeitlose Eleganz der Tessin Tischwäsche und verleihen Sie Ihrem Tisch einen Hauch von Luxus und Stil.</p>\n<ul></ul>\n<p> </p>',
  },
} satisfies Story;
