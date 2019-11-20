function to(promise) {
  return promise
    .then(({ data }) => {
      return [null, data];
    })
    .catch(err => [err]);
}

export { to as withHandling };
