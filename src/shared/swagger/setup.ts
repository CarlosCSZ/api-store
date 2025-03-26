import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AUTHORIZATION_HEADER } from '@common/constants';
import { getVersion } from '@common/utils';

export const swaggerSetup = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('API store')
    .setDescription('This monolith server provides the APIs for a store.')
    .setContact(
      'CarlosCSZ',
      'https://www.linkedin.com/in/carloscherrez',
      'ccherrez18@gmail',
    )
    .setVersion(getVersion())
    .addApiKey(
      {
        type: 'apiKey',
      },
      AUTHORIZATION_HEADER,
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};
