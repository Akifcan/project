import { IsNotEmpty, IsJWT } from 'class-validator'

class Validate {
    @IsNotEmpty()
    @IsJWT()
    token: string
}

export default Validate