export type WelcomeMessage = {
  id: number
  message: string
}

export type IWelcomeMessageRepository = {
  get: () => Promise<WelcomeMessage | null>
  update: (message: string) => Promise<void>
}
