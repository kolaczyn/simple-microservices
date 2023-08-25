export type WelcomeMessage = {
  id: number
  message: string
}

export type WelcomeMessageOutbox = {
  id: number
  message: string
  sent: boolean
}

export type IWelcomeMessageRepository = {
  get: () => Promise<WelcomeMessage | null>
  getOutbox: () => Promise<WelcomeMessage[]>
  markAsSent: (id: number) => Promise<void>
  update: (message: string) => Promise<void>
}
