import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "COPEREX API",
            version: "1.0.0",
            description: "API for QuickShop",
            contact:{
                name: "Erick Socop",
                email: "esocop-2023011@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/quickshop/v1"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis:[
        "./src/user/user.routes.js",
        "./src/auth/auth.routes.js",
        "./src/category/category.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi }