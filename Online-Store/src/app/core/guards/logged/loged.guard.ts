import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // التحقق من أن الكود يعمل في بيئة المتصفح
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');

    // إذا كان هناك token، يتم منع الوصول وإعادة التوجيه إلى الصفحة الرئيسية
    if (token !== null) {
      router.navigate(['/home']);
      return false;
    }

    // إذا لم يكن هناك token، يتم السماح بالوصول
    return true;
  }

  // إذا لم يكن في بيئة المتصفح، يتم منع الوصول
  return false;
};