import Toaster from '@/plugins/AppToast/index';
import TheTopProgressBar from '@/plugins/TopProgressBar/index';

export async function withProgress(promise) {
  TheTopProgressBar.start();

  return promise
    .catch(err => {
      TheTopProgressBar.fail();
      throw err;
    })
    .finally(() => {
      TheTopProgressBar.finish();
    });
}

export function toasterResult(
  result,
  { successToast, errorToast } = {
    successToast: false,
    errorToast: false,
  }
) {
  if (result.success) {
    if (successToast) {
      if (successToast === true) {
        Toaster.success(result.result.message || result.result);
      } else {
        Toaster.success(successToast);
      }
    }
  } else {
    if (errorToast) {
      if (errorToast === true) {
        Toaster.error(result.error.message);
      } else {
        Toaster.error(errorToast);
      }
    }
  }
  return result;
}
