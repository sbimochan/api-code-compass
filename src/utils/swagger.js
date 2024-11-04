import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

/**
 * Swagger definition with OpenAPI 3.0, default values for environment variables,
 * and optional JWT authentication support.
 */
const swaggerDefinition = {
  openapi: '3.0.0', // Specify OpenAPI version for compatibility
  info: {
    title: process.env.APP_NAME || 'API Documentation',
    version: process.env.APP_VERSION || '1.0.0',
    description: process.env.APP_DESCRIPTION || 'API documentation generated by Swagger'
  },
  servers: [
    {
      url: 'http://localhost:8848/api'
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

/**
 * Options for swagger-jsdoc, specifying paths to API documentation files.
 */
const swaggerOptions = {
  swaggerDefinition, // Use the updated swaggerDefinition
  apis: [
    path.join(__dirname, '/../routes.js'),
    path.join(__dirname, '/../docs/*.js'),
    path.join(__dirname, '/../docs/*.yml'),
    path.join(__dirname, '/../docs/*.yaml')
  ]
};

/**
 * Initialize swagger-jsdoc to dynamically generate the Swagger specification.
 */
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
