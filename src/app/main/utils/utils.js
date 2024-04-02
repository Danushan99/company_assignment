export function findByKey(arr, findVal) {
    if (arr?.length > 0) {
      const found = arr?.find(obj => {
        return obj.headerKey === findVal;
      });
      return found;
    }
    return '';
  }