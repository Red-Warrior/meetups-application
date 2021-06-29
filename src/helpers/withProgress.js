import TheTopProgressBar from '@/plugins/TopProgressBar';

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
