import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * تقديم الملفات الثابتة من مجلد `browser`
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * دعم التصيير المسبق لبعض القيم المحددة لـ Checkout/:id و details/:id
 */
const getPrerenderParams: Record<string, () => string[]> = {
  'Checkout': () => ['100', '200', '300'], // معرفات الطلبات التي سيتم تصييرها مسبقًا
  'details': () => ['1', '2', '3'],        // معرفات المنتجات التي سيتم تصييرها مسبقًا
};

// دعم التصيير المسبق لهذه المسارات فقط
Object.keys(getPrerenderParams).forEach(route => {
  getPrerenderParams[route]().forEach((param: string) => {
    app.get(`/${route}/${param}`, (req, res) => {
      angularApp.handle(req).then(response => {
        if (response) {
          writeResponseToNodeResponse(response, res);
        } else {
          res.status(404).send('Not Found');
        }
      }).catch(error => res.status(500).send(error.message));
    });
  });
});

/**
 * معالجة جميع الطلبات الأخرى من خلال Angular
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * تشغيل السيرفر إذا كان هذا هو الملف الرئيسي
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`🚀 السيرفر يعمل على: http://localhost:${port}`);
  });
}

/**
 * معالج الطلبات المستخدم بواسطة Angular CLI
 */
export const reqHandler = createNodeRequestHandler(app);
