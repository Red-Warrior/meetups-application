import Toaster from '@/plugins/AppToast';

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
