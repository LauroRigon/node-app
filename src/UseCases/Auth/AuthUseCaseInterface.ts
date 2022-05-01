export default interface AuthUseCaseInterface {
    auth: (email: string, password: string) => void
}