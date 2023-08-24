/** I don't want to keep seeing warning about not awaiting the function, when that is the point */
export const fireAndForget = (fn: () => Promise<unknown>) => {
  fn().then(_ => null)
}
