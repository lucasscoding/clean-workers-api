export namespace LoadAccount {
  export type Params = {
    id: string
  }
  export type Result = {
    id: string
    name: string
    email: string
  }
}

export interface LoadAccount {
  load(params: LoadAccount.Params): Promise<LoadAccount.Result>
}
